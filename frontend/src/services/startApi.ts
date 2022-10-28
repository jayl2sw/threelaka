import customAxios from './customAxios';
import { StudyStage } from './../models';

export const postStartStudyApi = async (videoId: string) => {
  const res = await customAxios.post(`api/v1/study/start`, { videoId });
  return res.data;
};
