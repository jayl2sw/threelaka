import customAxios from './customAxios';
import { TedScript } from '../models';

export const getTedScriptApi = async (
  videoId: string
): Promise<TedScript[]> => {
  return customAxios.post(`api/v1/video/script/${videoId}`);
};
