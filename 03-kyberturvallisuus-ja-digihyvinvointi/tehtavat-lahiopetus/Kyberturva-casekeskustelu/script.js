"use strict";

const REVEAL_DELAY_MS = 2 * 60 * 1000;

const CASES = [
  {
    id: "Case 1",
    category: "Tietojenkalastelu",
    level: "Perustaso",
    title: "Kiireellinen salasanaresetointi",
    situation: "Saat viestin, joka näyttää tulevan koulun IT-tuelta. Viestissä kerrotaan, että Microsoft 365 -tilisi suljetaan 30 minuutin kuluttua, ellei salasanaa vaihdeta heti. Viestissä on iso painike: Vaihda salasana nyt.",
    prompts: [
      "Mitkä viestin yksityiskohdat voisivat paljastaa, että kyseessä ei ole aito viesti?",
      "Mitä teet heti ensimmäiseksi, ennen kuin painat mitään?",
      "Kenelle tilanteesta kannattaa ilmoittaa, jotta muutkin osaavat varoa?"
    ],
    answer: {
      summary: "Tilanteessa on todennäköisesti tietojenkalasteluviesti. Tarkoitus on saada käyttäjä avaamaan huijaussivu ja luovuttamaan tunnuksensa tai monivaiheisen tunnistautumisen koodinsa.",
      actNow: [
        "Älä avaa linkkiä tai liitetiedostoa.",
        "Tarkista lähettäjäosoite ja viestin linkin oikea osoite viemällä hiiri linkin päälle.",
        "Ilmoita viestistä opettajalle, IT-tuelle tai muulle vastuuhenkilölle.",
        "Jos ehdin jo klikata linkkiä ja syöttää tunnuksia, vaihda salasana heti ja ilmoita tilanteesta välittömästi."
      ],
      avoid: [
        "Älä luovuta salasanaa, MFA-koodia tai henkilötietoja viestin kautta.",
        "Älä ajattele, että pelkkä poistaminen riittää, jos ehdin jo avata huijaussivun.",
        "Älä oleta viestin olevan aito vain siksi, että siinä on koulun logo."
      ],
      prevent: [
        "Opettele tunnistamaan kiirettä, pelkoa tai palkintoa käyttävät huijausviestit.",
        "Kirjaudu palveluihin itse selaimen tai sovelluksen kautta, älä viestilinkeistä.",
        "Pidä monivaiheinen tunnistautuminen käytössä ja ilmoita epäilyttävistä viesteistä."
      ],
      teacherNote: "Nosta purussa esiin se, että turvallinen toiminta on sekä oma suojaaminen että ilmoittaminen eteenpäin."
    }
  },
  {
    id: "Case 2",
    category: "Tunnistautuminen",
    level: "Perustaso",
    title: "Puhelin pyytää hyväksymään kirjautumisen",
    situation: "Puhelimeesi tulee lyhyen ajan sisällä kolme peräkkäistä kirjautumisen hyväksymispyyntöä. Et ole itse kirjautumassa mihinkään, mutta ilmoitukset tulevat tutusta tunnistautumissovelluksesta.",
    prompts: [
      "Mitä tämä voi tarkoittaa, jos et itse ole aloittanut kirjautumista?",
      "Miksi 'hyväksy vain että ilmoitukset loppuvat' on vaarallinen ajatus?",
      "Mitä teet heti ja mitä teet seuraavaksi?"
    ],
    answer: {
      summary: "Tilanne voi viitata siihen, että joku yrittää kirjautua tilillesi ja toivoo sinun hyväksyvän pyynnön vahingossa. Tätä kutsutaan myös MFA-väsytystaktiikaksi.",
      actNow: [
        "Hylkää kirjautumispyynnöt tai älä hyväksy niitä.",
        "Vaihda tilin salasana, jos epäilet tunnuksen vuotaneen.",
        "Ilmoita asiasta IT-tukeen tai opettajalle.",
        "Tarkista tilin kirjautumishistoria, jos palvelu sen näyttää."
      ],
      avoid: [
        "Älä hyväksy pyyntöä uteliaisuudesta tai kiireen takia.",
        "Älä jätä tapahtumaa huomiotta, jos ilmoituksia tulee useita.",
        "Älä jaa varmennuskoodia tai push-hyväksyntää toiselle henkilölle."
      ],
      prevent: [
        "Käytä vahvaa salasanaa ja eri salasanoja eri palveluissa.",
        "Pidä palautustiedot ja suojausasetukset ajan tasalla.",
        "Suhtaudu kaikkiin odottamattomiin tunnistautumispyyntöihin tietoturvatapahtumana."
      ],
      teacherNote: "Moni opiskelija tunnistaa kalastelun, mutta ei yhdistä MFA-pyyntöä hyökkäykseen. Tämä on hyvä kohta laajentaa keskustelua."
    }
  },
  {
    id: "Case 3",
    category: "Laiteturva",
    level: "Perustaso",
    title: "Puhelin katoaa bussissa",
    situation: "Huomaat kotona, että puhelin jäi bussin penkille. Puhelimessa on kirjautuneena koulun sähköposti, pilvipalvelu ja tunnistautumissovellus. Näytön lukitus on käytössä, mutta olet epävarma, kuinka vahva se on.",
    prompts: [
      "Mitkä tiedot tai palvelut ovat nyt vaarassa?",
      "Mitkä kolme toimenpidettä pitäisi tehdä heti ensimmäisen tunnin aikana?",
      "Miten toimisit eri tavalla, jos puhelimessa ei olisi näytön lukitusta?"
    ],
    answer: {
      summary: "Kadonnut laite on tietoturvariski, vaikka sitä ei olisi varastettu. Tärkeintä on estää pääsy tileille, paikantaa laite jos mahdollista ja ilmoittaa asiasta nopeasti.",
      actNow: [
        "Käytä laitteen paikannus- tai etälukitusominaisuutta, jos se on käytettävissä.",
        "Vaihda tärkeimpien palvelujen salasanat tai kirjaa laite ulos etänä.",
        "Ilmoita opettajalle, huoltajalle tai IT-tukeen, jos laitteella on koulun tai työssäoppimispaikan tietoja.",
        "Tee katoamisilmoitus liikennöitsijälle tai löytötavarapalveluun."
      ],
      avoid: [
        "Älä odota seuraavaan päivään ennen kuin aloitat toimet.",
        "Älä oleta, että näytön lukitus yksin ratkaisee kaiken.",
        "Älä jätä tunnistautumissovellusta ja sähköpostia huomioimatta."
      ],
      prevent: [
        "Pidä laitteessa PIN-koodi tai biometrinen lukitus.",
        "Ota käyttöön laitteen paikannus ja etätyhjennys.",
        "Vältä sitä, että kaikki tärkeimmät tunnukset ovat auki ilman lisäsuojausta."
      ],
      teacherNote: "Tässä casessa voi keskustella myös siitä, mikä on oma vastuu ja milloin tarvitaan aikuisen tai organisaation apua."
    }
  },
  {
    id: "Case 4",
    category: "Tiedostonjako",
    level: "Perustaso",
    title: "Jaettu tiedosto päätyy kaikille näkyväksi",
    situation: "Ryhmäsi jakaa pilvipalvelussa asiakirjan, jossa on opiskelijoiden yhteystietoja ja työssäoppimispaikkoihin liittyviä merkintöjä. Myöhemmin huomaatte, että linkki onkin asetuksella 'kuka tahansa linkin saanut voi avata'. Linkkiä on ehditty jakaa chatissa eteenpäin.",
    prompts: [
      "Mikä tilanteessa on tietosuojaongelma ja mikä on tietoturvaongelma?",
      "Mitä pitää tehdä heti tiedoston ja linkin kanssa?",
      "Kenelle asiasta pitää kertoa, jos tiedosto sisältää muiden henkilötietoja?"
    ],
    answer: {
      summary: "Tilanteessa henkilötietoja tai muuta luottamuksellista tietoa on voinut levitä liian laajalle. Ensimmäinen tavoite on sulkea avoin pääsy ja sen jälkeen arvioida, kenelle tieto on ehtinyt näkyä.",
      actNow: [
        "Poista tai muuta jakolinkki välittömästi rajatuksi.",
        "Tarkista, onko tiedostoa avattu ja keiden kanssa linkki on jaettu.",
        "Ilmoita opettajalle tai vastuuhenkilölle, jos tiedosto sisältää muiden henkilötietoja.",
        "Laadi tarvittaessa uusi, turvallisesti jaettu versio tiedostosta."
      ],
      avoid: [
        "Älä jätä asiaa ryhmän sisäiseksi, jos tiedostossa on muiden tietoja.",
        "Älä jatka saman avoimen linkin käyttöä 'vain tämän kerran'.",
        "Älä syyllistä yksittäistä opiskelijaa ennen kuin tilanne on korjattu."
      ],
      prevent: [
        "Tarkista jakamisasetus aina ennen linkin lähettämistä.",
        "Jaa luottamukselliset tiedot vain nimetyille henkilöille.",
        "Sopikaa ryhmässä yksi tarkistusrutiini ennen tiedostojen jakamista."
      ],
      teacherNote: "Tämä case yhdistyy suoraan kurssin tiedostonhallinta- ja jakamisosaamiseen."
    }
  },
  {
    id: "Case 5",
    category: "Fyysinen tietoturva",
    level: "Perustaso",
    title: "Löydetty muistitikku käytävältä",
    situation: "Koulun käytävältä löytyy muistitikku, johon on kirjoitettu tussilla 'palkat' ja 'varmuuskopio'. Ryhmässä ehdotetaan, että tikku kannattaa heti avata omalla koneella, jotta nähdään kenen se on.",
    prompts: [
      "Miksi muistitikun avaaminen omalla laitteella voi olla riski?",
      "Miten muistitikun kanssa pitäisi toimia turvallisesti?",
      "Miten ryhmän pitäisi perustella päätös muulle luokalle?"
    ],
    answer: {
      summary: "Tuntemattomaan muistitikkuun voi liittyä haittaohjelmariski tai luottamuksellista tietoa. Oikea toiminta ei ole uteliaisuuden tyydyttäminen vaan turvallinen käsittely ja toimittaminen vastuuhenkilölle.",
      actNow: [
        "Älä liitä muistitikkua omaan tai koulun tavalliseen käyttölaiteeseen.",
        "Toimita tikku opettajalle, IT-tukeen tai löytötavaratoimistoon sovittujen käytäntöjen mukaan.",
        "Kuvaa tai kirjaa löytöpaikka ja kellonaika, jos siitä on hyötyä palautuksessa."
      ],
      avoid: [
        "Älä kokeile sisältöä omalla koneella 'vain nopeasti'.",
        "Älä julkaise löydöstä kuvaa somessa.",
        "Älä säilytä tikkua itselläsi, jos organisaatiolla on oma toimintaohje löytötavaroille."
      ],
      prevent: [
        "Käytä organisaation hyväksymiä tallennustapoja ja salattuja medioita.",
        "Älä nimeä välineitä tavalla, joka paljastaa sisältöä ulkopuolisille.",
        "Harjoitelkaa etukäteen, miten toimitaan, kun löydetään vieras laite tai muistiväline."
      ],
      teacherNote: "Moni perustelee avaamista hyvällä tarkoituksella. Tässä kannattaa korostaa, että hyvä tarkoitus ei poista riskiä."
    }
  },
  {
    id: "Case 6",
    category: "Julkinen verkko",
    level: "Perustaso",
    title: "Kahvilan avoin Wi-Fi ja tärkeä kirjautuminen",
    situation: "Odotat junaa kahvilassa ja huomaat, että pitäisi hoitaa heti tärkeä kirjautuminen pankkiin tai vahvaa tunnistautumista vaativaan palveluun. Tarjolla on vain avoin Wi-Fi-verkko, ja oma mobiilidata toimii heikosti.",
    prompts: [
      "Mitkä riskit liittyvät avoimeen verkkoon juuri tässä tilanteessa?",
      "Mikä olisi turvallisin vaihtoehto, jos asian hoitaminen ei ole pakko tehdä heti?",
      "Jos kirjautuminen olisi aivan pakollinen, miten riskiä voisi pienentää?"
    ],
    answer: {
      summary: "Avoin verkko voi altistaa liikenteen kuuntelulle, valesivuille tai väärälle verkolle liittymiselle. Herkkiä kirjautumisia ei kannata hoitaa julkisessa avoimessa verkossa, ellei muuta vaihtoehtoa ole.",
      actNow: [
        "Suosi odottamista tai omaa mobiilidataa, jos mahdollista.",
        "Varmista, että käytät oikeaa palvelun osoitetta ja salattua yhteyttä.",
        "Kirjaudu ulos heti käytön jälkeen äläkä tallenna tunnuksia laitteelle."
      ],
      avoid: [
        "Älä käytä tuntematonta verkkoa sokeasti vain siksi, että se on ilmainen.",
        "Älä tee herkkiä toimia valesivulla tai verkossa, jonka nimeä et tunnista.",
        "Älä jätä päätettä valvomatta kirjautumisen aikana."
      ],
      prevent: [
        "Pidä omassa puhelimessa hotspot tai mobiilidata käyttövalmiina tärkeisiin tilanteisiin.",
        "Päivitä laitteet ja selaimet, jotta suojaukset pysyvät ajan tasalla.",
        "Harjoittele arvioimaan, mitkä asiat voi siirtää turvallisempaan hetkeen."
      ],
      teacherNote: "Tässä casessa on hyvä nostaa esiin myös kyky keskeyttää toiminta ja siirtää asia myöhemmäksi turvallisuuden vuoksi."
    }
  },
  {
    id: "Case 7",
    category: "Sosiaalinen manipulointi",
    level: "Keskitaso",
    title: "Puhelu pankista tai poliisista",
    situation: "Saat puhelun henkilöltä, joka esittäytyy pankin turvallisuusasiantuntijaksi. Hän kertoo, että tililläsi on epäilyttävää toimintaa ja tarvitsee heti henkilötunnuksesi sekä verkkopankin tunnuslukusi 'rikollisten pysäyttämiseksi'.", 
    prompts: [
      "Mitkä asiat puhelussa kertovat siitä, että kyse voi olla huijauksesta?",
      "Miten keskeytät tilanteen turvallisesti?",
      "Miten tarkistat asian oikeasta kanavasta ilman että autat huijaria?"
    ],
    answer: {
      summary: "Tämä on tyypillinen sosiaalisen manipuloinnin tilanne. Huijari yrittää käyttää auktoriteettia, kiirettä ja pelkoa saadakseen salaiset tiedot suoraan uhrilta.",
      actNow: [
        "Lopeta puhelu rauhallisesti kertomatta mitään tunnistetietoja.",
        "Soita itse takaisin pankin tai poliisin viralliseen numeroon, jonka haet luotettavasta lähteestä.",
        "Jos ehdit jo antaa tietoja, ota heti yhteys oikeaan palveluun ja sulje tunnukset."
      ],
      avoid: [
        "Älä kerro henkilötunnusta, tunnuslukuja tai varmennuskoodeja puhelimessa.",
        "Älä luota soittajan uskottavaan ääneen, titteliin tai taustameluun.",
        "Älä jatka keskustelua vain siksi, että et halua vaikuttaa epäkohteliaalta."
      ],
      prevent: [
        "Sopikaa itsellenne sääntö: tunnuksia ei koskaan anneta puhelimessa.",
        "Harjoitelkaa valmiiksi lause, jolla huijauspuhelu lopetetaan.",
        "Muista, että viranomainen tai pankki kestää kyllä sen, että tarkistat asian itse oikeasta kanavasta."
      ],
      teacherNote: "Opiskelijoiden on usein helpompi nähdä huijaus viestissä kuin puheessa. Harjoitelkaa ääneen keskeyttämistä."
    }
  },
  {
    id: "Case 8",
    category: "Haittaohjelmat",
    level: "Keskitaso",
    title: "Yhteiskone lukittuu kesken työskentelyn",
    situation: "Luokan tai työssäoppimispaikan yhteiskoneelle ilmestyy ilmoitus: 'Tiedostosi on salattu. Maksa 500 euroa 24 tunnin sisällä.' Samalla osa tiedostoista ei enää aukea. Ryhmässä joku ehdottaa, että ehkä maksu kannattaa hoitaa nopeasti, jotta työt saadaan takaisin.",
    prompts: [
      "Mistä tunnistatte, että kyse voi olla kiristyshaittaohjelmasta?",
      "Mitkä ovat oikeat ensimmäiset toimet laitteen ja verkon kannalta?",
      "Miksi maksaminen ei ole turvallinen ratkaisu, vaikka tilanne olisi kiireinen?"
    ],
    answer: {
      summary: "Tilanne viittaa kiristyshaittaohjelmaan. Olennaista on estää vahingon leviäminen, ilmoittaa heti vastuuhenkilölle ja toimia organisaation ohjeiden mukaan. Yksittäinen opiskelija ei ratkaise tilannetta maksamalla.",
      actNow: [
        "Lopeta laitteen käyttö ja irrota se verkosta, jos organisaation ohje näin neuvoo.",
        "Ilmoita välittömästi opettajalle, IT-tukeen tai työpaikan vastuuhenkilölle.",
        "Kirjaa ylös, mitä tapahtui juuri ennen ilmoitusta, jotta tilanne voidaan selvittää."
      ],
      avoid: [
        "Älä maksa lunnaita omin päin.",
        "Älä jatka tiedostojen avaamista tai uusien muistivälineiden liittämistä koneeseen.",
        "Älä yritä peittää tapahtunutta, vaikka virhe olisi alkanut omasta klikkauksesta."
      ],
      prevent: [
        "Pidä ohjelmistot ajan tasalla ja ota varmuuskopiointi vakavasti.",
        "Harjoittele epäilyttävien liitteiden ja linkkien tunnistamista.",
        "Tee selväksi, kenelle koulussa tai työpaikalla ilmoitetaan heti poikkeamasta."
      ],
      teacherNote: "Purussa kannattaa painottaa, että nopea ilmoittaminen on vastuullista toimintaa, ei epäonnistuminen."
    }
  },
  {
    id: "Case 9",
    category: "Huijaukset ja tekoäly",
    level: "Keskitaso",
    title: "Rehtorin tai esihenkilön kiireinen ääniviesti",
    situation: "Saat viestisovelluksessa ääniviestin henkilöltä, jonka profiilikuva ja nimi näyttävät tutuilta. Ääniviestissä pyydetään ostamaan heti lahjakortteja tai lähettämään vahvistuskoodi, koska 'olen kokouksessa enkä ehdi itse'. Ääni kuulostaa hyvin aidolta.",
    prompts: [
      "Miksi tuttu ääni tai tuttu profiili ei vielä todista viestiä aidoksi?",
      "Miten asian voi tarkistaa turvallisesti toisesta kanavasta?",
      "Mitä riskejä syntyy, jos ryhmä toimii pelkän kiireen perusteella?"
    ],
    answer: {
      summary: "Myös ääntä, kuvaa ja profiilia voidaan väärentää. Tärkeää on tarkistaa pyyntö toisesta luotettavasta kanavasta ennen kuin rahaa, koodeja tai tietoja lähetetään kenellekään.",
      actNow: [
        "Älä lähetä rahaa, lahjakortteja tai koodeja viestin perusteella.",
        "Varmista pyyntö soittamalla itse tunnettuun numeroon tai kysymällä kasvokkain.",
        "Ilmoita epäilyttävästä viestistä tarvittaessa opettajalle tai organisaation vastuuhenkilölle."
      ],
      avoid: [
        "Älä luota viestin uskottavuuteen pelkän äänen tai profiilikuvan perusteella.",
        "Älä kiirehdi päätöstä siksi, että viestissä vedotaan auktoriteettiin tai kiireeseen.",
        "Älä jaa varmennuskoodeja missään viestisovelluksessa."
      ],
      prevent: [
        "Sopikaa etukäteen, että rahaan, koodeihin tai tunnuksiin liittyvät pyynnöt tarkistetaan aina toista kanavaa pitkin.",
        "Harjoitelkaa tunnistamaan tekoälyn ja huijausten yhdistelmä: tuttu ulkoasu ei riitä todisteeksi.",
        "Käyttäkää työ- tai kouluasioissa sovittuja virallisia kanavia."
      ],
      teacherNote: "Tämä case linkittää kyberturvallisuuden ja tekoälyn riskit toisiinsa ilman, että opiskelijan pitää tuntea teknisiä termejä valmiiksi."
    }
  },
  {
    id: "Case 10",
    category: "Tietovuoto",
    level: "Keskitaso",
    title: "Palvelusta tulee tietovuotoilmoitus",
    situation: "Saat viestin käyttämältäsi palvelulta, että palveluun on murtauduttu ja osa käyttäjätiedoista on voinut vuotaa. Viestissä kerrotaan, että sähköposti, salasana tai muita tietoja voi olla joutunut vääriin käsiin. Käytät samaa salasanaa myös kahdessa muussa palvelussa.",
    prompts: [
      "Miksi yksi tietovuoto voi vaikuttaa myös muihin palveluihin?",
      "Mitä teet ensimmäisenä 15 minuutin aikana?",
      "Miten toimisit, jos et ole varma, onko viesti oikea vai uusi huijausyritys?"
    ],
    answer: {
      summary: "Tietovuoto voi vaarantaa useita tilejä, jos sama salasana on käytössä muuallakin. Oikea reaktio on varmistaa viestin aitous ja vaihtaa vaarassa olevat salasanat kiireellisesti.",
      actNow: [
        "Varmista tiedote oikeaksi menemällä palveluun itse sen virallisen sivun kautta.",
        "Vaihda kyseisen palvelun salasana ja kaikki muualla käytetyt samat tai lähes samat salasanat.",
        "Ota käyttöön monivaiheinen tunnistautuminen, jos se ei vielä ole käytössä.",
        "Seuraa epäilyttäviä kirjautumisia tai viestejä lähiviikkoina."
      ],
      avoid: [
        "Älä käytä samaa salasanaa useissa palveluissa jatkossa.",
        "Älä klikkaa tiedotteen linkkejä ennen kuin olet varmistanut niiden aitouden.",
        "Älä ajattele, että asia koskee vain sitä yhtä palvelua."
      ],
      prevent: [
        "Käytä eri palveluissa eri salasanoja ja salasanamanageria, jos mahdollista.",
        "Pidä yhteystiedot ajan tasalla, jotta saat oikeat ilmoitukset.",
        "Harjoittele toimintamallia valmiiksi: varmista, vaihda, ilmoita, seuraa."
      ],
      teacherNote: "Tämä on hyvä päätöscase, koska siinä yhdistyvät tunnukset, kriittinen arviointi ja oma toimintavastuu."
    }
  }
];

const elements = {
  caseId: document.getElementById("caseId"),
  caseCategory: document.getElementById("caseCategory"),
  caseLevel: document.getElementById("caseLevel"),
  caseTitle: document.getElementById("caseTitle"),
  caseSituation: document.getElementById("caseSituation"),
  discussionPrompts: document.getElementById("discussionPrompts"),
  revealBtn: document.getElementById("revealBtn"),
  hideAnswerBtn: document.getElementById("hideAnswerBtn"),
  randomCaseBtn: document.getElementById("randomCaseBtn"),
  resetTimerBtn: document.getElementById("resetTimerBtn"),
  timerValue: document.getElementById("timerValue"),
  revealStatus: document.getElementById("revealStatus"),
  answerPanel: document.getElementById("answerPanel"),
  answerHeading: document.getElementById("answerHeading"),
  riskSummary: document.getElementById("riskSummary"),
  actNowList: document.getElementById("actNowList"),
  avoidList: document.getElementById("avoidList"),
  preventList: document.getElementById("preventList"),
  teacherNote: document.getElementById("teacherNote"),
  teacherGuideToggle: document.getElementById("teacherGuideToggle"),
  teacherGuide: document.getElementById("teacherGuide"),
  closeGuideBtn: document.getElementById("closeGuideBtn"),
  caseMenuToggle: document.getElementById("caseMenuToggle"),
  caseMenu: document.getElementById("caseMenu"),
  caseMenuList: document.getElementById("caseMenuList"),
  closeMenuBtn: document.getElementById("closeMenuBtn"),
  menuScrim: document.getElementById("menuScrim")
};

const state = {
  currentIndex: 0,
  endTime: 0,
  timerId: null
};

function formatMs(ms) {
  const safeMs = Math.max(0, ms);
  const totalSeconds = Math.ceil(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function fillList(listElement, items) {
  listElement.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
}

function renderCaseMenu() {
  elements.caseMenuList.innerHTML = "";

  CASES.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "case-menu-item" + (index === state.currentIndex ? " is-active" : "");
    button.innerHTML = `
      <small>${item.category} · ${item.level}</small>
      <strong>${item.title}</strong>
      <span>${item.situation}</span>
    `;
    button.addEventListener("click", () => {
      setCase(index);
      closeMenu();
    });
    elements.caseMenuList.appendChild(button);
  });
}

function renderCase() {
  const currentCase = CASES[state.currentIndex];

  elements.caseId.textContent = currentCase.id;
  elements.caseCategory.textContent = currentCase.category;
  elements.caseLevel.textContent = currentCase.level;
  elements.caseTitle.textContent = currentCase.title;
  elements.caseSituation.textContent = currentCase.situation;
  elements.answerHeading.textContent = currentCase.title;
  elements.riskSummary.textContent = currentCase.answer.summary;
  elements.teacherNote.textContent = `Opettajan huomio: ${currentCase.answer.teacherNote}`;

  fillList(elements.discussionPrompts, currentCase.prompts);
  fillList(elements.actNowList, currentCase.answer.actNow);
  fillList(elements.avoidList, currentCase.answer.avoid);
  fillList(elements.preventList, currentCase.answer.prevent);

  renderCaseMenu();
}

function hideAnswer() {
  elements.answerPanel.hidden = true;
}

function showAnswer() {
  if (Date.now() < state.endTime) {
    return;
  }
  elements.answerPanel.hidden = false;
}

function closePanels() {
  elements.caseMenu.hidden = true;
  elements.teacherGuide.hidden = true;
  elements.menuScrim.hidden = true;
  elements.caseMenuToggle.setAttribute("aria-expanded", "false");
  elements.teacherGuideToggle.setAttribute("aria-expanded", "false");
}

function updateTimer() {
  const remaining = Math.max(0, state.endTime - Date.now());
  const formatted = formatMs(remaining);
  const unlocked = remaining === 0;

  elements.timerValue.textContent = formatted;
  elements.revealBtn.disabled = !unlocked;
  elements.revealBtn.textContent = unlocked ? "Näytä turvallinen toimintamalli" : `Avautuu ${formatted}`;
  elements.revealStatus.textContent = unlocked
    ? "Voitte nyt avata turvallisen toimintamallin ja verrata sitä omaan ratkaisuunne."
    : `Keskustelkaa ensin omasta ratkaisustanne. Mallivastaus avautuu ${formatted} kuluttua.`;

  if (unlocked && state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function startTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
  }

  state.endTime = Date.now() + REVEAL_DELAY_MS;
  hideAnswer();
  updateTimer();
  state.timerId = window.setInterval(updateTimer, 250);
}

function setCase(index) {
  state.currentIndex = index;
  renderCase();
  startTimer();
}

function setRandomCase() {
  const options = CASES.map((_, index) => index).filter((index) => index !== state.currentIndex);
  const nextIndex = options[Math.floor(Math.random() * options.length)] ?? 0;
  setCase(nextIndex);
}

function openMenu() {
  closePanels();
  elements.caseMenu.hidden = false;
  elements.menuScrim.hidden = false;
  elements.caseMenuToggle.setAttribute("aria-expanded", "true");
}

function openTeacherGuide() {
  closePanels();
  elements.teacherGuide.hidden = false;
  elements.menuScrim.hidden = true;
  elements.teacherGuideToggle.setAttribute("aria-expanded", "true");
}

function bindEvents() {
  elements.randomCaseBtn.addEventListener("click", setRandomCase);
  elements.resetTimerBtn.addEventListener("click", startTimer);
  elements.revealBtn.addEventListener("click", showAnswer);
  elements.hideAnswerBtn.addEventListener("click", hideAnswer);
  elements.caseMenuToggle.addEventListener("click", () => {
    if (elements.caseMenu.hidden) {
      openMenu();
    } else {
      closePanels();
    }
  });
  elements.teacherGuideToggle.addEventListener("click", () => {
    if (elements.teacherGuide.hidden) {
      openTeacherGuide();
    } else {
      closePanels();
    }
  });
  elements.closeMenuBtn.addEventListener("click", closePanels);
  elements.closeGuideBtn.addEventListener("click", closePanels);
  elements.menuScrim.addEventListener("click", closePanels);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePanels();
    }
    if (event.key.toLowerCase() === "r") {
      setRandomCase();
    }
  });
}

function init() {
  bindEvents();
  state.currentIndex = Math.floor(Math.random() * CASES.length);
  renderCase();
  startTimer();
}

document.addEventListener("DOMContentLoaded", init);