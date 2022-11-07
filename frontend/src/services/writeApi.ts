import { WordCheckPayload, SpellCheckRes, SaveEssayPayload } from '../models';
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

// 에세이 저장 API
export const postSaveEssayApi = async (SaveEssayPayload: SaveEssayPayload) => {
  console.log('얍얍', SaveEssayPayload);
  const res = await customAxios.post(`api/v1/study/essay`, SaveEssayPayload);
  return res.data;
};

// 에세이 불러오기 API
export const getEssayApi = async (lrId: number) => {
  const res = await customAxios.get(`api/v1/study/essay/${lrId}`);
  const response = res.data.essay;
  if (response === null) {
    return '';
  } else {
    return response;
  }
};
