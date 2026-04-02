# Osio 1: Digitaidot ja tiedostonhallinta

## Osaamistavoitteet (VVTD26)

- **(5)** käyttää tekstinkäsittelysovellusta
- **(6)** käyttää taulukkolaskentasovellusta
- **(7)** käyttää esitysgrafiikkasovellusta
- **(9)** käsittelee ja järjestää tiedostoja sekä kansioita
- **(10)** jakaa sisältöjä ja käsittelee jaettua tiedostoa

## Kuvaus

Osion punainen lanka on **"Yrityksen digitaalinen materiaalipaketti"** — opiskelija rakentaa kurssin aikana kuvitteelliselle yritykselle digitaalisen materiaalipaketin, johon kuuluu Excel-budjetti, Word-raportti ja PowerPoint-esitys.

Osio noudattaa kolmivaiheista pedagogista progressiota:

1. **🖥️ Interaktiivinen harjoittelu selaimessa** — peruskäsitteet ja toimintalogiikka (SCORM-paketit Moodlessa)
2. **💻 Harjoittelu todellisilla ohjelmilla** — valmentavat tehtävät Excelissä, Wordissa ja PowerPointissa
3. **📝 Arvioitava tehtävä** — projektitehtävä, jossa osaaminen osoitetaan

## Kesto
- Lähiopetus nuoret: ~22h
- Aikuisten iltakurssi: ~10h

---

## Rakenne

### Materiaalit (`materiaalit/`)
| Tiedosto | Sisältö |
|---|---|
| tiedostonhallinta-ohje.md | Kansiot, nimeämiskäytännöt, pilvipalvelut |
| onedrive-ja-jaetut-tiedostot.md | OneDrive, jakaminen, yhteismuokkaus |
| excel-perusteet-ja-kaavat.md | Excel-perusteet, kaavat, funktiot, kaaviot |
| word-perusteet-ja-muotoilu.md | Word-perusteet, asiakirjamuotoilu |
| powerpoint-perusteet.md | PowerPoint-perusteet, esityssuunnittelu |
| h5p-tiedostot-ja-kansiot.md | H5P: Tiedostot ja kansiot |
| h5p-nappaimistokomennot.md | H5P: Näppäinyhdistelmät |

### Interaktiiviset selainharjoitukset (`materiaalit/harjoitukset-*/`)

Jokainen kokonaisuus sisältää HTML+JS-simulaattorin, joka toimii sekä paikallisesti selaimessa että SCORM 1.2 -pakettina Moodlessa. Suoritustieto ja pisteet siirtyvät Moodlen arviointikirjaan automaattisesti.

#### Tiedostonhallinta (`harjoitukset-tiedostonhallinta/`) — 4 harjoitusta
| Harjoitus | Kuvaus | Taidot |
|---|---|---|
| 1. Etsi tiedosto | Kansionavigaatio sotkuinen vs siisti rakenne | Kansiorakenne, navigointi |
| 2. Järjestä ja nimeä | Luo kansiot → nimeä tiedostot → raahaa paikoilleen | Nimeämiskäytännöt, organisointi |
| 3. Paikallinen vs pilvi | Tunnista ja luokittele tallennuspaikat | Pilvipalvelut, tiedostopolut |
| 4. Tiedostomuodot | Raahaa tiedostot kategorioihin + tietovisa | Tiedostopäätteet, ohjelmat |

#### Taulukkolaskenta (`harjoitukset-taulukkolaskenta/`) — 4 harjoitusta
| Harjoitus | Kuvaus | Taidot |
|---|---|---|
| 1. Laskutoimitukset | Peruslaskutoimitukset soluissa | Kaavat, operaattorit |
| 2. Summa ja funktiot | SUM, AVERAGE, MIN, MAX | Funktiot |
| 3. Täyttökahva | Solujen kopiointi vetämällä | Sarjat, täyttö |
| 4. Absoluuttinen viittaus | $-merkinnän käyttö kaavoissa | Suhteellinen vs absoluuttinen |

#### Tekstinkäsittely (`harjoitukset-tekstinkasittely/`) — 5 harjoitusta
| Harjoitus | Kuvaus | Taidot |
|---|---|---|
| 1. Tekstin muotoilu | Lihavointi, kursivointi, fontti, koko | Perusmuotoilu |
| 2. Tyylit ja otsikot | Otsikoiden hierarkia, tyylien käyttö | Asiakirjarakenne |
| 3. Pikanäppäimet | Ctrl+B, Ctrl+C, jne. | Näppäinyhdistelmät |
| 4. Sarkain ja tasaukset | Sisennykset, tasaustyypit | Kappaleiden muotoilu |
| 5. Erikoismerkit | Erikoismerkkien lisääminen | Symbolit |

#### Esitysgrafiikka (`harjoitukset-esitysgrafiikka/`) — 2 harjoitusta
| Harjoitus | Kuvaus | Taidot |
|---|---|---|
| 1. Diarakenne | Dian osien tunnistaminen ja rakentaminen | Dian elementit |
| 2. Korjaa esitys | Etsi ja korjaa virheet esityksestä | Hyvän esityksen periaatteet |

---

### Tehtävät — Lähiopetus (`tehtavat-lahiopetus/`)

Tehtävät on järjestetty aihealueittain kolmivaiheisen progression mukaan:

#### A) Tiedostonhallinta
| Vaihe | Tiedosto | Tehtävä | Arviointi |
|---|---|---|---|
| 🖥️ Interaktiivinen | *harjoitukset-tiedostonhallinta/* | 4 selainharjoitusta (SCORM) | Automaattinen |
| 💻 Oikeilla ohjelmilla | 1-01-tiedostonhallintaharjoitus.md | Tiedostonhallintaharjoitus | Hyv/hyl |

#### B) Taulukkolaskenta (Excel)
| Vaihe | Tiedosto | Tehtävä | Arviointi |
|---|---|---|---|
| 🖥️ Interaktiivinen | *harjoitukset-taulukkolaskenta/* | 4 selainharjoitusta (SCORM) | Automaattinen |
| 💻 Valmentava | 1-02-excel-harjoitus-1.md | Excel-harjoitus 1: Perustaidot | Valmentava |
| 💻 Valmentava | 1-03-excel-harjoitus-2.md | Excel-harjoitus 2: Kaavat ja kaaviot | Valmentava |
| 📝 **Arvioitava** | 1-04-excel-yrityksen-budjettilaskelma.md | **Excel: Yrityksen budjettilaskelma** | **1–5** |

#### C) Tekstinkäsittely (Word)
| Vaihe | Tiedosto | Tehtävä | Arviointi |
|---|---|---|---|
| 🖥️ Interaktiivinen | *harjoitukset-tekstinkasittely/* | 5 selainharjoitusta (SCORM) | Automaattinen |
| 💻 Valmentava | 1-05-word-harjoitus-1.md | Word-harjoitus 1: Perustaidot | Valmentava |
| 💻 Valmentava | 1-06-word-harjoitus-2.md | Word-harjoitus 2: Asiakirja | Valmentava |
| 📝 **Arvioitava** | 1-07-word-yrityksen-raportti.md | **Word: Yrityksen raportti** | **1–5** |

#### D) Esitysgrafiikka (PowerPoint)
| Vaihe | Tiedosto | Tehtävä | Arviointi |
|---|---|---|---|
| 🖥️ Interaktiivinen | *harjoitukset-esitysgrafiikka/* | 2 selainharjoitusta (SCORM) | Automaattinen |
| 💻 Valmentava | 1-08-ppt-harjoitus-1.md | PPT-harjoitus 1: Perustaidot | Valmentava |
| 📝 **Arvioitava** | 1-09-ppt-yrityksen-esitys.md | **PPT: Yrityksen esitys** | **1–5** |

#### E) Jaetut tiedostot (OneDrive)
| Vaihe | Tiedosto | Tehtävä | Arviointi |
|---|---|---|---|
| 💻 Oikeilla ohjelmilla | 1-10-jaettu-tiedosto-harjoitus.md | Jaettu tiedosto -harjoitus | Hyv/hyl |

### Tehtävät — Itsenäinen suorittaminen (`tehtavat-itsenainen/`)

Itsenäisessä suorituksessa opiskelija käy ensin läpi interaktiiviset selainharjoitukset Moodlessa (SCORM) ja tekee sitten arvioitavat tehtävät.

| Tiedosto | Tehtävä | Arviointi |
|---|---|---|
| I-1-01-tiedostonhallintaharjoitus.md | Tiedostonhallintaharjoitus | Hyv/hyl |
| I-1-02-excel-budjettilaskelma.md | Excel: Yrityksen budjettilaskelma | 1–5 |
| I-1-03-word-raportti.md | Word: Yrityksen raportti | 1–5 |
| I-1-04-ppt-esitys.md | PPT: Yrityksen esitys (nauhoitettu) | 1–5 |
| I-1-05-jaettu-tiedosto.md | Jaettu tiedosto -harjoitus | Hyv/hyl |
