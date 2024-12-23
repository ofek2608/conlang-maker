

type LangData = {
  displayName: string;
  nativeName: string;
  alphabet: LangAlphabet;
  dictionary: LangDictionary;
  keyboard: LangKeyboard;
};

//////////////
// Alphabet //
//////////////

type SvgRepr = {
  viewBox: string; // "corner-up-left-x corner-up-left-y size-x size-y"
  elements: Array<string>; // All elements of the SVG
}

type LangAlphabet = {
  letters: Map<string, SvgRepr>; // The string should be the closest unicode representation from the SvgRepr (allowing copy/pasting)
};

////////////////
// Dictionary //
////////////////

type LangDictionary = {
  baseWords: Array<LangBaseWord>;
  manipulations: Map<string,LangWordManip>;
};

type LangWord = LangBaseWord | LangEmergentWord;

type LangBaseWord = {
  word: string;
  definition: string;
  tags: LangTags;
};

type LangEmergentWord = LangBaseWord & {
  parent: LangWord;
  manipulationRule: string;
};

type LangWordManip = {
  requiredTags: LangTags;
  blacklistedTags: LangTags;
  addTags: LangTags;
  removeTags: LangTags;
  manipulateWord: LangStrManip;
  manipulateDefinition: LangStrManip;
};

type LangStrManip = {
  //TODO use custom regular expression and replacement, so this process will be reversible.
  pattern: RegExp;
  replacement: string;
};

type LangTags = Array<string>;

//////////////
// Keyboard //
//////////////

type LangKeyboard = {
  //TODO implement
};
