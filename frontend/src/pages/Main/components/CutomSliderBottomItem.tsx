import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { GradientRoundBtn } from '../../../styles/Common/CommonBtnStyle';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { studyActions } from '../../../features/study/study-slice';

interface ICustomSliderProps {
  sThreeUrl: string;
  title: string;
  content: string;
  stage: string;
  learningRecordId: number;
  videoId: string;
  date: string;
}

interface TagThumbnailProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  url: string;
}

const TagThumbnail = styled.div<TagThumbnailProps>`
  width: 100vw;
  height: 100vh;
  object-fit: contain;
  background: url(${(props) => props.url}) center no-repeat;
  background-size: 100vw 100vh;
  opacity: 0.3;
`;

const ElipsisDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35vw;
  height: 15vh;
  text-align: left;
  color: white;
  font-size: 2.5vmin;
  line-height: 5vh;
  overflow: hidden;
  word-wrap: break-word;
  word-break: keep-all;
  padding: 0 4vw;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  /* border: 1px solid yellow; */
`;

const CustomSliderBottomItem = ({
  sThreeUrl,
  title,
  content,
  stage,
  learningRecordId,
  videoId,
  date,
}: ICustomSliderProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // 기존의 이동하던 스테이지에서 이어서 공부하기
  const handlerResumeStudy = (
    stage: string,
    learningRecordId: number,
    videoId: string
  ) => {
    if (stage === 'READING') {
      navigate(`/study/reading/${learningRecordId}/${stage}/${videoId}`);
    } else if (stage === 'WRITING') {
      navigate(`/study/writing/${learningRecordId}/${stage}/${videoId}`);
    } else if (stage === 'SPEAKING') {
      navigate(`/study/speaking/${learningRecordId}/${stage}/${videoId}`);
    } else navigate(`/`);
  };

  // 현재 영상 stage 확인
  const studyState = useAppSelector((state) => state.study.studyState);

  // 해당 영상으로 새로운 공부 시작
  const handlerPostStartStudy = (videoId: string) => {
    dispatch(studyActions.postStartStudy(videoId));
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

  return (
    <>
      <FlexTransparentDiv
        widthSize={'100vw'}
        heightSize={'100vh'}
        paddingSize={'0'}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'none'}
      >
        <FlexTransparentDiv
          widthSize={'45vw'}
          heightSize={'100vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 1), 90%, rgba(0, 0, 0, 0))',
            zIndex: 1,
            minWidth: '35vw',
            paddingTop: '20vh',
          }}
        >
          <FlexTransparentDiv
            widthSize={'35vw'}
            heightSize={'30vh'}
            paddingSize={'0 4vw'}
            flexDirection={'column'}
            justifyContent={'end'}
            alignItems={'start'}
            IsBorder={'none'}
            style={{
              fontSize: '4.5vmin',
              color: 'white',
            }}
          >
            <p style={{ fontSize: '2.5vmin' }}>최근 학습 영상</p>
            <p style={{ fontFamily: 'pretendardextrabold', marginTop: '0' }}>
              {title}
            </p>
          </FlexTransparentDiv>
          <ElipsisDiv>{content}</ElipsisDiv>
          <FlexTransparentDiv
            widthSize={'35vw'}
            heightSize={'30vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'space-evenly'}
            alignItems={'center'}
            IsBorder={'none'}
          >
            <div
              style={{
                color: 'white',
                textAlign: 'center',
                lineHeight: '3vmin',
              }}
            >
              {date.slice(0, 4)}년 {date.slice(5, 7)}월 {date.slice(8, 10)}일
              <br />
              {stage}
            </div>
            <GradientRoundBtn
              widthSize={'13vw'}
              heightSize={'6vh'}
              paddingSize={'0 1vw'}
              fontColor={'white'}
              fontSize={'2.3vmin'}
              backgroundColor={'gradient'}
              style={{ borderRadius: '2vmin', fontWeight: 'bold' }}
              onClick={() =>
                handlerResumeStudy(stage, learningRecordId, videoId)
              }
            >
              학습 이어하기
            </GradientRoundBtn>
          </FlexTransparentDiv>
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'55vw'}
          heightSize={'100vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          <TagThumbnail url={sThreeUrl} />
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </>
  );
};

export default CustomSliderBottomItem;
