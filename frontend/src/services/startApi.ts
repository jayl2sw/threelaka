import customAxios from './customAxios';
import { StudyStart } from './../models';

export const postStudyStartApi = async (videoId: string) => {
  const res = await customAxios.post(`api/v1/study/video`, { videoId });
  return res.data;
};
