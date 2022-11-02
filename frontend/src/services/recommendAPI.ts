import customAxios from './customAxios';
import { VideoData } from '../models/video';

// 학습 영상 기반 추천
export const getRecommendedVideosAPI = async (
  videoId: string
): Promise<VideoData[]> => {
  return customAxios.get(`api/v1/video/recommend`);
};

// 학습 기록 없는 신규 유저가 선택한 태그 기반 추천
// export const getTagVideoAPI = async (videoId: string): Promise<VideoData[]> => {
//   return customAxios.get(`api/v1/video/recommend`);
// };
