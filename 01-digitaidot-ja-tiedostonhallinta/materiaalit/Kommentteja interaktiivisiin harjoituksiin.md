Tässä Claude-yhteensopiva muistiinpanoversio havainnoistasi:

---

## Digi-kurssin interaktiiviset harjoitukset — havaitut ongelmat ja kehityskohteet

### Yleinen taso (kaikki harjoitukset)

**Suoritusten seuranta puuttuu:**
Yhteenvetonäkymissä (index.html-sivut jokaisessa harjoituskokonaisuudessa) ei tällä hetkellä näy mitään merkintää siitä, onko opiskelija jo suorittanut kyseisen harjoituksen. Toivottu toiminnallisuus: jokaisen harjoituslinkin perään ilmestyy vihreä check-merkki (✅), kun harjoitus on suoritettu. Suoritustieto tulisi tallentaa selainistunnolle (esim. localStorage tai sessionStorage), jotta merkki säilyy sivun päivityksen jälkeen saman istunnon aikana.

**Siirtymä seuraavaan harjoitukseen puuttuu:**
Kun opiskelija saa harjoituksen valmiiksi (success-viesti näkyy), ei ole tapaa siirtyä suoraan seuraavaan harjoitukseen. Toivottu toiminnallisuus: onnistumisen jälkeen ilmestyy painike "Seuraava harjoitus →", joka vie suoraan seuraavaan harjoitukseen kyseisessä osiossa.

---

### Taulukkolaskennan harjoitukset (`harjoitukset-taulukkolaskenta/`)

**Esimerkkikaavan näyttäminen liian monessa solussa:**
Tällä hetkellä placeholder-teksti (esim. `=B2*C2`) näkyy kaikissa syötettävissä soluissa. Toivottu käyttäytyminen: esimerkkikaava näkyy vain ensimmäisessä syötettävässä solussa (esim. D2). Muissa soluissa (D3, D4, ...) placeholder on tyhjä tai neutraali (esim. `=`), jotta opiskelija joutuu soveltamaan kaavaa itse eikä pelkästään kopioimaan esimerkkiä.

**Solun maalaus / alueen valinta puuttuu:**
Taulukkolaskentaharjoituksissa ei ole mahdollisuutta maalata solualuetta hiirellä (kuten Excelissä). Pohdinnan arvoinen lisäominaisuus: voisiko JavaScriptillä toteuttaa hiirellä maalauksen, joka aktivoisi solut Excelin tapaan ja täyttäisi soluviittauksen automaattisesti kaavakenttään?

**Harjoitus 4 — täyttökahva, molemmat sarakkeet yhdellä kertaa:**
Tällä hetkellä kun täyttökahvapainiketta painaa, kopioituvat kaavat sekä C- että D-sarakkeeseen samalla kertaa. Toivottu toiminnallisuus: täyttökahvat tulisi suorittaa erikseen kullekin sarakkeelle (ensin C, sitten D), jotta harjoitus vastaa paremmin todellista Excel-työskentelyä ja opiskelija ymmärtää, että täyttökahva on sarakekohtainen toiminto.

---

### Esitysgrafiikkaharjoitukset (`harjoitukset-esitysgrafiikka/`)

**Harjoitus 1 — tekstikentän aktivoituminen vaatii kaksi klikkausta:**
Kun opiskelija klikkaa tekstikenttää ensimmäisen kerran, kenttä ei aktivoidu kirjoitustilaan välittömästi. Vaaditaan toinen klikkaus ennen kuin kirjoittaminen onnistuu. Bugi joka pitää korjata: ensimmäisen klikkauksen tulisi suoraan aktivoida `contenteditable`-kenttä ja asettaa kursorin tekstikenttään.

**Harjoitus 1 — tehtävä etenee liian aikaisin:**
Validointi hyväksyy tehtävän suoritetuksi heti kun opiskelija alkaa kirjoittaa, vaikka vaadittu teksti ei ole vielä oikein tai valmis. Esimerkki: tehtävä vaatii tiettyä otsikkotekstiä, mutta tehtävä merkitään valmiiksi heti ensimmäisen kirjaimen jälkeen, jolloin ohjeteksti katoaa eikä opiskelija enää tiedä mitä kentän pitäisi sisältää. Korjattava: validointi tulee suorittaa vasta kun käyttäjä on lopettanut kirjoittamisen (esim. `blur`-tapahtumassa tai riittävän pitkän debounce-viiveen jälkeen), ja tehtävän vaatimus tulee jäädä näkyviin koko kirjoittamisen ajaksi.

**Harjoitus 2 — placeholder-teksti katoaa kirjoittaessa (dia 2):**
Kun opiskelija alkaa kirjoittaa tekstikenttään, alkuperäinen malliteksti (joka kertoo mitä kenttään pitää kirjoittaa) katoaa kokonaan. Koska kentässä oli jo ohjeteksti, opiskelija ei enää muista mitä kyseiseen kohtaan piti kirjoittaa. Korjattava: tehtäväohjeen tulee pysyä näkyvissä erillisessä elementissä (task-palkissa tai tooltip-tyylisessä ohjelaatikossa), ei itse sisältökentässä.

**Harjoitus 2 — dia 5 on puutteellinen:**
Viidennessä diassa ei ole selkeää tehtävänantoa eikä käy ilmi mitä opiskelijan pitää tehdä. Tehtävä on lisättävä tai korjattava siten, että sillä on selkeä ohje ja validointi.

---

### Tekstinkäsittelyharjoitukset (`harjoitukset-tekstinkasittely/`)

**Harjoitus 3 — virheellinen oppilaitoksen nimi:**
Harjoituksen 3 tehtävätekstissä esiintyy muoto "Merkurian", vaikka oikea nimi on "Mercuria". Korjattava kaikissa esiintymissä harjoituksen tekstisisällössä.

**Harjoitus 4 (sarkain ja tasaukset) — oikea suoritus ei hyväksy:**
Tehtävässä 3/3, jossa opiskelija kirjoittaa taulukon Tab-näppäintä käyttäen, validointi ei hyväksy oikeaa lopputulosta vaikka tehtävä on tehty ohjeiden mukaan. Validointilogiikka on tarkistettava ja korjattava.

**Ehdotettu uusi harjoitus — tyylien luominen ja soveltaminen:**
Harjoitus 2:een (tyylit ja otsikot) tai uudeksi erilliseksi harjoitukseksi toivotaan tehtävää, jossa opiskelija luo itse uuden tekstintyylin otsikolle ja leipätekstille, ja soveltaa näitä tyylejä kirjoittamalla yhden kappaleen mittaisen tekstin. Tämä syventää harjoituksen 2 otsikkotyylioppimista käytännön soveltamisen suuntaan.
