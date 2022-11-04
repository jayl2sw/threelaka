import { ReactNode } from 'react';

// 영상 정보
export interface VideoData {
  watched: boolean | null;
  video: {
    videoId: string;
    title: string;
    description: string;
    script: string;
  };
}

// 최근 영상 정보
export interface RecentVideoData {
  videoId: string;
  title: string;
  description: string;
  script: string;
}

// 추천 영상 리스트
export interface RecommendVideos {
  videoId: string;
  title: string;
  description: string;
  korScript: boolean;
}

// VideoData 띄우는 모달의 타입
export interface VideoDataModalType {
  isOpenModal: boolean;
  toggle: () => void;
  videoData: VideoData;
}
