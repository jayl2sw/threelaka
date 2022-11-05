import customAxios from './customAxios';
import { StudyStage, StageInfo } from '../models';
import axios from 'axios';

// 해당 videoID를 통한 공부를 시작함을 알림
export const postStartStudyApi = async (videoId: string) => {
  const res = await customAxios.post(`api/v1/study/start`, { videoId });
  return res.data;
};

// 학습 시간 계산을 위해 공부시간을 보냄
export const putStopStudyApi = async (increasedTime: number) => {
  const res = await customAxios.put(`api/v1/study/complete/time`, {
    time: increasedTime,
  });
  return res.data;
};

// 스테이지 업데이트 API
export const updateStudyStageApi = async (
  stageInfo: StageInfo
): Promise<any> => {
  const res = await customAxios.put(`api/v1/study/complete/stage`, stageInfo);
  console.log(res.data);
  return res.data;
};

// 단어장 가져오기 API
export const getWordBookApi = async (learningId: number): Promise<any> => {
  const res = await customAxios.get(`api/v1/study/word/${learningId}`);
  console.log(res.data);
  return res.data;
};

//발음검사 API
export const speechaceApi = async (payload: any): Promise<any> => {
  const { payloadData, payloadText } = payload;
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const res = await customAxios.post(
    `api/v2/study/speechace?text=${payloadText}`,
    payloadData,
    config
  );
  console.log(res.data);
  return res.data;
};

// 공부 후 만족도 검사 API
export const postStudySatisfactionApi = async (
  isLike: number
): Promise<any> => {
  const res = await customAxios.post(`api/v1/study/survey/`, isLike);
  console.log(res.data);
  return res.data;
};
