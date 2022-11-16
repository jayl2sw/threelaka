export interface RecentVideos {
  continueTime: string;
  stage: string;
  title: string;
  videoId: string;
}
export interface CompletedVideos {
  continueTime: string;
  stage: string;
  title: string;
  videoId: string;
}

export interface TestGraph {
  label: string;
  value: number;
}

export interface MonthStudyTime {
  time: Array<Object>;
  seqDays: number;
}

export interface StudyHistory {
  essays: number;
  videos: number;
  words: number;
}

export interface TotalStudyTime {
  time: number;
}
