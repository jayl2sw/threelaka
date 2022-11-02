// videoId를 보내면 유저가 해당 비디오를 얼마나 공부했는지 알려준다
export interface StageInfo {
  learningRecordId: number;
  stage: string;
}

export interface StudyPageParams extends StageInfo {
  videoId: string;
}

export interface StudyStage extends StudyPageParams {
  userId: number;
}

export interface AwordMeaning {
  wordDefinition: string;
  wordExample: string;
  lexicalCategory: string;
}

export interface WordMeaning {
  wordId: string;
  wordList: AwordMeaning[];
}

export interface WordInfo {
  definition: string;
  example: string;
  lrId: number;
  word: string;
}

export interface WordBook {
  wordbookId: number;
  word: string;
  example: string;
}

export interface SpeakingMode {
  pronunciationTest: boolean;
  webcamMode: boolean;
  voiceMode: boolean;
  scriptOn: boolean;
}
