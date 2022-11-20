export interface User {
  userId: number;
  email: string;
  password: string;
  age: number;
  nickname: string;
  role: string;
  continuousLearningDate: number;
  createDate: string;
  gender: string;
  username: string;
  grade: number;
  guildId: number;
  profile: string;
} //아직안씀

export interface UserAlertInfo {
  alertId: 0;
  alertState: string;
  assignmentId: 0;
  guildId: 0;
  guildName: string;
  videoId: string;
  videoTitle: string;
}
