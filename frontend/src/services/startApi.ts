import customAxios from './customAxios';
import { StartStudy } from './../models';

export const postStartStudyApi = async (videoId: string) => {
  const res = await customAxios.post(`api/v1/study/video`, { videoId });
  return res.data;
};
