# Kirja: Digitaidot ja tiedostonhallinta

**Moodle-kirja-aktiviteetti — Osio 1**  
**Kurssi:** YTO1-DIGI-P — Toiminta digitaalisessa ympäristössä  
**Osaamistavoitteet:** 5, 6, 7, 9, 10

---

> **Kirjan rakenne (Moodle-luvut ja aliluvut)**
>
> 1. Tiedostonhallinta
>    - 1.1 Miksi tiedostonhallinta on tärkeää?
>    - 1.2 Kansiorakenteet
>    - 1.3 Tiedostojen nimeämiskäytännöt
>    - 1.4 Tiedostomuodot
> 2. Pilvipalvelut ja tiedostojen jakaminen
>    - 2.1 OneDrive — peruskäyttö
>    - 2.2 Tiedostojen ja kansioiden jakaminen
>    - 2.3 Yhteismuokkaus
> 3. Excel — taulukkolaskenta
>    - 3.1 Excel-perusteet
>    - 3.2 Kaavat ja funktiot
>    - 3.3 Kaaviot
> 4. Word — tekstinkäsittely
>    - 4.1 Word-perusteet
>    - 4.2 Asiakirjan rakenne ja muotoilu
>    - 4.3 Taulukot ja kuvat
> 5. PowerPoint — esitysgrafiikka
>    - 5.1 PowerPoint-perusteet
>    - 5.2 Visuaalinen suunnittelu
>    - 5.3 Esittäminen

---

## Luku 1 — Tiedostonhallinta

*Tässä luvussa opit järjestämään tiedostosi ja kansiosi niin, että löydät etsimäsi aina helposti — nyt ja tulevaisuudessa.*

---

### 1.1 Miksi tiedostonhallinta on tärkeää?

Tiedostonhallinta tarkoittaa tapaa, jolla tallennat, nimeät ja järjestät digitaaliset tiedostosi. Se saattaa tuntua arkiselta asialta, mutta käytännössä huono tiedostonhallinta aiheuttaa merkittäviä ongelmia niin opiskelussa kuin työelämässäkin.

**Mitä tapahtuu, kun tiedostonhallinta ei toimi?**

- Tiedostot katoavat tai ne löytyvät vasta pitkän etsinnän jälkeen
- Samasta tiedostosta on useita versioita, ja on epäselvää, mikä on viimeisin
- Työtä tehdään vahingossa tuplakappaleen päälle
- Muille lähetetään väärä tai vanhentunut versio
- Tietokoneen vaihtuessa tiedostot eivät siirry mukana, koska ne on tallennettu paikallisesti ilman varmuuskopiointia

Nämä tilanteet ovat erittäin yleisiä — ja täysin vältettävissä, kun tiedostonhallinnasta tekee tavan.

**Tiedostonhallinta työelämässä**

Liiketoiminnan arjessa käsitellään jatkuvasti tarjouksia, sopimuksia, raportteja, budjetteja ja asiakastietoja. Kun nämä ovat järjestyksessä, työ sujuu. Epäjärjestyksessä pienikin asia — esimerkiksi oikean version löytäminen ennen palaveria — voi viedä aikaa ja aiheuttaa hämmennystä.

Hyvä tiedostonhallinta ei vaadi erityistä teknistä osaamista. Se vaatii johdonmukaisia tapoja, joita noudatetaan joka kerta.

---

### 1.2 Kansiorakenteet

Kansiorakenne on tapa järjestää tiedostot hierarkkisesti — kuten fyysisen arkistokaapin kansiomappi, mutta digitaalisessa muodossa.

**Hyvän kansiorakenteen periaatteet**

1. **Looginen jako** — Jaa kansiot aiheen, projektin tai ajankohdan mukaan
2. **Ei liian syvää rakennetta** — 3–4 tasoa on yleensä riittävä; syvempi rakenne hankaloittaa navigointia
3. **Johdonmukaisuus** — Käytä samaa logiikkaa joka paikassa

**Esimerkki: opiskelijan kansiorakenne**

```
OneDrive
└── Mercuria
    ├── YTO1-DIGI-P
    │   ├── Harjoitukset
    │   ├── Palautukset
    │   └── Materiaalit
    ├── Muut-kurssit
    └── Itsenäinen-suorittaminen
```

**Esimerkki: yrityksen kansiorakenne**

```
Yritys Oy – Jaettu asiakirjahakemisto
├── Asiakkaat
│   ├── Asiakas-A
│   └── Asiakas-B
├── Projektit
│   ├── 2026-Kampanja-kesä
│   └── 2026-Verkkosivuuudistus
├── Talous
│   ├── Budjetit
│   └── Laskut
└── Hallinto
    ├── Sopimukset
    └── Henkilöstö
```

**Käytännön vinkit**

- Luo kansiorakenne ennen kuin alat tallentaa tiedostoja — rakenteen muuttaminen jälkikäteen on työläämpää
- Vältä "Sekalaista"- tai "Muuta"-kansioita: ne täyttyvät nopeasti ja muuttuvat kaaokseksi
- Kun projekti päättyy, siirrä sen kansio arkistoon (esim. `_Arkisto`-kansioon) — alkuun lisätty alaviiva pitää sen aakkosissa alimpana

---

### 1.3 Tiedostojen nimeämiskäytännöt

Tiedoston nimi on sen tärkein hakutunniste. Hyvä nimi kertoo heti, mitä tiedosto sisältää, kenelle se on tarkoitettu ja milloin se on tehty — ilman, että tiedostoa tarvitsee avata.

**Selkeän nimen elementit**

| Elementti | Esimerkki |
|---|---|
| Projekti tai aihe | `myyntiraportti` |
| Päivämäärä (VVVV-KK-PP) | `2026-04-15` |
| Versio (tarvittaessa) | `v2` |
| Tekijä (tarvittaessa) | `lehtinen` |

**Hyvä nimi:** `2026-04-15_myyntiraportti_v2.xlsx`  
**Huono nimi:** `Raportti uusin TÄMÄ.xlsx`

**Miksi päivämäärä muodossa VVVV-KK-PP?**

Kun päivämäärä kirjoitetaan vuosi edellä, tiedostot järjestyvät automaattisesti aikajärjestykseen aakkosjärjestystä käytettäessä. Muoto `15.4.2026` tai `15-04-2026` ei toimi yhtä luotettavasti.

**Merkit, joita EI käytetä tiedostonimissä**

Vältä seuraavia merkkejä, sillä ne voivat aiheuttaa ongelmia erityisesti verkkoyhteyksien ja eri käyttöjärjestelmien välillä:

- Välilyönnit (käytä sen sijaan yhdysviivaa `-` tai alaviivaa `_`)
- Ä, Ö, Å (erityisesti tiedostoissa, jotka siirtyvät eri järjestelmiin)
- Erikoismerkit: `/ \ : * ? " < > |`

**Versionhallinta nimeämisellä**

Kun tiedostosta syntyy useita versioita, merkitse versio nimeen:
- `tarjous_v1.docx` → `tarjous_v2.docx` → `tarjous_v3_hyväksytty.docx`

Näin vältyt tilanteelta, jossa on useita tiedostoja nimillä "tarjous lopullinen", "tarjous LOPULLINEN2" tai "tarjous TÄMÄ ON SE".

---

### 1.4 Tiedostomuodot

Tiedostomuoto määrittää, miten tiedoston sisältö on tallennettu. Tiedostomuodon tunnistaa tiedostopäätteestä — nimessä pisteen jälkeen tulevasta osasta.

**Yleisimmät tiedostomuodot liiketoiminnassa**

| Pääte | Ohjelma | Käyttötarkoitus |
|---|---|---|
| `.docx` | Microsoft Word | Tekstiasiakirjat, raportit, muistiot |
| `.xlsx` | Microsoft Excel | Taulukot, budjetit, laskelmat |
| `.pptx` | Microsoft PowerPoint | Diaesitykset |
| `.pdf` | Acrobat Reader / selain | Jakelu, lomakkeet, viralliset asiakirjat |
| `.jpg` / `.png` | Kuvankäsittely, selain | Valokuvat ja grafiikat |
| `.mp4` | Videotoistin | Videot |
| `.zip` | Pakkausohjelma | Useamman tiedoston pakkaaminen yhdeksi |

**Milloin käyttää PDF:ää?**

PDF (Portable Document Format) on tarkoitettu asiakirjoihin, joita et halua muokattavan ja jotka haluat näyttävän samalta kaikilla laitteilla ja käyttöjärjestelmillä. Käytä PDF:ää, kun:
- Lähetät asiakirjan ulkopuoliselle henkilölle tai viranomaiselle
- Palautat valmiin tehtävän
- Haluat varmistaa, että asettelu pysyy samana eri tietokoneilla

Pidä alkuperäinen `.docx` tai `.xlsx` tallessa muokkaamista varten — PDF ei yleensä ole helposti muokattavissa.

---

## Luku 2 — Pilvipalvelut ja tiedostojen jakaminen

*Tässä luvussa opit käyttämään OneDrivea tiedostojen tallentamiseen ja jakamiseen sekä muokkaamaan tiedostoja yhdessä muiden kanssa.*

---

### 2.1 OneDrive — peruskäyttö

OneDrive on Microsoftin pilvipalvelu, joka on osa Microsoft 365 -pakettia. Se toimii sekä verkkoselaimen kautta (onedrive.com) että tietokoneelle asennettavana ohjelmana, joka synkronoi tiedostot automaattisesti.

**Miksi pilvipalvelu on hyödyllinen?**

- **Saatavuus:** Tiedostot ovat käytettävissä millä tahansa laitteella — koulun koneelta, kotikoneelta tai puhelimelta
- **Varmuuskopio:** Tiedostot eivät häviä, vaikka tietokone hajoaisi tai katoaisi
- **Jakaminen:** Tiedostoja voi jakaa helposti muille ilman sähköpostin liitetiedostoja
- **Yhteistyö:** Useampi henkilö voi muokata samaa tiedostoa samanaikaisesti

**OneDriven peruskäyttö**

1. **Kirjautuminen:** Käytä oppilaitoksen Microsoft 365 -tunnuksia (etunimi.sukunimi@mercuria.fi)
2. **Tiedoston tallentaminen:** Tallenna Word, Excel ja PowerPoint -tiedostot suoraan OneDriveen (Tiedosto → Tallenna → OneDrive)
3. **Synkronointi:** Kun OneDrive-ohjelma on asennettu tietokoneelle, OneDrive-kansio näkyy Resurssienhallinnassa normaalina kansiona. Muutokset synkronoituvat automaattisesti pilveen.

**Paikallinen tallennus vs. pilvi**

| | Paikallinen (C-asema) | OneDrive (pilvi) |
|---|---|---|
| Saatavuus | Vain sillä koneella | Kaikilla laitteilla |
| Varmuuskopio | Ei automaattista | Automaattinen |
| Jakaminen | Ei suoraa jakamista | Helppo jakaa |
| Tallennustila | Riippuu koneesta | 1 TB (Microsoft 365) |

Koulun oppilaskoneilta tallennetut tiedostot voivat kadota, jos tallennuspaikkana on paikallinen asema eikä OneDrive. Tallenna tärkeät tiedostot aina OneDriveen.

---

### 2.2 Tiedostojen ja kansioiden jakaminen

OneDrivessa voit jakaa tiedostoja ja kansioita muille joko linkin kautta tai kutsumalla heidät suoraan.

**Jakolinkin luominen**

1. Napsauta tiedostoa tai kansiota OneDrivessa hiiren oikealla painikkeella
2. Valitse **Jaa** tai **Kopioi linkki**
3. Valitse käyttöoikeus:
   - **Katselu:** vastaanottaja voi lukea tiedoston, mutta ei muokata
   - **Muokkaus:** vastaanottaja voi muokata tiedostoa

**Käyttöoikeustasot**

| Oikeus | Käyttötilanne |
|---|---|
| Katselu | Jaat valmiin raportin tai esityksen |
| Muokkaus | Teette ryhmätyötä tai kolleega täydentää tiedostoa |

**Jakaminen tietylle henkilölle**

Jos haluat jakaa vain tietylle henkilölle, kirjoita heidän sähköpostiosoitteensa jakoikkunaan. Tämä on turvallisempaa kuin avoin linkki, koska vain kyseinen henkilö pääsee tiedostoon.

**Jaon peruminen**

- Avaa tiedoston tai kansion tiedot → Hallitse käyttöoikeuksia → Poista käyttäjä tai poista linkki käytöstä

**Tietoturva jakamisessa**

Ennen jakamista mieti:
- Tarvitseeko vastaanottaja muokkausoikeuden vai riittääkö katseluoikeus?
- Onko tiedostossa arkaluonteisia tietoja (esim. henkilötietoja tai yrityksen luottamuksellisia tietoja)?
- Avoin "kaikille linkin saaneille" -jako sopii vain täysin julkiselle materiaalille

---

### 2.3 Yhteismuokkaus

Yhteismuokkaus (co-authoring) tarkoittaa, että kaksi tai useampi henkilö voi muokata samaa tiedostoa samanaikaisesti reaaliajassa. Tämä on yksi pilvipalveluiden suurimmista eduista ryhmätyössä.

**Miten yhteismuokkaus toimii?**

1. Tiedosto on tallennettu OneDriveen
2. Tiedosto on jaettu muille muokkausoikeudella
3. Kaikki avaavat tiedoston — muutokset näkyvät reaaliajassa kaikille

Jokaisen käyttäjän muutokset näkyvät eri värillä, ja näet kursorin liikeet reaaliajassa. Word, Excel ja PowerPoint tukevat kaikki yhteismuokkausta.

**Versiohistoria**

OneDrive tallentaa automaattisesti kaikki versiot. Jos joku tekee vahingossa muutoksen, jonka haluaa peruuttaa:

1. Avaa tiedosto OneDrivessa verkkoselaimen kautta
2. Napsauta tiedoston nimeä → **Versiohistoria**
3. Valitse aiempi versio ja palauta se

Versiohistoria säästää tilanteessa, jossa "joku vahingossa poisti tärkeän osan" — se on käytännöllinen turvaverkko.

**Yhteismuokkauksen hyvät käytännöt**

- Sopikaa etukäteen, kuka muokkaa mitäkin osiota — näin vältytään päällekkäiseltä työltä
- Käyttäkää kommentointiominaisuutta, kun haluatte kommentoida toisen tekemisiä muokkaamatta suoraan tekstiä
- Sulkekaa tiedosto, kun ette enää muokkaa sitä — näin muut näkevät tilanteen oikein

> 📚 **Lisätietoja — OneDrive ja Microsoft 365**
>
> - [OneDrive-ohjeet](https://support.microsoft.com/fi-fi/onedrive) — Microsoftin virallinen OneDrive-tukisivusto (suomeksi)
> - [Microsoft 365 -koulutus](https://support.microsoft.com/fi-fi/training) — Ilmaiset videokoulutukset kaikille Microsoft 365 -sovelluksille

---

## Luku 3 — Excel — taulukkolaskenta

*Tässä luvussa opit Excelin perusteet: taulukoiden luomisen ja muotoilun, kaavojen ja funktioiden käytön sekä kaavioiden tekemisen.*

---

### 3.1 Excel-perusteet

Excel on Microsoftin taulukkolaskentaohjelma. Se on yksi eniten käytetyistä ohjelmista liiketoiminnassa — budjeteista ja myyntiraporteista henkilöstöhallintaan ja asiakaslistoihin.

> 💡 **Vinkki — ohje suoraan ohjelmasta:** Paina **F1** missä tahansa kohdassa Exceliä (tai muuta Office-ohjelmaa) avataksesi Microsoftin virallisen ohjesivuston. Ohje on aina ajantasainen ohjelman version mukaan ja saatavilla myös suomeksi.

**Excelin rakenne**

Excel-tiedosto on **työkirja** (workbook), joka sisältää yhden tai useamman **taulukon** (sheet). Taulukko koostuu **soluista**, jotka järjestyvät **riveihin** (numerot 1, 2, 3…) ja **sarakkeisiin** (kirjaimet A, B, C…).

Solun osoite muodostuu sarakekirjaimesta ja rvinumerosta: esimerkiksi **B3** tarkoittaa sarakkeen B, rivin 3 solua.

**Tietojen syöttäminen**

- Klikkaa solua ja kirjoita
- Siirry seuraavaan soluun **Enter**-näppäimellä (alas) tai **Tab**-näppäimellä (oikealle)
- Voit muokata solun sisältöä kaksoisklikkaamalla tai **F2**-näppäimellä

**Solujen muotoilu**

Muotoilu ei vaikuta laskutoimituksiin — se vaikuttaa ainoastaan siihen, miten luku näytetään:

| Muotoilu | Esimerkki |
|---|---|
| Numero | 1500,00 |
| Valuutta | 1 500,00 € |
| Prosentti | 15 % |
| Päivämäärä | 15.4.2026 |

Muotoile solut: valitse solut → hiiren oikea tai **Aloitus**-välilehti → **Lukumuoto**.

**Sarakkeen leveyden säätäminen**

Jos solussa näkyy `#####`, sarake on liian kapea. Kaksoisnapsauta sarakkeen otsikon oikeaa reunaa — sarake levenee automaattisesti sisällön mukaan.

---

### 3.2 Kaavat ja funktiot

Kaavojen avulla Excel tekee laskutoimitukset automaattisesti. Tämä on Excelin tärkein ominaisuus: muuta yhtä lukua, ja kaikki siihen viittaavat laskelmat päivittyvät välittömästi.

**Kaavan rakenne**

Jokainen kaava alkaa yhtäläisyysmerkillä `=`. Ilman sitä Excel käsittelee syötetyn tekstin tavallisena tekstinä.

```
=B3+B4        → Laskee solujen B3 ja B4 summan
=B3*1,24      → Kertoo solun B3 arvon luvulla 1,24 (esim. ALV-laskenta)
=B7-B8        → Vähentää solun B8 solusta B7
```

**Soluviittaukset**

Kaavassa viitataan soluihin niiden osoitteella. Tämä on tärkeää: älä kirjoita lukua suoraan kaavaan, vaan viittaa soluun.

- **Suhteellinen viittaus** (esim. `B3`): Kun kopioit kaavan, viittaus siirtyy suhteessa uuteen paikkaan
- **Absoluuttinen viittaus** (esim. `$B$3`): Viittaus pysyy kiinteänä, vaikka kaavan kopioi muualle. Käytä `$`-merkkiä arvoon, joka ei saa muuttua (esim. ALV-prosentti tai kiinteä kustannus)

**Tärkeimmät funktiot**

| Funktio | Käyttötarkoitus | Esimerkki |
|---|---|---|
| `SUMMA` | Lukujen yhteenlasku | `=SUMMA(B3:B10)` |
| `KESKIARVO` | Keskiarvon laskeminen | `=KESKIARVO(B3:B10)` |
| `MIN` | Pienin arvo | `=MIN(B3:B10)` |
| `MAX` | Suurin arvo | `=MAX(B3:B10)` |
| `LASKE` | Kuinka monta lukua alueella | `=LASKE(B3:B10)` |
| `JOS` | Ehdon mukainen arvo | `=JOS(B3>100;"Yli 100";"Alle 100")` |

**Alueen merkitseminen**

`B3:B10` tarkoittaa soluja B3, B4, B5, B6, B7, B8, B9 ja B10 — kaksoispiste luetaan "B3:sta B10:een".

**JOS-funktio**

JOS-funktio on erittäin hyödyllinen, kun haluat Excelin tekevän erilaisen ratkaisun riippuen jostakin ehdosta:

```
=JOS(B3>=5000;"Budjetissa";"Ylittää budjetin")
```

Tässä: jos solun B3 arvo on 5 000 tai enemmän, solu näyttää "Budjetissa" — muuten "Ylittää budjetin".

---

### 3.3 Kaaviot

Kaavio havainnollistaa numeroita visuaalisesti. Hyvin tehty kaavio kertoo saman asian kuin taulukko täynnä lukuja — mutta paljon nopeammin.

**Kaavion luominen**

1. Valitse tiedot, joista haluat tehdä kaavion (sisällytä myös otsikkorivit ja -sarakkeet)
2. Siirry **Lisää**-välilehdelle → **Kaaviot**
3. Valitse kaaviotyyppi

**Milloin mitäkin kaaviotyyppiä?**

| Kaaviotyyppi | Käyttötilanne |
|---|---|
| **Pylväskaavio** | Vertailee arvoja eri kategorioiden välillä (esim. myynti kuukausittain) |
| **Viivakaavio** | Näyttää muutoksen ajan kuluessa (esim. myynnin kehitys vuoden aikana) |
| **Ympyräkaavio** | Näyttää osien suhteet kokonaisuuteen (esim. kuluerien osuudet) |
| **Palkkikaavio** | Kuten pylväskaavio, mutta vaakasuuntainen — toimii hyvin pitkillä nimillä |

**Kaavion muotoilu**

- **Otsikko:** Lisää aina kuvaava otsikko — kaavion pitäisi toimia myös ilman ympäröivää tekstiä
- **Akselimerkinnät:** Varmista, että akseleilla on selkeät otsikot (esim. "€" tai "kpl")
- **Selite:** Tarkista, että selite kertoo selkeästi, mitä kukin väri tai viiva tarkoittaa
- **Yksinkertaisuus:** Vältä turhia efektejä ja 3D-kaavioita — ne vaikeuttavat usein lukemista

**Kaavion siirtäminen PowerPointiin**

Excelin kaavion saa siirrettyä PowerPointiin:
- Kopioi kaavio Excelistä → Liitä PowerPointiin
- Valitse liittämisvaihtoehdoksi **"Säilytä lähteen muotoilu ja linkitä tiedot"**, jos haluat, että kaavio päivittyy automaattisesti Excel-tiedoston muuttuessa

> 📚 **Lisätietoja — Excel**
>
> - [Excelin ohjeet ja oppaat](https://support.microsoft.com/fi-fi/excel) — Microsoftin virallinen Excel-tukisivusto (suomeksi)
> - [Excel-videokoulutus](https://support.microsoft.com/fi-fi/office/excel-video-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb) — Ilmaiset opetusvideot aloittelijoista edistyneille
> - [Excel-funktioiden hakemisto](https://support.microsoft.com/fi-fi/office/excel-functions-alphabetical-b3944572-255d-4efb-bb96-c6d90033e188) — Kaikkien funktioiden selitykset aakkosjärjestyksessä

---

## Luku 4 — Word — tekstinkäsittely

*Tässä luvussa opit tuottamaan ammattimaisia asiakirjoja Wordilla: muotoilemaan tekstiä, rakentamaan asiakirjan oikein ja lisäämään taulukoita ja kuvia.*

---

### 4.1 Word-perusteet

Word on Microsoftin tekstinkäsittelyohjelma. Sitä käytetään liiketoiminnassa esimerkiksi raporttien, muistioiden, sopimusten, tarjousten ja kirjeiden kirjoittamiseen.

> 💡 **Vinkki — ohje suoraan ohjelmasta:** Paina **F1** avataksesi Wordin virallisen ohjesivuston. Ohje päivittyy automaattisesti ohjelman version mukaan ja on saatavilla suomeksi.

**Tekstin perustoiminnot**

| Toiminto | Näppäinyhdistelmä |
|---|---|
| Kopioi | Ctrl+C |
| Leikkaa | Ctrl+X |
| Liitä | Ctrl+V |
| Kumoa | Ctrl+Z |
| Tee uudelleen | Ctrl+Y |
| Tallenna | Ctrl+S |
| Tulosta | Ctrl+P |
| Valitse kaikki | Ctrl+A |
| Lihavointi | Ctrl+B |
| Kursiivi | Ctrl+I |
| Alleviivaus | Ctrl+U |
| **Ohje** | **F1** |

Pikanäppäinten oppiminen on sen arvoista — ne nopeuttavat työskentelyä merkittävästi, kun niistä tulee automaattinen tapa.

**Tekstin muotoilu**

Muotoile tekstiä **Aloitus**-välilehdellä:
- **Fontti ja koko:** Käytä selkeää fonttia (esim. Calibri, Arial tai Times New Roman). Leipätekstin koko on tyypillisesti 11–12 pt.
- **Lihavointi, kursiivi, alleviivaus:** Käytä harkiten — kaiken korostaminen tarkoittaa, ettei mikään erotu
- **Kappalemuotoilu:** Tasaus, sisennys, rivinväli

**Tärkeä periaate: älä käytä välilyöntejä tai Enter-näppäintä muotoiluun**

Yksi yleisimmistä virheistä on muotoilla asiakirja lisäämällä ylimääräisiä rivinvaihtoja tai välilyöntejä. Tämä johtaa ongelmiin, kun tekstiä muokataan myöhemmin.

- **Kappaleen sisennys:** Käytä kappalemuotoilua, ei välilyöntejä
- **Tyhjä tila kappaleiden välissä:** Käytä kappalemuotoilun "Välistys ennen/jälkeen" -asetusta, ei ylimääräisiä Enter-painalluksia
- **Sivunvaihto:** Käytä **Ctrl+Enter** (lisää sivunvaihdon), älä ylimääräisiä Enter-painalluksia

---

### 4.2 Asiakirjan rakenne ja muotoilu

Ammattimainen asiakirja ei ole vain muotoiltua tekstiä — sillä on selkeä rakenne, joka helpottaa lukemista ja navigointia.

**Tyylit — tehokkain muotoilutyökalu**

Wordissa **tyylit** (Styles) ovat valmiiksi määriteltyjä muotoiluja. Tärkeimmät:
- **Normaali** — Asiakirjan perusteksti
- **Otsikko 1** — Pääotsikko (luku 1, luku 2…)
- **Otsikko 2** — Alaotsikko (1.1, 1.2…)
- **Otsikko 3** — Taso 3 (1.1.1…)

Miksi tyylit ovat tärkeitä?
- **Yhtenäisyys:** Kaikki otsikot näyttävät samanlaisilta ilman manuaalista muotoilua
- **Sisällysluettelo:** Word luo automaattisen sisällysluettelon tyylejä käyttäen
- **Päivittäminen:** Muuta yhden tyylin muotoilua, ja muutos päivittyy kaikkiin saman tyylin kappaleisiin

**Sivuasetukset**

**Asettelu**-välilehdellä:
- **Marginaalit:** Oletusmarginaalit (2,5 cm) sopivat useimpiin asiakirjoihin
- **Suunta:** Pysty (muistiot, raportit) tai vaaka (laajat taulukot, esitykset)
- **Sivukoko:** A4 on standardi

**Ylä- ja alatunnisteet**

Ylätunnisteessa on tyypillisesti asiakirjan nimi tai organisaation nimi. Alatunnisteessa ovat sivunumerot.

Lisää sivunumerot: **Lisää** → **Sivunumero**

**Sisällysluettelo**

Kun olet käyttänyt Otsikko-tyylejä, voit luoda automaattisen sisällysluettelon:
1. Aseta kursori haluamaasi kohtaan (yleensä asiakirjan alkuun, kansilehden jälkeen)
2. **Viittaukset** → **Sisällysluettelo** → Valitse tyyli

Kun muokkaat asiakirjaa, päivitä sisällysluettelo: napsauta sitä → **Päivitä kenttä**.

---

### 4.3 Taulukot ja kuvat

**Taulukon lisääminen**

Taulukko järjestää tietoja riveihin ja sarakkeisiin selkeästi.

1. **Lisää** → **Taulukko** → Valitse koko
2. Syötä tiedot soluihin — Tab-näppäin siirtyy seuraavaan soluun
3. Muotoile taulukko: valitse taulukko → **Taulukon rakenne** → Valitse tyyli

**Taulukon muotoilun periaatteet**
- Otsikkorivi: lihavoitu ja erottuva tausta
- Rivinvuorottelu: vaihtuvat taustavärit helpottavat lukemista
- Teksti vasemmalle tasattuna, luvut oikealle tasattuna

**Kuvan lisääminen**

1. **Lisää** → **Kuvat** → Valitse tiedosto tai käytä Bing-kuvahakua
2. Klikkaa kuvaa ja valitse tekstin rivittämistyyli:
   - **Neliömäinen** tai **Tiukka** — Teksti ympäröi kuvaa
   - **Edessä tekstiä** / **Takana tekstiä** — Kuva menee tekstin päälle tai alle
   - **Rivissä tekstin kanssa** (oletus) — Kuva käyttäytyy kuten merkki

**Kuvan tekijänoikeudet**

Muista: kaikki verkosta löytyvät kuvat eivät ole vapaasti käytettävissä. Käytä tekijänoikeusvapaita kuvia (Unsplash, Pixabay, Pexels) tai ilmoita kuvan lähde.

> 📚 **Lisätietoja — Word**
>
> - [Wordin ohjeet ja oppaat](https://support.microsoft.com/fi-fi/word) — Microsoftin virallinen Word-tukisivusto (suomeksi)
> - [Word-videokoulutus](https://support.microsoft.com/fi-fi/office/word-for-windows-training-7bcd85e6-2c3d-4c3c-a2a5-5ed8847eae73) — Ilmaiset opetusvideot aloittelijoista edistyneille

---

## Luku 5 — PowerPoint — esitysgrafiikka

*Tässä luvussa opit tekemään selkeän ja ammattimaisen diaesityksen PowerPointilla sekä esittämään sen yleisölle.*

---

### 5.1 PowerPoint-perusteet

PowerPoint on Microsoftin esitysgrafiikkaohjelma. Sitä käytetään tiedon esittämiseen visuaalisesti — kokouksissa, koulutuksissa, myyntitilanteissa ja konferensseissa.

> 💡 **Vinkki — ohje suoraan ohjelmasta:** Paina **F1** avataksesi PowerPointin virallisen ohjesivuston. Ohje päivittyy automaattisesti ohjelman version mukaan ja on saatavilla suomeksi.

**PowerPointin perusnäkymä**

- **Diapaneeli** (vasen reuna): Näyttää kaikki diat pienoiskuvina — järjestä dioja vetämällä
- **Dianäkymä** (keskellä): Dian muokkausnäkymä
- **Muistiinpanot** (alalaitassa): Esittäjän muistiinpanot, joita yleisö ei näe

**Dian lisääminen ja poistaminen**

- Lisää dia: **Aloitus** → **Uusi dia** tai napsauta diapaneelia hiiren oikealla → **Uusi dia**
- Poista dia: Valitse dia → Delete-näppäin
- Järjestä dioja: Vedä diapaneelissa haluamaasi järjestykseen

**Teemat ja asettelut**

Teema määrittää diojen visuaalisen ulkoasun: värimaailman, fontit ja taustakuvat.

- **Rakenne**-välilehdellä voit valita valmiin teeman
- Asettelu (layout) määrittää dian rakenteen: otsikkodia, otsikko + sisältö, tyhjä dia jne.

Käytä oppilaitoksen tai yrityksen virallista pohjaa, jos sellainen on käytettävissä.

---

### 5.2 Visuaalinen suunnittelu

Hyvä diaesitys ei ole tekstin kopiointi ruudulle — se on visuaalinen tuki puhutulle esitykselle.

**"Vähemmän on enemmän" — tekstin määrä**

Yleisin virhe diaesityksissä on liikaa tekstiä. Muista:
- Dia tukee puhumaasi — se ei ole kalvo, joka luetaan ääneen
- Maksimi: 5–6 luetteloriviä per dia, korkeintaan 6–7 sanaa per rivi
- Suosi avainsanoja ja lyhyitä lauseita — ei kokonaisia kappaleita

**Visuaalinen hierarkia**

Katse ohjautuu automaattisesti suurimpaan ja tummimpaan elementtiin. Hyödynnä tätä:
- Otsikko on suurin ja selkein
- Tärkein tieto on visuaalisesti korostettu
- Vähemmän tärkeä sisältö on pienempää tai vaaleampaa

**Kuvat ja grafiikat**

- Käytä laadukkaita kuvia — epätarkat tai pikselöityneet kuvat näyttävät epäammattimaiselta
- Kuva voi korvata tekstin: yksi havainnollinen kuva kertoo enemmän kuin luettelomerkkilista
- SmartArt on hyvä prosessien, hierarkioiden ja suhteiden esittämiseen

**Värit ja fontit**

- Käytä enintään 2–3 väriä esityksessä
- Kontrasti on tärkeää: tumma teksti vaalealla taustalla tai päinvastoin
- Käytä enintään 2 fonttia: yksi otsikoille, yksi leipätekstille
- Fonttikoko: otsikoille vähintään 28–32 pt, tekstille vähintään 18–20 pt

**Animaatiot — käytä harkiten**

Animaatiot voivat olla hyödyllisiä, kun haluat paljastaa sisällön vaiheistettuna. Useimmiten kuitenkin:
- Yksinkertaiset "Häivytä sisään" tai "Ilmesty" -animaatiot riittävät
- Vältä vilkkaita tai ärsyttäviä animaatioita — ne vievät huomion asiasta
- Siirtymät diojen välillä: yksinkertainen **Häivytä** tai ei siirtymää lainkaan on paras valinta

---

### 5.3 Esittäminen

Hyvä diaesitys on vain puolet asiasta — toinen puoli on esittäminen.

**Ennen esitystä**

- Harjoittele ääneen — kerro, mitä aiot sanoa kunkin dian kohdalla
- Tarkista tekniikka etukäteen: toimiiko projektori, onko tiedosto oikeassa paikassa?
- Tallenna esitys myös PDF-muotoon varmuuden vuoksi — PDF avautuu ilman PowerPointia

**Esittäjän näkymä (Presenter View)**

Esittäjän näkymässä näet samaan aikaan:
- Nykyisen dian
- Seuraavan dian
- Omat muistiinpanosi
- Kuluneen ajan

Ota esittäjän näkymä käyttöön: **Diaesitys** → **Esittäjän näkymä** tai **Alt+F5**.

**Esityksen nauhoittaminen**

Jos esitys täytyy palauttaa nauhoitettuna (esim. etäopiskelu):

1. **Diaesitys** → **Nauhoita diaesitys**
2. Nauhoita ääni ja/tai video dioittain
3. Tallenna tiedosto tai vie se videona (**Tiedosto** → **Vie** → **Luo video**)

**Hyvän esittäjän periaatteet**

- Puhu yleisölle, älä kuvaruudulle tai projektoriin
- Käytä dioja muistilistana — älä lue niitä sanasta sanaan
- Pidä sopiva tahti: älä kiiruhda, mutta älä myöskään pitkittele
- Valmistaudu kysymyksiin — hyvä esittäjä osaa vastata spontaanistikin

> 📚 **Lisätietoja — PowerPoint**
>
> - [PowerPointin ohjeet ja oppaat](https://support.microsoft.com/fi-fi/powerpoint) — Microsoftin virallinen PowerPoint-tukisivusto (suomeksi)
> - [PowerPoint-videokoulutus](https://support.microsoft.com/fi-fi/office/powerpoint-for-windows-training-40e8c930-cb0b-40d8-82c4-bd53d3398787) — Ilmaiset opetusvideot aloittelijoista edistyneille

---

*Kirjan loppu — Osio 1: Digitaidot ja tiedostonhallinta*

---

> **Tekijänoikeus:** Mercuria-kauppaoppilaitos Oy  
> **Versio:** 1.0 (2026)  
> **Lisenssi:** CC BY-NC-SA 4.0 — Vapaasti käytettävissä oppilaitoskäyttöön
