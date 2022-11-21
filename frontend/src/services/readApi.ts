import customAxios from './customAxios';
import axios from 'axios';
import { WordMeaning, WordInfo } from '../models';

export const getTedScriptApi = async (videoId: string): Promise<any> => {
  let res = await customAxios.get(`api/v1/study/${videoId}/script`);
  // console.log("얍얍얍",res);
  res = JSON.parse(res.data.script);
  // console.log(res);
  return res;
};

export const getFindWordApi = async (word: string) => {
  const res = await customAxios.post(`api/v2/study/dictionary?word=${word}`);

  const response: WordMeaning = {
    wordId: res.data.wordId,
    wordList: res.data.results,
  };
  return response;
};

export const postAddWordToWordBookApi = async (
  wordInfo: WordInfo
): Promise<any> => {
  let res = await customAxios.post(`api/v1/study/word`, wordInfo);
  // res = JSON.parse(res.data.script);
  // console.log(res);
  return res.data; // "success"
};

export const deleteWordToWordBookApi = async (
  wordBookId: number
): Promise<any> => {
  let res = await customAxios.delete(`api/v1/study/word`, {
    data: { wordbookId: wordBookId },
  });
  return res.data; // "success"
};
