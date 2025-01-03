const apiUtils = require("../utils/secondOrder/apiUtils");
const app = require("../app");
const request = require("supertest");
const { expect } = require("chai");
const gpUtils = require("../utils/generalPurposeUtils.js");
const consol = require("../utils/zerothOrder/consoleLoggingUtils.js");
const { it } = require("mocha");
const testingUtils = require("../utils/secondOrder/testingUtils.js");
const { generalTranslatedSentencesRef } = testingUtils;
const { runPaletteTest1 } = testingUtils;

// MGN:            Multi-gender noun. Eg doctor in ENG can be either male or female.
// ProsMgn:        "My doctor and her book." Connected pronombre reveals gender of MGN. Doesn't need an annotation for doctor as clearly must be lekarka.
// EdusMgn:        "My doctor is a man."     Educator specifies MGN's gender. Sentence where educator knows that this MGN will need no clarifying.

describe("/api", function () {
  this.timeout(7000);

  const testEnv = apiUtils.getEnvir("app02.spec");

  gpUtils.fillOutWashburneRefObj(
    generalTranslatedSentencesRef,
    "POL->ENG",
    "ENG->POL",
    "POL",
    "ENG"
  );
  // after(() => {});
  // beforeEach(() => {});

  describe("/palette - Stage 9: Synhomographs (adding Clarifiers).", () => {
    it(`${testEnv}#pal09-01a (Type 1 Synhomographs. If-PW: clarify Inflections) 'sheep': Engpol. Expect clarifiers.`, () => {
      return runPaletteTestBespoke(
        "ENG",
        "POL",
        "dummy36",
        {},
        "sheep_withClarifiers_Qlang",
        ["Sheep (singular).", "Sheep (plural)."]
      );
    });
    it(`${testEnv}#pal09-01b 'sheep': Poleng. No clarifiers.`, () => {
      return runPaletteTestBespoke(
        "POL",
        "ENG",
        "dummy36",
        {},
        "sheep_withClarifiers_Qlang",
        ["Owce.", "Owca."]
      );
    });
    it(`${testEnv}#pal09-01c (Type 1 Synhomographs. If-PW: clarify Inflections) 'sheep': Engpol. Expect clarifiers. PDS makes it agnostic between singular and plural.`, () => {
      return runPaletteTestBespoke(
        "ENG",
        "POL",
        "dummy36",
        { pleaseDontSpecify: true },
        "sheep_withoutClarifiers_Qlang",
        ["Sheep."]
      );
    });
    it(`${testEnv}#pal09-01d 'sheep': Poleng. No clarifiers. PDS should have no effect.`, () => {
      return runPaletteTestBespoke(
        "POL",
        "ENG",
        "dummy36",
        { pleaseDontSpecify: true },
        "sheep_withClarifiers_Qlang",
        ["Owce.", "Owca."]
      );
    });
    it(`${testEnv}#pal09-01e (Type 1 Synhomographs. If-PW: clarify Inflections) 'Sheep are* here.': Engpol. Expect clarifiers.`, () => {
      return runPaletteTestBespoke(
        "ENG",
        "POL",
        "dummy36a",
        {},
        "sheeps_withClarifiers_Qlang"
      );
    });
    it(`${testEnv}#pal09-01f 'Sheep are* here.': Poleng. No clarifiers.`, () => {
      return runPaletteTestBespoke(
        "POL",
        "ENG",
        "dummy36a",
        {},
        "sheeps_withClarifiers_Qlang"
      );
    });
    it(`${testEnv}#pal09-01g (Type 1 Synhomographs. If-PW: clarify Inflections) 'Sheep are* here.': Engpol. Expect clarifiers. PDS makes it agnostic between singular and plural.`, () => {
      return runPaletteTestBespoke(
        "ENG",
        "POL",
        "dummy36a",
        { pleaseDontSpecify: true },
        "sheeps_withClarifiers_Qlang"
      );
    });
    it(`${testEnv}#pal09-01h 'Sheep are* here.': Poleng. No clarifiers. PDS should have no effect.`, () => {
      return runPaletteTestBespoke(
        "POL",
        "ENG",
        "dummy36a",
        { pleaseDontSpecify: true },
        "sheeps_withClarifiers_Qlang"
      );
    });
    it(`${testEnv}#pal09-01i (Type 1 Synhomographs. If-PW: clarify Inflections) 'sheep': Engpol. Two primaryOrders, only one needing clarifiers.`, () => {
      let ref = [
        {
          ENG: ["Sheep (singular).", "Sheep is."],
          POL: ["Owca.", "Owca jest."],
        },
        {
          ENG: ["Sheep (plural).", "Sheep are."],
          POL: ["Owce.", "Owce są."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy36b", ref);
    });
    it(`${testEnv}#pal09-02a (Type 2 Synhomographs. Ad-PW: clarify Inflections (tenseDescription)) 'read': Engpol. Expect clarifiers.`, () => {
      return runPaletteTestBespoke(
        "ENG",
        "POL",
        "dummy38",
        {},
        "read_withClarifiers_Qlang",
        ["I read (present).", "I read (past)."]
      );
    });
    it(`${testEnv}#pal09-02b (Ad-PW: clarify Inflections (tenseDescription)) 'read': Poleng. No clarifiers.`, () => {
      return runPaletteTestBespoke(
        "POL",
        "ENG",
        "dummy38",
        {},
        "read_withClarifiers_Qlang",
        ["Czytam.", "Przeczytałem.", "Przeczytałam."]
      );
    });
    it(`${testEnv}#pal09-03a (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'write': Engpol. Expect clarifiers.`, () => {
      return runPaletteTestBespoke(
        "ENG",
        "POL",
        "dummy40",
        {},
        "write_withClarifiers_Qlang",
        ["You (singular) write.", "You (plural) write."]
      );
    });
    it(`${testEnv}#pal09-03b (Ad-PW: clarify Inflections) 'write': Poleng. No clarifiers.`, () => {
      return runPaletteTestBespoke(
        "POL",
        "ENG",
        "dummy40",
        {},
        "write_withClarifiers_Qlang",
        ["Piszesz.", "Piszecie."]
      );
    });
    it(`${testEnv}#pal09-03c (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'write': Engpol. Expect clarifiers.`, () => {
      return runPaletteTestBespoke(
        "ENG",
        "POL",
        "dummy41",
        {},
        "write_withClarifiers_Qlang"
      );
    });
    it(`${testEnv}#pal09-03d (Ad-PW: clarify Inflections) 'write': Poleng. No clarifiers.`, () => {
      return runPaletteTestBespoke(
        "POL",
        "ENG",
        "dummy41",
        {},
        "write_withClarifiers_Qlang",
        ["Napisałeś.", "Napisałaś.", "Napisaliście.", "Napisałyście."]
      );
    });
    it(`${testEnv}#pal09-03e (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'write': Engpol. Expect clarifiers.`, () => {
      return runPaletteTestBespoke(
        "ENG",
        "POL",
        "dummy42",
        {},
        "write_withClarifiers_Qlang"
      );
    });
    it(`${testEnv}#pal09-03f (Ad-PW: clarify Inflections) 'write': Poleng. No clarifiers.`, () => {
      return runPaletteTestBespoke(
        "POL",
        "ENG",
        "dummy42",
        {},
        "write_withClarifiers_Qlang",
        [
          "Będziesz pisał.",
          "Będziesz pisała.",
          "Będziesz pisać.",
          "Będziecie pisały.",
          "Będziecie pisali.",
          "Będziecie pisać.",
        ]
      );
    });
    it(`${testEnv}#pal09-03g (Type 3 Synhomographs. Ad-PW: clarify Inflections) 'be': Engpol. Expect clarifiers.`, () => {
      return runPaletteTestBespoke(
        "ENG",
        "POL",
        "dummy39",
        {},
        "be_withClarifiers_Qlang",
        ["You (singular) are.", "You (plural) are."]
      );
    });
    it(`${testEnv}#pal09-03h (Ad-PW: clarify Inflections) 'be': Poleng. No clarifiers.`, () => {
      return runPaletteTestBespoke(
        "POL",
        "ENG",
        "dummy39",
        {},
        "be_withClarifiers_Qlang",
        ["Jesteś.", "Jesteście."]
      );
    });
    it(`${testEnv}#pal09-04a-i (pal09-02a Engpol, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: ["I see."],
          POL: ["Widzę.", "Ja widzę."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy60", ref);
    });
    it(`${testEnv}#pal09-04a-ii (pal09-02a Engpol, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: "I (male) saw.",
          POL: ["Zobaczyłem.", "Ja zobaczyłem."],
        },
        {
          ENG: "I (female) saw.",
          POL: ["Zobaczyłam.", "Ja zobaczyłam."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy60a", ref);
    });
    it(`${testEnv}#pal09-04a-iii (pal09-02a Engpol, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: "I (male) read (past).",
          POL: ["Przeczytałem.", "Ja przeczytałem."],
        },
        {
          ENG: "I (female) read (past).",
          POL: ["Przeczytałam.", "Ja przeczytałam."],
        },
        {
          ENG: ["I am reading.", "I read (present)."],
          POL: ["Czytam.", "Ja czytam."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy60b", ref);
    });
    it(`${testEnv}#pal09-04a-iv (pal09-02a Engpol PDS, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: ["I see."],
          POL: ["Widzę.", "Ja widzę."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy60", ref, {
        pleaseDontSpecify: true,
      });
    });
    it(`${testEnv}#pal09-04a-v (pal09-02a Engpol PDS, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: "I saw.",
          POL: [
            "Zobaczyłem.",
            "Ja zobaczyłem.",
            "Zobaczyłam.",
            "Ja zobaczyłam.",
          ],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy60a", ref, {
        pleaseDontSpecify: true,
      });
    });
    it(`${testEnv}#pal09-04a-vi (pal09-02a Engpol PDS, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: "I read (past).",
          POL: [
            "Przeczytałem.",
            "Ja przeczytałem.",
            "Przeczytałam.",
            "Ja przeczytałam.",
          ],
        },
        {
          ENG: ["I am reading.", "I read (present)."],
          POL: ["Czytam.", "Ja czytam."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy60b", ref, {
        pleaseDontSpecify: true,
      });
    });
    it(`${testEnv}#pal09-04b-i (pal09-02a Poleng, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: ["I see."],
          POL: "Widzę.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy60", ref);
    });
    it(`${testEnv}#pal09-04b-ii (pal09-02a Poleng, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: ["I saw.", "I have seen.", "I had seen."],
          POL: ["Zobaczyłem.", "Zobaczyłam."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy60a", ref);
    });
    it(`${testEnv}#pal09-04b-iii (pal09-02a Poleng, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: ["I read.", "I have read.", "I had read."],
          POL: ["Przeczytałem.", "Przeczytałam."],
        },
        {
          ENG: ["I read.", "I am reading."],
          POL: "Czytam.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy60b", ref);
    });
    it(`${testEnv}#pal09-04b-iv (pal09-02a Poleng PDS, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: ["I see."],
          POL: "Widzę.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy60", ref, {
        pleaseDontSpecify: true,
      });
    });
    it(`${testEnv}#pal09-04b-v (pal09-02a Poleng PDS, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: ["I saw.", "I have seen.", "I had seen."],
          POL: ["Zobaczyłem.", "Zobaczyłam."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy60a", ref, {
        pleaseDontSpecify: true,
      });
    });
    it(`${testEnv}#pal09-04b-vi (pal09-02a Poleng PDS, two clarifiers potentially expected.)`, () => {
      let ref = [
        {
          ENG: ["I read.", "I have read.", "I had read."],
          POL: ["Przeczytałem.", "Przeczytałam."],
        },
        {
          ENG: ["I read.", "I am reading."],
          POL: "Czytam.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy60b", ref, {
        pleaseDontSpecify: true,
      });
    });
  });

  describe("/palette - Stage 10: Allohomographs (adding Clarifiers).", () => {
    it(`${testEnv}#pal10-01a Type 1 Allohomographs of SingleWordtype: 'nut' Engpol. Expect clarifiers.`, () => {
      let ref = [
        { ENG: "A small nut (🥜, food).", POL: ["Mały orzech."] },
        { ENG: "A small nut (🔩, metal).", POL: ["Mała nakrętka."] },
      ];
      return runPaletteTest1(
        "ENG",
        "POL",
        "dummy43",
        ref,
        { useDummyWords: true },
        1
      );
    });
    it(`${testEnv}#pal10-01b Type 1 Allohomographs of SingleWordtype: 'nut' Poleng. No clarifiers.`, () => {
      let ref = [
        { POL: ["Mały orzech.", "Mała nakrętka."], ENG: ["A small nut."] },
      ];
      return runPaletteTest1(
        "POL",
        "ENG",
        "dummy43",
        ref,
        { useDummyWords: true },
        1
      );
    });
    it(`${testEnv}#pal10-02a Type 1 Allohomographs of MultipleWordtype: 'bear (nco)' Engpol. Expect clarifiers as requested allo-multi-clarifiers in structureChunk.`, () => {
      let ref = [{ ENG: "Bear (nco).", POL: ["Niedźwiedź."] }];
      return runPaletteTest1("ENG", "POL", "dummy45a", ref, {}, 1);
    });
    it(`${testEnv}#pal10-02b Type 1 Allohomographs of MultipleWordtype: 'bear (ver)' Engpol. Expect clarifiers as requested allo-multi-clarifiers in structureChunk.`, () => {
      let ref = [{ ENG: "Bear (ver).", POL: ["Znieść."] }];
      return runPaletteTest1("ENG", "POL", "dummy45b", ref, {}, 1);
    });
    it(`${testEnv}#pal10-02c Type 1 Allohomographs of MultipleWordtype: 'bear (ver)' Engpol. Did NOT request allo-multi-clarifiers in structureChunk.`, () => {
      let ref = [{ ENG: "Bear.", POL: ["Znieść."] }];
      return runPaletteTest1("ENG", "POL", "dummy45c", ref, {}, 1);
    });
    it(`${testEnv}#pal10-02d Type 1 Allohomographs of MultipleWordtype: 'bear (nco)' Poleng. No clarifiers.`, () => {
      let ref = [{ POL: "Niedźwiedź.", ENG: ["Bear."] }];
      return runPaletteTest1("POL", "ENG", "dummy45a", ref, {}, 1);
    });
    it(`${testEnv}#pal10-02e Type 1 Allohomographs of MultipleWordtype: 'bear (ver)' Poleng. No clarifiers.`, () => {
      let ref = [{ POL: "Znieść.", ENG: ["Bear."] }];
      return runPaletteTest1("POL", "ENG", "dummy45b", ref, {}, 1);
    });
    it(`${testEnv}#pal10-03a Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (nco)' Engpol. Textmoji Clarifier expected. Wordtype Clarifier not requested.`, () => {
      let ref = [
        { ENG: "Tie (⚽, score).", POL: ["Remis."] },
        { ENG: "Tie (👔, clothes).", POL: ["Krawat."] },
      ];
      return runPaletteTest1(
        "ENG",
        "POL",
        "dummy46a",
        ref,
        { useDummyWords: true },
        1
      );
    });
    it(`${testEnv}#pal10-03b Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (nco)' Engpol. Textmoji Clarifier expected. Wordtype Clarifier requested so also expected.`, () => {
      let ref = [
        { ENG: "Tie (⚽, score, nco).", POL: ["Remis."] },
        { ENG: "Tie (👔, clothes, nco).", POL: ["Krawat."] },
      ];
      return runPaletteTest1(
        "ENG",
        "POL",
        "dummy46b",
        ref,
        { useDummyWords: true },
        1
      );
    });
    it(`${testEnv}#pal10-03c Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (ver)' Engpol. Textmoji Clarifier expected. Wordtype Clarifier not requested.`, () => {
      let ref = [{ ENG: "Tie (🧵, with string eg).", POL: ["Wiązać."] }];
      return runPaletteTest1(
        "ENG",
        "POL",
        "dummy46c",
        ref,
        { useDummyWords: true },
        1
      );
    });
    it(`${testEnv}#pal10-03d Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (ver)' Engpol. Textmoji Clarifier expected. Wordtype Clarifier requested so also expected.`, () => {
      let ref = [{ ENG: "Tie (🧵, with string eg, ver).", POL: ["Wiązać."] }];
      return runPaletteTest1(
        "ENG",
        "POL",
        "dummy46d",
        ref,
        { useDummyWords: true },
        1
      );
    });
    it(`${testEnv}#pal10-03e Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (nco)' Poleng. No clarifiers.`, () => {
      let ref = [{ POL: ["Remis.", "Krawat."], ENG: ["Tie."] }];
      return runPaletteTest1(
        "POL",
        "ENG",
        "dummy46a",
        ref,
        { useDummyWords: true },
        1
      );
    });
    it(`${testEnv}#pal10-03f Type 1 Allohomographs of MultipleWordtype AND SingleWordtype: 'tie (ver)' Poleng. No clarifiers.`, () => {
      let ref = [{ POL: "Wiązać.", ENG: ["Tie."] }];
      return runPaletteTest1(
        "POL",
        "ENG",
        "dummy46c",
        ref,
        { useDummyWords: true },
        1
      );
    });
  });

  describe("/palette - Stage 11A: Adding Specifiers.", () => {
    it(`${testEnv}#pal11A-01a GET 200 YES: SPECIFIER EXPECTED. Multi Gender Noun. Engpol.`, () => {
      let ref = [
        {
          ENG: "The doctor (male) was writing a prescription.",
          POL: ["Lekarz pisał receptę."],
        },
        {
          ENG: "The doctor (female) was writing a prescription.",
          POL: ["Lekarka pisała receptę."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "109a", ref, {});
    });
    it(`${testEnv}#pal11A-01b GET 200 YES: SPECIFIER EXPECTED Multi Gender Noun PLURAL. Engpol.`, () => {
      let ref = [
        {
          ENG: "The doctors (males) were writing a prescription.",
          POL: ["Lekarze pisali receptę."],
        },
        {
          ENG: "The doctors (mixed) were writing a prescription.",
          POL: ["Lekarze pisali receptę."],
        },
        {
          ENG: "The doctors (females) were writing a prescription.",
          POL: ["Lekarki pisały receptę."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "109c", ref, {});
    });
    it(`${testEnv}#pal11A-02a GET 200 YES: NO SPECIFIER EVEN WHEN ASKED FOR. Pronombre I/WE. {pres im} needs no gender. Engpol.`, () => {
      let ref = [
        { ENG: "I am.", POL: ["Jestem.", "Ja jestem."] },
        { ENG: "We are.", POL: ["Jesteśmy.", "My jesteśmy."] },
      ];

      return runPaletteTest1("ENG", "POL", "111a", ref, {});
    });
    it(`${testEnv}#pal11A-02b GET 200 YES: SPECIFIER EXPECTED. Pronombre I/WE. {past im} does indeed need gender. Engpol.`, () => {
      let ref = [
        { ENG: "I (male) was.", POL: ["Byłem.", "Ja byłem."] },
        { ENG: "I (female) was.", POL: ["Byłam.", "Ja byłam."] },
        {
          ENG: ["We (males) were.", "We (mixed) were."],
          POL: ["Byliśmy.", "My byliśmy."],
        },
        { ENG: "We (females) were.", POL: ["Byłyśmy.", "My byłyśmy."] },
      ];
      return runPaletteTest1("ENG", "POL", "111b", ref, {});
    });
    it(`${testEnv}#pal11A-03a GET 200 YES: NO SPECIFIER EVEN WHEN ASKED FOR if noun already has gender.`, () => {
      let ref = [
        {
          ENG: ["The woman wrote.", "The woman had written."],
          POL: ["Kobieta napisała."],
        },
        { ENG: "The woman was writing.", POL: ["Kobieta pisała."] },
        {
          ENG: "The woman has written.",
          POL: ["Kobieta napisała.", "Kobieta pisała."],
        },

        {
          ENG: ["The man wrote.", "The man had written."],
          POL: ["Mężczyzna napisał."],
        },
        { ENG: "The man was writing.", POL: ["Mężczyzna pisał."] },
        {
          ENG: "The man has written.",
          POL: ["Mężczyzna napisał.", "Mężczyzna pisał."],
        },

        {
          ENG: ["The person wrote.", "The person had written."],
          POL: ["Osoba napisała."],
        },
        { ENG: "The person was writing.", POL: ["Osoba pisała."] },
        {
          ENG: "The person has written.",
          POL: ["Osoba napisała.", "Osoba pisała."],
        },

        {
          ENG: ["The lady wrote.", "The lady had written."],
          POL: ["Kobieta napisała."],
        },
        { ENG: "The lady was writing.", POL: ["Kobieta pisała."] },
        {
          ENG: "The lady has written.",
          POL: ["Kobieta napisała.", "Kobieta pisała."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy47", ref, {});
    });
    it(`${testEnv}#pal11A-04a GET 200 YES: GIVE MULTIPLE ANSWER OPTIONS WHEN SPECIFIERS NOT REQUESTED. Pronombre I/WE. {past im} does indeed need gender. Engpol.`, () => {
      let ref = [
        {
          ENG: "I (male) was.",
          POL: ["Byłem.", "Ja byłem."],
        },
        {
          ENG: "I (female) was.",
          POL: ["Byłam.", "Ja byłam."],
        },
        {
          ENG: ["We (mixed) were.", "We (males) were."],
          POL: ["Byliśmy.", "My byliśmy."],
        },
        {
          ENG: "We (females) were.",
          POL: ["Byłyśmy.", "My byłyśmy."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "111b", ref, {});
    });
    it(`${testEnv}#pal11A-05a GET 200 YES: Gives clarifiers and specifiers. Pronombre YOU. Engpol.`, () => {
      let ref = [
        {
          ENG: "You (singular, male) were.",
          POL: ["Byłeś.", "Ty byłeś."],
        },
        {
          ENG: "You (singular, female) were.",
          POL: ["Byłaś.", "Ty byłaś."],
        },
        {
          ENG: ["You (plural, mixed) were.", "You (males) were."],
          POL: ["Byliście.", "Wy byliście."],
        },
        {
          ENG: "You (females) were.",
          POL: ["Byłyście.", "Wy byłyście."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "111c", ref, {});
    });
  });

  describe("/palette - Stage 11B Not adding Specifiers.", () => {
    it(`${testEnv}#pal11B-01a GET 200 YES: Poleng. CHOOSE ONE. Singular. male or female versions of same person.`, () => {
      let ref = [
        {
          POL: ["Lekarka napisała receptę.", "Lekarz napisał receptę."],
          ENG: [
            "The doctor wrote a prescription.",
            "The doctor had written a prescription.",
            "The doctor has written a prescription.",
          ],
        },
      ];
      return runPaletteTest1("POL", "ENG", "109", ref, {});
    });
    it(`${testEnv}#pal11B-01b GET 200 YES: Poleng. CHOOSE ONE. Plural. male or female versions of same person.`, () => {
      let ref = [
        {
          POL: ["Lekarze napisali receptę.", "Lekarki napisały receptę."],
          ENG: [
            "The doctors wrote a prescription.",
            "The doctors had written a prescription.",
            "The doctors have written a prescription.",
          ],
        },
      ];
      return runPaletteTest1("POL", "ENG", "109b", ref, {});
    });
    it(`${testEnv}#pal11B-01c GET 200 YES: Poleng. AGNOSTIC has no effect. Singular. male or female versions of same person.`, () => {
      let ref = [
        {
          POL: ["Lekarz napisał receptę.", "Lekarka napisała receptę."],
          ENG: [
            "The doctor wrote a prescription.",
            "The doctor had written a prescription.",
            "The doctor has written a prescription.",
          ],
        },
      ];
      return runPaletteTest1("POL", "ENG", "109", ref, {
        pleaseDontSpecify: true,
      });
    });
    it(`${testEnv}#pal11B-01d GET 200 YES: Poleng. AGNOSTIC has no effect. Plural. male or female versions of same person.`, () => {
      let ref = [
        {
          POL: ["Lekarze napisali receptę.", "Lekarki napisały receptę."],
          ENG: [
            "The doctors wrote a prescription.",
            "The doctors had written a prescription.",
            "The doctors have written a prescription.",
          ],
        },
      ];
      return runPaletteTest1("POL", "ENG", "109b", ref, {
        pleaseDontSpecify: true,
      });
    });
    it(`${testEnv}#pal11B-02a GET 200 YES: Engpol. CHOOSE ONE. Singular. male or female versions of same person.`, () => {
      let ref = [
        {
          ENG: "The doctor (male) was writing a prescription.",
          POL: ["Lekarz pisał receptę."],
        },
        {
          ENG: "The doctor (female) was writing a prescription.",
          POL: ["Lekarka pisała receptę."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "109a", ref, {});
    });
    it(`${testEnv}#pal11B-02b GET 200 YES: Engpol. CHOOSE ONE. Plural. male or female versions of same person.`, () => {
      let ref = [
        {
          ENG: "The doctors (females) were writing a prescription.",
          POL: ["Lekarki pisały receptę."],
        },
        {
          ENG: [
            "The doctors (mixed) were writing a prescription.",
            "The doctors (males) were writing a prescription.",
          ],
          POL: ["Lekarze pisali receptę."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "109c", ref, {});
    });
    it(`${testEnv}#pal11B-02c GET 200 YES: Engpol. AGNOSTIC. Singular. male or female versions of same person.`, () => {
      let ref = [
        {
          ENG: "The doctor was writing a prescription.",
          POL: ["Lekarz pisał receptę.", "Lekarka pisała receptę."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "109a", ref, {
        pleaseDontSpecify: true,
      });
    });
    it(`${testEnv}#pal11B-02d GET 200 YES: Engpol. AGNOSTIC. Plural. male or female versions of same person.`, () => {
      let ref = [
        {
          ENG: "The doctors were writing a prescription.",
          POL: ["Lekarze pisali receptę.", "Lekarki pisały receptę."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "109c", ref, {
        pleaseDontSpecify: true,
      });
    });
    it(`${testEnv}#pal11B-03a GET 200 YES: Engpol. AGNOSTIC. Give both pronombre singular gender options in answer.`, () => {
      let ref = [
        {
          ENG: "I wrote.",
          POL: ["Napisałem.", "Ja napisałem.", "Napisałam.", "Ja napisałam."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy49c", ref, {
        pleaseDontSpecify: true,
      });
    });
    it(`${testEnv}#pal11B-03b GET 200 YES: Engpol. AGNOSTIC. Give both pronombre plural gender options in answer.`, () => {
      let ref = [
        {
          ENG: "We wrote.",
          POL: [
            "Napisaliśmy.",
            "My napisaliśmy.",
            "Napisałyśmy.",
            "My napisałyśmy.",
          ],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy49d", ref, {
        pleaseDontSpecify: true,
      });
    });
  });

  xdescribe("/palette - Stage 12: Conditionals.", () => {
    it(`${testEnv}#pal12-01a (04-01c) GET 200 YES: CONDITIONAL Returns a sentence with a single verb, with tense and number specified.`, () => {
      return runPaletteTest1("POL", null, "dummy13a", [
        "Czytano by.",
        "Czytalibyśmy.",
        "Czytałybyśmy.",
        "Czytalibyście.",
        "Czytałybyście.",
        "Czytaliby.",
        "Czytałyby.",
      ]);
    });
    it(`${testEnv}#pal12-02a (05-02d) GET 200 YES: CONDITIONAL Returns a sentence when selected by one from multiple tenseDescriptions.`, () => {
      return runPaletteTest1("POL", null, "63d", [
        "Kobieta czytałaby.",
        "Kobiety czytałyby.",
        "Kobieta przeczytałaby.",
        "Kobiety przeczytałyby.",
      ]);
    });
    it(`${testEnv}#pal12-03a GET 200 YES: RSWAT for First Conditional POL->ENG.`, () => {
      let ref = [
        {
          POL: [
            "Jeśli będziesz pisać książkę , ją zbadam.",
            "Jeśli napiszesz książkę , ją zbadam.",
          ],
          ENG: ["If you write a book , I will research it."],
        },
        {
          POL: "Jeśli będziesz pisał książkę , ją zbadam.",
          ENG: ["If you write (male) a book , I will research it."],
        },
        {
          POL: "Jeśli będziesz pisała książkę , ją zbadam.",
          ENG: ["If you write (female) a book , I will research it."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "106a", ref, {});
    });
    it(`${testEnv}#pal12-03b GET 200 YES: RSWAT for First Conditional ENG->POL.`, () => {
      let ref = [
        {
          ENG: "If you write a book , I will research it.",
          POL: [
            "Jeśli napiszesz książkę , ją zbadam.",
            "Jeśli będziesz pisać książkę , ją zbadam.",
          ],
        },
        {
          ENG: "If you write (male) a book , I will research it.",
          POL: ["Jeśli będziesz pisał książkę , ją zbadam."],
        },
        {
          ENG: "If you write (female) a book , I will research it.",
          POL: ["Jeśli będziesz pisała książkę , ją zbadam."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "106a", ref, {});
    });
  });

  describe("/palette - Stage 13A: Pronombres and other Multi Gender Nouns: Basic tests.", () => {
    it(`${testEnv}#pal13A-01a GET 200 YES: Give a pronombre in ENG.`, () => {
      return runPaletteTest1("ENG", null, "dummy48a", ["I."]);
    });
    it(`${testEnv}#pal13A-01b GET 200 YES: Give a pronombre in POL.`, () => {
      return runPaletteTest1("POL", null, "dummy48a", ["Ja."]);
    });
    it(`${testEnv}#pal13A-01c GET 200 YES: Give a pronombre in Poleng.`, () => {
      let ref = [
        {
          POL: ["Ja."],
          ENG: ["I."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy48a", ref);
    });
    it(`${testEnv}#pal13A-01d GET 200 YES: Give a pronombre in Engpol.`, () => {
      let ref = [
        {
          POL: ["Ja."],
          ENG: ["I."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy48a", ref);
    });
    it(`${testEnv}#pal13A-02a GET 200 YES: Engpol. Inherit from pronombre to verb (m sing).`, () => {
      let ref = [
        { ENG: "I (male) wrote.", POL: ["Napisałem.", "Ja napisałem."] },
      ];
      return runPaletteTest1("ENG", "POL", "dummy49a", ref, {});
    });
    it(`${testEnv}#pal13A-02b GET 200 YES: Engpol. Inherit from pronombre to verb (nonvir plur).`, () => {
      let ref = [
        {
          ENG: "We (females) wrote.",
          POL: ["Napisałyśmy.", "My napisałyśmy."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy49b", ref, {});
    });
    it(`${testEnv}#pal13A-02c GET 200 YES: Engpol. WITH SPECIFIERS Inherit from pronombre to verb (m sing).`, () => {
      let ref = [
        { ENG: "I (male) wrote.", POL: ["Napisałem.", "Ja napisałem."] },
      ];
      return runPaletteTest1("ENG", "POL", "dummy49a", ref, {});
    });
    it(`${testEnv}#pal13A-02d GET 200 YES: Engpol. WITH SPECIFIERS Inherit from pronombre to verb (nonvir plur).`, () => {
      let ref = [
        {
          ENG: "We (females) wrote.",
          POL: ["Napisałyśmy.", "My napisałyśmy."],
        },
      ];

      return runPaletteTest1("ENG", "POL", "dummy49b", ref, {});
    });
    it(`${testEnv}#pal13A-04a GET 200 YES: Poleng. Inherit from pronombre to verb (m sing).`, () => {
      let ref = [
        {
          ENG: ["I wrote.", "I had written.", "I have written."],
          POL: ["Napisałem.", "Ja napisałem."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy49a", ref, {});
    });
    it(`${testEnv}#pal13A-04b GET 200 YES: Poleng. Inherit from pronombre to verb (nonvir plur).`, () => {
      let ref = [
        {
          ENG: ["We wrote.", "We had written.", "We have written."],
          POL: ["Napisałyśmy.", "My napisałyśmy."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy49b", ref, {});
    });
    it(`${testEnv}#pal13A-04c GET 200 YES: Poleng. NO CLARIFIERS Inherit from pronombre to verb (m sing).`, () => {
      let ref = [
        {
          ENG: ["I wrote.", "I had written.", "I have written."],
          POL: ["Napisałem.", "Ja napisałem."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy49a", ref, {});
    });
    it(`${testEnv}#pal13A-04d GET 200 YES: Poleng. NO CLARIFIERS Inherit from pronombre to verb (nonvir plur).`, () => {
      let ref = [
        {
          ENG: ["We wrote.", "We had written.", "We have written."],
          POL: ["Napisałyśmy.", "My napisałyśmy."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy49b", ref, {});
    });
    it(`${testEnv}#pal13A-05a GET 200 YES: Poleng. Inherit from pronombre to verb (m sing).`, () => {
      let ref = [
        {
          ENG: ["I wrote.", "I had written.", "I have written."],
          POL: ["Napisałem.", "Ja napisałem.", "Napisałam.", "Ja napisałam."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy49c", ref, {});
    });
    it(`${testEnv}#pal13A-05b GET 200 YES: Poleng. Inherit from pronombre to verb (nonvir plur).`, () => {
      let ref = [
        {
          ENG: ["We wrote.", "We had written.", "We have written."],
          POL: [
            "Napisałyśmy.",
            "My napisałyśmy.",
            "Napisaliśmy.",
            "My napisaliśmy.",
          ],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy49d", ref, {});
    });
    it(`${testEnv}#pal13A-05c GET 200 YES: Poleng. NO CLARIFIERS Inherit from pronombre to verb (m sing).`, () => {
      let ref = [
        {
          ENG: ["I wrote.", "I had written.", "I have written."],
          POL: ["Napisałem.", "Ja napisałem.", "Napisałam.", "Ja napisałam."],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy49c", ref, {});
    });
    it(`${testEnv}#pal13A-05d GET 200 YES: Poleng. NO CLARIFIERS Inherit from pronombre to verb (nonvir plur).`, () => {
      let ref = [
        {
          ENG: ["We wrote.", "We had written.", "We have written."],
          POL: [
            "Napisałyśmy.",
            "My napisałyśmy.",
            "Napisaliśmy.",
            "My napisaliśmy.",
          ],
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy49b", ref, {});
    });
    it(`${testEnv}#pal13A-06a GET 200 YES: Engpol. No gender specified in stCh for MGN.`, () => {
      let ref = [
        {
          ENG: "The doctor wrote.",
          POL: ["Lekarz napisał.", "Lekarka napisała."],
        },
        {
          ENG: "The doctor read.",
          POL: ["Lekarz przeczytał.", "Lekarka przeczytała."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy51a", ref, {
        pleaseDontSpecify: true,
      });
    });
    it(`${testEnv}#pal13A-7a GET 200 YES: Singular pronombres: Verb person and number is inherited from pronombre headChunk.`, () => {
      let ref = [
        { ENG: "I am.", POL: ["Jestem.", "Ja jestem."] },
        { ENG: "You (singular) are.", POL: ["Jesteś.", "Ty jesteś."] },
        { ENG: "He is.", POL: ["Jest.", "On jest."] },
        { ENG: "She is.", POL: ["Jest.", "Ona jest."] },
        { ENG: "It is.", POL: ["Jest.", "Ono jest."] },
      ];
      return runPaletteTest1("ENG", "POL", "108", ref, {});
    });
  });

  describe("/palette - Stage 13B: Pronombres and other Multi Gender Nouns: Further tests.", () => {
    it(`${testEnv}#pal13B-01a GET 200 YES: Specifiers not requested. Engpol. I am.`, () => {
      //epsilon duplicate test of following one.
      let ref = [
        { ENG: "I am.", POL: ["Jestem.", "Ja jestem."] },
        { ENG: "We are.", POL: ["Jesteśmy.", "My jesteśmy."] },
      ];
      return runPaletteTest1("ENG", "POL", "111a", ref, {});
    });
    it(`${testEnv}#pal13B-01b GET 200 YES: Specifiers requested but should not appear. Engpol. I am.`, () => {
      let ref = [
        { ENG: "I am.", POL: ["Jestem.", "Ja jestem."] },
        { ENG: "We are.", POL: ["Jesteśmy.", "My jesteśmy."] },
      ];
      return runPaletteTest1("ENG", "POL", "111a", ref, {});
    });
    it(`${testEnv}#pal13B-02a GET 200 YES: Engpol. A more interesting sentence with Pronombres.`, () => {
      let ref = [
        {
          ENG: [
            "The woman was reading me a book.",
            "The woman was reading a book to me.",
          ],
          POL: ["Kobieta czytała mi książkę.", "Kobieta czytała mnie książkę."],
        },
        {
          ENG: [
            "The women were reading a book to me.",
            "The women were reading me a book.",
          ],
          POL: ["Kobiety czytały mi książkę.", "Kobiety czytały mnie książkę."],
        },
        {
          ENG: [
            "The woman was reading a book to us.",
            "The woman was reading us a book.",
          ],
          POL: ["Kobieta czytała nam książkę."],
        },
        {
          ENG: [
            "The women were reading a book to us.",
            "The women were reading us a book.",
          ],
          POL: ["Kobiety czytały nam książkę."],
        },
      ];

      return runPaletteTest1("ENG", "POL", "110", ref, {});
    });
    it(`${testEnv}#pal13B-02b GET 200 YES: Poleng. A more interesting sentence with Pronombres.`, () => {
      let ref = [
        {
          ENG: [
            "The woman was reading me a book.",
            "The woman was reading a book to me.",
            "The woman has read me a book.",
            "The woman has read a book to me.",
            "The lady was reading me a book.",
            "The lady was reading a book to me.",
            "The lady has read me a book.",
            "The lady has read a book to me.",
          ],
          POL: "Kobieta czytała mi książkę.",
        },
        {
          ENG: [
            "The women were reading me a book.",
            "The women were reading a book to me.",
            "The women have read me a book.",
            "The women have read a book to me.",
            "The ladies were reading me a book.",
            "The ladies were reading a book to me.",
            "The ladies have read me a book.",
            "The ladies have read a book to me.",
          ],
          POL: "Kobiety czytały mi książkę.",
        },
        {
          ENG: [
            "The woman was reading us a book.",
            "The woman was reading a book to us.",
            "The woman has read us a book.",
            "The woman has read a book to us.",
            "The lady was reading us a book.",
            "The lady was reading a book to us.",
            "The lady has read us a book.",
            "The lady has read a book to us.",
          ],
          POL: "Kobieta czytała nam książkę.",
        },
        {
          ENG: [
            "The women were reading us a book.",
            "The women were reading a book to us.",
            "The women have read us a book.",
            "The women have read a book to us.",
            "The ladies were reading us a book.",
            "The ladies were reading a book to us.",
            "The ladies have read us a book.",
            "The ladies have read a book to us.",
          ],
          POL: "Kobiety czytały nam książkę.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "110", ref, {});
    });
    it(`${testEnv}#pal13B-03a GET 200 YES: Engpol. Another more interesting sentence with Pronombres.`, () => {
      let ref = [
        {
          ENG: ["Father gave me apples.", "Father gave apples to me."],
          POL: ["Ojciec dał mi jabłka.", "Ojciec dał mnie jabłka."],
        },
        {
          ENG: ["Father gave me books.", "Father gave books to me."],
          POL: ["Ojciec dał mi książki.", "Ojciec dał mnie książki."],
        },
        {
          ENG: ["Father gave me onions.", "Father gave onions to me."],
          POL: ["Ojciec dał mi cebule.", "Ojciec dał mnie cebule."],
        },
        {
          ENG: ["Father gave me mirrors.", "Father gave mirrors to me."],
          POL: [
            "Ojciec dał mi zwierciadła.",
            "Ojciec dał mi lustra.",

            "Ojciec dał mnie zwierciadła.",
            "Ojciec dał mnie lustra.",
          ],
        },
        {
          ENG: ["Father gave us apples.", "Father gave apples to us."],
          POL: ["Ojciec dał nam jabłka."],
        },
        {
          ENG: ["Father gave us books.", "Father gave books to us."],
          POL: ["Ojciec dał nam książki."],
        },
        {
          ENG: ["Father gave us onions.", "Father gave onions to us."],
          POL: ["Ojciec dał nam cebule."],
        },
        {
          ENG: ["Father gave us mirrors.", "Father gave mirrors to us."],
          POL: ["Ojciec dał nam zwierciadła.", "Ojciec dał nam lustra."],
        },
        {
          ENG: ["Mother gave me apples.", "Mother gave apples to me."],
          POL: ["Matka dała mi jabłka.", "Matka dała mnie jabłka."],
        },
        {
          ENG: ["Mother gave me books.", "Mother gave books to me."],
          POL: ["Matka dała mi książki.", "Matka dała mnie książki."],
        },
        {
          ENG: ["Mother gave me onions.", "Mother gave onions to me."],
          POL: ["Matka dała mi cebule.", "Matka dała mnie cebule."],
        },
        {
          ENG: ["Mother gave me mirrors.", "Mother gave mirrors to me."],
          POL: [
            "Matka dała mi zwierciadła.",
            "Matka dała mi lustra.",
            "Matka dała mnie zwierciadła.",
            "Matka dała mnie lustra.",
          ],
        },
        {
          ENG: ["Mother gave us apples.", "Mother gave apples to us."],
          POL: ["Matka dała nam jabłka."],
        },
        {
          ENG: ["Mother gave us books.", "Mother gave books to us."],
          POL: ["Matka dała nam książki."],
        },
        {
          ENG: ["Mother gave us onions.", "Mother gave onions to us."],
          POL: ["Matka dała nam cebule."],
        },
        {
          ENG: ["Mother gave us mirrors.", "Mother gave mirrors to us."],
          POL: ["Matka dała nam zwierciadła.", "Matka dała nam lustra."],
        },
        {
          ENG: ["Parent gave me apples.", "Parent gave apples to me."],
          POL: ["Rodzic dał mi jabłka.", "Rodzic dał mnie jabłka."],
        },
        {
          ENG: ["Parent gave me books.", "Parent gave books to me."],
          POL: ["Rodzic dał mi książki.", "Rodzic dał mnie książki."],
        },
        {
          ENG: ["Parent gave me onions.", "Parent gave onions to me."],
          POL: ["Rodzic dał mi cebule.", "Rodzic dał mnie cebule."],
        },
        {
          ENG: ["Parent gave me mirrors.", "Parent gave mirrors to me."],
          POL: [
            "Rodzic dał mi zwierciadła.",
            "Rodzic dał mi lustra.",

            "Rodzic dał mnie zwierciadła.",
            "Rodzic dał mnie lustra.",
          ],
        },
        {
          ENG: ["Parent gave us apples.", "Parent gave apples to us."],
          POL: ["Rodzic dał nam jabłka."],
        },
        {
          ENG: ["Parent gave us books.", "Parent gave books to us."],
          POL: ["Rodzic dał nam książki."],
        },
        {
          ENG: ["Parent gave us onions.", "Parent gave onions to us."],
          POL: ["Rodzic dał nam cebule."],
        },
        {
          ENG: ["Parent gave us mirrors.", "Parent gave mirrors to us."],
          POL: ["Rodzic dał nam zwierciadła.", "Rodzic dał nam lustra."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "112", ref, {});
    });
    it(`${testEnv}#pal13B-03b GET 200 YES: Poleng. Another more interesting sentence with Pronombres.`, () => {
      let ref = [
        {
          POL: "Ojciec dał mi jabłka.",
          ENG: [
            "Father gave me apples.",
            "Father had given me apples.",
            "Father has given me apples.",
            "Father gave apples to me.",
            "Father had given apples to me.",
            "Father has given apples to me.",
          ],
        },
        {
          POL: "Ojciec dał mi książki.",
          ENG: [
            "Father gave me books.",
            "Father had given me books.",
            "Father has given me books.",
            "Father gave books to me.",
            "Father had given books to me.",
            "Father has given books to me.",
          ],
        },
        {
          POL: "Ojciec dał mi cebule.",
          ENG: [
            "Father gave me onions.",
            "Father had given me onions.",
            "Father has given me onions.",
            "Father gave onions to me.",
            "Father had given onions to me.",
            "Father has given onions to me.",
          ],
        },
        {
          POL: ["Ojciec dał mi zwierciadła.", "Ojciec dał mi lustra."],
          ENG: [
            "Father gave me mirrors.",
            "Father had given me mirrors.",
            "Father has given me mirrors.",
            "Father gave mirrors to me.",
            "Father had given mirrors to me.",
            "Father has given mirrors to me.",
          ],
        },
        {
          POL: "Ojciec dał nam jabłka.",
          ENG: [
            "Father gave us apples.",
            "Father had given us apples.",
            "Father has given us apples.",
            "Father gave apples to us.",
            "Father had given apples to us.",
            "Father has given apples to us.",
          ],
        },
        {
          POL: "Ojciec dał nam książki.",
          ENG: [
            "Father gave us books.",
            "Father had given us books.",
            "Father has given us books.",
            "Father gave books to us.",
            "Father had given books to us.",
            "Father has given books to us.",
          ],
        },
        {
          POL: "Ojciec dał nam cebule.",
          ENG: [
            "Father gave us onions.",
            "Father had given us onions.",
            "Father has given us onions.",
            "Father gave onions to us.",
            "Father had given onions to us.",
            "Father has given onions to us.",
          ],
        },
        {
          POL: ["Ojciec dał nam zwierciadła.", "Ojciec dał nam lustra."],
          ENG: [
            "Father gave us mirrors.",
            "Father had given us mirrors.",
            "Father has given us mirrors.",
            "Father gave mirrors to us.",
            "Father had given mirrors to us.",
            "Father has given mirrors to us.",
          ],
        },
        {
          POL: "Matka dała mi jabłka.",
          ENG: [
            "Mother gave me apples.",
            "Mother had given me apples.",
            "Mother has given me apples.",
            "Mother gave apples to me.",
            "Mother had given apples to me.",
            "Mother has given apples to me.",
          ],
        },
        {
          POL: "Matka dała mi książki.",
          ENG: [
            "Mother gave me books.",
            "Mother had given me books.",
            "Mother has given me books.",
            "Mother gave books to me.",
            "Mother had given books to me.",
            "Mother has given books to me.",
          ],
        },
        {
          POL: "Matka dała mi cebule.",
          ENG: [
            "Mother gave me onions.",
            "Mother had given me onions.",
            "Mother has given me onions.",
            "Mother gave onions to me.",
            "Mother had given onions to me.",
            "Mother has given onions to me.",
          ],
        },
        {
          POL: ["Matka dała mi zwierciadła.", "Matka dała mi lustra."],
          ENG: [
            "Mother gave me mirrors.",
            "Mother had given me mirrors.",
            "Mother has given me mirrors.",
            "Mother gave mirrors to me.",
            "Mother had given mirrors to me.",
            "Mother has given mirrors to me.",
          ],
        },
        {
          POL: "Matka dała nam jabłka.",
          ENG: [
            "Mother gave us apples.",
            "Mother had given us apples.",
            "Mother has given us apples.",
            "Mother gave apples to us.",
            "Mother had given apples to us.",
            "Mother has given apples to us.",
          ],
        },
        {
          POL: "Matka dała nam książki.",
          ENG: [
            "Mother gave us books.",
            "Mother had given us books.",
            "Mother has given us books.",
            "Mother gave books to us.",
            "Mother had given books to us.",
            "Mother has given books to us.",
          ],
        },
        {
          POL: "Matka dała nam cebule.",
          ENG: [
            "Mother gave us onions.",
            "Mother had given us onions.",
            "Mother has given us onions.",
            "Mother gave onions to us.",
            "Mother had given onions to us.",
            "Mother has given onions to us.",
          ],
        },
        {
          POL: ["Matka dała nam lustra.", "Matka dała nam zwierciadła."],
          ENG: [
            "Mother gave us mirrors.",
            "Mother had given us mirrors.",
            "Mother has given us mirrors.",
            "Mother gave mirrors to us.",
            "Mother had given mirrors to us.",
            "Mother has given mirrors to us.",
          ],
        },
        {
          POL: "Rodzic dał mi jabłka.",
          ENG: [
            "Parent gave me apples.",
            "Parent had given me apples.",
            "Parent has given me apples.",
            "Parent gave apples to me.",
            "Parent had given apples to me.",
            "Parent has given apples to me.",
          ],
        },
        {
          POL: "Rodzic dał mi książki.",
          ENG: [
            "Parent gave me books.",
            "Parent had given me books.",
            "Parent has given me books.",
            "Parent gave books to me.",
            "Parent had given books to me.",
            "Parent has given books to me.",
          ],
        },
        {
          POL: "Rodzic dał mi cebule.",
          ENG: [
            "Parent gave me onions.",
            "Parent had given me onions.",
            "Parent has given me onions.",
            "Parent gave onions to me.",
            "Parent had given onions to me.",
            "Parent has given onions to me.",
          ],
        },
        {
          POL: ["Rodzic dał mi zwierciadła.", "Rodzic dał mi lustra."],
          ENG: [
            "Parent gave me mirrors.",
            "Parent had given me mirrors.",
            "Parent has given me mirrors.",
            "Parent gave mirrors to me.",
            "Parent had given mirrors to me.",
            "Parent has given mirrors to me.",
          ],
        },
        {
          POL: "Rodzic dał nam jabłka.",
          ENG: [
            "Parent gave us apples.",
            "Parent had given us apples.",
            "Parent has given us apples.",
            "Parent gave apples to us.",
            "Parent had given apples to us.",
            "Parent has given apples to us.",
          ],
        },
        {
          POL: "Rodzic dał nam książki.",
          ENG: [
            "Parent gave us books.",
            "Parent had given us books.",
            "Parent has given us books.",
            "Parent gave books to us.",
            "Parent had given books to us.",
            "Parent has given books to us.",
          ],
        },
        {
          POL: "Rodzic dał nam cebule.",
          ENG: [
            "Parent gave us onions.",
            "Parent had given us onions.",
            "Parent has given us onions.",
            "Parent gave onions to us.",
            "Parent had given onions to us.",
            "Parent has given onions to us.",
          ],
        },
        {
          POL: ["Rodzic dał nam zwierciadła.", "Rodzic dał nam lustra."],
          ENG: [
            "Parent gave us mirrors.",
            "Parent had given us mirrors.",
            "Parent has given us mirrors.",
            "Parent gave mirrors to us.",
            "Parent had given mirrors to us.",
            "Parent has given mirrors to us.",
          ],
        },
      ];
      return runPaletteTest1("POL", "ENG", "112", ref, {});
    });
    it(`${testEnv}#pal13B-03c GET 200 YES: Poleng. Another more interesting sentence with Pronombres.`, () => {
      let ref = [
        {
          POL: "Ojciec dał mi jabłko.",
          ENG: [
            "Father gave me one apple.",
            "Father had given me one apple.",
            "Father has given me one apple.",
          ],
        },
        {
          POL: "Ojciec dał mi książkę.",
          ENG: [
            "Father gave me one book.",
            "Father had given me one book.",
            "Father has given me one book.",
          ],
        },
        {
          POL: "Ojciec dał mi cebulę.",
          ENG: [
            "Father gave me one onion.",
            "Father had given me one onion.",
            "Father has given me one onion.",
          ],
        },
        {
          POL: ["Ojciec dał mi zwierciadło.", "Ojciec dał mi lustro."],
          ENG: [
            "Father gave me one mirror.",
            "Father had given me one mirror.",
            "Father has given me one mirror.",
          ],
        },
        {
          POL: "Ojciec dał nam jabłko.",
          ENG: [
            "Father gave us one apple.",
            "Father had given us one apple.",
            "Father has given us one apple.",
          ],
        },
        {
          POL: "Ojciec dał nam książkę.",
          ENG: [
            "Father gave us one book.",
            "Father had given us one book.",
            "Father has given us one book.",
          ],
        },
        {
          POL: "Ojciec dał nam cebulę.",
          ENG: [
            "Father gave us one onion.",
            "Father had given us one onion.",
            "Father has given us one onion.",
          ],
        },
        {
          POL: ["Ojciec dał nam zwierciadło.", "Ojciec dał nam lustro."],
          ENG: [
            "Father gave us one mirror.",
            "Father had given us one mirror.",
            "Father has given us one mirror.",
          ],
        },
        {
          POL: "Matka dała mi jabłko.",
          ENG: [
            "Mother gave me one apple.",
            "Mother had given me one apple.",
            "Mother has given me one apple.",
          ],
        },
        {
          POL: "Matka dała mi książkę.",
          ENG: [
            "Mother gave me one book.",
            "Mother had given me one book.",
            "Mother has given me one book.",
          ],
        },
        {
          POL: "Matka dała mi cebulę.",
          ENG: [
            "Mother gave me one onion.",
            "Mother had given me one onion.",
            "Mother has given me one onion.",
          ],
        },
        {
          POL: ["Matka dała mi zwierciadło.", "Matka dała mi lustro."],
          ENG: [
            "Mother gave me one mirror.",
            "Mother had given me one mirror.",
            "Mother has given me one mirror.",
          ],
        },
        {
          POL: "Matka dała nam jabłko.",
          ENG: [
            "Mother gave us one apple.",
            "Mother had given us one apple.",
            "Mother has given us one apple.",
          ],
        },
        {
          POL: "Matka dała nam książkę.",
          ENG: [
            "Mother gave us one book.",
            "Mother had given us one book.",
            "Mother has given us one book.",
          ],
        },
        {
          POL: "Matka dała nam cebulę.",
          ENG: [
            "Mother gave us one onion.",
            "Mother had given us one onion.",
            "Mother has given us one onion.",
          ],
        },
        {
          POL: ["Matka dała nam zwierciadło.", "Matka dała nam lustro."],
          ENG: [
            "Mother gave us one mirror.",
            "Mother had given us one mirror.",
            "Mother has given us one mirror.",
          ],
        },
        {
          POL: "Rodzic dał mi jabłko.",
          ENG: [
            "Parent gave me one apple.",
            "Parent had given me one apple.",
            "Parent has given me one apple.",
          ],
        },
        {
          POL: "Rodzic dał mi książkę.",
          ENG: [
            "Parent gave me one book.",
            "Parent had given me one book.",
            "Parent has given me one book.",
          ],
        },
        {
          POL: "Rodzic dał mi cebulę.",
          ENG: [
            "Parent gave me one onion.",
            "Parent had given me one onion.",
            "Parent has given me one onion.",
          ],
        },
        {
          POL: ["Rodzic dał mi zwierciadło.", "Rodzic dał mi lustro."],
          ENG: [
            "Parent gave me one mirror.",
            "Parent had given me one mirror.",
            "Parent has given me one mirror.",
          ],
        },
        {
          POL: "Rodzic dał nam jabłko.",
          ENG: [
            "Parent gave us one apple.",
            "Parent had given us one apple.",
            "Parent has given us one apple.",
          ],
        },
        {
          POL: "Rodzic dał nam książkę.",
          ENG: [
            "Parent gave us one book.",
            "Parent had given us one book.",
            "Parent has given us one book.",
          ],
        },
        {
          POL: "Rodzic dał nam cebulę.",
          ENG: [
            "Parent gave us one onion.",
            "Parent had given us one onion.",
            "Parent has given us one onion.",
          ],
        },
        {
          POL: ["Rodzic dał nam zwierciadło.", "Rodzic dał nam lustro."],
          ENG: [
            "Parent gave us one mirror.",
            "Parent had given us one mirror.",
            "Parent has given us one mirror.",
          ],
        },
      ];
      return runPaletteTest1("POL", "ENG", "112a", ref, {});
    });
    it(`${testEnv}#pal13B-04a GET 200 YES: Engpol. Another more interesting sentence with Pronombres. Terminal object used.`, () => {
      // Was affected by Mungojerry issue, now resolved.
      let ref = [
        {
          ENG: "People saw you (singular).",
          POL: ["Osoby zobaczyły cie/ciebie.", "Ludzie zobaczyli cie/ciebie."],
        },
        {
          ENG: "People saw you (plural).",
          POL: ["Osoby zobaczyły was.", "Ludzie zobaczyli was."],
        },
        {
          ENG: "Men saw you (singular).",
          POL: ["Mężczyźni zobaczyli cie/ciebie."],
        },
        {
          ENG: "Men saw you (plural).",
          POL: ["Mężczyźni zobaczyli was."],
        },
        {
          ENG: ["Women/Ladies saw you (singular)."],
          POL: ["Kobiety zobaczyły cie/ciebie."],
        },
        {
          ENG: ["Women/Ladies saw you (plural)."],
          POL: ["Kobiety zobaczyły was."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy57", ref, {
        devSaysOmitStChValidation: true,
      });
    });
  });

  describe("/palette - Stage 14A: Possessive pronombres.", () => {
    it(`${testEnv}#pal14A-01a GET 200 YES: POL only. I have my onion.`, () => {
      return runPaletteTest1("POL", null, "dummy50a", [
        "Ja mam moją cebulę.",
        "My mamy naszą cebulę.",
        "Ja mam moje cebule.",
        "My mamy nasze cebule.",
        "Mam moją cebulę.",
        "Mamy naszą cebulę.",
        "Mam moje cebule.",
        "Mamy nasze cebule.",
      ]);
    });
    it(`${testEnv}#pal14A-01b GET 200 YES: ENG only. I have my onion.`, () => {
      return runPaletteTest1("ENG", null, "dummy50a", [
        "I have my onion.",
        "I have my onions.",
        "We have our onion.",
        "We have our onions.",
      ]);
    });
    it(`${testEnv}#pal14A-01c GET 200 YES: Engpol. I have my onion. Clarifier for 'my' should NOT be present.`, () => {
      let ref = [
        {
          ENG: "I have my onion.",
          POL: ["Ja mam moją cebulę.", "Mam moją cebulę."],
        },
        {
          ENG: "We have our onion.",
          POL: ["My mamy naszą cebulę.", "Mamy naszą cebulę."],
        },
        {
          ENG: "I have my onions.",
          POL: ["Ja mam moje cebule.", "Mam moje cebule."],
        },
        {
          ENG: "We have our onions.",
          POL: ["My mamy nasze cebule.", "Mamy nasze cebule."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy50a", ref, {});
    });
    it(`${testEnv}#pal14A-01d GET 200 YES: Poleng. I have my onion.`, () => {
      let ref = [
        {
          ENG: ["I have my onion."],
          POL: "Ja mam moją cebulę.",
        },
        {
          ENG: ["We have our onion."],
          POL: "My mamy naszą cebulę.",
        },
        {
          ENG: ["I have my onions."],
          POL: "Ja mam moje cebule.",
        },
        {
          ENG: ["We have our onions."],
          POL: "My mamy nasze cebule.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy50a", ref, {});
    });
    it(`${testEnv}#pal14A-01e GET 200 YES: Engpol. My onion.`, () => {
      let ref = [
        {
          ENG: "My onion.",
          POL: ["Moja cebula."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy50b", ref, {});
    });
    it(`${testEnv}#pal14A-01f GET 200 YES: Poleng. My onion.`, () => {
      let ref = [
        {
          ENG: ["My onion."],
          POL: "Moja cebula.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy50b", ref, {});
    });
    it(`${testEnv}#pal14A-02a GET 200 YES: Engpol. My father gave me a book.`, () => {
      let ref = [
        {
          ENG: "My parent gave me a book.",
          POL: ["Mój rodzic dał mi książkę.", "Mój rodzic dał mnie książkę."],
          optionalExtra: { FYIPs: ["FYIP101-A-ENG-POL"] },
        },
        {
          ENG: "My father gave me a book.",
          POL: ["Mój ojciec dał mi książkę.", "Mój ojciec dał mnie książkę."],
        },
        {
          ENG: "My mother gave me a book.",
          POL: ["Moja matka dała mi książkę.", "Moja matka dała mnie książkę."],
        },
        {
          ENG: "Our parent gave us a book.",
          POL: ["Nasz rodzic dał nam książkę."],
          optionalExtra: { FYIPs: ["FYIP101-A-ENG-POL"] },
        },
        {
          ENG: "Our father gave us a book.",
          POL: ["Nasz ojciec dał nam książkę."],
        },
        {
          ENG: "Our mother gave us a book.",
          POL: ["Nasza matka dała nam książkę."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "113", ref, {});
    });
    it(`${testEnv}#pal14A-02b GET 200 YES: Poleng. My father gave me a book.`, () => {
      let ref = [
        {
          POL: "Mój rodzic dał mi książkę.",
          ENG: [
            "My parent gave me a book.",
            "My parent had given me a book.",
            "My parent has given me a book.",
          ],
        },
        {
          POL: "Mój ojciec dał mi książkę.",
          ENG: [
            "My father gave me a book.",
            "My father had given me a book.",
            "My father has given me a book.",
          ],
        },
        {
          POL: "Moja matka dała mi książkę.",
          ENG: [
            "My mother gave me a book.",
            "My mother had given me a book.",
            "My mother has given me a book.",
          ],
        },
        {
          POL: "Nasz rodzic dał nam książkę.",
          ENG: [
            "Our parent gave us a book.",
            "Our parent had given us a book.",
            "Our parent has given us a book.",
          ],
        },
        {
          POL: "Nasz ojciec dał nam książkę.",
          ENG: [
            "Our father gave us a book.",
            "Our father had given us a book.",
            "Our father has given us a book.",
          ],
        },
        {
          POL: "Nasza matka dała nam książkę.",
          ENG: [
            "Our mother gave us a book.",
            "Our mother had given us a book.",
            "Our mother has given us a book.",
          ],
        },
      ];
      return runPaletteTest1("POL", "ENG", "113", ref, {});
    });
    it(`${testEnv}#pal14A-03a GET 200 YES: Engpol. The doctor gave me her book. Gender annotation is added when there's no AOC, because pronombre is 'their' so doesn't reveal gender. However in singular, the pronombres 'her' and 'his' reveal the gender (are AOCs) so no gender annotation.`, () => {
      let ref = [
        {
          ENG: "The doctor gave me her book.",
          POL: [
            "Lekarka dała mi jej książkę.",
            "Lekarka dała mnie jej książkę.",
          ],
        },
        {
          ENG: "The doctor gave me his book.",
          POL: ["Lekarz dał mi jego książkę.", "Lekarz dał mnie jego książkę."],
        },
        {
          ENG: [
            "The doctors (mixed) gave me their book.",
            "The doctors (males) gave me their book.",
          ],
          POL: [
            "Lekarze dali mi ich książkę.",
            "Lekarze dali mnie ich książkę.",
          ],
        },
        {
          ENG: "The doctors (females) gave me their book.",
          POL: [
            "Lekarki dały mi ich książkę.",
            "Lekarki dały mnie ich książkę.",
          ],
        },
      ];
      return runPaletteTest1("ENG", "POL", "114", ref, {});
    });
    it(`${testEnv}#pal14A-03b GET 200 YES: Engpol. (not allowed to be unspecified, should be identical result to previous test). The doctor gave me her book.`, () => {
      let ref = [
        {
          // ENG: "The doctor (female) gave me her book.",
          ENG: "The doctor gave me her book.",
          POL: [
            "Lekarka dała mi jej książkę.",
            "Lekarka dała mnie jej książkę.",
          ],
        },
        {
          // ENG: "The doctor (male) gave me his book.",
          ENG: "The doctor gave me his book.",
          POL: ["Lekarz dał mi jego książkę.", "Lekarz dał mnie jego książkę."],
        },
        {
          ENG: [
            "The doctors (mixed) gave me their book.",
            "The doctors (males) gave me their book.",
          ],
          POL: [
            "Lekarze dali mi ich książkę.",
            "Lekarze dali mnie ich książkę.",
          ],
        },
        {
          ENG: "The doctors (females) gave me their book.",
          POL: [
            "Lekarki dały mi ich książkę.",
            "Lekarki dały mnie ich książkę.",
          ],
        },
      ];
      return runPaletteTest1("ENG", "POL", "114", ref, {
        pleaseDontSpecify: true,
      });
    });
  });

  describe("/palette - Stage 14B: Possessive pronombres re Hypernymy.", () => {
    it(`${testEnv}#pal14B-01a GET 200 YES: POL only. My father gave me his book.`, () => {
      return runPaletteTest1("POL", null, "113a", [
        "Mój ojciec dał mi jego książkę.",
        "Nasz ojciec dał nam jego książkę.",
        "Moi ojcowie dali mi ich książkę.",
        "Nasi ojcowie dali nam ich książkę.",

        "Mój rodzic dał mi jego książkę.",
        // "Rodzic dał mi JEJ książkę.". absent because even when parent is a woman,
        // the sentence is still "Rodzic dał mi JEGO książkę."
        "Nasz rodzic dał nam jego książkę.",
        "Moi rodzice dali mi ich książkę.",
        "Nasi rodzice dali nam ich książkę.",

        "Moja matka dała mi jej książkę.",
        "Nasza matka dała nam jej książkę.",
        "Moje matki dały mi ich książkę.",
        "Nasze matki dały nam ich książkę.",
      ]);
    });
    it(`${testEnv}#pal14B-01b GET 200 YES: ENG only. My father gave me his book.`, () => {
      return runPaletteTest1("ENG", null, "113a", [
        "My father gave me his book.",
        "Our father gave us his book.",
        "My fathers gave me their book.",
        "Our fathers gave us their book.",

        "My parent gave me his book.",
        "Our parent gave us his book.",
        "My parent gave me her book.",
        "Our parent gave us her book.",
        "My parents gave me their book.",
        "Our parents gave us their book.",

        "My mother gave me her book.",
        "Our mother gave us her book.",
        "My mothers gave me their book.",
        "Our mothers gave us their book.",
      ]);
    });
    it(`${testEnv}#pal14B-01c GET 200 YES: Engpol. My father gave me his book.`, () => {
      return runPaletteTest1(
        "ENG",
        "POL",
        "113a",
        [
          {
            ENG: "My parent gave me his book.",
            POL: ["Mój rodzic dał mi/mnie jego książkę."],
          },
          {
            ENG: "My parent gave me her book.",
            POL: [
              "Mój rodzic dał mi/mnie jego książkę.", // I know this looks weird but it is correct. See Issue 205 in Hypernymy documentation.
            ],
            extra: { FYIPs: ["FYIP101-A-ENG-POL"] },
          },
          {
            ENG: "My parents gave me their book.",
            POL: ["Moi rodzice dali mi/mnie ich książkę."],
          },
          {
            ENG: "My father gave me his book.",
            POL: ["Mój ojciec dał mi/mnie jego książkę."],
          },
          {
            ENG: "My fathers gave me their book.",
            POL: ["Moi ojcowie dali mi/mnie ich książkę."],
          },
          {
            ENG: "My mother gave me her book.",
            POL: ["Moja matka dała mi/mnie jej książkę."],
          },
          {
            ENG: "My mothers gave me their book.",
            POL: ["Moje matki dały mi/mnie ich książkę."],
          },
          //////////////
          {
            ENG: "Our parent gave us his book.",
            POL: ["Nasz rodzic dał nam jego książkę."],
          },
          {
            ENG: "Our parent gave us her book.",
            POL: ["Nasz rodzic dał nam jego książkę."],
            extra: { FYIPs: ["FYIP101-A-ENG-POL"] },
          },
          {
            ENG: "Our parents gave us their book.",
            POL: ["Nasi rodzice dali nam ich książkę."],
          },
          {
            ENG: "Our father gave us his book.",
            POL: ["Nasz ojciec dał nam jego książkę."],
          },
          {
            ENG: "Our fathers gave us their book.",
            POL: ["Nasi ojcowie dali nam ich książkę."],
          },
          {
            ENG: "Our mother gave us her book.",
            POL: ["Nasza matka dała nam jej książkę."],
          },
          {
            ENG: "Our mothers gave us their book.",
            POL: ["Nasze matki dały nam ich książkę."],
          },
        ],
        {}
      );
    });
    it(`${testEnv}#pal14B-01d GET 200 YES: Poleng. My father gave me his book.`, () => {
      return runPaletteTest1(
        "POL",
        "ENG",
        "113a",
        [
          {
            POL: "Mój rodzic dał mi jego książkę.",
            ENG: [
              "My parent gave me his book.",
              "My parent had given me his book.",
              "My parent has given me his book.",

              "My parent gave me her book.",
              "My parent had given me her book.",
              "My parent has given me her book.",
            ],
            optionalExtra: { FYIPs: ["FYIP101-A-POL-ENG"] },
          },
          {
            POL: "Nasz rodzic dał nam jego książkę.",
            ENG: [
              "Our parent gave us his book.",
              "Our parent had given us his book.",
              "Our parent has given us his book.",

              "Our parent gave us her book.",
              "Our parent had given us her book.",
              "Our parent has given us her book.",
            ],
            optionalExtra: { FYIPs: ["FYIP101-A-POL-ENG"] },
          },
          {
            POL: "Moi rodzice dali mi ich książkę.",
            ENG: [
              "My parents gave me their book.",
              "My parents had given me their book.",
              "My parents have given me their book.",
            ],
          },
          {
            POL: "Nasi rodzice dali nam ich książkę.",
            ENG: [
              "Our parents gave us their book.",
              "Our parents had given us their book.",
              "Our parents have given us their book.",
            ],
          },
          {
            POL: "Mój ojciec dał mi jego książkę.",
            ENG: [
              "My father gave me his book.",
              "My father had given me his book.",
              "My father has given me his book.",
            ],
          },
          {
            POL: "Nasz ojciec dał nam jego książkę.",
            ENG: [
              "Our father gave us his book.",
              "Our father had given us his book.",
              "Our father has given us his book.",
            ],
          },
          {
            POL: "Moi ojcowie dali mi ich książkę.",
            ENG: [
              "My fathers gave me their book.",
              "My fathers had given me their book.",
              "My fathers have given me their book.",
            ],
          },
          {
            POL: "Nasi ojcowie dali nam ich książkę.",
            ENG: [
              "Our fathers gave us their book.",
              "Our fathers had given us their book.",
              "Our fathers have given us their book.",
            ],
          },
          {
            POL: "Moja matka dała mi jej książkę.",
            ENG: [
              "My mother gave me her book.",
              "My mother had given me her book.",
              "My mother has given me her book.",
            ],
          },
          {
            POL: "Nasza matka dała nam jej książkę.",
            ENG: [
              "Our mother gave us her book.",
              "Our mother had given us her book.",
              "Our mother has given us her book.",
            ],
          },
          {
            POL: "Moje matki dały mi ich książkę.",
            ENG: [
              "My mothers gave me their book.",
              "My mothers had given me their book.",
              "My mothers have given me their book.",
            ],
          },
          {
            POL: "Nasze matki dały nam ich książkę.",
            ENG: [
              "Our mothers gave us their book.",
              "Our mothers had given us their book.",
              "Our mothers have given us their book.",
            ],
          },
        ],
        {}
      );
    });
    it(`${testEnv}#pal14B-02a GET 200 YES: POL only. My boy gave me his book.`, () => {
      return runPaletteTest1("POL", null, "113b", [
        "Mój chłopiec dał mi jego książkę.",
        "Nasz chłopiec dał nam jego książkę.",
        "Moi chłopcy dali mi ich książkę.",
        "Nasi chłopcy dali nam ich książkę.",

        "Moje dziecko dało mi jego książkę.",
        // "Rodzic dał mi JEJ książkę.". absent because even when child is a woman,
        // the sentence is still "Rodzic dał mi JEGO książkę."
        "Nasze dziecko dało nam jego książkę.",
        "Moje dzieci dały mi ich książkę.",
        "Nasze dzieci dały nam ich książkę.",

        "Moja dziewczyna dała mi jej książkę.",
        "Nasza dziewczyna dała nam jej książkę.",
        "Moje dziewczyny dały mi ich książkę.",
        "Nasze dziewczyny dały nam ich książkę.",
      ]);
    });
    it(`${testEnv}#pal14B-02b GET 200 YES: ENG only. My boy gave me his book.`, () => {
      return runPaletteTest1("ENG", null, "113b", [
        "My boy gave me his book.",
        "Our boy gave us his book.",
        "My boys gave me their book.",
        "Our boys gave us their book.",

        "My child gave me his book.",
        "Our child gave us his book.",
        "My child gave me her book.",
        "Our child gave us her book.",
        "My children gave me their book.",
        "Our children gave us their book.",

        "My girl gave me her book.",
        "Our girl gave us her book.",
        "My girls gave me their book.",
        "Our girls gave us their book.",
      ]);
    });
    it(`${testEnv}#pal14B-02c GET 200 YES: Engpol. My boy gave me his book.`, () => {
      return runPaletteTest1(
        "ENG",
        "POL",
        "113b",
        [
          {
            ENG: "My child gave me his book.",
            POL: [
              "Moje dziecko dało mi jego książkę.",
              "Moje dziecko dało mnie jego książkę.",
            ],
          },
          {
            ENG: "My child gave me her book.",
            POL: [
              "Moje dziecko dało mi jego książkę.", // I know this looks weird but it is correct. See Issue 205 in Hypernymy documentation.
              "Moje dziecko dało mnie jego książkę.",
            ],
            extra: { FYIPs: ["FYIP101-A-ENG-POL"] },
          },
          {
            ENG: "My children gave me their book.",
            POL: [
              "Moje dzieci dały mi ich książkę.",
              "Moje dzieci dały mnie ich książkę.",
            ],
          },
          {
            ENG: "My boy gave me his book.",
            POL: [
              "Mój chłopiec dał mi jego książkę.",
              "Mój chłopiec dał mnie jego książkę.",
            ],
          },
          {
            ENG: "My boys gave me their book.",
            POL: [
              "Moi chłopcy dali mi ich książkę.",
              "Moi chłopcy dali mnie ich książkę.",
            ],
          },
          {
            ENG: "My girl gave me her book.",
            POL: [
              "Moja dziewczyna dała mi jej książkę.",
              "Moja dziewczyna dała mnie jej książkę.",
            ],
          },
          {
            ENG: "My girls gave me their book.",
            POL: [
              "Moje dziewczyny dały mi ich książkę.",
              "Moje dziewczyny dały mnie ich książkę.",
            ],
          },
          //////////////
          {
            ENG: "Our child gave us his book.",
            POL: ["Nasze dziecko dało nam jego książkę."],
          },
          {
            ENG: "Our child gave us her book.",
            POL: ["Nasze dziecko dało nam jego książkę."],
            extra: { FYIPs: ["FYIP101-A-ENG-POL"] },
          },
          {
            ENG: "Our children gave us their book.",
            POL: ["Nasze dzieci dały nam ich książkę."],
          },
          {
            ENG: "Our boy gave us his book.",
            POL: ["Nasz chłopiec dał nam jego książkę."],
          },
          {
            ENG: "Our boys gave us their book.",
            POL: ["Nasi chłopcy dali nam ich książkę."],
          },
          {
            ENG: "Our girl gave us her book.",
            POL: ["Nasza dziewczyna dała nam jej książkę."],
          },
          {
            ENG: "Our girls gave us their book.",
            POL: ["Nasze dziewczyny dały nam ich książkę."],
          },
        ],
        {}
      );
    });
    it(`${testEnv}#pal14B-02d GET 200 YES: Poleng. My boy gave me his book.`, () => {
      return runPaletteTest1(
        "POL",
        "ENG",
        "113b",
        [
          {
            POL: "Moje dziecko dało mi jego książkę.",
            ENG: [
              "My child gave me his book.",
              "My child had given me his book.",
              "My child has given me his book.",

              "My child gave me her book.",
              "My child had given me her book.",
              "My child has given me her book.",

              "My baby gave me her book.",
              "My baby had given me her book.",
              "My baby has given me her book.",

              "My baby gave me his book.",
              "My baby had given me his book.",
              "My baby has given me his book.",

              "My baby gave me its book.",
              "My baby had given me its book.",
              "My baby has given me its book.",
            ],
            extra: { FYIPs: ["FYIP101-A-POL-ENG"] },
          },
          {
            POL: "Nasze dziecko dało nam jego książkę.",
            ENG: [
              "Our child gave us his book.",
              "Our child had given us his book.",
              "Our child has given us his book.",

              "Our child gave us her book.",
              "Our child had given us her book.",
              "Our child has given us her book.",

              "Our baby gave us her book.",
              "Our baby had given us her book.",
              "Our baby has given us her book.",

              "Our baby gave us his book.",
              "Our baby had given us his book.",
              "Our baby has given us his book.",

              "Our baby gave us its book.",
              "Our baby had given us its book.",
              "Our baby has given us its book.",
            ],
            extra: { FYIPs: ["FYIP101-A-POL-ENG"] },
          },
          {
            POL: "Moje dzieci dały mi ich książkę.",
            ENG: [
              "My children gave me their book.",
              "My children had given me their book.",
              "My children have given me their book.",

              "My babies gave me their book.",
              "My babies had given me their book.",
              "My babies have given me their book.",
            ],
          },
          {
            POL: "Nasze dzieci dały nam ich książkę.",
            ENG: [
              "Our children gave us their book.",
              "Our children had given us their book.",
              "Our children have given us their book.",

              "Our babies gave us their book.",
              "Our babies had given us their book.",
              "Our babies have given us their book.",
            ],
          },
          {
            POL: "Mój chłopiec dał mi jego książkę.",
            ENG: [
              "My boy gave me his book.",
              "My boy had given me his book.",
              "My boy has given me his book.",
            ],
          },
          {
            POL: "Nasz chłopiec dał nam jego książkę.",
            ENG: [
              "Our boy gave us his book.",
              "Our boy had given us his book.",
              "Our boy has given us his book.",
            ],
          },
          {
            POL: "Moi chłopcy dali mi ich książkę.",
            ENG: [
              "My boys gave me their book.",
              "My boys had given me their book.",
              "My boys have given me their book.",
            ],
          },
          {
            POL: "Nasi chłopcy dali nam ich książkę.",
            ENG: [
              "Our boys gave us their book.",
              "Our boys had given us their book.",
              "Our boys have given us their book.",
            ],
          },
          {
            POL: "Moja dziewczyna dała mi jej książkę.",
            ENG: [
              "My girl gave me her book.",
              "My girl had given me her book.",
              "My girl has given me her book.",
            ],
          },
          {
            POL: "Nasza dziewczyna dała nam jej książkę.",
            ENG: [
              "Our girl gave us her book.",
              "Our girl had given us her book.",
              "Our girl has given us her book.",
            ],
          },
          {
            POL: "Moje dziewczyny dały mi ich książkę.",
            ENG: [
              "My girls gave me their book.",
              "My girls had given me their book.",
              "My girls have given me their book.",
            ],
          },
          {
            POL: "Nasze dziewczyny dały nam ich książkę.",
            ENG: [
              "Our girls gave us their book.",
              "Our girls had given us their book.",
              "Our girls have given us their book.",
            ],
          },
        ],
        {}
      );
    });
    it(`${testEnv}#pal14B-02e GET 200 YES: Engpol. My baby gave me his book.`, () => {
      return runPaletteTest1(
        "ENG",
        "POL",
        "113c",
        [
          {
            ENG: ["My baby gave me his book."],
            POL: [
              "Moje dziecko dało mi jego książkę.",
              "Moje dziecko dało mnie jego książkę.",
            ],
          },
          {
            ENG: ["My baby gave me its book."],
            POL: [
              "Moje dziecko dało mi jego książkę.",
              "Moje dziecko dało mnie jego książkę.",
            ],
            optionalExtra: { FYIPs: ["FYIP101-A-ENG-POL"] },
          },
          {
            ENG: ["My baby gave me her book."],
            POL: [
              "Moje dziecko dało mi jego książkę.",
              "Moje dziecko dało mnie jego książkę.",
            ],
            extra: { FYIPs: ["FYIP101-A-ENG-POL"] },
          },
          {
            ENG: ["My babies gave me their book."],
            POL: [
              "Moje dzieci dały mi ich książkę.",
              "Moje dzieci dały mnie ich książkę.",
            ],
          },
        ],
        {}
      );
    });
  });

  describe("/palette - Stage 15: Prepositions and Articles.", () => {
    it(`${testEnv}#pal15-01a GET 200 YES: Poleng. Indefinite article.`, () => {
      let ref = [
        {
          ENG: ["A tomato."],
          POL: "Pomidor.",
        },
        {
          ENG: ["An onion."],
          POL: "Cebula.",
        },
        {
          ENG: ["An apple."],
          POL: "Jabłko.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy56", ref, {});
    });
    it(`${testEnv}#pal15-01b GET 200 YES: Engpol. Indefinite article.`, () => {
      let ref = [
        {
          ENG: "A tomato.",
          POL: ["Pomidor."],
        },
        {
          ENG: "An onion.",
          POL: ["Cebula."],
        },
        {
          ENG: "An apple.",
          POL: ["Jabłko."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy56", ref, {});
    });
    it(`${testEnv}#pal15-02a GET 200 YES: Poleng. Either article.`, () => {
      let ref = [
        {
          ENG: ["A woman.", "The woman.", "A lady.", "The lady."],
          POL: "Kobieta.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy56a", ref, {});
    });
    it(`${testEnv}#pal15-02b GET 200 YES: Engpol. Either article.`, () => {
      let ref = [
        {
          ENG: "A woman.",
          POL: ["Kobieta."],
        },
        {
          ENG: "The woman.",
          POL: ["Kobieta."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy56a", ref, {});
    });
    it(`${testEnv}#pal15-03a GET 200 YES: Poleng. Preposition 'with'. SHEEP (checking clarifiers) Articles for singular. Checking POL protective preposition form.`, () => {
      let ref = [
        {
          ENG: ["With a sheep.", "With the sheep."],
          POL: "Z owcą.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy55c", ref, {});
    });
    it(`${testEnv}#pal15-03b GET 200 YES: Engpol. Preposition 'with'. SHEEP (checking clarifiers) Articles for singular. Checking POL protective preposition form.`, () => {
      let ref = [
        {
          ENG: ["With the sheep (singular).", "With a sheep."],
          POL: ["Z owcą."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy55c", ref, {});
    });
    it(`${testEnv}#pal15-03c GET 200 YES: Poleng. Preposition 'with'. SHEEP (checking clarifiers) Articles for plural.`, () => {
      let ref = [
        {
          ENG: ["With sheep.", "With the sheep."],
          POL: "Z owcami.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy55d", ref, {});
    });
    it(`${testEnv}#pal15-03d GET 200 YES: Engpol. Preposition 'with'. SHEEP (checking clarifiers) Articles for plural.`, () => {
      let ref = [
        {
          ENG: ["With the sheep (plural).", "With sheep."],
          POL: ["Z owcami."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy55d", ref, {});
    });
    it(`${testEnv}#pal15-04a GET 200 YES: Poleng. Preposition 'with'. Articles for singular. Checking POL protective preposition form.`, () => {
      let ref = [
        {
          ENG: ["With a sheep.", "With the sheep."],
          POL: "Z owcą.",
        },
        {
          ENG: ["With a rat.", "With the rat."],
          POL: "Ze szczurem.",
        },
        {
          ENG: ["With a bear.", "With the bear."],
          POL: "Z niedźwiedziem.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy55a", ref, {});
    });
    it(`${testEnv}#pal15-04b GET 200 YES: Engpol. Preposition 'with'. Articles for singular. Checking POL protective preposition form.`, () => {
      let ref = [
        {
          ENG: ["With the sheep.", "With a sheep."],
          POL: ["Z owcą."],
        },
        {
          ENG: ["With the rat.", "With a rat."],
          POL: ["Ze szczurem."],
        },
        {
          ENG: ["With the bear.", "With a bear."],
          POL: ["Z niedźwiedziem."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy55a", ref, {});
    });
    it(`${testEnv}#pal15-04c GET 200 YES: Poleng. Preposition 'with'. Articles for plural.`, () => {
      let ref = [
        {
          ENG: ["With sheep.", "With the sheep."],
          POL: "Z owcami.",
        },
        {
          ENG: ["With rats.", "With the rats."],
          POL: "Ze szczurami.",
        },
        {
          ENG: ["With bears.", "With the bears."],
          POL: "Z niedźwiedziami.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy55b", ref, {});
    });
    it(`${testEnv}#pal15-04d GET 200 YES: Engpol. Preposition 'with'. Articles for plural.`, () => {
      let ref = [
        {
          ENG: ["With the sheep.", "With sheep."],
          POL: ["Z owcami."],
        },
        {
          ENG: ["With the rats.", "With rats."],
          POL: ["Ze szczurami."],
        },
        {
          ENG: ["With the bears.", "With bears."],
          POL: ["Z niedźwiedziami."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy55b", ref, {});
    });
    it(`${testEnv}#pal15-04e GET 200 YES: Poleng. Preposition 'with'. Articles for singular. merelyPreferredChoicesForQuestionSentence`, () => {
      let ref = [
        {
          ENG: ["With an apple.", "With the apple."],
          POL: "Z jabłkiem.",
        },
        {
          ENG: ["With a tomato.", "With the tomato."],
          POL: "Z pomidorem.",
        },
        {
          ENG: ["With an onion.", "With the onion."],
          POL: "Z cebulą.",
        },
      ];
      return runPaletteTest1("POL", "ENG", "dummy55", ref, {});
    });
    it(`${testEnv}#pal15-04f GET 200 YES: Engpol. Preposition 'with'. Articles for singular. merelyPreferredChoicesForQuestionSentence`, () => {
      let ref = [
        {
          ENG: "With an apple.",
          POL: ["Z jabłkiem."],
        },
        {
          ENG: "With a tomato.",
          POL: ["Z pomidorem."],
        },
        {
          ENG: "With an onion.",
          POL: ["Z cebulą."],
        },
      ];
      return runPaletteTest1("ENG", "POL", "dummy55", ref, {});
    });
  });
});

function checkSentenceTranslations(
  res,
  questionLanguage,
  answerLanguage,
  word,
  allExpectedQuestionSentences,
  translatedSentencesRef = generalTranslatedSentencesRef
) {
  let { body } = res;
  let direction = `${questionLanguage}->${answerLanguage}`;

  if (!allExpectedQuestionSentences.length) {
    allExpectedQuestionSentences = translatedSentencesRef[word][direction].map(
      (array) => array[questionLanguage]
    );
  }

  consol.logTestOutputSolely("\n\n", res.body);

  let questionSentence = body.questionSentenceArr[0];
  let { answerSentenceArr } = body;

  expect(questionSentence).to.be.a("String");

  expect(allExpectedQuestionSentences).to.include(questionSentence);

  let translations = translatedSentencesRef[word][direction];

  expect(translations.map((refItem) => refItem[questionLanguage])).to.include(
    questionSentence
  );

  translations.forEach((refItem) => {
    let { POL, ENG } = refItem;

    if (questionSentence === POL) {
      expect(answerSentenceArr).to.have.members(ENG);
      consol.log(
        `-' '-._,-' '-._,-' '-._,-' '-._,-' '-._,-' '-._${questionSentence}`
      );
      consol.log(
        "was translated by,-'-._,-' '-._,-' '-._,-'-._,",
        answerSentenceArr
      );
    }
    if (questionSentence === ENG) {
      expect(answerSentenceArr).to.have.members(POL);
      consol.log(
        `-' '-._,-' '-._,-' '-._,-' '-._,-' '-._,-' '-._${questionSentence}`
      );
      consol.log(
        "  was translated by`-' '-._,-' '-._,-' '-._,-'",
        answerSentenceArr
      );
    }
  });
}

function runPaletteTestBespoke(
  questionLanguage,
  answerLanguage,
  sentenceFormulaId,
  args,
  word,
  alex = [],
  tran,
  useDummy = sentenceFormulaId.includes("dummy")
) {
  if (
    sentenceFormulaId.startsWith("dummy") ||
    /\d/.test(sentenceFormulaId[0])
  ) {
    sentenceFormulaId = questionLanguage + "-" + sentenceFormulaId;
  }

  word = word + questionLanguage;

  return request(app)
    .get("/api/palette")
    .send({
      useDummy,
      questionLanguage,
      answerLanguage,
      sentenceFormulaId,
      ...args,
    })
    .expect(200)
    .then((res) => {
      checkSentenceTranslations(
        res,
        questionLanguage,
        answerLanguage,
        word,
        alex,
        tran
      );
    });
}
