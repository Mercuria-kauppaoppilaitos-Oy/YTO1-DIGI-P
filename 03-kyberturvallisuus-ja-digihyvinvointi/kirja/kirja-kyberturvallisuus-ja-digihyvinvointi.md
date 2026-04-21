# Kirja: Kyberturvallisuus ja digihyvinvointi

**Moodle-kirja-aktiviteetti — Osio 3**  
**Kurssi:** YTO1-DIGI-P — Toiminta digitaalisessa ympäristössä  
**Osaamistavoitteet:** 1, 2, 3, 12, 13

---

> **Kirjan rakenne (Moodle-luvut ja aliluvut)**
>
> 1. Tietosuoja ja yksityisyys
>    - 1.1 Henkilötiedot ja GDPR
>    - 1.2 Salasanat ja tunnistautuminen
>    - 1.3 Digitaalinen jalanjälki
> 2. Kyberturvallisuus
>    - 2.1 Yleisimmät uhkatyypit
>    - 2.2 Uhkan tunnistaminen
>    - 2.3 Toiminta uhkatilanteessa
>    - 2.4 Ennaltaehkäisy
> 3. Sosiaalinen media ja vastuullisuus
>    - 3.1 Sosiaalinen media tänään
>    - 3.2 Vastuullinen käyttö
>    - 3.3 Digijalanjälki ja henkilöbrändi
> 4. Digihyvinvointi
>    - 4.1 Fyysinen hyvinvointi digitaalisessa työssä
>    - 4.2 Henkinen hyvinvointi
>    - 4.3 Digitalisaatio ja yhteiskunta

---

## Luku 1 — Tietosuoja ja yksityisyys

*Tässä luvussa opit suojaamaan henkilökohtaisia tietojasi ja ymmärtämään, mitä tietoja sinusta kerätään digitaalisessa ympäristössä.*

---

### 1.1 Henkilötiedot ja GDPR

Henkilötieto on mikä tahansa tieto, joka voidaan yhdistää tunnistettavaan henkilöön. Se ei rajoitu vain nimeen tai osoitteeseen.

**Mitä ovat henkilötiedot?**

- Nimi, osoite, syntymäaika, henkilötunnus
- Puhelinnumero, sähköpostiosoite
- IP-osoite ja evästetiedot
- Sijainti- ja paikannustiedot
- Valokuvat, joista henkilö on tunnistettavissa
- Terveystiedot
- Käyttäytymistiedot (mitä sivuja selaat, mitä ostat)

Myös sellaiset tiedot, jotka yhdistettynä muihin tietoihin mahdollistavat tunnistamisen, ovat henkilötietoja.

**GDPR — EU:n tietosuoja-asetus**

GDPR (General Data Protection Regulation) on EU:n tietosuoja-asetus, joka tuli voimaan 2018. Se määrittää, miten organisaatiot saavat käsitellä henkilötietoja.

GDPR antaa sinulle seuraavat oikeudet:

| Oikeus | Mitä se tarkoittaa |
|---|---|
| Oikeus saada tietoa | Sinulle on kerrottava, mitä tietoja kerätään ja miksi |
| Oikeus tarkistaa tiedot | Voit pyytää nähdä, mitä tietoja sinusta on tallennettu |
| Oikeus korjata tiedot | Voit pyytää virheellisten tietojen korjaamista |
| Oikeus poistaa tiedot | Voit pyytää tietojesi poistamista ("oikeus tulla unohdetuksi") |
| Oikeus rajoittaa käsittelyä | Voit pyytää, että tietojasi ei käytetä tiettyihin tarkoituksiin |
| Oikeus siirtää tiedot | Voit siirtää tietosi palvelusta toiseen |

**Tiedot, joita sinusta kerätään**

Verkkopalvelut keräävät tietoja monin tavoin:
- **Evästeet (cookies):** Tallentavat selaushistoriasi
- **Käyttäjätili:** Ostohistoria, hakuhistoria, suosikit
- **Sovellusten käyttöoikeudet:** Puhelimen sijainti, kamera, yhteystiedot
- **Pikselit ja seurantakoodit:** Seuraavat sinua sivustolta toiselle mainontaa varten

Siksi verkkopalveluiden yksityisyysasetukset ja evästevalinnat eivät ole vain muodollisuuksia — niillä on todellinen vaikutus siihen, mitä tietoja sinusta kerätään.

---

### 1.2 Salasanat ja tunnistautuminen

Salasana on ensimmäinen suojakerros tileillesi. Heikko salasana on kuin avoin ovi.

**Vahvan salasanan periaatteet**

Hyvä salasana on:
- **Pitkä:** Vähintään 12–16 merkkiä
- **Monipuolinen:** Isoja ja pieniä kirjaimia, numeroita ja erikoismerkkejä
- **Yksilöllinen:** Jokaisella tilillä oma salasana
- **Ei henkilökohtainen:** Ei nimeä, syntymäaikaa tai lemmikkiä

Hyvä tapa luoda vahva salasana on **passphrase** — useita sanoja yhdistettynä: `Koira!Juoksee#Metsässä9` on sekä muistettava että vahva.

**Salasanamanagerit**

Eri tilillä pitäisi olla eri salasana — mutta kukaan ei voi muistaa kymmeniä vahvoja salasanoja. Salasanamanageri tallentaa kaikki salasanasi yhteen salattuun tietokantaan:

- **Bitwarden** — ilmainen, avoimen lähdekoodin vaihtoehto
- **1Password** — maksullinen, laajat ominaisuudet
- **KeePass** — ilmainen, tallentaa tiedot paikallisesti

Muistat vain yhden pääsalasanan — salasanamanageri hoitaa loput.

**Kaksivaiheinen tunnistautuminen (2FA / MFA)**

Kaksivaiheinen tunnistautuminen lisää ylimääräisen suojakerroksen: vaikka salasanasi vuotaisi, tili pysyy turvassa, koska kirjautuminen vaatii lisäksi toisen todennuksen.

Yleisiä 2FA-tapoja:
- **SMS-koodi:** Koodi lähetetään tekstiviestillä (ei paras vaihtoehto — SMS voidaan kaapata)
- **Authenticator-sovellus:** Microsoft Authenticator, Google Authenticator — generoi kertaluonteiset koodit
- **Fyysinen turva-avain:** YubiKey — fyysinen laite, korkein tietoturva

**Ota 2FA käyttöön aina, kun se on mahdollista** — erityisesti sähköpostissa, pankkipalveluissa ja työtileissä.

---

### 1.3 Digitaalinen jalanjälki

Digitaalinen jalanjälki on kokonaisuus kaikesta, mitä olet tehnyt, julkaissut tai tallentanut verkossa. Se kertyy sekä tietoisesti (julkaisut, rekisteröitymiset) että tietämättäsi (selausdata, sijaintitiedot).

**Aktiivinen ja passiivinen jalanjälki**

- **Aktiivinen jalanjälki:** Itse julkaisemasi tieto — some-päivitykset, kommentit, lomakkeiden täyttö, rekisteröitymiset
- **Passiivinen jalanjälki:** Kerätty tietosi ilman aktiivista toimintaasi — sijaintidata, selaushistoria, ostohistoria, IP-osoite

**Digitaalinen jalanjälki ei katoa**

Kun jotain on julkaistu verkossa, sitä on vaikea poistaa kokonaan. Kuvakaappauksia on voitu ottaa, hakukoneet ovat indeksoineet sivun, ja jakoketjut ovat levinneet. Mieti ennen julkaisemista: haluaisitko nähdä tämän hakutuloksissa vuosien päästä?

**Miten vähentää jalanjälkeä?**

- Tarkista sosiaalisen median yksityisyysasetukset säännöllisesti
- Poista tarpeettomat sovellukset ja tilit
- Kiellä tarpeettomien sovellusten pääsy sijaintiin, kontakteihin ja kameraan
- Käytä selaimen yksityistä tilaa (incognito) kun et halua tallentaa selaushistoriaa
- Harkitse ennen rekisteröitymistä: tarvitsenko oikeasti tätä tiliä?

---

## Luku 2 — Kyberturvallisuus

*Tässä luvussa opit tunnistamaan yleisimmät kyberturvallisuusuhat ja toimimaan oikein, jos kohtaat sellaisen.*

---

### 2.1 Yleisimmät uhkatyypit

Kyberturvallisuusuhat eivät koske vain suuria yrityksiä — ne koskevat jokaista, joka käyttää internetiä. Uhkien tunnistaminen on paras tapa suojautua niiltä.

**Phishing (kalastelu)**

Phishing on yleisin ja tehokkain kyberhyökkäystapa. Hyökkääjä lähettää viestin (sähköpostissa, tekstiviestissä tai somessa), joka näyttää tulevan luotettavalta taholta — pankista, postitoimistosta, työnantajalta tai virastolta.

Viestin tarkoitus on:
- Saada sinut klikkaamaan väärennettyä linkkiä ja kirjautumaan väärennetylle sivulle
- Saada sinut avaamaan haittaohjelman sisältävä liitetiedosto
- Saada sinut luovuttamaan henkilötietoja tai maksutietoja

Phishing-viestien yleiset piirteet:
- Kiireellisyys: "Toimita tiedot 24 tunnin kuluessa tai tilisi suljetaan"
- Uhkailu tai palkitseminen: "Olet voittanut palkinnon" / "Sinulla on maksamaton lasku"
- Outo lähettäjän osoite tai epäselvä linkki
- Kirjoitusvirheitä tai kömpelöä kieltä (joskin tekoäly on parantanut näiden kieltä)

**Haittaohjelmat (malware)**

Haittaohjelma on ohjelma, joka asennetaan laitteeseesi luvattomasti ja aiheuttaa vahinkoa tai varastaa tietoja.

| Tyyppi | Kuvaus |
|---|---|
| **Virus** | Leviää tiedostojen mukana, vahingoittaa järjestelmää |
| **Troijalainen** | Naamioituu hyödylliseksi ohjelmaksi, avaa takaoven hyökkääjälle |
| **Ransomware** | Salaa tiedostosi ja vaatii lunnaita niiden avaamiseksi |
| **Spyware** | Seuraa toimintaasi ja varastaa tietoja (salasanoja, korttitietoja) |
| **Adware** | Näyttää ei-toivottuja mainoksia |

**Identiteettivarkaus**

Identiteettivarkaudessa rikollinen käyttää henkilötietojasi esiintyäkseen sinuna — ottaakseen lainaa, tehdäkseen ostoksia tai avatakseen tilejä nimissäsi.

**Sosiaalinen manipulointi (social engineering)**

Sosiaalinen manipulointi on psykologinen hyökkäys, jossa rikollinen manipuloi uhrin toimimaan haluamallaan tavalla. Esimerkiksi:
- Esiintyy IT-tukihenkilönä ja pyytää salasanaa "verkon huollon" vuoksi
- Esiintyy johtajana ja pyytää siirtämään rahaa pikaisesti
- Soittaa ja uhkaa rangaistuksella, ellet anna tietoja

**Julkisten WiFi-verkkojen riskit**

Avoimet WiFi-verkot (kahvilat, lentoasemat, kirjastot) eivät ole salattuja. Verkossa oleva hyökkääjä voi siepata liikennettäsi. Vältä avoimessa verkossa:
- Pankkipalveluiden käyttöä
- Salasanojen syöttämistä
- Arkaluonteisten asiakirjojen käsittelyä

---

### 2.2 Uhkan tunnistaminen

**Phishing-viestin tunnistaminen**

Kun saat epäilyttävän viestin, tarkista:

1. **Lähettäjän osoite:** Onko osoite aito? `noreply@pankki-fi.com` ei ole sama kuin `noreply@pankki.fi`
2. **Linkki:** Siirrä hiiri linkin päälle (älä klikkaa) — näetkö osoiterivillä oikean osoitteen?
3. **Sisältö:** Pyytääkö viesti kiireellisesti kirjautumista, tietojen syöttöä tai rahan siirtoa?
4. **Kieli:** Onko kirjoitusvirheitä, oudoksi kääntynyttä kieltä tai epätavallisia muotoiluja?
5. **Tunnistettu lähettäjä:** Odotitko tätä viestiä? Jos ei — ole varovainen

**Väärennettyjen sivustojen tunnistaminen**

Selaimessa:
- Tarkista osoite (URL) — onko se oikea? `paypal-verify.net` ei ole PayPal
- Onko sivustolla HTTPS-suojaus (lukon kuvake osoiterivillä)? HTTPS ei takaa rehellisyyttä, mutta ilman sitä sivusto on selkeästi epäilyttävä
- Onko sivuston ulkoasu poikkeava tai kömpelö verrattuna oikeaan sivustoon?

**Epäilyttävät tiedostot**

Älä avaa liitetiedostoja, jos:
- Et tunne lähettäjää
- Liite on .exe, .zip, .js, .vbs tai muu ohjelmatiedosto
- Viesti kehottaa "ottamaan makrot käyttöön" Office-tiedostossa

---

### 2.3 Toiminta uhkatilanteessa

Uhka ei välttämättä johda vakavaan vahinkoon, jos toimit nopeasti ja oikein.

**Jos epäilet phishing-viestiä:**
1. Älä klikkaa linkkejä äläkä avaa liitteitä
2. Älä vastaa viestiin
3. Ilmoita viestistä IT-tuelle tai esihenkilölle (työympäristössä)
4. Poista viesti
5. Jos organisaatiossa on phishing-ilmoitusmenettely, käytä sitä

**Jos olet vahingossa klikkannut epäilyttävää linkkiä:**
1. Älä syötä mitään tietoja avautuneelle sivulle
2. Sulje sivu välittömästi
3. Tyhjennä selaimen välimuisti ja evästeet
4. Vaihda salasanasi kyseiseen palveluun välittömästi toiselta laitteelta
5. Ilmoita IT-tuelle, jos kyseessä on työkone tai oppilaitoksen laite
6. Seuraa tiliesi toimintaa seuraavat päivät

**Jos tilisi on murrettu:**
1. Vaihda salasana välittömästi — jos et pääse sisään, käytä "unohtunut salasana" -toimintoa
2. Vaihda sama salasana kaikista muista palveluista, joissa käytät sitä (siksi eri tileillä pitää olla eri salasanat)
3. Ota 2FA käyttöön, jos et ole vielä
4. Tarkista tilin asetukset — onko lisätty vieras sähköpostiosoite tai puhelinnumero?
5. Tarkista tilin toimintahistoria

**Kenelle ilmoitat?**
- **Opiskelija:** Oppilaitoksen IT-tuki tai opettaja
- **Työntekijä:** Työnantajan IT-tuki, tietoturvavastaava
- **Vakava rikos (identiteettivarkaus, tietomurto):** Poliisi (poliisi.fi), Kyberturvallisuuskeskus (kyberturvallisuuskeskus.fi)

---

### 2.4 Ennaltaehkäisy

Paras tietoturva on ennaltaehkäisevä. Nämä toimenpiteet vähentävät riskiä merkittävästi:

**Pidä ohjelmistot päivitettynä**

Tietoturvapäivitykset korjaavat haavoittuvuuksia, joita hyökkääjät voivat hyödyntää. Älä lykkää päivityksiä — ota automaattiset päivitykset käyttöön.

**Varmuuskopiointi — 3-2-1-sääntö**

- **3** kopiota tiedoista
- **2** eri tallennusvälineellä (esim. OneDrive + ulkoinen kiintolevy)
- **1** tallennuspaikka fyysisesti muualla (esim. pilvipalvelu)

Erityisesti ransomware-hyökkäyksessä varmuuskopio on ainoa keino saada tiedostosi takaisin maksamatta lunnaita.

**Virustorjunta**

Windows 10 ja 11 sisältävät Windows Defenderin, joka tarjoaa riittävän perussuojan normaalikäyttöön. Pidä se ajan tasalla.

**VPN**

VPN (Virtual Private Network) salaa internet-liikennettäsi. Se on erityisen hyödyllinen julkisissa WiFi-verkoissa. Oppilaitoksella tai työnantajalla saattaa olla oma VPN — käytä sitä etätyöskentelyssä.

**Tietoturva mobiililaitteessa**

- Aseta näytön lukitus (PIN, sormenjälki tai kasvontunnistus)
- Päivitä käyttöjärjestelmä ja sovellukset
- Asenna sovelluksia vain virallisilta sovelluskauppoilta
- Tarkista, mitä käyttöoikeuksia sovellukset pyytävät

---

## Luku 3 — Sosiaalinen media ja vastuullisuus

*Tässä luvussa käsitellään sosiaalisen median vastuullista käyttöä — omaa yksityisyyttä, muiden kunnioittamista ja verkkoviestinnän seurauksia.*

---

### 3.1 Sosiaalinen media tänään

Sosiaalinen media on kiinteä osa nykyistä viestintäkulttuuria — henkilökohtaisessa elämässä, opiskelussa ja työelämässä. Sen käytön osaaminen on ammatillinen taito.

**Yleisimmät alustat**

| Alusta | Pääasiallinen käyttö | Erityispiirteet |
|---|---|---|
| Instagram | Kuvat ja videot, Stories | Visuaalinen, brändit |
| TikTok | Lyhyet videot | Algoritmiohjattu, nuorisosuosittu |
| YouTube | Pitkät videot | Hakuoptimoitavissa, koulutuskin |
| X (Twitter) | Lyhyet tekstit, uutiset | Reaaliaikainen, mielipiteenmuodostus |
| LinkedIn | Ammatillinen verkostoituminen | Työelämä, rekrytointi |
| Facebook | Yhteisöt, tapahtumat, ryhmät | Monipuolinen, ikääntyneempi käyttäjäkunta |
| WhatsApp / Telegram | Pikaviestit | Yksityinen viestintä, ryhmät |
| Discord | Yhteisöt ja pelit | Palvelimet, ryhmäkeskustelut |

**Some työelämässä**

LinkedIn on tärkein ammatillinen sosiaalisen median alusta. Siellä voit:
- Rakentaa ammatillista profiilia
- Verkostoitua alasi ihmisten kanssa
- Hakea töitä
- Seurata toimialan uutisia ja trendejä

Monet yritykset hyödyntävät myös Instagramia, TikTokia tai Facebookia markkinoinnissa — some-osaaminen on kasvava taito liiketoiminnassa.

---

### 3.2 Vastuullinen käyttö

**Netiketti — hyvät käytöstavat verkossa**

Netiketti on epävirallinen kokoelma verkkoviestinnän hyviä tapoja. Perusperiaatteet:

- Kirjoita asiallisesti — tekstissä ei kuulu sävy eikä huumori aina välity
- Muista, että vastapuolella on ihminen — kohtele toisia kuin kasvokkain
- Vältä huutamista (CAPSLOCK = huutaminen tekstissä)
- Ajattele ennen lähettämistä — tekstiä ei voi ottaa takaisin
- Kuuntele ennen kuin reagoit — pyydä tarvittaessa tarkennusta

**Muiden yksityisyyden kunnioittaminen**

- Älä jaa toisten kuvia tai sijaintitietoja ilman lupaa
- Älä tagaa ihmisiä kuviin tai paikkoihin, jos he eivät ole antaneet lupaa
- Muista, että toisen henkilön tiedot ovat heidän omiaan — vaikka tieto olisi julkisesti saatavilla

**Kiusaaminen ja häirintä verkossa**

Verkkokiusaaminen (cyberbullying) on toisen henkilön toistuvaa häirintää, nöyryyttämistä tai uhkailua digitaalisessa ympäristössä. Se voi tapahtua somessa, pikaviesteissä, peleissä tai sähköpostissa.

Jos kohtaat häirintää:
- Älä vastaile aggressiivisesti
- Dokumentoi tapaukset (kuvakaappaukset)
- Estä häiritsijä
- Ilmoita alustalle
- Kerro asiasta jollekin luottamallesi henkilölle tai tarvittaessa poliisille

**Vihapuhe**

Vihapuhe on kiihottamista tiettyä ryhmää vastaan etnisen taustan, uskonnon, sukupuolen tai seksuaalisen suuntautumisen perusteella. Se on Suomessa rikoslaissa kriminalisoitua. Älä tue vihapuhetta jakamalla tai kommentoimalla sitä myönteisesti.

---

### 3.3 Digijalanjälki ja henkilöbrändi

**Digijalanjälki ja rekrytointi**

Työnantajat googlaavat hakijoita. Se on yleinen käytäntö. Ensimmäinen vaikutelma verkossa muodostuu hakutulosten perusteella — ennen kuin olet edes tavannut ketään.

Mieti:
- Mitä löytyy, kun googletat oman nimesi?
- Ovatko some-profiilit sellaiset, että haluaisit työnantajan näkevän ne?
- Onko LinkedIn-profiili ajan tasalla ja ammatillinen?

**Tarkista yksityisyysasetuksesi**

Useimmissa some-palveluissa voit rajoittaa, kuka näkee julkaisusi:
- Instagram: yksityinen tai julkinen tili
- Facebook: kuka näkee julkaisut, kaverilistasi, tilisi tiedot
- LinkedIn: mitä näkyy kirjautumattomalle käyttäjälle

Tarkista nämä asetukset säännöllisesti — palvelut muuttavat niitä usein.

**Henkilöbrändi verkossa**

Henkilöbrändi tarkoittaa, millaisen kuvan annat itsestäsi ammattilaisena. Se rakentuu pidemmän ajan kuluessa:
- Asiantunteva LinkedIn-profiili
- Ammatilliset julkaisut ja kommentit
- Suosittelut ja näyttöportfolio

Positiivinen verkkoidentiteetti ei synny vahingossa — se vaatii tietoista rakentamista.

**Algoritmit ja kuplat**

Some-algoritmit suosivat sisältöä, joka herättää voimakkaita tunteita ja saa käyttäjän viipymään alustalla. Tämä luo ns. **kuplailmiön**: näet yhä enemmän sitä, mitä jo ajattelet — vastakkaiset näkemykset häipyvät näkyvistä.

Ole tietoinen tästä. Hakeudu tietoisesti myös erilaisten näkemysten äärelle.

---

## Luku 4 — Digihyvinvointi

*Tässä luvussa tarkastellaan digitaalisten laitteiden ja sovellusten käytön vaikutuksia terveyteen, hyvinvointiin ja laajemmin yhteiskuntaan.*

---

### 4.1 Fyysinen hyvinvointi digitaalisessa työssä

Pitkät ajat tietokoneen ääressä voivat vaikuttaa fyysiseen terveyteen, jos ergonomiaan ja tauotukseen ei kiinnitetä huomiota.

**Ergonomia**

Ergonomia tarkoittaa työtilan ja -tapojen sovittamista ihmisen fysiikan mukaan. Hyvä ergonomia ehkäisee rasitusvammoja, niska-hartiavaivoja ja silmärasitusta.

| Asia | Ohje |
|---|---|
| **Näyttö** | Silmien korkeudella tai hieman alempana, noin 50–70 cm etäisyydellä |
| **Tuoli** | Jalat lattiatukipinnalla, reisikulma n. 90°, selkä tuettuna |
| **Näppäimistö ja hiiri** | Kädet rentoina, kyynärpäät noin 90° kulmassa |
| **Valaistus** | Vältä heijastuksia näytöltä, tasainen yleisvalaistus |

**Tauotus**

Asiantuntijatyön tauottamiseen suositellaan **20-20-20-sääntöä**:
- Joka 20. minuutti
- Katso 20 jalan (noin 6 metrin) päähän
- 20 sekunnin ajan

Lisäksi suositellaan nousemaan ylös ja liikkumaan vähintään kerran tunnissa.

**Sininen valo ja uni**

Näytöistä tuleva sininen valo häiritsee melatoniinin tuotantoa ja voi vaikeuttaa nukahtamista. Keinoja hallita tätä:
- Ota käyttöön näytön **yötila** (Night Mode / Night Light), joka vähentää sinistä valoa illalla
- Vältä ruutuja 1–2 tuntia ennen nukkumaanmenoa
- Kirkasvalolasit voivat auttaa, jos kärsit väsymyksestä talvella

---

### 4.2 Henkinen hyvinvointi

**Sosiaalisen median vaikutukset**

Sosiaalinen media voi olla yhteydenpitoa, inspiraatiota ja tietoa — mutta sillä on myös dokumentoituja haitallisia vaikutuksia:

- **Vertailu:** Näemme muiden kohohetket, emme heidän arkeaan — epärealistinen vertailukohta
- **FOMO (Fear of Missing Out):** Pelko siitä, että jää jostain paitsi, joka lisää ahdistusta
- **Itsetunto:** Tykkäykset, kommentit ja seuraajamäärät eivät ole mittareita ihmisarvosta
- **Passiivikulutus:** Pitkät selaamisjaksot ilman aktiivista tavoitetta voivat lisätä tyhjyyden tunnetta

Nämä vaikutukset koskevat kaiken ikäisiä.

**Digiriippuvuus**

Digitaalisten palveluiden koukuttavuus on suunniteltu ominaisuus — ei sivutuote. Algoritmit, ilmoitukset, tykkäykset ja loppumaton syöte on suunniteltu pitämään sinut alustalla mahdollisimman kauan.

Merkkejä liiallisesta käytöstä:
- Tuntuu hankalalta olla ilman puhelinta
- Tarkistat puhelimen heti herätessä tai kesken aktiviteettien
- Some-käyttö häiritsee unta, työtä tai ihmissuhteita

Keinoja hallita omaa käyttöä:
- Aseta ruutuaika-rajoitukset puhelimen asetuksista
- Poista ilmoitukset tai rajoita niitä
- Pidä puhelin poissa makuuhuoneesta yöllä
- Aseta tietoiset "puhelinvapaat" ajat (esim. ruokailun aikana)

---

### 4.3 Digitalisaatio ja yhteiskunta

**Datatalous**

Elämme datataloussa: henkilötiedot ovat arvokasta kauppatavaraa. Suuret teknologiayritykset (Google, Meta/Facebook, Amazon) tarjoavat palveluita ilmaiseksi — niiden liiketoimintamalli perustuu käyttäjätietojen keräämiseen ja hyödyntämiseen mainostajille.

> "Jos tuote on ilmainen, sinä olet tuote."

Tämä ei tarkoita, että ilmaisia palveluita ei kannata käyttää — mutta se tarkoittaa, että on hyvä ymmärtää, mitä vastaan niitä saa.

**Algoritmit ja suosittelujärjestelmät**

Algoritmit määrittävät, mitä näet somessa, Netflixissä ja verkossa. Ne on optimoitu pitämään sinut kiinnostuneena — ei välttämättä hyvinvoivana tai hyvin informoituna.

Algoritmit voivat:
- Vahvistaa olemassa olevia uskomuksia (kuplailmiö)
- Ohjata kohti yhä äärimmäisempää sisältöä
- Vaikuttaa mielipiteisiin ja valintoihin tavoin, joita et aina tunnista

**Tekoäly ja automatisaatio työelämässä**

Tekoäly muuttaa työelämää nopeasti. Monet rutiinitehtävät — tietojen syöttäminen, perusraportit, yksinkertaiset analyysit — voidaan jo automatisoida.

Tämä tarkoittaa:
- Osa nykyisistä töistä muuttuu tai häviää
- Uusia töitä syntyy (tekoälyn kehittäminen, tekoälytyökalujen hallinta)
- Monilla aloilla tekoäly muuttuu työn apuvälineeksi, ei korvaavaksi

Parhaiten menestyvät ne, jotka osaavat käyttää tekoälytyökaluja ja joilla on vahva digitaalinen osaaminen.

**Digitaalinen kuilu**

Kaikilla ei ole yhtäläistä pääsyä digitaalisiin palveluihin tai osaamista käyttää niitä. Digitaalinen kuilu syntyy:
- Laitehankinnan esteistä (korkea hinta)
- Verkkoyhteyden puutteesta (syrjäiset alueet)
- Osaamisen puutteesta (erityisesti vanhemmat ikäryhmät)
- Kielimuureista (palvelut englanniksi)

Digitaalinen osaaminen on entistä tärkeämpi kansalaistaito — ja sen puuttuminen johtaa ulkopuolelle jäämiseen.

**Ympäristövaikutukset**

Digitaalinen maailma ei ole "aineeton":
- Datakeskukset kuluttavat valtavasti sähköä ja vettä
- Elektroniikkajäte (e-waste) on yksi nopeimmin kasvavista jätevirroista
- Tekoälymallien kouluttaminen vaatii merkittävän määrän energiaa

Vastuullinen digikäyttäjä ottaa nämä huomioon: pidät laitteesi pidempään, kierrätät vanhat laitteet asianmukaisesti ja tiedostat digitaalisen toimintasi ympäristövaikutuksia.

---

*Kirjan loppu — Osio 3: Kyberturvallisuus ja digihyvinvointi*

---

> **Tekijänoikeus:** Mercuria-kauppaoppilaitos Oy  
> **Versio:** 1.0 (2026)  
> **Lisenssi:** CC BY-NC-SA 4.0 — Vapaasti käytettävissä oppilaitoskäyttöön
