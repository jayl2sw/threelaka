import customAxios from './customAxios';

// 내 길드의 공지 조회
export const getGuildNoticeApi = async (guildId: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/notice/${guildId}`);
  console.log(res.data);
  return res.data;
};

// 길드의 과제 목록 조회
export const getProgressTaskApi = async (status: string): Promise<any> => {
  const res = await customAxios.get(`/api/v1/user/guild/assignment/${status}`);
  console.log('영상 정보', res.data);
  return res.data;
};
