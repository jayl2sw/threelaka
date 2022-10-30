import customAxios from "./customAxios";
import { TedScript } from '../models';

export const getTedScriptApi = async (videoId: string): Promise<any> => {
  let res = await customAxios.get(`api/v1/study/${videoId}/script`);
  // console.log("얍얍얍",res);
  res = JSON.parse(res.data.script);
  // console.log(res);
  return res;
}

export const getFindWord =async (word: string) => {  
  // api parameter
  const appId = '81e0600d'
  const appKey = process.env.REACT_APP_CAMBRIDGE_DICT_API_KEY
  const language = 'en-gb'
  const wordId = word // 검색할 단어
  const url = 'https://od-api.oxforddictionaries.com/api/v2/entries/'  + language + '/'  + wordId.toLowerCase()
  const res = await customAxios.post(url, {headers: {
    'app_id' : appId, 'app_key' : appKey
  }})
  console.log(res.data);
}