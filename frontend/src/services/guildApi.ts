import customAxios from './customAxios';

// 내 길드의 공지 조회
export const getGuildNoticeApi = async (guildId: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/notice/${guildId}`);
  console.log(res.data);
  return res.data;
};

// 길드의 진행중인 과제 목록 조회
export const getProgressTaskApi = async (status: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/assignment/1`);
  console.log('진행중인 영상 정보', res.data);
  return res.data;
};

// 길드의 완료된 과제 목록 조회
export const getUpcomingTaskApi = async (status: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/assignment/0`);
  console.log('예정된 영상 정보', res.data);
  return res.data;
};

// 길드의 멤버 조회
export const getGuildMemberApi = async (guildId: string): Promise<any> => {
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
  guildNotice: string
): Promise<any> => {
  const res = await customAxios.post(`/api/v1/user/guild/notice`, guildNotice);
  return res.data;
};

// 길드의 공지 수정
export const putGuildNoticeApi = async (guildNotice: string): Promise<any> => {
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