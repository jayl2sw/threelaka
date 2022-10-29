// videoId를 보내면 유저가 해당 비디오를 얼마나 공부했는지 알려준다
export interface StudyStage {
  learningRecordId: number;
  stage: string;
  userId: number;
}
