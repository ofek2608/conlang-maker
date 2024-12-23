let _dict: LangDictionary | null = null;
let _limit: number = 10000;
let _words: Array<LangWord> = [];

export function initiateWordList(dict: LangDictionary | null, limit: number): boolean {
  _dict = dict;
  _limit = limit;
  _words = [];
  return reloadWordList();
}

export function getWordListLimit(): number {
  return _limit;
}

export function setWordListLimit(value: number): void {
  _limit = value;
}

export function getWordList(): Array<LangWord> {
  return _words;
}

export function cleanupWordList(): void {
  _words = [];
}

export function reloadWordList(): boolean {
  _words = [];
  if (!_dict) {
    return true;
  }

  let existingWords = new Set();
  function addWord(word: LangWord | null) {
    if (word === null) {
      return false;
    }
    let key = wordToKey(word);
    if (existingWords.has(key)) {
      return false;
    }
    if (_words.length >= _limit) {
      return true;
    }
    existingWords.add(key);
    _words.push(word);
    return false;
  }

  for (let word of _dict.baseWords) {
    if (addWord(word)) {
      return false;
    }
  }

  for (let i = 0; i < _words.length; i++) {
    if (i >= _words.length) {
      return true;
    }
    let word = _words[i];
    for (let [manipName,manipRule] of _dict.manipulations.entries()) {
      if (addWord(applyManipulation(word, manipName, manipRule))) {
        return false;
      }
    }
  }
  return true;
}

function wordToKey(word: LangWord) {
  return word.word + ';' + word.tags.join(';');
}

function applyManipulation(word: LangWord, manipName: string, manipRule: LangWordManip): LangEmergentWord | null {
  for (let tag of manipRule.requiredTags) {
    if (word.tags.indexOf(tag) < 0) {
      return null;
    }
  }
  for (let tag of manipRule.blacklistedTags) {
    if (word.tags.indexOf(tag) >= 0) {
      return null;
    }
  }

  let newWord = applyStrManipulation(word.word, manipRule.manipulateWord);

  if (newWord === null) {
    return null;
  }

  let newDefinition = applyStrManipulation(word.definition, manipRule.manipulateDefinition);

  if (newDefinition === null) {
    return null;
  }

  let tags = new Set(word.tags);
  manipRule.addTags.forEach(tags.add);
  manipRule.removeTags.forEach(tags.delete);
  return {
    parent: word,
    manipulationRule: manipName,
    word: newWord,
    definition: newDefinition,
    tags: [...tags].sort()
  };
}

function applyStrManipulation(str: string, manip: LangStrManip): string | null {
  const match = str.match(manip.pattern);
  if (match && match[0].length == str.length) {
    return str.replace(manip.pattern, manip.replacement);
  }
  return null;
}