import customAxios from './customAxios';
import { VideoData, RecommendVideos } from '../models';
import {
  RecentVideos,
  CompletedVideos,
  MonthStudyTime,
  StudyHistory,
  TotalStudyTime,
  UserWordInfo,
  isMemorizedWord,
} from '../models/dashboard';

// 최근에 본 영상 리스트
export const getRecentVideosApi = async (
  recentVideoList: Array<object>
): Promise<any> => {
  const res = await customAxios.get('api/v1/dashboard/playing');
  const response: RecentVideos[] = res.data;
  return response;
};
// 공부 완료한 영상 리스트
export const getCompletedVideosApi = async (
  completedVideoList: Array<object>
): Promise<any> => {
  const res = await customAxios.get('/api/v1/dashboard/done');
  const response: CompletedVideos[] = res.data;
  return response;
};

//일주일공부시간 불러오기
export const getDailyStudyTimeApi = async (
  dailyStudyTime: Array<object>
): Promise<any> => {
  const res = await customAxios.get('/api/v1/dashboard/data');
  const response: [] = res.data;
  return response;
};

//한달공부시간 불러오기
export const getMonthStudyTimeApi = async (
  monthStudyTime: MonthStudyTime
): Promise<any> => {
  const res = await customAxios.get('/api/v1/dashboard/calendar');
  const response: MonthStudyTime = res.data;
  return response;
};

//학습히스토리 불러오기
export const getStudyHistoryApi = async (
  studyHistory: StudyHistory
): Promise<any> => {
  const res = await customAxios.get('/api/v1/dashboard/history');
  const response: StudyHistory = res.data;
  return response;
};

//프로필 수정

export const updateProfileApi = async (profileNum: string): Promise<any> => {
  const res = await customAxios.put(`/api/v1/dashboard/profile/${profileNum}`);

  return res.data;
};

//총 학습시간 조회
export const getTotalStudyTimeApi = async (
  totalStudyTime: TotalStudyTime
): Promise<any> => {
  const res = await customAxios.get('/api/v1/dashboard/history/time');
  const response: TotalStudyTime = res.data;
  return response;
};

//태그 등록 또는 수정

export const updateTagApi = async (tagList: Array<number>): Promise<any> => {
  console.log('얘가 뭔가', tagList);
  const res = await customAxios.put(`/api/v1/dashboard/tag`, tagList);

  return res.data;
};

//태그리스트불러오기
export const getTagListApi = async (tagList: Array<string>): Promise<any> => {
  const res = await customAxios.get('/api/v1/dashboard/tag');
  const response: [] = res.data;
  return response;
};

//유저영단어 불러오기
export const getUserWordInfoApi = async (
  userWordInfo: UserWordInfo[]
): Promise<any> => {
  const res = await customAxios.get('/api/v1/study/word/user');
  const response: UserWordInfo[] = res.data;
  return response;
};

//단어 외움 처리
export const putIsMemorizedWordApi = async (
  isMemorizedWordInfo: isMemorizedWord
): Promise<any> => {
  console.log('얘가 뭔가', isMemorizedWordInfo);
  const res = await customAxios.put(
    `/api/v1/study/word/complete`,
    isMemorizedWordInfo
  );

  return res.data;
};
