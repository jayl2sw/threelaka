import { WordCheckPayload } from '../models';
import customAxios from './customAxios';

// 에세이 쓰인 단어 체크 API
export const postCheckWordApi = async (wordCheckPayload: WordCheckPayload) => {
  const res = await customAxios.put(
    `api/v1/study/complete/time`,
    wordCheckPayload
  );
  return res.data;
};
