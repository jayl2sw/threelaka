import customAxios from './customAxios';
import { VideoData, RecommendVideos } from '../models';
import { RecentVideos, CompletedVideos } from '../models/dashboard';

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
