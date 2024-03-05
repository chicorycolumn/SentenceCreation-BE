const apiUtils = require("../utils/secondOrder/apiUtils");
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const uUtils = require("../utils/universalUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const {
  runPaletteTest1,
  runPaletteTest2,
  runPaletteTest1Multiple,
  checkProportions,
} = testingUtils;

describe("/api", function () {
  this.timeout(7000);
  apiUtils.setEnvir({ body: { envir: "ref" } });

  xdescribe("/palette - Stage 30: Modal verbs, and contractions.", () => {
    describe("#pal30-01 Will not.", () => {
      it(`#pal30-01a GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "125a", [
          {
            ENG: ["I will not read.", "I won't read."], // "I'll not" is correct but uncommon, so I want to accept it for A but never give as Q.

            // Okay, it's already accepted for A because contractions get expanded, so if player types
            // "I'll not" or "I won't" or "I will not" they all get verified as "I will not"

            // As for the Q, I want to not generate "I'll not"

            POL: ["Nie przeczytam."],
          },
        ]);
      });
      it(`#pal30-01b GET 200 YES: Poleng.`, () => {
        return runPaletteTest2("POL", "ENG", "125a", [
          {
            POL: ["Nie przeczytam."],
            ENG: [
              "I will not read.",
              "I am not going to read.",
              "I will not have read.",
              "I will have not read.",
            ],
          },
        ]);
      });
    });
  });

  describe("/palette - Stage 29: Programmatic negatives, and contractions.", () => {
    describe("#pal29-01 Negative Be (simple).", () => {
      it(`#pal29-01a GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123aa", [
          {
            ENG: ["He is not red.", "He's not red.", "He isn't red."],
            POL: ["Nie jest czerwony.", "On nie jest czerwony."],
          },
        ]);
      });
      it(`#pal29-01b GET 200 YES: Poleng. Negative in ENG should move position relative to verb words.`, () => {
        return runPaletteTest2("POL", "ENG", "123aa", [
          {
            POL: ["Nie jest czerwony.", "On nie jest czerwony."],
            ENG: ["He is not red."],
          },
        ]);
      });
      it(`#pal29-01a(i) GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123aaa", [
          {
            ENG: ["He is not here.", "He's not here.", "He isn't here."],
            POL: ["Nie jest tutaj.", "On nie jest tutaj."],
          },
        ]);
      });
      it(`#pal29-01b(ii) GET 200 YES: Poleng. Negative in ENG should move position relative to verb words.`, () => {
        return runPaletteTest2("POL", "ENG", "123aaa", [
          {
            POL: ["Nie jest (male) tutaj.", "On nie jest tutaj."],
            ENG: ["He is not here."],
          },
        ]);
      });
      it(`#pal29-01c GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123ab", [
          {
            ENG: ["He was not red.", "He wasn't red."],
            POL: ["Nie był czerwony.", "On nie był czerwony."],
          },
        ]);
      });
      it(`#pal29-01d GET 200 YES: Poleng. Negative in ENG should move position relative to verb words.`, () => {
        return runPaletteTest2("POL", "ENG", "123ab", [
          {
            POL: ["Nie był czerwony.", "On nie był czerwony."],
            ENG: [
              "He was not red.",
              "He has not been red.",
              "He had not been red.",
            ],
          },
        ]);
      });
    });
    describe("#pal29-02 Negative Have (simple).", () => {
      it(`#pal29-02a GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123ba", [
          {
            ENG: ["He does not have apples.", "He doesn't have apples."],
            POL: ["Nie ma jabłek.", "On nie ma jabłek."],
          },
        ]);
      });
      it(`#pal29-02b GET 200 YES: Poleng. Negative in ENG should move position relative to verb words.`, () => {
        return runPaletteTest2("POL", "ENG", "123ba", [
          {
            POL: ["Nie ma (male) jabłek.", "On nie ma jabłek."],
            ENG: ["He does not have apples."],
          },
        ]);
      });
      it(`#pal29-02b(ii) GET 200 YES: Poleng. stativeOverrideFalse.`, () => {
        return runPaletteTest2("POL", "ENG", "123baa", [
          {
            POL: ["Nie ma (male) jabłek.", "On nie ma jabłek."],
            ENG: ["He does not have apples.", "He is not having apples."],
          },
        ]);
      });
      it(`#pal29-02c GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123bb", [
          {
            ENG: ["He did not have apples.", "He didn't have apples."],
            POL: ["Nie miał jabłek.", "On nie miał jabłek."],
          },
        ]);
      });
      it(`#pal29-02d GET 200 YES: Poleng. Negative in ENG should move position relative to verb words.`, () => {
        return runPaletteTest2("POL", "ENG", "123bb", [
          {
            POL: ["Nie miał jabłek.", "On nie miał jabłek."],
            ENG: [
              "He did not have apples.",
              "He has not had apples.",
              "He had not had apples.",
            ],
          },
        ]);
      });
    });
    describe("#pal29-03 Negative Write (simple).", () => {
      it(`#pal29-03a GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123ca", [
          {
            ENG: ["He does not write.", "He doesn't write."],
            POL: ["Nie pisze.", "On nie pisze."],
          },
        ]);
      });
      it(`#pal29-03b GET 200 YES: Poleng. Negative in ENG should move position relative to verb words.`, () => {
        return runPaletteTest2("POL", "ENG", "123ca", [
          {
            POL: ["Nie pisze (male).", "On nie pisze."],
            ENG: ["He does not write.", "He is not writing."],
          },
        ]);
      });
      it(`#pal29-03b(ii) GET 200 YES: Poleng. stativeOverrideTrue.`, () => {
        return runPaletteTest2("POL", "ENG", "123caa", [
          {
            POL: ["Nie pisze (male).", "On nie pisze."],
            ENG: ["He does not write."],
          },
        ]);
      });
      it(`#pal29-03c GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123cb", [
          {
            ENG: ["He did not write.", "He didn't write."],
            POL: ["Nie napisał.", "On nie napisał."],
          },
        ]);
      });
      it(`#pal29-03d GET 200 YES: Poleng. Negative in ENG should move position relative to verb words.`, () => {
        return runPaletteTest2("POL", "ENG", "123cb", [
          {
            POL: ["Nie napisał.", "On nie napisał."],
            ENG: [
              "He did not write.",
              "He has not written.",
              "He had not written.",
            ],
          },
        ]);
      });
    });
    describe("#pal29-04 Negative Be (perfect).", () => {
      it(`#pal29-04a GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123da", [
          {
            ENG: [
              "He has not been red.",
              "He hasn't been red.",
              "He's not been red.",
            ],
            POL: ["Nie był czerwony.", "On nie był czerwony."],
          },
        ]);
      });
      it(`#pal29-04c GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123db", [
          {
            ENG: [
              "He had not been red.",
              "He hadn't been red.",
              "He'd not been red.",
            ],
            POL: ["Nie był czerwony.", "On nie był czerwony."],
          },
        ]);
      });
    });
    describe("#pal29-05 Negative Have (perfect).", () => {
      it(`#pal29-05a GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123ea", [
          {
            ENG: [
              "He has not had apples.",
              "He hasn't had apples.",
              "He's not had apples.",
            ],
            POL: ["Nie miał jabłek.", "On nie miał jabłek."],
          },
        ]);
      });
      it(`#pal29-05c GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123eb", [
          {
            ENG: [
              "He had not had apples.",
              "He hadn't had apples.",
              "He'd not had apples.",
            ],
            POL: ["Nie miał jabłek.", "On nie miał jabłek."],
          },
        ]);
      });
    });
    describe("#pal29-06 Negative Write (perfect).", () => {
      it(`#pal29-06a GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123fa", [
          {
            ENG: [
              "He has not written.",
              "He hasn't written.",
              "He's not written.",
            ],
            POL: [
              "Nie napisał.",
              "On nie napisał.",
              "Nie pisał.",
              "On nie pisał.",
            ],
          },
        ]);
      });
      it(`#pal29-06c GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123fb", [
          {
            ENG: [
              "He had not written.",
              "He hadn't written.",
              "He'd not written.",
            ],
            POL: ["Nie napisał.", "On nie napisał."],
          },
        ]);
      });
    });
    describe("#pal29-07 Negative Be (future).", () => {
      it(`#pal29-07a GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123g", [
          {
            ENG: ["My onion will not be red.", "My onion won't be red."],
            POL: ["Moja cebula nie będzie czerwoną."],
          },
        ]);
      });
      it(`#pal29-07b GET 200 YES: Poleng.`, () => {
        return runPaletteTest2("POL", "ENG", "123g", [
          {
            POL: ["Moja cebula nie będzie czerwoną."],
            ENG: [
              "My onion will not be red.",
              "My onion will not have been red.",
              "My onion will have not been red.",
              "My onion is not going to be red.",
            ],
          },
        ]);
      });
      it(`#pal29-07c GET 200 YES: Engpol.`, () => {
        return runPaletteTest2("ENG", "POL", "123h", [
          {
            ENG: [
              "My onion will not have been red.",
              "My onion won't have been red.",
              "My onion will have not been red.",
            ],
            POL: ["Moja cebula nie będzie czerwoną."],
          },
        ]);
      });
    });
  });

  describe("/palette - Stage 28: Correct Polish grammar re gender.", () => {
    it(`#pal28-01a GET 200 YES: Engpol. Polish m2 nouns are not virile.`, () => {
      return runPaletteTest1("ENG", "POL", "dummy75", [
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
    it(`#pal28-01b GET 200 YES: Poleng. Polish m2 nouns are not virile.`, () => {
      return runPaletteTest1("POL", "ENG", "dummy75", [
        {
          ENG: ["Rats were red.", "Rats have been red.", "Rats had been red."],
          POL: ["Szczury były czerwone."],
        },
        {
          ENG: ["Rat was red.", "Rat has been red.", "Rat had been red."],
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
    it(`#pal27-01a GET 200 YES: Poleng. Dziecko should translate as Child and also Baby.`, () => {
      return runPaletteTest1("POL", "ENG", "dummy73a", dummy73a);
    });
    it(`#pal27-01b GET 200 YES: Engpol. Dziecko should translate as Child and also Baby.`, () => {
      return runPaletteTest1("ENG", "POL", "dummy73a", dummy73a);
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
    it(`#pal27-01c GET 200 YES: Poleng. Dziecko selectable by gender f.`, () => {
      return runPaletteTest1("POL", "ENG", "dummy73b", dummy73b);
    });
    it(`#pal27-01d GET 200 YES: Engpol. Dziecko selectable by gender f.`, () => {
      return runPaletteTest1("ENG", "POL", "dummy73b", dummy73b);
    });
    it(`#pal27-02a GET 200 YES: Poleng. I was a good person - masculine I should still be dobrą osobą.`, () => {
      return runPaletteTest1("POL", "ENG", "124b", [
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
    it(`#pal27-02b GET 200 YES: Engpol. I was a good person - masculine I should still be dobrą osobą.`, () => {
      return runPaletteTest1("ENG", "POL", "124b", [
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
    it(`#pal27-02c GET 200 YES: Poleng. I was a good person - singular/plural equal proportion.`, () => {
      return runPaletteTest1Multiple(
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
    it(`#pal27-02d GET 200 YES: Engpol. 'person' singular does not translate to 'ludzie'.`, () => {
      return runPaletteTest1("ENG", "POL", "dummy74", [
        {
          ENG: ["One red person."],
          POL: ["Jedna czerwona osoba."],
        },
      ]);
    });
    it(`#pal27-02dd GET 200 YES: Engpol. Counterpart of #pal27-02d but not really necessary.`, () => {
      return runPaletteTest1("POL", "ENG", "dummy74", [
        {
          ENG: ["One red person."],
          POL: ["Jedna czerwona osoba."],
        },
      ]);
    });
    it(`#pal27-02e GET 200 YES: Poleng. I was a good person - masculine I should still be dobrą osobą.`, () => {
      return runPaletteTest1("POL", "ENG", "124c", [
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
    it(`#pal27-02f GET 200 YES: Engpol. I was a good person - masculine I should still be dobrą osobą.`, () => {
      return runPaletteTest1("ENG", "POL", "124c", [
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
    it(`#pal26-01a GET 200 YES: Polspa. Red onion (NORMAL).`, () => {
      return runPaletteTest1("POL", "SPA", "dummy72a", dummy72a);
    });
    it(`#pal26-01b GET 200 YES: Spapol. Red onion (NORMAL).`, () => {
      return runPaletteTest1("SPA", "POL", "dummy72a", dummy72a);
    });
    it(`#pal26-01c GET 200 YES: Engspa. Red onion (NORMAL).`, () => {
      return runPaletteTest1("ENG", "SPA", "dummy72a", dummy72a);
    });
    it(`#pal26-01d GET 200 YES: Spaeng. Red onion (NORMAL).`, () => {
      return runPaletteTest1("SPA", "ENG", "dummy72a", dummy72a);
    });
  });

  describe("/palette - Stage 26-ii: Spanish basic. Hypernyms and Vypernyms", () => {
    it(`#pal26-02a GET 200 YES: Polspa. Red doctor (MGN).`, () => {
      return runPaletteTest1("POL", "SPA", "dummy72b", [
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
    it(`#pal26-02b GET 200 YES: Spapol. Red doctor (MGN).`, () => {
      return runPaletteTest1("SPA", "POL", "dummy72b", [
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
    it(`#pal26-02c GET 200 YES: Engspa. Red doctor (MGN).`, () => {
      return runPaletteTest1("ENG", "SPA", "dummy72b", [
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
    it(`#pal26-02d GET 200 YES: Spaeng. Red doctor (MGN).`, () => {
      return runPaletteTest1("SPA", "ENG", "dummy72b", [
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
    it(`#pal26-03a GET 200 YES: Polspa. Red mother (Vypernym).`, () => {
      return runPaletteTest1("POL", "SPA", "dummy72c", [
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
    it(`#pal26-03b GET 200 YES: Spapol. Red mother (Vypernym).`, () => {
      return runPaletteTest1("SPA", "POL", "dummy72c", [
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
    it(`#pal26-03c GET 200 YES: Engspa. Red mother (Vypernym).`, () => {
      return runPaletteTest1("ENG", "SPA", "dummy72c", [
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
    it(`#pal26-03d GET 200 YES: Spaeng. Red mother (Vypernym).`, () => {
      return runPaletteTest1("SPA", "ENG", "dummy72c", [
        { ENG: ["Red mother."], SPA: ["Roja madre."] },
        { ENG: ["Red mothers."], SPA: ["Rojas madres."] },
        { ENG: ["Red father.", "Red parent."], SPA: ["Rojo padre."] },
        { ENG: ["Red father."], SPA: ["Rojo padre (male)."] },
        { ENG: ["Red fathers.", "Red parents."], SPA: ["Rojos padres."] },
        { ENG: ["Red fathers."], SPA: ["Rojos padres (males)."] },
        { ENG: ["Red parents."], SPA: ["Rojos padres (mixed)."] },
      ]);
    });
    it(`#pal26-03e GET 200 YES: Enpol. Red mother (Vypernym).`, () => {
      return runPaletteTest1("ENG", "POL", "dummy72c", [
        { ENG: ["Red mother."], POL: ["Czerwona matka."] },
        { ENG: ["Red mothers."], POL: ["Czerwone matki."] },
        { ENG: ["Red father."], POL: ["Czerwony ojciec."] },
        { ENG: ["Red fathers."], POL: ["Czerwoni ojcowie."] },
        { ENG: ["Red parents."], POL: ["Czerwoni rodzice."] },
        { ENG: ["Red parent."], POL: ["Czerwony rodzic."] },
      ]);
    });
    it(`#pal26-03f GET 200 YES: Poleng. Red mother (Vypernym).`, () => {
      return runPaletteTest1("POL", "ENG", "dummy72c", [
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
    it(`#pal26-04a GET 200 YES: Polspa. Red mother (Vypernym).`, () => {
      return runPaletteTest1Multiple(
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
    it(`#pal26-04b GET 200 YES: Poleng. Red mother (Vypernym).`, () => {
      return runPaletteTest1Multiple(
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
    it(`#pal26-04c GET 200 YES: Spapol. Red mother (Vypernym).`, () => {
      return runPaletteTest1Multiple(
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
    it(`#pal26-04d GET 200 YES: Spaeng. Red mother (Vypernym).`, () => {
      runPaletteTest1Multiple(
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
    it(`#pal26-04e GET 200 YES: Engpol. Red mother (Vypernym).`, () => {
      return runPaletteTest1Multiple(
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
    it(`#pal26-04f GET 200 YES: Engspa. Red mother (Vypernym).`, () => {
      return runPaletteTest1Multiple(
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
