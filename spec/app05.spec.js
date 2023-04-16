const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const { runPaletteTest, runPaletteTestMultiple, checkProportions } =
  testingUtils;

describe("/api", function () {
  this.timeout(7000);

  describe("/palette - Stage 28: Correct Polish grammar re gender.", () => {
    it("#pal28-01a GET 200 YES: Engpol. Polish m2 nouns are not virile.", () => {
      return runPaletteTest("ENG", "POL", "dummy75", [
        {
          ENG: ["Rats were red."],
          POL: ["Szczury były czerwone."],
        },
        {
          ENG: ["Rat was red."],
          POL: ["Szczur był czerwony."],
        },
      ]);
    });
    it("#pal28-01b GET 200 YES: Poleng. Polish m2 nouns are not virile.", () => {
      return runPaletteTest("POL", "ENG", "dummy75", [
        {
          ENG: [
            "Rats were red.",
            "Rats were being red.",
            "Rats have been red.",
            "Rats had been red.",
          ],
          POL: ["Szczury były czerwone."],
        },
        {
          ENG: [
            "Rat was red.",
            "Rat was being red.",
            "Rat has been red.",
            "Rat had been red.",
          ],
          POL: ["Szczur był czerwony."],
        },
      ]);
    });
  });

  describe("/palette - Stage 27: Complex nexus connections.", () => {
    const dummy73a = [
      {
        POL: ["Czerwone dziecko."],
        ENG: ["Red child.", "Red baby."],
      },
      {
        POL: ["Czerwone dzieci."],
        ENG: ["Red children.", "Red babies."],
      },
    ];
    it("#pal27-01a GET 200 YES: Poleng. Dziecko should translate as Child and also Baby.", () => {
      return runPaletteTest("POL", "ENG", "dummy73a", dummy73a);
    });
    it("#pal27-01b GET 200 YES: Engpol. Dziecko should translate as Child and also Baby.", () => {
      return runPaletteTest("ENG", "POL", "dummy73a", dummy73a);
    });
    const dummy73b = [
      {
        POL: ["Czerwone dziecko."],
        ENG: ["Red child.", "Red baby."],
      },
      {
        POL: ["Czerwona dziewczyna."],
        ENG: ["Red girl."],
      },
      {
        POL: ["Czerwone dzieci."],
        ENG: ["Red children.", "Red babies."],
      },
      {
        POL: ["Czerwone dziewczyny."],
        ENG: ["Red girls."],
      },
    ];
    it("#pal27-01c GET 200 YES: Poleng. Dziecko selectable by gender f.", () => {
      return runPaletteTest("POL", "ENG", "dummy73b", dummy73b);
    });
    it("#pal27-01d GET 200 YES: Engpol. Dziecko selectable by gender f.", () => {
      return runPaletteTest("ENG", "POL", "dummy73b", dummy73b);
    });
    it("#pal27-02a GET 200 YES: Poleng. I was a good person - masculine I should still be dobrą osobą.", () => {
      return runPaletteTest("POL", "ENG", "124b", [
        {
          ENG: ["I was/i a good person."],
          POL: ["Ja byłam dobrą osobą."],
        },
        {
          ENG: ["I was/i a good person."],
          POL: ["Ja byłem dobrą osobą."],
          extra: { FYIPs: ["FYIP101-A-POL-ENG"] },
        },
        {
          ENG: ["We were/ good people."],
          POL: [
            "My byłyśmy dobrymi osobami/ludźmi.",
            "My byliśmy dobrymi osobami/ludźmi.",
          ],
        },
      ]);
    });
    it("#pal27-02b GET 200 YES: Engpol. I was a good person - masculine I should still be dobrą osobą.", () => {
      return runPaletteTest("ENG", "POL", "124b", [
        {
          ENG: ["I (female) was a good person."],
          POL: ["Ja byłam dobrą osobą."],
        },
        {
          ENG: ["I (male) was a good person."],
          POL: ["Ja byłem dobrą osobą."],
          extra: { FYIPs: ["FYIP101-A-ENG-POL"] },
        },
        {
          ENG: ["We (males) were good people.", "We (mixed) were good people."],
          POL: ["My byliśmy dobrymi osobami/ludźmi."],
        },
        {
          ENG: ["We (females) were good people."],
          POL: ["My byłyśmy dobrymi osobami/ludźmi."],
        },
      ]);
    });
    it("#pal27-02c GET 200 YES: Poleng. I was a good person - singular/plural equal proportion.", () => {
      return runPaletteTestMultiple(
        50,
        "POL",
        "ENG",
        "124b",
        [],
        {},
        1,
        true
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          [
            "singular",
            ["Ja byłam dobrą osobą.", "Ja byłem dobrą osobą."],
            0.5,
            0.35,
          ],
          [
            "plural",
            [
              "My byłyśmy dobrymi osobami/ludźmi.",
              "My byliśmy dobrymi osobami/ludźmi.",
            ],
            0.5,
            0.35,
          ],
        ]);
      });
    });
    it("#pal27-02d GET 200 YES: Engpol. 'person' singular does not translate to 'ludzie'.", () => {
      return runPaletteTest("ENG", "POL", "dummy74", [
        {
          ENG: ["One red person."],
          POL: ["Jedna czerwona osoba."],
        },
      ]);
    });
    it("#pal27-02dd GET 200 YES: Engpol. Counterpart of #pal27-02d but not really necessary.", () => {
      return runPaletteTest("POL", "ENG", "dummy74", [
        {
          ENG: ["One red person."],
          POL: ["Jedna czerwona osoba."],
        },
      ]);
    });
    it("#pal27-02e GET 200 YES: Poleng. I was a good person - masculine I should still be dobrą osobą.", () => {
      return runPaletteTest("POL", "ENG", "124c", [
        {
          ENG: ["I was/i a good person."],
          POL: ["Ja byłam dobrą osobą."],
        },
        {
          ENG: ["I was/i a good person."],
          POL: ["Ja byłem dobrą osobą."],
          extra: { FYIPs: ["FYIP101-A-POL-ENG"] },
        },
        {
          ENG: ["We were/ good people."],
          POL: [
            "My byłyśmy dobrymi osobami/ludźmi.",
            "My byliśmy dobrymi osobami/ludźmi.",
          ],
        },
        {
          ENG: ["I was/i a good man."],
          POL: ["Ja byłem dobrym mężczyzną."],
        },
        {
          ENG: ["We were/ good men."],
          POL: ["My byliśmy dobrymi mężczyznami."],
        },
        {
          ENG: ["I was/i a good woman/lady."],
          POL: ["Ja byłam dobrą kobietą."],
        },
        {
          ENG: ["We were/ good women/ladies."],
          POL: ["My byłyśmy dobrymi kobietami."],
        },
      ]);
    });
    it("#pal27-02f GET 200 YES: Engpol. I was a good person - masculine I should still be dobrą osobą.", () => {
      return runPaletteTest("ENG", "POL", "124c", [
        {
          ENG: ["I (female) was a good person."],
          POL: ["Ja byłam dobrą osobą."],
        },
        {
          ENG: ["I (male) was a good person."],
          POL: ["Ja byłem dobrą osobą."],
          extra: { FYIPs: ["FYIP101-A-ENG-POL"] },
        },
        {
          ENG: ["We (males) were good people.", "We (mixed) were good people."],
          POL: ["My byliśmy dobrymi osobami/ludźmi."],
        },
        {
          ENG: ["We (females) were good people."],
          POL: ["My byłyśmy dobrymi osobami/ludźmi."],
        },
        {
          ENG: ["I was a good man."],
          POL: ["Ja byłem dobrym mężczyzną."],
        },
        {
          ENG: ["We were good men."],
          POL: ["My byliśmy dobrymi mężczyznami."],
        },
        {
          ENG: ["I was a good woman/lady."],
          POL: ["Ja byłam dobrą kobietą."],
        },
        {
          ENG: ["We were good women/ladies."],
          POL: ["My byłyśmy dobrymi kobietami."],
        },
      ]);
    });
  });

  describe("/palette - Stage 26-i: Spanish basic. Normal nouns.", () => {
    const dummy72a = [
      {
        ENG: ["Red bear."],
        SPA: ["Rojo oso."],
        POL: ["Czerwony niedźwiedź."],
      },
      {
        ENG: ["Red onion."],
        SPA: ["Roja cebolla."],
        POL: ["Czerwona cebula."],
      },
      {
        ENG: ["Red bears."],
        SPA: ["Rojos osos."],
        POL: ["Czerwone niedźwiedzie."],
      },
      {
        ENG: ["Red onions."],
        SPA: ["Rojas cebollas."],
        POL: ["Czerwone cebule."],
      },
    ];
    it("#pal26-01a GET 200 YES: Polspa. Red onion (NORMAL).", () => {
      return runPaletteTest("POL", "SPA", "dummy72a", dummy72a);
    });
    it("#pal26-01b GET 200 YES: Spapol. Red onion (NORMAL).", () => {
      return runPaletteTest("SPA", "POL", "dummy72a", dummy72a);
    });
    it("#pal26-01c GET 200 YES: Engspa. Red onion (NORMAL).", () => {
      return runPaletteTest("ENG", "SPA", "dummy72a", dummy72a);
    });
    it("#pal26-01d GET 200 YES: Spaeng. Red onion (NORMAL).", () => {
      return runPaletteTest("SPA", "ENG", "dummy72a", dummy72a);
    });
  });

  describe("/palette - Stage 26-ii: Spanish basic. Hypernyms and Vypernyms", () => {
    it("#pal26-02a GET 200 YES: Polspa. Red doctor (MGN).", () => {
      return runPaletteTest("POL", "SPA", "dummy72b", [
        {
          POL: ["Czerwony lekarz."],
          SPA: ["Rojo medico."],
        },
        {
          POL: ["Czerwona lekarka."],
          SPA: ["Roja medica."],
        },
        {
          POL: ["Czerwoni lekarze."],
          SPA: ["Rojos medicos."],
        },
        {
          POL: ["Czerwoni lekarze (mixed)."],
          SPA: ["Rojos medicos."],
        },
        {
          POL: ["Czerwoni lekarze (males)."],
          SPA: ["Rojos medicos."],
        },
        {
          POL: ["Czerwone lekarki."],
          SPA: ["Rojas medicas."],
        },
      ]);
    });
    it("#pal26-02b GET 200 YES: Spapol. Red doctor (MGN).", () => {
      return runPaletteTest("SPA", "POL", "dummy72b", [
        {
          POL: ["Czerwony lekarz."],
          SPA: ["Rojo medico."],
        },
        {
          POL: ["Czerwona lekarka."],
          SPA: ["Roja medica."],
        },
        {
          POL: ["Czerwoni lekarze."],
          SPA: ["Rojos medicos (males)."],
        },
        {
          POL: ["Czerwoni lekarze."],
          SPA: ["Rojos medicos."],
        },
        {
          POL: ["Czerwone lekarki."],
          SPA: ["Rojas medicas."],
        },
      ]);
    });
    it("#pal26-02c GET 200 YES: Engspa. Red doctor (MGN).", () => {
      return runPaletteTest("ENG", "SPA", "dummy72b", [
        {
          ENG: ["Red doctor (male)."],
          SPA: ["Rojo medico."],
        },
        {
          ENG: ["Red doctor (female)."],
          SPA: ["Roja medica."],
        },
        {
          ENG: ["Red doctors (males)."],
          SPA: ["Rojos medicos."],
        },
        {
          ENG: ["Red doctors (mixed)."],
          SPA: ["Rojos medicos."],
        },
        {
          ENG: ["Red doctors (females)."],
          SPA: ["Rojas medicas."],
        },
      ]);
    });
    it("#pal26-02d GET 200 YES: Spaeng. Red doctor (MGN).", () => {
      return runPaletteTest("SPA", "ENG", "dummy72b", [
        {
          SPA: ["Rojo medico."],
          ENG: ["Red doctor."],
        },
        {
          SPA: ["Roja medica."],
          ENG: ["Red doctor."],
        },
        {
          SPA: ["Rojos medicos."],
          ENG: ["Red doctors."],
        },
        {
          SPA: ["Rojas medicas."],
          ENG: ["Red doctors."],
        },
      ]);
    });
  });

  describe("/palette - Stage 26-iii: Spanish basic. Hypernyms and Vypernyms", () => {
    it("#pal26-03a GET 200 YES: Polspa. Red mother (Vypernym).", () => {
      return runPaletteTest("POL", "SPA", "dummy72c", [
        { POL: ["Czerwona matka."], SPA: ["Roja madre."] },
        { POL: ["Czerwone matki."], SPA: ["Rojas madres."] },
        { POL: ["Czerwony ojciec."], SPA: ["Rojo padre."] },
        { POL: ["Czerwoni ojcowie."], SPA: ["Rojos padres."] },
        { POL: ["Czerwoni rodzice (males)."], SPA: ["Rojos padres."] },
        { POL: ["Czerwoni rodzice (mixed)."], SPA: ["Rojos padres."] },
        { POL: ["Czerwoni rodzice (females)."], SPA: ["Rojas madres."] },
        { POL: ["Czerwony rodzic (male)."], SPA: ["Rojo padre."] },
        { POL: ["Czerwony rodzic (female)."], SPA: ["Roja madre."] },
      ]);
    });
    it("#pal26-03b GET 200 YES: Spapol. Red mother (Vypernym).", () => {
      return runPaletteTest("SPA", "POL", "dummy72c", [
        { POL: ["Czerwona matka."], SPA: ["Roja madre."] },
        { POL: ["Czerwone matki."], SPA: ["Rojas madres."] },
        { POL: ["Czerwony ojciec.", "Czerwony rodzic."], SPA: ["Rojo padre."] },
        { POL: ["Czerwony ojciec."], SPA: ["Rojo padre (male)."] },
        {
          POL: ["Czerwoni ojcowie.", "Czerwoni rodzice."],
          SPA: ["Rojos padres."],
        },
        { POL: ["Czerwoni ojcowie."], SPA: ["Rojos padres (males)."] },
        { POL: ["Czerwoni rodzice."], SPA: ["Rojos padres (mixed)."] },
      ]);
    });
    it("#pal26-03c GET 200 YES: Engspa. Red mother (Vypernym).", () => {
      return runPaletteTest("ENG", "SPA", "dummy72c", [
        { ENG: ["Red mother."], SPA: ["Roja madre."] },
        { ENG: ["Red mothers."], SPA: ["Rojas madres."] },
        { ENG: ["Red father."], SPA: ["Rojo padre."] },
        { ENG: ["Red fathers."], SPA: ["Rojos padres."] },
        { ENG: ["Red parents (mixed)."], SPA: ["Rojos padres."] },
        { ENG: ["Red parents (males)."], SPA: ["Rojos padres."] },
        { ENG: ["Red parents (females)."], SPA: ["Rojas madres."] },
        { ENG: ["Red parent (male)."], SPA: ["Rojo padre."] },
        { ENG: ["Red parent (female)."], SPA: ["Roja madre."] },
      ]);
    });
    it("#pal26-03d GET 200 YES: Spaeng. Red mother (Vypernym).", () => {
      return runPaletteTest("SPA", "ENG", "dummy72c", [
        { ENG: ["Red mother."], SPA: ["Roja madre."] },
        { ENG: ["Red mothers."], SPA: ["Rojas madres."] },
        { ENG: ["Red father.", "Red parent."], SPA: ["Rojo padre."] },
        { ENG: ["Red father."], SPA: ["Rojo padre (male)."] },
        { ENG: ["Red fathers.", "Red parents."], SPA: ["Rojos padres."] },
        { ENG: ["Red fathers."], SPA: ["Rojos padres (males)."] },
        { ENG: ["Red parents."], SPA: ["Rojos padres (mixed)."] },
      ]);
    });
    it("#pal26-03e GET 200 YES: Enpol. Red mother (Vypernym).", () => {
      return runPaletteTest("ENG", "POL", "dummy72c", [
        { ENG: ["Red mother."], POL: ["Czerwona matka."] },
        { ENG: ["Red mothers."], POL: ["Czerwone matki."] },
        { ENG: ["Red father."], POL: ["Czerwony ojciec."] },
        { ENG: ["Red fathers."], POL: ["Czerwoni ojcowie."] },
        { ENG: ["Red parents."], POL: ["Czerwoni rodzice."] },
        { ENG: ["Red parent."], POL: ["Czerwony rodzic."] },
      ]);
    });
    it("#pal26-03f GET 200 YES: Poleng. Red mother (Vypernym).", () => {
      return runPaletteTest("POL", "ENG", "dummy72c", [
        { ENG: ["Red mother."], POL: ["Czerwona matka."] },
        { ENG: ["Red mothers."], POL: ["Czerwone matki."] },
        { ENG: ["Red father."], POL: ["Czerwony ojciec."] },
        { ENG: ["Red fathers."], POL: ["Czerwoni ojcowie."] },
        { ENG: ["Red parents."], POL: ["Czerwoni rodzice."] },
        { ENG: ["Red parent."], POL: ["Czerwony rodzic."] },
      ]);
    });
  });

  describe("/palette - Stage 26-iv: Spanish basic. HypernymyProportion adjustment but just for mother/father/parent.", () => {
    it("#pal26-04a GET 200 YES: Polspa. Red mother (Vypernym).", () => {
      return runPaletteTestMultiple(
        250,
        "POL",
        "SPA",
        "dummy72c",
        [],
        {},
        1,
        true
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["matka", ["Czerwona matka."], 0.265, 0.35],
          ["ojciec", ["Czerwony ojciec."], 0.265, 0.35],
          ["rodzice", ["Czerwoni rodzice."], 0.265, 0.35],

          ["matki", ["Czerwone matki."], 0.065, 0.65],
          ["ojcowie", ["Czerwoni ojcowie."], 0.065, 0.65],
          ["rodzic", ["Czerwony rodzic."], 0.065, 0.65],
        ]);
      });
    });
    it("#pal26-04b GET 200 YES: Poleng. Red mother (Vypernym).", () => {
      return runPaletteTestMultiple(
        250,
        "POL",
        "ENG",
        "dummy72c",
        [],
        {},
        1,
        true
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["matka", ["Czerwona matka."], 0.265, 0.35],
          ["ojciec", ["Czerwony ojciec."], 0.265, 0.35],
          ["rodzice", ["Czerwoni rodzice."], 0.265, 0.35],

          ["matki", ["Czerwone matki."], 0.065, 0.65],
          ["ojcowie", ["Czerwoni ojcowie."], 0.065, 0.65],
          ["rodzic", ["Czerwony rodzic."], 0.065, 0.65],
        ]);
      });
    });
    it("#pal26-04c GET 200 YES: Spapol. Red mother (Vypernym).", () => {
      return runPaletteTestMultiple(
        250,
        "SPA",
        "POL",
        "dummy72c",
        [],
        {},
        1,
        true
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["madre", ["Roja madre."], 0.3, 0.55],
          ["padre", ["Rojo padre."], 0.3, 0.55],
          ["padres", ["Rojos padres."], 0.3, 0.55],

          ["madres", ["Rojas madres."], 0.1, 0.65],
        ]);
      });
    });
    it("#pal26-04d GET 200 YES: Spaeng. Red mother (Vypernym).", () => {
      runPaletteTestMultiple(
        250,
        "SPA",
        "ENG",
        "dummy72c",
        [],
        {},
        1,
        true
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["madre", ["Roja madre."], 0.3, 0.55],
          ["padre", ["Rojo padre."], 0.3, 0.55],
          ["padres", ["Rojos padres."], 0.3, 0.55],

          ["madres", ["Rojas madres."], 0.1, 0.65],
        ]);
      });
    });
    it("#pal26-04e GET 200 YES: Engpol. Red mother (Vypernym).", () => {
      return runPaletteTestMultiple(
        250,
        "ENG",
        "POL",
        "dummy72c",
        [],
        {},
        1,
        true
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["mother", ["Red mother."], 0.265, 0.35],
          ["father", ["Red father."], 0.265, 0.35],
          ["parents", ["Red parents."], 0.265, 0.35],

          ["parent", ["Red parent."], 0.065, 0.65],
          ["mothers", ["Red mothers."], 0.065, 0.65],
          ["fathers", ["Red fathers."], 0.065, 0.65],
        ]);
      });
    });
    it("#pal26-04f GET 200 YES: Engspa. Red mother (Vypernym).", () => {
      return runPaletteTestMultiple(
        250,
        "ENG",
        "SPA",
        "dummy72c",
        [],
        {},
        1,
        true
      ).then((allQuestionSentences) => {
        checkProportions(allQuestionSentences, [
          ["mother", ["Red mother."], 0.265, 0.35],
          ["father", ["Red father."], 0.265, 0.35],
          ["parents", ["Red parents."], 0.265, 0.35],

          ["parent", ["Red parent."], 0.065, 0.65],
          ["mothers", ["Red mothers."], 0.065, 0.65],
          ["fathers", ["Red fathers."], 0.065, 0.65],
        ]);
      });
    });
  });
});
