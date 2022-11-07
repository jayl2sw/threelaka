export interface CheckedWord {
  dict_word: string;
  essay_word: string;
  sentence: string;
}

export interface WordCheckPayload {
  word_list: string[];
  essay: string;
}

export interface SuggestionScore {
  suggestion: string;
  score: number;
}

export interface FlggedToken {
  offset: number;
  token: string;
  type: string;
  suggestions: SuggestionScore[];
}

export interface SpellCheckRes {
  _type: string;
  flaggedTokens: FlggedToken[];
}

export interface SaveEssayPayload {
  content: string;
  learningRecordId: number;
}
