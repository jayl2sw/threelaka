import customAxios from './customAxios';
import { GuildAssignment, CreateGuildForm } from '../models/guild';

// 내 길드의 공지 조회
export const getGuildNoticeApi = async (guildId: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/notice/${guildId}`);
  console.log(res.data);
  return res.data;
};

// 길드의 과제 목록 조회(예정(0) / 진행중(1) / 완료된(2))
export const getGuildTaskApi = async (status: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/assignment/${status}`);
  console.log('길드 과제 정보 영상 정보', res.data);
  return res.data;
};

// // 길드의 완료된 과제 목록 조회
// export const getUpcomingTaskApi = async (status: string): Promise<any> => {
//   const res = await customAxios.get(`/api/v1/user/guild/assignment/0`);
//   console.log('예정된 영상 정보', res.data);
//   return res.data;
// };

// 길드의 멤버 조회
export const getGuildMemberApi = async (guildId: number): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/members/${guildId}`);
  console.log('길드 멤버 조회', res.data);
  return res.data;
};

// 길드의 공지 삭제
export const deleteGuildNoticeApi = async (): Promise<any> => {
  const res = await customAxios.delete(`/api/v1/user/guild/notice`);
  return res.data;
};

// 길드의 공지 생성
export const createGuildNoticeApi = async (
  guildNotice: number
): Promise<any> => {
  const res = await customAxios.post(`/api/v1/user/guild/notice`, guildNotice);
  return res.data;
};

// 길드의 공지 수정
export const putGuildNoticeApi = async (guildNotice: number): Promise<any> => {
  const res = await customAxios.put(
    `/api/v1/user/guild/notice?notice=${guildNotice}`
  );
  return res.data;
};

// 길드의 마스터 변경
export const postGuildHandOverApi = async (
  nextGuildMaster: string
): Promise<any> => {
  const res = await customAxios.post(
    `/api/v1/user/guild/master/${nextGuildMaster}`
  );
  return res.data;
};

// 길드원 추방
export const DeleteMemberApi = async (tagetMemberId: number): Promise<any> => {
  const res = await customAxios.delete(
    `/api/v1/user/guild/remove/${tagetMemberId}`
  );
  return res.data;
};

// top3 길드 가져오기
export const GetTopThreeGuildApi = async (): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/ranking`);
  return res.data;
};

// 길드 정렬 리스트 가져오기
export const GetSortedGuildApi = async (basis: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/${basis}`);
  return res.data;
};

// 길드 정보 가져오기
export const GetSearchGuildApi = async (guildId: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/search/${guildId}`);
  return res.data;
};

// 길드 학습량 조회
export const GetGuildLearnTimeApi = async (guildId: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/${guildId}/member`);
  return res.data;
};

// 내가 마스터인 길드 가입 요청 조회
export const GetGuildRequestsApi = async (): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/requests`);
  return res.data;
};

// 길드 가입 승인하기
export const AccpetGuildRequestApi = async (
  requestId: number
): Promise<any> => {
  const res = await customAxios.put(`/api/v1/user/guild/accept`, requestId);
  return res.data;
};

// 길드 가입 거절 하기
export const RejectGuildRequestApi = async (
  requestId: number
): Promise<any> => {
  const res = await customAxios.delete(`/api/v1/user/guild/reject`, {
    data: requestId,
  });
  return res.data;
};

// 나의 길드 요청 목록 조회
export const GetMyRequestApi = async (): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/request`);
  return res.data;
};

// 길드 가입 요청 하기
export const PostGuildRequestApi = async (guildId: number): Promise<any> => {
  const res = await customAxios.post(`/api/v1/user/guild/request`, guildId);
  return res.data;
};

// 내가 가입한 길드 탈퇴
export const QuitGuildApi = async (guildId: number): Promise<any> => {
  const res = await customAxios.delete(`/api/v1/user/guild/quit/${guildId}`);
  return res.data;
};

// 길드 과제 만들기
export const PostGuildAssignmentApi = async (
  guildAssignment: GuildAssignment
): Promise<any> => {
  const res = await customAxios.post(
    `/api/v1/user/guild/assignment`,
    guildAssignment
  );
  return res.data;
};

// 길드 과제 삭제하기
export const DeleteGuildAssignmentApi = async (
  assignId: number
): Promise<any> => {
  const res = await customAxios.delete(
    `/api/v1/user/guild/assignment/${assignId}`
  );
  return res.data;
};

// 길드 생성하기
export const CreateGuildApi = async (guildCreateData: any): Promise<any> => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await customAxios.post(
    `/api/v1/user/guild/`,
    guildCreateData,
    config
  );
  return res.data;
};

// 과제 진행도 에세이 가져오기
export const GetAssignmentProgressApi = async (
  assignmentId: number
): Promise<any> => {
  const res = await customAxios.get(
    `/api/v1/user/guild/${assignmentId}/progress`
  );
  return res.data;
};

// 특정 비디오 유저 에세이 목록
export const GetSpecificEssayApi = async (videoId: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/${videoId}/essay/list`);
  return res.data;
};
