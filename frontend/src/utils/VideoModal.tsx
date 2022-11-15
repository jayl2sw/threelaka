import React, { useEffect, useState } from 'react';
import { videoActions } from '../features/video/video-slice';
import { studyActions } from '../features/study/study-slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import {
  MainBox,
  FlexTransparentDiv,
  BackBlurBox,
} from '../styles/Common/CommonDivStyle';
import {
  AiFillCloseCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { CloseModalBtn } from '../styles/Common/VideoModalStyle';
import { MainBtn } from '../styles/Common/CommonBtnStyle';

interface IVideoModalProps {
  modalStyleNum: number;
  modalToggleVideoId: string;
  setModalToggleVideoId: (nextVideoId: string) => void;
}

const VideoModal = ({
  modalStyleNum,
  modalToggleVideoId,
  setModalToggleVideoId,
}: IVideoModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // 버튼 클릭으로 영상 정보 조회
  useEffect(() => {
    if (modalToggleVideoId !== 'none') {
      console.log(modalToggleVideoId);
      dispatch(videoActions.getVideoData(modalToggleVideoId));
    }
  }, [modalToggleVideoId]);
  // useState
  const [continuedToggle, setContinuedToggle] = useState<boolean>(false);
  const [continuePage, setContinuePage] = useState<number>(0);
  // useAppSelector
  // 모달에 띄워줄 비디오 정보
  const videoData = useAppSelector((state) => state.video.videoData);
  // 정확한 url인지 확인하기
  const correctUrl = useAppSelector((state) => state.video.correctUrl);

  // 현재 영상 stage 확인
  const studyState = useAppSelector((state) => state.study.studyState);

  // 해당 영상으로 새로운 공부 시작
  const handlerPostStartStudy = (videoId: string) => {
    dispatch(studyActions.postStartStudy(videoId));
    setTimeout(() => {
      setModalToggleVideoId('none');
    }, 100);
  };

  // 기존의 이동하던 스테이지에서 이어서 공부하기
  const handlerResumeStudy = (
    stage: string,
    learingRecordId: number,
    videoId: string
  ) => {
    if (stage === 'READING') {
      navigate(`/study/reading/${learingRecordId}/${stage}/${videoId}`);
    } else if (stage === 'WRITING') {
      navigate(`/study/writing/${learingRecordId}/${stage}/${videoId}`);
    } else if (stage === 'SPEAKING') {
      navigate(`/study/speaking/${learingRecordId}/${stage}/${videoId}`);
    } else navigate(`/`);
  };

  // stage 변경 시 해당 스테이지로 이동
  useEffect(() => {
    if (studyState.stage !== '') {
      // navigate(`/study/${stage}`);
      if (studyState.learningRecordId !== 0) {
        navigate(
          `/study/reading/${studyState.learningRecordId}/${studyState.stage}/${studyState.videoId}`
        );
      }
    }
  }, [studyState]);

  useEffect(() => {
    if (correctUrl === false) {
      dispatch(videoActions.resetCorrectUrl());
      setModalToggleVideoId('none');
      alert('제대로 된 url을 입력하라');
    }
  }, [correctUrl]);

  return modalToggleVideoId === 'none' ? (
    <></>
  ) : (
    <MainBox
      widthSize={'50vw'}
      heightSize={'60vh'}
      paddingSize={'2vh 2vw'}
      fontColor={'black'}
      fontSize={'1.5vmin'}
      style={{
        position: 'fixed',
        top: '20vh',
        left: '25vw',
        zIndex: '1000',
        // border: '1px solid green',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {correctUrl === false ? '잘못된 url을 검색하셧습니다.' : ''}
      <CloseModalBtn
        onClick={() => {
          setModalToggleVideoId('none');
          setContinuedToggle(false);
          setContinuePage(0);
        }}
        style={{ cursor: 'pointer' }}
      >
        <AiFillCloseCircle size={30}></AiFillCloseCircle>
      </CloseModalBtn>
      <FlexTransparentDiv
        widthSize={'46vw'}
        heightSize={'30vh'}
        paddingSize={'0'}
        flexDirection={'row'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'none'}
        style={{ marginTop: '3vh' }}
      >
        <FlexTransparentDiv
          widthSize={'25vw'}
          heightSize={'30vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          <FlexTransparentDiv
            widthSize={'25vw'}
            heightSize={'30vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{
              borderTop: '10px solid black',
              borderBottom: '10px solid black',
              borderRadius: '10px',
              background: 'black',
              margin: '0.5vw',
              position: 'relative',
            }}
          >
            <img
              style={{
                width: '25vw',
                height: '28vh',
                objectFit: 'cover',
              }}
              src={`https://img.youtube.com/vi/${videoData.video.videoId}/0.jpg`}
            ></img>
          </FlexTransparentDiv>
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'21vw'}
          heightSize={'30vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          <FlexTransparentDiv
            widthSize={'21vw'}
            heightSize={'10vh'}
            paddingSize={'0 1vw'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{ fontSize: '2vmin' }}
          >
            {videoData.video.title}
          </FlexTransparentDiv>
          {continuedToggle ? (
            ''
          ) : (
            <FlexTransparentDiv
              widthSize={'21vw'}
              heightSize={'10vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
            >
              <MainBtn
                widthSize={'15vw'}
                heightSize={'8vh'}
                paddingSize={'0'}
                fontSize={'3vmin'}
                fontColor={'white'}
                backgroundColor={'blue'}
                onClick={() => handlerPostStartStudy(videoData.video.videoId)}
              >
                새로운 학습 시작하기
              </MainBtn>
            </FlexTransparentDiv>
          )}

          <FlexTransparentDiv
            widthSize={'21vw'}
            heightSize={continuedToggle ? '20vh' : '10vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{ transition: 'all 1s ease', position: 'relative' }}
          >
            {continuedToggle ? (
              <>
                <AiFillCloseCircle
                  size={20}
                  color={'white'}
                  style={{
                    position: 'absolute',
                    top: '1vh',
                    right: '1.5vw',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setContinuedToggle(false);
                    setContinuePage(0);
                  }}
                ></AiFillCloseCircle>
                <FlexTransparentDiv
                  widthSize={'18vw'}
                  heightSize={'18vh'}
                  paddingSize={'0'}
                  flexDirection={'row'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  IsBorder={'none'}
                  style={{
                    transition: 'all 1s ease',
                    backgroundColor: 'black',
                    borderRadius: '10px',
                    color: 'white',
                  }}
                >
                  {continuePage === 0 ? (
                    <AiOutlineArrowLeft
                      size={50}
                      onClick={() =>
                        setContinuePage((continuePage) => continuePage - 1)
                      }
                      style={{ visibility: 'hidden' }}
                    ></AiOutlineArrowLeft>
                  ) : (
                    <AiOutlineArrowLeft
                      size={50}
                      onClick={() =>
                        setContinuePage((continuePage) => continuePage - 1)
                      }
                    ></AiOutlineArrowLeft>
                  )}
                  <FlexTransparentDiv
                    widthSize={'15vw'}
                    heightSize={'18vh'}
                    paddingSize={'0'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    IsBorder={'none'}
                  >
                    <FlexTransparentDiv
                      widthSize={'15vw'}
                      heightSize={'6vh'}
                      paddingSize={'0'}
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      IsBorder={'none'}
                    >
                      <MainBtn
                        widthSize={'15vw'}
                        heightSize={'4vh'}
                        paddingSize={'0'}
                        fontSize={'2vmin'}
                        fontColor={'white'}
                        backgroundColor={'blue'}
                        onClick={() =>
                          handlerResumeStudy(
                            videoData.learning_record[continuePage].stage,
                            videoData.learning_record[continuePage]
                              .learningRecordId,
                            videoData.learning_record[continuePage].videoId
                          )
                        }
                      >
                        이어서 학습하기
                      </MainBtn>
                    </FlexTransparentDiv>
                    <FlexTransparentDiv
                      widthSize={'15vw'}
                      heightSize={'6vh'}
                      paddingSize={'0'}
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      IsBorder={'none'}
                    >
                      <BackBlurBox
                        widthSize={'15vw'}
                        heightSize={'4vh'}
                        paddingSize={'0'}
                        fontSize={'2vmin'}
                        fontColor={'black'}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        학습번호/단계:{' '}
                        {
                          videoData.learning_record[continuePage]
                            .learningRecordId
                        }
                        /{videoData.learning_record[continuePage].stage}
                      </BackBlurBox>
                    </FlexTransparentDiv>
                    <FlexTransparentDiv
                      widthSize={'15vw'}
                      heightSize={'6vh'}
                      paddingSize={'0'}
                      flexDirection={'column'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      IsBorder={'none'}
                    >
                      <BackBlurBox
                        widthSize={'15vw'}
                        heightSize={'4vh'}
                        paddingSize={'0'}
                        fontSize={'2vmin'}
                        fontColor={'black'}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        시작일자:{' '}
                        {videoData.learning_record[continuePage].date.substring(
                          0,
                          10
                        )}
                      </BackBlurBox>
                    </FlexTransparentDiv>
                  </FlexTransparentDiv>
                  {videoData.learning_record.length - 1 === continuePage ? (
                    <AiOutlineArrowRight
                      size={50}
                      onClick={() =>
                        setContinuePage((continuePage) => continuePage + 1)
                      }
                      style={{ visibility: 'hidden' }}
                    ></AiOutlineArrowRight>
                  ) : (
                    <AiOutlineArrowRight
                      size={50}
                      onClick={() =>
                        setContinuePage((continuePage) => continuePage + 1)
                      }
                    ></AiOutlineArrowRight>
                  )}
                </FlexTransparentDiv>
              </>
            ) : videoData.learning_record &&
              videoData.learning_record.length === 0 ? (
              ''
            ) : (
              videoData.learning_record && (
                <MainBtn
                  widthSize={'15vw'}
                  heightSize={'8vh'}
                  paddingSize={'0'}
                  fontSize={'3vmin'}
                  fontColor={'white'}
                  backgroundColor={'black'}
                  onClick={() => setContinuedToggle(true)}
                >
                  기존 학습 이어하기
                </MainBtn>
              )
            )}
          </FlexTransparentDiv>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'46vw'}
        heightSize={'24vh'}
        paddingSize={'0vh 1vw'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'start'}
        IsBorder={'none'}
        style={{
          marginTop: '3vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          fontSize: '2vmin',
          borderRadius: '10px',
          border: '2px solid black',
        }}
      >
        <p>{videoData.video.description}</p>
      </FlexTransparentDiv>
    </MainBox>
  );
};

export default VideoModal;
