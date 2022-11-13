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
