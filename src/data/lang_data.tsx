

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

type LangAlphabet = {
  //TODO implement
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

