# Arkisto: OneDrive-jakolinkin tarkastus palvelimella

## Miksi selaintarkastus ei riita
- Oppija on kirjautuneena oppimisalustaan ja usein samalla Microsoft 365 -tunnuksilla.
- Selain voi kayttaa istuntoa taustalla, jolloin "toimii" ei tarkoita "julkinen kaikille".
- CORS/no-cors estaa luotettavan statuskoodin, redirect-ketjun ja sisallon analyysin selaimesta.

Johtopaatos: luotettava tarkastus kannattaa tehda palvelimella ilman kayttajan sessiota ja ilman selaimen evasteita.

## Tavoitetila
Palvelin tarkistaa annetun SharePoint/OneDrive-linkin "anonyymina" ja palauttaa vain luokittelun:
- `public_view`: linkki avautuu ilman kirjautumista katseluun
- `auth_required`: linkki vaatii kirjautumisen
- `not_found_or_revoked`: linkki on virheellinen tai poistettu
- `unknown`: tulos ei varmistunut (esim. aikakatkaisu, anti-bot)

Lisaksi palautetaan tekninen selite opettajalle/lokiin, mutta opiskelijalle vain selkea tulos.

## Riittaako PHP shared hostingissa?
Lyhyesti: usein kylla perusversioon.

Tarvitaan:
- PHP 8.x
- cURL-laajennus (yleensa on)
- Mahdollisuus ulosmeneviin HTTPS-pyyntoihin
- Mahdollisuus lukea vastausotsikot ja redirect-ketju

Talla toteutuu jo hyva "MVP":
- tarkista URL-muoto
- tee pyynto ilman evasteita
- seuraa redirectit rajatusti
- analysoi paatyminen (kirjautumissivu vs julkinen resurssi)

Rajoitteet shared hostingissa:
- Anti-bot/WAF voi joskus estaa pyyntoja
- Ajastettu, pidempi analyysi voi olla hankalampi
- Ei valttamatta paasyja headless-selaimeen (Playwright/Chrome)

## Suositeltu API-malli
Endpoint:
- `POST /api/check-onedrive-link`

Syote:
```json
{
  "url": "https://...sharepoint.com/..."
}
```

Palautus:
```json
{
  "ok": true,
  "classification": "public_view",
  "confidence": "medium",
  "details": {
    "httpStatus": 200,
    "redirectCount": 2,
    "finalUrlHost": "*.sharepoint.com",
    "signals": ["anonymous_access_possible", "no_login_challenge_detected"]
  }
}
```

## Tarkastuslogiikka (palvelin)
1. Validoi URL:
- vain `https`
- host paattyy `.sharepoint.com` tai `1drv.ms`
- pituus, merkit, ei localhost/private-IP

2. Tee pyynto anonyymina:
- `CURLOPT_FOLLOWLOCATION = false` (hallittu redirect-seuranta itse)
- ei evasteita (`CURLOPT_COOKIEFILE`/`CURLOPT_COOKIEJAR` pois)
- ei Authorization-headeria
- aikakatkaisut (esim. 8-12 s)

3. Seuraa redirect-ketju (max esim. 5):
- tallenna jokainen status + location
- tunnista kirjautumishaasteet (esim. login.microsoftonline.com tms.)

4. Luokittele:
- jos paatyy login-haasteeseen -> `auth_required`
- jos paatyy selkeaan 403/401 ilman julkista nayttoa -> `auth_required`
- jos paatyy 404/410 -> `not_found_or_revoked`
- jos saa 200 ja sisalto viittaa jaettavaan resurssiin -> `public_view`
- muuten -> `unknown`

5. Palauta vain tarpeellinen tieto frontendille.

## Turvallisuus ja kovennus
- Salli vain SharePoint/OneDrive-hostit (allowlist)
- Esta SSRF (ei sisaverkon osoitteita, ei localhostia)
- Rajaa pyyntojen maara (rate limit)
- Lokeihin ei kokonaista URL:ia, vaan hashattu/lyhennetty muoto
- CORS sallitaan vain omasta eKampus-sisallosta

## Voiko palvelin palauttaa "jakoasetukset" varmasti?
Yleisessa tapauksessa ei suoraan pelkasta linkista.

Mita voidaan paatella hyvin:
- avautuuko anonyymisti vai vaatiiko kirjautumisen
- onko linkki todennakoisesti poistettu/virheellinen

Mita ei voi aina varmistaa pelkasta julkisesta HTTP-ketjusta:
- tarkka asetus kuten "Can edit" vs "Can view"
- tarkka kohderyhmatyyppi kaikissa tapauksissa

Jos halutaan tarkat jakoasetukset, tarvitaan yleensa Microsoft Graph -integraatio:
- Azure AD -sovellus
- oikeudet (esim. tiedostojen ja oikeuksien luku)
- tenantin admin-suostumus
- toimiva mappaus linkista kohdeobjektiin

Tama on mahdollinen, mutta selkeasti raskaampi kuin pelkka anonyymitarkistus.

## Realistinen eteneminen
1. Tee PHP-MVP (anonyymi luokittelu) webhotelliin/alidomainiin.
2. Kytke harjoitussivu kutsumaan APIa (vain status + luokittelu takaisin).
3. Jos tarkkuus ei riita, laajenna Graph-pohjaiseen tarkastukseen.

## Yhteenveto
- Kyllä, PHP shared hosting riittaa todennakoisesti hyvaan ensiversioon.
- Selaimen oma JS-tarkastus ei riita luotettavaan "julkinen kaikille"-varmennukseen.
- Paras kompromissi nyt: palvelin tekee anonyymin tarkastuksen ja palauttaa luokituksen.
