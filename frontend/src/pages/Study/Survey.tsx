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
import { ModalBackdrop } from '../../styles/DashBoard/DashBoardStyle';
import {
  FlexTransparentDiv,
  BackBlurBox,
} from '../../styles/Common/CommonDivStyle';
import { ProfileCenter } from '../../styles/DashBoard/DashBoardStyle';
import { ProfileImgBox } from '../../styles/DashBoard/DashBoardStyle';
import { MainBtn } from '../../styles/Common/CommonBtnStyle';
import { SurveyBlock } from '../../styles/Speaking/SpeakingStyle';
import { IheaderProps } from '../../layout/Header';

interface ISurveyProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Survey = ({ setIsModal }: ISurveyProps) => {
  const { customMoveToNext } = useOutletContext<IheaderProps>();
  const pageParams: StudyPageParams = useParams() as any;
  const moveToNext = customMoveToNext;

  const [isThumbClick, setIsThumbClick] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const goToHome = () => {
    dispatch(studyActions.resetStudystate());
    navigate('/');
  };
  useEffect(() => {
    dispatch(studyActions.getTodayStudyRecord(pageParams.learningRecordId));
  }, []);

  const todayStudyRec = useAppSelector((state) => state.study.todayStudyRecord);

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
  const profile = useAppSelector((state) => state.auth.currentUser?.profile);
  const nickname = useAppSelector((state) => state.auth.currentUser?.nickname);

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <ModalBackdrop>
      <SurveyBlock>
        <MainBox
          widthSize={'40vw'}
          heightSize={'62vh'}
          paddingSize={'2.5vw 1vw'}
          fontColor={'black'}
          fontSize={'3vmin'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: `#fff`,
            justifyContent: 'center',
            paddingTop: '1vh',
          }}
        >
          <FlexTransparentDiv
            widthSize={'40vw'}
            heightSize={'10vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
          >
            {/* <ProfileImgBox
            style={{
              width: '11vmin',
              height: '11vmin',
              background: `linear-gradient(
                    106.62deg,
                    #83bdff 8.18%,
                    rgba(88, 172, 240, 0.861458) 45.03%,
                    #c1ffa9 92.42%
                  )`,
              backgroundColor: 'white',
              borderRadius: '50%',

              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
            }}
          > */}
            <ProfileImgBox
              style={{
                width: '10vmin',
                height: '10vmin',

                backgroundColor: 'trasnparent',
                borderRadius: '50%',

                // position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                // marginRight: '1vw',
              }}
            >
              <ProfileCenter
                className={profile !== '0' ? 'profileImg' + profile : 'default'}
                style={{ backgroundSize: '9vmin 9vmin' }}
              ></ProfileCenter>
            </ProfileImgBox>
            {/* </ProfileImgBox> */}

            <div style={{ color: '#111111', marginLeft: '1vw' }}>
              <span style={{ fontWeight: 'bold' }}>{nickname}</span>님, 학습을
              완료하셨네요!
            </div>
          </FlexTransparentDiv>

          {todayStudyRec && (
            <MainBox
              widthSize={'30vw'}
              heightSize={'30vh'}
              paddingSize={'2vw 1vw'}
              fontColor={'black'}
              fontSize={'3vmin'}
              style={{ background: '#D8E7F4', marginTop: '2vh' }}
            >
              <FlexTransparentDiv
                widthSize={'28vw'}
                heightSize={'5vh'}
                paddingSize={'0'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{ marginBottom: '1vh' }}
              >
                <BackBlurBox
                  widthSize={'8vw'}
                  heightSize={'4vh'}
                  paddingSize={'0'}
                  fontSize={'2vmin'}
                  fontColor={'white'}
                  style={{
                    backgroundColor: '#5CA9FF',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '2vw',
                  }}
                >
                  학습 시작 일자
                </BackBlurBox>
                <div style={{ width: '8vw', fontSize: '2vmin' }}>
                  {todayStudyRec.startDate.slice(0, 4) +
                    '-' +
                    todayStudyRec.startDate.slice(5, 7) +
                    '-' +
                    todayStudyRec.startDate.slice(8, 10)}
                </div>
              </FlexTransparentDiv>
              <FlexTransparentDiv
                widthSize={'28vw'}
                heightSize={'5vh'}
                paddingSize={'0'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{ marginBottom: '1vh' }}
              >
                <BackBlurBox
                  widthSize={'8vw'}
                  heightSize={'4vh'}
                  paddingSize={'0'}
                  fontSize={'2vmin'}
                  fontColor={'white'}
                  style={{
                    backgroundColor: '#5CA9FF',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '1vw',
                  }}
                >
                  학습 종료 일자
                </BackBlurBox>
                <div
                  style={{ width: '8vw', fontSize: '2vmin', marginLeft: '1vw' }}
                >
                  {todayStudyRec.finishedDate}
                </div>
              </FlexTransparentDiv>
              <FlexTransparentDiv
                widthSize={'28vw'}
                heightSize={'5vh'}
                paddingSize={'0'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{ marginBottom: '1vh' }}
              >
                <BackBlurBox
                  widthSize={'8vw'}
                  heightSize={'4vh'}
                  paddingSize={'0'}
                  fontSize={'2vmin'}
                  fontColor={'white'}
                  style={{
                    backgroundColor: '#5CA9FF',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '1vw',
                  }}
                >
                  학습한 단어 수
                </BackBlurBox>
                <div
                  style={{ width: '8vw', fontSize: '2vmin', marginLeft: '1vw' }}
                >
                  {todayStudyRec.numberOfWordbook}개
                </div>
              </FlexTransparentDiv>
              <FlexTransparentDiv
                widthSize={'28vw'}
                heightSize={'5vh'}
                paddingSize={'0'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{ marginBottom: '1vh' }}
              >
                <BackBlurBox
                  widthSize={'8vw'}
                  heightSize={'4vh'}
                  paddingSize={'0'}
                  fontSize={'2vmin'}
                  fontColor={'white'}
                  style={{
                    backgroundColor: '#5CA9FF',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '1vw',
                  }}
                >
                  오늘 학습 시간
                </BackBlurBox>
                <div
                  style={{ width: '8vw', fontSize: '2vmin', marginLeft: '1vw' }}
                >
                  {todayStudyRec.todayLearningTime !== 0 &&
                  todayStudyRec.todayLearningTime / 3600 >= 1 ? (
                    <div>
                      {(todayStudyRec.todayLearningTime / 3600).toFixed(1)}시간
                    </div>
                  ) : (
                    <div>
                      {(todayStudyRec.todayLearningTime / 60).toFixed(1)}분
                    </div>
                  )}
                </div>
              </FlexTransparentDiv>
              <FlexTransparentDiv
                widthSize={'28vw'}
                heightSize={'5vh'}
                paddingSize={'0'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{ marginTop: '6.5vh' }}
              ></FlexTransparentDiv>
            </MainBox>
          )}

          <FlexTransparentDiv
            widthSize={'28vw'}
            heightSize={'5vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{ paddingTop: '6vh' }}
          >
            <MainBtn
              widthSize={'9vw'}
              heightSize={'5vh'}
              paddingSize={'0'}
              fontSize={'1.8vmin'}
              fontColor={'white'}
              backgroundColor={'black'}
              style={{
                marginRight: '2vw',
                fontWeight: 'bold',
              }}
              onClick={() => {
                setIsModal(false);
                navigate('/');
              }}
            >
              홈으로 돌아가기
            </MainBtn>
            <MainBtn
              widthSize={'9vw'}
              heightSize={'5vh'}
              paddingSize={'0'}
              fontSize={'1.8vmin'}
              fontColor={'white'}
              backgroundColor={'black'}
              style={{
                background: `linear-gradient(
              110.64deg,
              #4a9fff 5.65%,
              rgba(88, 172, 240, 0.861458) 30.15%,
              #b0ff91 84.64%

            )`,
                fontWeight: 'bold',
              }}
              onClick={() => {
                setIsModal(false);
                navigate('/auth/dashboard/1');
              }}
            >
              대시보드로 가기
            </MainBtn>
          </FlexTransparentDiv>

          {/* {isThumbClick ? (
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
      </div> */}
        </MainBox>
      </SurveyBlock>
    </ModalBackdrop>
  );
};
export default Survey;
