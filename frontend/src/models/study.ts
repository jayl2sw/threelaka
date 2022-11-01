// videoId를 보내면 유저가 해당 비디오를 얼마나 공부했는지 알려준다
export interface StudyStage {
  learningRecordId: number;
  stage: string;
  userId: number;
}

export interface WordMeaning {
  wordId: string,
  wordDefinition: string;
  wordExample: string
  lexicalCategory: string
};

export interface WordInfo {
  definition: string;
  example: string;
  videoId: string;
  word: string;
};

export interface StageInfo {
  learningRecordId: number;
  stage: string;
};

export interface WordBook {
  wordbookId: number;
  word: string;
  example: string;
}