exports.shorthandInflectionsRef = {
  nominative: "nom",
  accusative: "acc",
  dative: "dat",
  genitive: "gen",
  instrumental: "ins",
  locative: "loc",
  // vocative: "voc",
};

exports.shorthandInflectionsRef2 = {
  noms: ["singular", "nom"],
  accs: ["singular", "acc"],
  dats: ["singular", "dat"],
  gens: ["singular", "gen"],
  inss: ["singular", "ins"],
  locs: ["singular", "loc"],
  // vocs: ["singular", "voc"],
  nomp: ["plural", "nom"],
  accp: ["plural", "acc"],
  datp: ["plural", "dat"],
  genp: ["plural", "gen"],
  insp: ["plural", "ins"],
  locp: ["plural", "loc"],
  // vocp: ["plural", "voc"],
};

exports.mascKeys = ["m", "masculine", "masc", "male"];

exports.femKeys = ["f", "feminine", "fem", "female"];

exports.genderConversionRef = {
  "m-pr": "m1",
  "m-an": "m2",
  "m-in": "m3",

  "m-p": "virile",

  m: "nonvirile",
  p: "nonvirile",
  nv: "nonvirile",
  pl: "nonvirile",
  "m-in-p": "nonvirile",

  f: "f",
  n: "n",
};

exports.inflectionsRef = [
  "nominative",
  "genitive",
  "dative",
  "accusative",
  "instrumental",
  "locative",
  // "vocative",
];

exports.higherInflectionsRef = ["plural", "singular"];

exports.otherInflectionsRef = ["augmentative", "diminutive", "abbreviation"];

function checkRawInfKeys() {
  let koala = {
    pos: "noun",
    heads: [{ 1: "f", template_name: "pl-noun" }],
    inflection: [{ genp: "koali", template_name: "pl-decl-noun-f" }],
    sounds: [
      { ipa: "/k\u0254\u02c8a.la/" },
      { audio: "Pl-koala.ogg", text: "audio" },
    ],
    word: "koala",
    lang: "Polish",
    lang_code: "pl",
    senses: [
      {
        tags: ["feminine"],
        glosses: ["koala"],
        categories: ["Marsupials"],
        id: "koala-noun",
      },
    ],
  };

  let rawInfKeys = [];

  nouns.forEach((rawObj, rIndex) => {
    if (!goodNounsPL.includes(rawObj.word)) {
      return;
    }
    rawObj.senses.forEach((sense, sIndex) => {
      if (!sense.form_of) {
        return;
      }

      sense.form_of.forEach((f, fIndex) => {
        if (f.lemma) {
          throw `Error 2763`;
        }

        let traits = splitAllStrings(sense.glosses);
        traits = traits.filter(
          (t) => !["of"].includes(t) && !goodNounsPL.includes(t)
        );
        traits.forEach((tr) => rawInfKeys.push(tr));
      });
    });
  });

  rawInfKeys = rawInfKeys.filter(
    (rik) =>
      !ref.inflectionsRef.includes(rik.toLowerCase()) &&
      !ref.otherInflectionsRef.includes(rik.toLowerCase())
  );
  rawInfKeys = Array.from(new Set(rawInfKeys));
}
