import { ReactNode } from 'react';

export interface VideoData {
  watched: boolean | null;
  video: {
    videoId: string;
    title: string;
    description: string;
    script: string;
  };
}

// VideoData 띄우는 모달의 타입
export interface VideoDataModalType {
  isOpenModal: boolean;
  toggle: () => void;
  videoData: VideoData;
}
