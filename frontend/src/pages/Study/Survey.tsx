import React, { useEffect, useState } from 'react';
import { ModalContainer } from '../../styles/Common/VideoModalStyle';
import { MainBox } from '../../styles/Common/CommonDivStyle';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { LikeHateBox } from '../../styles/Common/EtcStyle';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { studyActions } from '../../features/study/study-slice';
import { useParams, useOutletContext } from 'react-router-dom';
import { StudyPageParams, SatisfactionSurvey } from '../../models';
import { IheaderProps } from '../../layout/Header';

interface ISurveyProps {
  isOpenModal: boolean;
  toggle: () => void;
}

const Survey = ({ isOpenModal, toggle }: ISurveyProps) => {
  const { customMoveToNext } = useOutletContext<IheaderProps>();
  const pageParams: StudyPageParams = useParams() as any;
  const moveToNext = customMoveToNext;
  const onClickModal = toggle;
  const [isThumbClick, setIsThumbClick] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const goToHome = () => {
    dispatch(studyActions.resetStudystate());
    navigate('/');
  };

  const onClickStudySatisfaction = (
    e: React.MouseEvent<HTMLDivElement>,
    isLike: number
  ) => {
    dispatch(
      studyActions.postStudySatisfactionStart({
        learningRecordId: pageParams.learningRecordId,
        survey: isLike,
      })
    );
    dispatch(studyActions.resetStudystate());
    // navigate('/');
    setIsThumbClick(true);
    moveToNext(e, 'COMPLETE', pageParams);
  };

  return (
    <ModalContainer
      // onClick={onClickModal}
      style={{ width: '30vw', height: '40vh' }}
    >
      <MainBox
        widthSize={'28vw'}
        heightSize={'30vh'}
        paddingSize={'2vw 1vw'}
        fontColor={'black'}
        fontSize={'3vmin'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>해당영상의 학습은 어떠셨나요?</div>
        {isThumbClick ? (
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfnW_cA5SmBuRK1PE0e-B_LpDpuEaNoyUp1HytoH_WwH2OnuQ/viewform?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            <div
              style={{
                width: '18vw',
                height: '20vh',
                fontSize: '3vmin',
                paddingTop: '5vh',
                textDecoration: 'underline',
              }}
            >
              서비스 이용후기 작성하러가기!
            </div>
          </a>
        ) : (
          <div
            style={{
              display: 'flex',
              width: '10vw',
              justifyContent: 'space-between',
              marginTop: '5vh',
            }}
          >
            <LikeHateBox
              onClick={(e) => {
                onClickStudySatisfaction(e, 1);
              }}
            >
              <div>Like</div>
              <AiOutlineLike />
            </LikeHateBox>
            <LikeHateBox
              onClick={(e) => {
                onClickStudySatisfaction(e, 2);
              }}
            >
              <div>Hate</div>
              <AiOutlineDislike />
            </LikeHateBox>
          </div>
        )}
      </MainBox>
      <div
        style={{
          marginTop: '2vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            marginBottom: '1vh',
            cursor: 'pointer',
          }}
          onClick={goToHome}
        >
          Home으로 돌아가기!
        </div>
      </div>
    </ModalContainer>
  );
};
export default Survey;
