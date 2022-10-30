import customAxios from './customAxios';
import { StudyStage } from '../models';

export const postStartStudyApi = async (videoId: string) => {
  const res = await customAxios.post(`api/v1/study/start`, { videoId });
  return res.data;
};

export const putStopStudyApi = async (increasedTime: number) => {
  const res = await customAxios.put(`api/v1/study/complete/time`,{time: increasedTime});
  return res.data;
};

