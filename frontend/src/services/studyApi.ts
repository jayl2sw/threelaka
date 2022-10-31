import customAxios from './customAxios';
<<<<<<< HEAD
import { StudyStage } from '../models';

=======
import { StudyStage, StageInfo } from '../models';
// 해당 videoID를 통한 공부를 시작함을 알림
>>>>>>> e223de8c2a7fbb703c51ada25e39d634422466f8
export const postStartStudyApi = async (videoId: string) => {
  const res = await customAxios.post(`api/v1/study/start`, { videoId });
  return res.data;
};
<<<<<<< HEAD
=======
// 학습 시간 계산을 위해 공부시간을 보냄
export const putStopStudyApi = async (increasedTime: number) => {
  const res = await customAxios.put(`api/v1/study/complete/time`,{time: increasedTime});
  return res.data;
};

// 스테이지 업데이트 API
export const updateStudyStageApi =async (stageInfo: StageInfo): Promise<any> => {
  const res = await customAxios.put(`api/v1/study/complete/stage`,stageInfo);
  console.log(res.data);
  return res.data;
}

>>>>>>> e223de8c2a7fbb703c51ada25e39d634422466f8
