"use strict";

const THEMES = [
  {
    id: "Teema 1",
    category: "Terveys",
    perspective: "Yksilö + yhteiskunta",
    title: "Uni ja palautuminen",
    situation: "Opiskelijat käyttävät puhelinta, viestisovelluksia ja videoita myöhään iltaan. Osa kokee, että ilta on ainoa hetki palautua, mutta aamulla väsyttää ja keskittyminen on vaikeaa.",
    prompts: [
      "Miten iltainen digikäyttö voi vaikuttaa uneen, palautumiseen ja jaksamiseen?",
      "Miksi saman ilmiön ratkaiseminen ei ole vain yksilön vastuulla?",
      "Millaisia käytännön tapoja opiskelija, koti tai koulu voisi ottaa käyttöön?",
      "Mitä hyötyjä digilaitteilla voi silti olla ilta-aikaan?"
    ],
    output: [
      "Nimetkää 2 hyötyä ja 2 haittaa.",
      "Laatikaa 5 suositusta parempaan palautumiseen.",
      "Valitkaa yksi suositus, jonka koulu voisi toteuttaa heti."
    ]
  },
  {
    id: "Teema 2",
    category: "Hyvinvointi",
    perspective: "Yksilö + arki",
    title: "Keskittyminen ja ilmoitustulva",
    situation: "Puhelimen ilmoitukset, viestit, videot ja jatkuvat keskeytykset seuraavat opiskelijaa tunnilla, kotona ja vapaa-ajalla. Moni tekee monta asiaa samaan aikaan ja kokee silti, ettei saa mitään kunnolla valmiiksi.",
    prompts: [
      "Miten jatkuvat ilmoitukset vaikuttavat oppimiseen, työntekoon ja stressiin?",
      "Miksi moniajo tuntuu tehokkaalta, vaikka se voi heikentää keskittymistä?",
      "Mitä opiskelija voisi itse muuttaa?",
      "Mitä digipalvelut tekevät pitääkseen huomion kiinni?"
    ],
    output: [
      "Kirjatkaa 3 tavallista keskeytyslähdettä arjesta.",
      "Laatikaa 5 suositusta parempaan keskittymiseen.",
      "Valitkaa yksi neuvo opiskelijalle ja yksi neuvo koululle."
    ]
  },
  {
    id: "Teema 3",
    category: "Some",
    perspective: "Yksilö + yhteisö",
    title: "Some ja mieliala",
    situation: "Sosiaalinen media tarjoaa viihdettä, yhteisöllisyyttä ja inspiraatiota, mutta samalla vertailua, ulkopuolisuuden tunnetta ja painetta olla jatkuvasti näkyvillä. Sama palvelu voi auttaa yhtä ja kuormittaa toista.",
    prompts: [
      "Millä tavoin some voi tukea hyvinvointia?",
      "Millä tavoin se voi heikentää mielialaa tai itsetuntoa?",
      "Miksi vaikutukset ovat erilaisia eri ihmisille?",
      "Miten ryhmä voisi neuvoa nuorta käyttämään somea vastuullisemmin?"
    ],
    output: [
      "Listatkaa 2 hyötyä ja 2 haittaa mielialan näkökulmasta.",
      "Laatikaa 5 käytännön suositusta vastuulliseen somearkeen.",
      "Valitkaa yksi neuvo, jonka haluaisitte näkyviin luokan seinälle."
    ]
  },
  {
    id: "Teema 4",
    category: "Yhteiskunta",
    perspective: "Algoritmit + kuplat",
    title: "Algoritmit ohjaavat, mitä näet",
    situation: "Hakukoneet, videopalvelut ja some näyttävät sisältöjä, joiden ne arvioivat kiinnostavan käyttäjää. Tämä helpottaa arkea, mutta voi myös kaventaa näkökulmia, vahvistaa kuplia ja ohjata käyttäytymistä huomaamatta.",
    prompts: [
      "Miten algoritmit helpottavat käyttäjän arkea?",
      "Miten ne voivat vaikuttaa mielipiteisiin, kulutukseen tai käsitykseen todellisuudesta?",
      "Miksi kaikki eivät näe samoja asioita verkossa?",
      "Miten ihminen voi itse laajentaa omaa näkökulmaansa?"
    ],
    output: [
      "Kirjatkaa 3 tapaa, joilla algoritmit vaikuttavat arkeen.",
      "Laatikaa 5 suositusta, joilla kuplaa voi tunnistaa ja kaventaa.",
      "Valitkaa yksi ehdotus, joka sopii sekä opiskelijalle että aikuiselle."
    ]
  },
  {
    id: "Teema 5",
    category: "Tietosuoja",
    perspective: "Data + palvelut",
    title: "Datatalous ja yksityisyys",
    situation: "Monet sovellukset näyttävät ilmaisilta, mutta vastineeksi ne keräävät tietoa käyttäjän toiminnasta, sijainnista, kiinnostuksen kohteista ja ostokäyttäytymisestä. Tietoja hyödynnetään mainonnassa, palvelujen kehityksessä ja joskus myös päätöksenteossa.",
    prompts: [
      "Mitä hyötyä datan keräämisestä voi olla käyttäjälle tai palvelulle?",
      "Millaisia riskejä tai ongelmia tietojen keräämiseen liittyy?",
      "Tietävätkö käyttäjät yleensä riittävän hyvin, mitä heistä kerätään?",
      "Miten palvelut voisivat kertoa tietosuojasta selkeämmin?"
    ],
    output: [
      "Listatkaa 3 tietoa, joita sovellus voi kerätä käyttäjästä.",
      "Laatikaa 5 suositusta tietoisempaan digipalvelujen käyttöön.",
      "Valitkaa yksi ehdotus, jonka palveluyritysten pitäisi toteuttaa."
    ]
  },
  {
    id: "Teema 6",
    category: "Tasa-arvo",
    perspective: "Yhteiskunta + osallisuus",
    title: "Digitaalinen kuilu",
    situation: "Kaikilla ei ole samanlaisia laitteita, yhteyksiä, taitoja tai mahdollisuuksia käyttää digipalveluja. Silti yhä useampi palvelu koulussa, työssä ja yhteiskunnassa toimii ensisijaisesti verkossa.",
    prompts: [
      "Miten digitaalinen kuilu voi näkyä opiskelussa, työnhaussa tai arjen palveluissa?",
      "Ketkä voivat jäädä helpoimmin ulkopuolelle?",
      "Miksi tämä on myös yhteiskunnallinen oikeudenmukaisuuskysymys?",
      "Miten koulu tai yhteiskunta voisi pienentää digitaalista kuilua?"
    ],
    output: [
      "Nimetkää 3 tilannetta, joissa digitaaliset erot näkyvät arjessa.",
      "Laatikaa 5 suositusta tasa-arvoisempaan digiosallisuuteen.",
      "Valitkaa yksi toimenpide, jonka koulu voisi tehdä heti."
    ]
  },
  {
    id: "Teema 7",
    category: "Ympäristö",
    perspective: "Kulutus + yhteiskunta",
    title: "Laitteiden ja palvelujen ympäristövaikutukset",
    situation: "Digipalvelut tuntuvat usein aineettomilta, mutta niiden käyttö vaatii laitteita, sähköä, datakeskuksia, materiaaleja ja kuljetuksia. Uudet laitteet vaihtuvat nopeasti, vaikka vanhat toimisivat edelleen.",
    prompts: [
      "Mistä digitaalisten palvelujen ympäristövaikutukset syntyvät?",
      "Miten laitteiden nopea vaihtaminen liittyy kestävyyteen?",
      "Miten käyttäjä voi itse vaikuttaa asiaan?",
      "Mitä vastuuta on yrityksillä, koululla ja yhteiskunnalla?"
    ],
    output: [
      "Kirjatkaa 3 ympäristövaikutusta, joita digipalveluihin liittyy.",
      "Laatikaa 5 käytännön suositusta kestävämpään digiarkeen.",
      "Valitkaa yksi suositus, joka olisi helpoin toteuttaa jo tänä vuonna."
    ]
  }
];

const elements = {
  themeId: document.getElementById("themeId"),
  themeCategory: document.getElementById("themeCategory"),
  themePerspective: document.getElementById("themePerspective"),
  themeTitle: document.getElementById("themeTitle"),
  themeSituation: document.getElementById("themeSituation"),
  themeOutput: document.getElementById("themeOutput"),
  discussionPrompts: document.getElementById("discussionPrompts"),
  randomThemeBtn: document.getElementById("randomThemeBtn"),
  teacherGuideToggle: document.getElementById("teacherGuideToggle"),
  teacherGuide: document.getElementById("teacherGuide"),
  closeGuideBtn: document.getElementById("closeGuideBtn"),
  themeMenuToggle: document.getElementById("themeMenuToggle"),
  themeMenu: document.getElementById("themeMenu"),
  themeMenuList: document.getElementById("themeMenuList"),
  closeMenuBtn: document.getElementById("closeMenuBtn"),
  menuScrim: document.getElementById("menuScrim")
};

const state = {
  currentIndex: 0
};

function fillList(listElement, items) {
  listElement.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
}

function renderThemeMenu() {
  elements.themeMenuList.innerHTML = "";

  THEMES.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-menu-item" + (index === state.currentIndex ? " is-active" : "");
    button.innerHTML = `
      <small>${item.category} · ${item.perspective}</small>
      <strong>${item.title}</strong>
      <span>${item.situation}</span>
    `;
    button.addEventListener("click", () => {
      setTheme(index);
      closePanels();
    });
    elements.themeMenuList.appendChild(button);
  });
}

function renderTheme() {
  const currentTheme = THEMES[state.currentIndex];

  elements.themeId.textContent = currentTheme.id;
  elements.themeCategory.textContent = currentTheme.category;
  elements.themePerspective.textContent = currentTheme.perspective;
  elements.themeTitle.textContent = currentTheme.title;
  elements.themeSituation.textContent = currentTheme.situation;

  fillList(elements.discussionPrompts, currentTheme.prompts);
  fillList(elements.themeOutput, currentTheme.output);
  renderThemeMenu();
}

function closePanels() {
  elements.themeMenu.hidden = true;
  elements.teacherGuide.hidden = true;
  elements.menuScrim.hidden = true;
  elements.themeMenuToggle.setAttribute("aria-expanded", "false");
  elements.teacherGuideToggle.setAttribute("aria-expanded", "false");
}

function openThemeMenu() {
  closePanels();
  elements.themeMenu.hidden = false;
  elements.menuScrim.hidden = false;
  elements.themeMenuToggle.setAttribute("aria-expanded", "true");
}

function openTeacherGuide() {
  closePanels();
  elements.teacherGuide.hidden = false;
  elements.menuScrim.hidden = false;
  elements.teacherGuideToggle.setAttribute("aria-expanded", "true");
}

function setTheme(index) {
  state.currentIndex = index;
  renderTheme();
}

function setRandomTheme() {
  const options = THEMES.map((_, index) => index).filter((index) => index !== state.currentIndex);
  const nextIndex = options[Math.floor(Math.random() * options.length)] ?? 0;
  setTheme(nextIndex);
}

function bindEvents() {
  elements.randomThemeBtn.addEventListener("click", setRandomTheme);
  elements.themeMenuToggle.addEventListener("click", () => {
    if (elements.themeMenu.hidden) {
      openThemeMenu();
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
      setRandomTheme();
    }
  });
}

function init() {
  bindEvents();
  state.currentIndex = Math.floor(Math.random() * THEMES.length);
  renderTheme();
}

document.addEventListener("DOMContentLoaded", init);