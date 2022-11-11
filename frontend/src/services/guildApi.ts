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

// 길드의 완료된 멤버 조회
export const getGuildMemberApi = async (guildId: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/members/${guildId}`);
  console.log('길드 멤버 조회', res.data);
  return res.data;
};
