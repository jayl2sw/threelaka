export interface VideoData {
  watched: boolean | null;
  video: {
    videoId: string;
    title: string;
    description: string;
    script: string;
  };
}
