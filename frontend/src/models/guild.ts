import { learningRecordData } from './video';
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

// 상위 3개 길드 정보
export interface TopThreeGuild {
  guildId: number;
  guildName: string;
  profile: string;
}

export interface GuildDetailInfo {
  guildId: number;
  masterId: number;
  masterNickname: string;
  guildName: string;
  description: string;
  memberSize: number;
  profile: string;
}

export interface AssignmentVideo {
  assignmentId: number;
  videoId: string;
  videoTitle: string;
  guildId: number;
  startDate: string;
  endDate: string;
}

export interface MyguildInfo {
  guildId: number;
  masterId: number;
  masterNickname: string;
  guildName: string;
  description: string;
  notice: string;
  assignments: AssignmentVideo[];
}

export interface MyguildLearnTime {
  time: number;
  profile: string;
  userId: number;
  nickname: string;
}

// 나의 길드 가입 요청 리스트
export interface MyRequest {
  guildName: string;
  state: string;
}

// 내가 길드장인 길드에 온 요청 리스트
export interface GuildRequest {
  guildId: number;
  requstId: number;
  state: string;
  userId: number;
}

// WebSocet 개별 Guild
export interface GuildInfo {
  guildId: number | null;
  rooms: Room[];
  connectedUsers: ConnectedUser[];
}

// WebSocket 모든 Guilds
export interface SocketGuilds {
  guild: GuildInfo[];
}

// WebSocket 내 개별 길드의 개별 Room
export interface Room {
  videoId: string | null;
  roomNumber: number;
  conntedUsers: ConnectedUser[];
}

// WebSocket에 연결된 개별 유저
export interface ConnectedUser {
  nickname: string;
  guildId: number;
  roomNumber: number;
  learningRecordId: number;
}
