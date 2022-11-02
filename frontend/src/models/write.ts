export interface CheckedWord {
  checkWord: string;
  checkExample: string;
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
