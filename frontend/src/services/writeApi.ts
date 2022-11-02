import { WordCheckPayload, SpellCheckRes } from '../models';
import customAxios from './customAxios';

// 에세이 쓰인 단어 체크 API
export const postCheckWordApi = async (wordCheckPayload: WordCheckPayload) => {
  const res = await customAxios.post(
    `api/v2/study/writing/wordcheck`,
    wordCheckPayload
  );
  return res.data;
};

// 스펠 체크 API
export const spellCheckApi = async (
  spellCheckPayload: string
): Promise<any> => {
  const res = await customAxios.post(
    `api/v2/study/writing/spellcheck?text=${spellCheckPayload}`,
    spellCheckPayload
  );
  const tempRes: SpellCheckRes = res.data;
  console.log(tempRes);
  return tempRes;
};
