const { nouns } = require("../../../Wiktionary/POL/nouns.js");
console.log(typeof nouns);
console.log(nouns.length);

function makeProtoLemmaObjects(raw) {
  let headWords = raw
    .filter((rawObj) => rawObj.senses.some((sense) => !sense.form_of))
    .map((rawObj) => rawObj.word);

  headWords = Array.from(new Set(headWords));

  console.log(headWords);

  let plObjs = headWords.map((headWord) => {
    return { headWord, constituentWords: [] };
  });

  function splitAllStrings(arr, separator = " ") {
    let res = [];
    arr.forEach((s) => {
      res.push(...s.split(separator));
    });
    return res;
  }

  raw.forEach((rawObj) => {
    rawObj.senses.forEach((sense) => {
      if (!sense.form_of) {
        return;
      }

      sense.form_of.forEach((f) => {
        let plObj = plObjs.find((plObj) => plObj.headWord === f.word);

        if (plObj) {
          let traits = splitAllStrings(sense.glosses);
          traits = traits.filter((t) => !["of", plObj.headWord].includes(t));
          traits = traits.join(" ");

          plObj.constituentWords.push({
            word: rawObj.word,
            traits,
          });
        }
      });
    });
  });

  return plObjs.filter((plObj) => plObj.constituentWords.length);
}

let nounsRaw = [
  {
    pos: "noun",
    heads: [{ 1: "f", dim: "cebulka", template_name: "pl-noun" }],
    forms: [{ form: "cebulka", tags: ["diminutive"] }],
    inflection: [{ 1: "cebu", 2: "l", template_name: "pl-decl-noun-f" }],
    sounds: [
      { ipa: "/t\u0361s\u025b\u02c8bu.la/" },
      { audio: "Pl-cebula.ogg", text: "audio" },
    ],
    categories: ["Alliums", "Vegetables"],
    word: "cebula",
    lang: "Polish",
    lang_code: "pl",
    derived: [{ tags: ["adjective"], word: "cebulowy" }],
    senses: [
      { tags: ["feminine"], glosses: ["onion"], id: "cebula-noun-KIlxZxaF" },
      {
        categories: ["Botany"],
        topics: ["biology", "botany", "natural-sciences"],
        tags: ["feminine"],
        glosses: ["bulb"],
        id: "cebula-noun-tJQvtOi1",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "f", dim: "kobietka", template_name: "pl-noun" }],
    forms: [{ form: "kobietka", tags: ["diminutive"] }],
    inflection: [{ template_name: "pl-decl-noun-f" }],
    sounds: [
      { ipa: "/k\u0254\u02c8b\u02b2\u025b.ta/" },
      { audio: "pl-kobieta.ogg", text: "Audio" },
    ],
    word: "kobieta",
    lang: "Polish",
    lang_code: "pl",
    senses: [
      {
        tags: ["feminine"],
        glosses: ["woman"],
        antonyms: [{ word: "m\u0119\u017cczyzna" }],
        derived: [{ tags: ["adjective"], word: "kobiecy" }],
        categories: ["Female people"],
        id: "kobieta-noun",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", g: "f", template_name: "head" }],
    word: "kobiecie",
    lang: "Polish",
    lang_code: "pl",
    sounds: [{ ipa: "/k\u0254\u02c8b\u02b2\u025b.t\u0361\u0255\u025b/" }],
    senses: [
      {
        form_of: [{ word: "kobieta" }],
        tags: ["dative", "feminine", "form-of", "singular"],
        glosses: ["dative singular"],
        id: "kobiecie-noun-OxXwOzpu",
      },
      {
        form_of: [{ word: "kobieta" }],
        tags: ["feminine", "form-of", "locative", "singular"],
        glosses: ["locative singular"],
        id: "kobiecie-noun-rHLeyTqo",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", template_name: "head" }],
    word: "kobietami",
    lang: "Polish",
    lang_code: "pl",
    sounds: [{ ipa: "/k\u0254.b\u02b2\u025b\u02c8ta.m\u02b2i/" }],
    senses: [
      {
        glosses: ["instrumental plural of kobieta"],
        tags: ["form-of", "instrumental", "plural"],
        form_of: [{ word: "kobieta" }],
        id: "kobietami-noun",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", g: "f", template_name: "head" }],
    word: "cebulom",
    lang: "Polish",
    lang_code: "pl",
    sounds: [{ ipa: "/t\u0361s\u025b\u02c8bu.l\u0254m/" }],
    senses: [
      {
        tags: ["dative", "feminine", "form-of", "plural"],
        glosses: ["dative plural of cebula"],
        form_of: [{ word: "cebula" }],
        id: "cebulom-noun",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", g: "f", template_name: "head" }],
    word: "cebulach",
    lang: "Polish",
    lang_code: "pl",
    sounds: [{ ipa: "/t\u0361s\u025b\u02c8bu.lax/" }],
    senses: [
      {
        tags: ["feminine", "form-of", "locative", "plural"],
        glosses: ["locative plural of cebula"],
        form_of: [{ word: "cebula" }],
        id: "cebulach-noun",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", g: "f", template_name: "head" }],
    word: "cebule",
    lang: "Polish",
    lang_code: "pl",
    sounds: [
      { ipa: "/t\u0361s\u025b\u02c8bu.l\u025b/" },
      { homophone: "cebul\u0119" },
    ],
    senses: [
      {
        form_of: [{ word: "cebula" }],
        tags: ["feminine", "form-of", "nominative", "plural"],
        glosses: ["nominative plural"],
        id: "cebule-noun-zVZ7KRgk",
      },
      {
        form_of: [{ word: "cebula" }],
        tags: ["accusative", "feminine", "form-of", "plural"],
        glosses: ["accusative plural"],
        id: "cebule-noun-.BBVa5WX",
      },
      {
        form_of: [{ word: "cebula" }],
        tags: ["feminine", "form-of", "plural", "vocative"],
        glosses: ["vocative plural"],
        id: "cebule-noun-z7YpPynN",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", g: "f", template_name: "head" }],
    word: "cebulami",
    lang: "Polish",
    lang_code: "pl",
    sounds: [{ ipa: "/t\u0361s\u025b.bu\u02c8la.m\u02b2i/" }],
    senses: [
      {
        tags: ["feminine", "form-of", "instrumental", "plural"],
        glosses: ["instrumental plural of cebula"],
        form_of: [{ word: "cebula" }],
        id: "cebulami-noun",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", g: "f", template_name: "head" }],
    word: "cebul\u0105",
    lang: "Polish",
    lang_code: "pl",
    sounds: [{ ipa: "/t\u0361s\u025b\u02c8bu.l\u0254\u0303/" }],
    senses: [
      {
        tags: ["feminine", "form-of", "instrumental", "singular"],
        glosses: ["instrumental singular of cebula"],
        form_of: [{ word: "cebula" }],
        id: "cebul\u0105-noun",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", g: "f", template_name: "head" }],
    word: "cebul\u0119",
    lang: "Polish",
    lang_code: "pl",
    sounds: [
      { ipa: "/t\u0361s\u025b\u02c8bu.l\u025b/" },
      { homophone: "cebule" },
    ],
    senses: [
      {
        tags: ["accusative", "feminine", "form-of", "singular"],
        glosses: ["accusative singular of cebula"],
        form_of: [{ word: "cebula" }],
        id: "cebul\u0119-noun",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", g: "f", template_name: "head" }],
    word: "cebulo",
    lang: "Polish",
    lang_code: "pl",
    sounds: [{ ipa: "/t\u0361s\u025b\u02c8bu.l\u0254/" }],
    senses: [
      {
        tags: ["feminine", "form-of", "singular", "vocative"],
        glosses: ["vocative singular of cebula"],
        form_of: [{ word: "cebula" }],
        id: "cebulo-noun",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", g: "f", template_name: "head" }],
    word: "cebuli",
    lang: "Polish",
    lang_code: "pl",
    sounds: [{ ipa: "/t\u0361s\u025b\u02c8bu.l\u02b2i/" }],
    senses: [
      {
        form_of: [{ word: "cebula" }],
        tags: ["feminine", "form-of", "genitive", "singular"],
        glosses: ["genitive singular"],
        id: "cebuli-noun-KptnZnqq",
      },
      {
        form_of: [{ word: "cebula" }],
        tags: ["dative", "feminine", "form-of", "singular"],
        glosses: ["dative singular"],
        id: "cebuli-noun-OxXwOzpu",
      },
      {
        form_of: [{ word: "cebula" }],
        tags: ["feminine", "form-of", "locative", "singular"],
        glosses: ["locative singular"],
        id: "cebuli-noun-rHLeyTqo",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", g: "f", template_name: "head" }],
    word: "cebul",
    lang: "Polish",
    lang_code: "pl",
    sounds: [{ ipa: "/\u02c8t\u0361s\u025b.bul/" }],
    senses: [
      {
        tags: ["feminine", "form-of", "genitive", "plural"],
        glosses: ["genitive plural of cebula"],
        form_of: [{ word: "cebula" }],
        id: "cebul-noun",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", template_name: "head" }],
    word: "ci\u0119\u017carne",
    lang: "Polish",
    lang_code: "pl",
    sounds: [{ ipa: "/t\u0361\u0255\u025b\u0303\u02c8\u0290ar.n\u025b/" }],
    senses: [
      {
        glosses: [
          "nominative/accusative/vocative plural of ci\u0119\u017carna",
        ],
        tags: ["accusative", "form-of", "nominative", "plural", "vocative"],
        form_of: [{ word: "ci\u0119\u017carna" }],
        id: "ci\u0119\u017carne-noun",
      },
    ],
  },
  {
    pos: "noun",
    heads: [{ 1: "pl", 2: "noun form", template_name: "head" }],
    word: "ci\u0119\u017carn\u0105",
    lang: "Polish",
    lang_code: "pl",
    sounds: [
      { ipa: "/t\u0361\u0255\u025b\u0303\u02c8\u0290ar.n\u0254\u0303/" },
    ],
    senses: [
      {
        glosses: ["accusative/instrumental singular of ci\u0119\u017carna"],
        tags: ["accusative", "form-of", "instrumental", "singular"],
        form_of: [{ word: "ci\u0119\u017carna" }],
        id: "ci\u0119\u017carn\u0105-noun",
      },
    ],
  },
];

let plObjs = makeProtoLemmaObjects(nouns);
console.log(plObjs);
