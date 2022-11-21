import customAxios from './customAxios';
import { VideoData, RecommendVideos } from '../models';
import {
  RecentVideos,
  CompletedVideos,
  MonthStudyTime,
  StudyHistory,
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
