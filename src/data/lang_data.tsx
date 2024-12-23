

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

type LangLetter = {
  uncode_letter: string; // The closest unicode character to the letter (for search and copy-paste)
  svg: SvgRepr;
};

type LangAlphabet = {
  letters: Array<LangLetter>;
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
  keys: Map<number, LangKey>; // The number should be the key code (place in the layout)
  layout: Array<KeyboardPosition>; // The places of the keys in the layout (row, column) starting from the top left corner (id is the key code)
};

type KeyboardPosition = {
  row: number;
  column: number;
};

type LangKey = {
  key: LangLetter;
  // The modifier is the key that should be pressed with this key to get a different key
  // This is a map of modifiers to allow for multiple modifiers to be pressed at the same time
  modifiers: Map<Array<LangModifier>, LangLetter>;
};

type LangModifier = {
  key: LangLetter;
};
