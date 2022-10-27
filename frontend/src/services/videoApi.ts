import customAxios from './customAxios';
import { VideoData } from '../models';

export const getVideoDataApi = async (url: string) => {
  const res = await customAxios.post(`api/v1/study/video`, { url });
  return res.data;
};
