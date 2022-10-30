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
  // api parameter
  const appId = '81e0600d';
  const appKey = process.env.REACT_APP_CAMBRIDGE_DICT_API_KEY;
  const language = 'en-us';
  const wordId = word; // 검색할 단어
  // CORS 임시 방편
  // https://cors.bridged.cc/ (우회)
  const url =
    'https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com:443/api/v2/entries/' +
    language +
    '/' +
    wordId;
  console.warn(appKey);
  const res = await axios.get(url, {
    headers: {
      app_id: appId,
      app_key: appKey,
    },
  });
  const senses = res.data.results[0].lexicalEntries[0].entries[0].senses[0];
  // console.log(senses);
  const wordDefinition = senses['definitions'][0];
  let wordExample = '';
  try {
    wordExample = senses['examples'][0]['text'];
  } catch {
    wordExample = 'example does not exist';
  }
  const lexicalCategory =
    res.data.results[0].lexicalEntries[0].lexicalCategory.text;
  const response = {
    wordId: wordId,
    wordDefinition: wordDefinition,
    wordExample: wordExample,
    lexicalCategory: lexicalCategory,
  };
  // console.warn(response);
  return response;
};

export const postAddWordToWordBookApi = async (wordInfo: WordInfo): Promise<any> => {
  let res = await customAxios.post(`api/v1/study/word`, wordInfo);  
  // res = JSON.parse(res.data.script);
  // console.log(res);
  return res.data; // "success"
};
