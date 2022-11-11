import { ReactNode } from 'react';

// 내길드의 공지 조회
export interface GuildNotice {
  guildId: number;
  guildName: string;
  notice: string;
}

//멤버
export interface Member {
  nickname: string;
  userId: number;
  lastLearningDay: number;
}

// 길드 멤버 정보 조회
export interface GuildMemberList {
  guildId: number;
  guildName: string;
  members: Member[];
}

// video 정보
export interface VideoInfo {
  guildId: number;
  videoId: string;
  startDate: string;
  endDate: string;
}

// 길드 공지 모달 타입
export interface NoticeModalType {
  isOpenModal: Boolean;
  toggle: () => void;
  notice: string;
}
