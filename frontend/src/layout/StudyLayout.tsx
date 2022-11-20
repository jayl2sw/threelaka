import React from 'react';
import Header from './Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../utils/hooks';
import { studyActions } from '../features/study/study-slice';
import { StudyPageParams } from '../models';
import { dashboardActions } from '../features/dashboard/dashboard-slice';
import './StudyLayoutStyle.css';

// interface IheaderProps {
//   customMoveToNext: (
//     e: React.MouseEvent<HTMLSpanElement>,
//     nextStep: string,
//     pageParams: StudyPageParams
//   ) => void;
// }

const StudyLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const customMoveToNext = (
    e: React.MouseEvent<HTMLSpanElement>,
    nextStep: string,
    pageParams: StudyPageParams
  ) => {
    // 1. 스테이지 업데이트 액션 dispatch

    const stageInfo = {
      learningRecordId: pageParams.learningRecordId,
      stage: nextStep,
    };

    if (nextStep === 'COMPLETE') {
      dispatch(studyActions.UpdateStudyStageStart(stageInfo));
      dispatch(dashboardActions.getCompletedVideos());
      navigate('/auth/dashboard/1');
      // dispatch(studyActions.resetStudystate());
    } else {
      // 2. 라이팅 페이지로 이동
      dispatch(studyActions.UpdateStudyStageStart(stageInfo));
      navigate(
        `/study/${nextStep.toLocaleLowerCase()}/${
          pageParams.learningRecordId
        }/${nextStep}/${pageParams.videoId}`
      );
    }
  };

  return (
    <div
      className="study-style"
      style={{
        width: '100vw',
        height: '100vh',
        background:
          'linear-gradient(106.56deg, rgba(132, 176, 226, 0.5) 7.3%, rgba(88, 172, 240, 0.430729) 77.68%, rgba(174, 243, 147, 0.5) 99.32%)',
      }}
    >
      <Header customMoveToNext={customMoveToNext}></Header>
      <Outlet context={{ customMoveToNext }} />
    </div>
  );
};

export default StudyLayout;
