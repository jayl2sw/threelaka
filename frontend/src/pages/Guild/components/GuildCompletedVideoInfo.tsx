import React, { useEffect, useState } from 'react';
import {
  FlexTransparentDiv,
  MainBox,
  FlexFadeInOutDiv,
  MainPaleBox,
  BackBlurBox,
} from '../../../styles/Common/CommonDivStyle';
import {
  MainBtn,
  GradientRoundBtn,
} from '../../../styles/Common/CommonBtnStyle';
import { VideoInfo } from '../../../models/guild';
import { guildActions } from '../../../features/guild/guild-slice';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import styled from 'styled-components';
import {
  BsCalendarCheck,
  BsCaretRightFill,
  BsCaretLeftFill,
} from 'react-icons/bs';

interface IGuildCompletedVideoProps {
  setMode: (nextMode: number) => void;
  completeTaskLst: VideoInfo[];
}

const GuildCompletedVideoInfo = ({
  setMode,
  completeTaskLst,
}: IGuildCompletedVideoProps) => {
  const dispatch = useAppDispatch();
  const [pageNum, setPageNum] = useState<number>(1);
  const totalPageNum = Math.ceil(completeTaskLst.length / 4);

  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [selectedEssayIdx, setSelectedEssayIdx] = useState<number>(-1);
  const assignmentProgressLst = useAppSelector(
    (state) => state.guild.AssignmentProgressLst
  );
  const [isEssayMode, setIsEssayMode] = useState<number>(0);
  // useEffect
  useEffect(() => {
    if (isEssayMode === 1) {
      setTimeout(() => {
        setIsEssayMode(2); // display none
      }, 1100);
    }
  }, [isEssayMode]);
  // 선택할 때 마다 해당 과제 정보 받아오기
  useEffect(() => {
    if (selectedIdx !== -1) {
      dispatch(
        guildActions.getAssignmentProgress(
          completeTaskLst[selectedIdx].assignmentId
        )
      );
    }
  }, [selectedIdx]);

  const resetAssignmentProgressHandler = () => {
    dispatch(guildActions.resetAssignmentProgressLst());
  };

  const ElipsisDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    word-wrap: break-word;
    word-break: keep-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  `;

  return (
    <FlexTransparentDiv
      widthSize={'63vw'}
      heightSize={'76vh'}
      paddingSize={'0'}
      flexDirection={'column'}
      justifyContent={'start'}
      alignItems={'start'}
      IsBorder={'none'}
    >
      <FlexTransparentDiv
        widthSize={'63vw'}
        heightSize={'10vh'}
        paddingSize={'0 0 0 0.5vw'}
        flexDirection={'row'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'none'}
        style={{ fontSize: '4vmin', position: 'relative', fontWeight: 'bold' }}
      >
        <BsCalendarCheck />
        &nbsp;&nbsp;완료된 과제
        <MainBtn
          widthSize={'8vw'}
          heightSize={'5vh'}
          paddingSize={'0'}
          fontSize={'2vmin'}
          fontColor={'white'}
          backgroundColor={'black'}
          style={{ position: 'absolute', right: '2vw' }}
          onClick={() => {
            resetAssignmentProgressHandler();
            setMode(1);
          }}
        >
          뒤로가기
        </MainBtn>
      </FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'63vw'}
        heightSize={'66vh'}
        paddingSize={'0'}
        flexDirection={'row'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'none'}
        style={
          {
            // border: '5px solid blue',
          }
        }
      >
        <FlexTransparentDiv
          widthSize={'25vw'}
          heightSize={'66vh'}
          paddingSize={'2vh 0 0 0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            marginRight: '3vw',
            backgroundColor: '#D8E7F4',
            borderRadius: '10px',
          }}
        >
          <FlexTransparentDiv
            widthSize={'25vw'}
            heightSize={'58vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{
              minHeight: '48vh',
              // backgroundColor: 'green',
            }}
          >
            {completeTaskLst
              .slice(4 * (pageNum - 1), 4 * pageNum)
              .map((video, idx) => {
                return (
                  <MainPaleBox
                    key={`complete-video-${idx}`}
                    widthSize={'23vw'}
                    heightSize={'14vh'}
                    paddingSize={'0'}
                    fontColor={
                      selectedIdx === 4 * (pageNum - 1) + idx
                        ? 'white'
                        : 'black'
                    }
                    fontSize={'2vmin'}
                    style={{
                      display: 'flex',
                      marginBottom: '2vh',
                      backgroundColor:
                        selectedIdx === 4 * (pageNum - 1) + idx
                          ? '#4a9fff'
                          : 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      boxShadow: 'none',
                    }}
                    onClick={() => {
                      setSelectedIdx(4 * (pageNum - 1) + idx);
                      setSelectedEssayIdx(-1);
                      setIsEssayMode(0);
                    }}
                  >
                    <FlexTransparentDiv
                      widthSize={'6vw'}
                      heightSize={'9vh'}
                      paddingSize={'0'}
                      flexDirection={'row'}
                      justifyContent={'start'}
                      alignItems={'center'}
                      IsBorder={'none'}
                      style={{
                        marginRight: '1vw',
                        background: `url(https://img.youtube.com/vi/${video.videoId}/0.jpg) center no-repeat`,
                        backgroundSize: '6vw 9vh',
                        borderRadius: '10px',
                      }}
                    ></FlexTransparentDiv>
                    <FlexTransparentDiv
                      widthSize={'14.5vw'}
                      heightSize={'8vh'}
                      paddingSize={'0'}
                      flexDirection={'column'}
                      justifyContent={'space-between'}
                      alignItems={'start'}
                      IsBorder={'none'}
                    >
                      <ElipsisDiv style={{ fontSize: '2vmin' }}>
                        {video.videoTitle}
                      </ElipsisDiv>
                      <div style={{ fontSize: '1.5vmin' }}>
                        {video.startDate.replaceAll('-', '.')} ~{' '}
                        {video.endDate.replaceAll('-', '.')}
                      </div>
                    </FlexTransparentDiv>
                  </MainPaleBox>
                );
              })}
          </FlexTransparentDiv>
          <FlexTransparentDiv
            widthSize={'25vw'}
            heightSize={'6vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{
              fontSize: '2vmin',
            }}
          >
            {pageNum === 1 ? (
              <FlexTransparentDiv
                widthSize={'30px'}
                heightSize={'30px'}
                paddingSize={'0'}
                flexDirection={'column'}
                justifyContent={'start'}
                alignItems={'center'}
                IsBorder={'none'}
              ></FlexTransparentDiv>
            ) : (
              <BsCaretLeftFill
                size={20}
                onClick={() => setPageNum((pageNum) => pageNum - 1)}
                style={{ cursor: 'pointer' }}
              ></BsCaretLeftFill>
            )}
            &nbsp;&nbsp;{pageNum}&nbsp;/&nbsp;{totalPageNum}&nbsp;&nbsp;
            {pageNum === totalPageNum ? (
              <FlexTransparentDiv
                widthSize={'30px'}
                heightSize={'30px'}
                paddingSize={'0'}
                flexDirection={'column'}
                justifyContent={'start'}
                alignItems={'center'}
                IsBorder={'none'}
              ></FlexTransparentDiv>
            ) : (
              <BsCaretRightFill
                onClick={() => setPageNum((pageNum) => pageNum + 1)}
                size={20}
                style={{ cursor: 'pointer' }}
              ></BsCaretRightFill>
            )}
          </FlexTransparentDiv>
        </FlexTransparentDiv>
        <FlexFadeInOutDiv
          widthSize={'35vw'}
          heightSize={'66vh'}
          paddingSize={'2vh 0 0 0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'none'}
          className={
            isEssayMode === 2
              ? 'hidden'
              : isEssayMode === 1
              ? 'disappear'
              : 'appear'
          }
          style={{ backgroundColor: '#D8E7F4', borderRadius: '10px' }}
        >
          <FlexTransparentDiv
            widthSize={'33vw'}
            heightSize={'19vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'start'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{
              marginBottom: '5vh',
            }}
          >
            {selectedIdx !== -1 ? (
              <>
                <FlexTransparentDiv
                  widthSize={'13vw'}
                  heightSize={'19vh'}
                  paddingSize={'0'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  IsBorder={'none'}
                  style={{ marginLeft: '0.5vw' }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${completeTaskLst[selectedIdx].videoId}/0.jpg`}
                    style={{
                      width: '13vw',
                      height: '18vh',
                      borderRadius: '10px',
                    }}
                  />
                </FlexTransparentDiv>
                <FlexTransparentDiv
                  widthSize={'22vw'}
                  heightSize={'19vh'}
                  paddingSize={'1vh 0 0 1vw'}
                  flexDirection={'column'}
                  justifyContent={'start'}
                  alignItems={'start'}
                  IsBorder={'none'}
                  style={{
                    fontSize: '2vmin',
                  }}
                >
                  <div
                    style={{
                      height: '11vh',
                      fontWeight: 'bold',
                      fontSize: '2.5vmin',
                      overflow: 'hidden',
                      wordWrap: 'break-word',
                      wordBreak: 'keep-all',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {completeTaskLst[selectedIdx].videoTitle}
                  </div>
                  <div style={{ height: '4vh' }}>
                    {completeTaskLst[selectedIdx].startDate.replaceAll(
                      '-',
                      '.'
                    )}{' '}
                    ~{' '}
                    {completeTaskLst[selectedIdx].endDate.replaceAll('-', '.')}
                  </div>
                  <div style={{ height: '4vh' }}>
                    과제 참여 인원 : {assignmentProgressLst.length}명
                  </div>
                </FlexTransparentDiv>
              </>
            ) : (
              ''
            )}

            {/* {selectedIdx !== -1 ? completeTaskLst[selectedIdx].videoTitle : ''} */}
          </FlexTransparentDiv>
          <FlexTransparentDiv
            widthSize={'32vw'}
            heightSize={'35vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'none'}
            style={{
              position: 'relative',
              overflowY: 'auto',
            }}
          >
            {assignmentProgressLst.map((item, idx) => {
              return (
                <MainBox
                  widthSize={'30vw'}
                  heightSize={'10vh'}
                  paddingSize={'0'}
                  fontColor={'black'}
                  fontSize={'1vmin'}
                  style={{
                    minHeight: '7vh',
                    marginBottom: '2vh',
                    display: 'flex',
                    boxShadow: 'none',
                  }}
                >
                  <FlexTransparentDiv
                    key={`member-progress-${idx}`}
                    widthSize={'5vw'}
                    heightSize={'7vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    IsBorder={'none'}
                    style={{
                      borderRadius: '10px',
                    }}
                  >
                    <img
                      src={`https://threelaka.s3.ap-northeast-2.amazonaws.com/profile${item.profile}.png`}
                      style={{
                        width: '5vmin',
                        height: '5vmin',
                      }}
                    />
                  </FlexTransparentDiv>
                  <FlexTransparentDiv
                    widthSize={'10vw'}
                    heightSize={'7vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    IsBorder={'none'}
                    style={{ fontSize: '1.7vmin' }}
                  >
                    {item.nickname}
                  </FlexTransparentDiv>
                  <FlexTransparentDiv
                    widthSize={'5vw'}
                    heightSize={'7vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    IsBorder={'none'}
                    style={{ marginRight: '1vw', fontSize: '2vmin' }}
                  >
                    {item.stage === 0
                      ? 'R/L'
                      : item.stage === 1
                      ? 'Writing'
                      : item.stage === 2
                      ? 'Speaking'
                      : 'Completed'}
                  </FlexTransparentDiv>
                  <GradientRoundBtn
                    widthSize="4vw"
                    heightSize="4vh"
                    paddingSize="0"
                    fontSize="1.5vmin"
                    fontColor="white"
                    backgroundColor="blue"
                    style={{
                      borderRadius: '10px',
                      margin: '1.5vh 0 0 4vw',
                    }}
                    onClick={() => {
                      setSelectedEssayIdx(idx);
                      setIsEssayMode(1);
                    }}
                  >
                    {item.stage > 0 ? '에세이' : ''}
                  </GradientRoundBtn>
                  {/* <FlexTransparentDiv
                    widthSize={'7vw'}
                    heightSize={'7vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    IsBorder={'none'}
                    style={{
                      cursor: 'pointer',
                      fontSize: '2vmin',
                    }}
                    onClick={() => {
                      setSelectedEssayIdx(idx);
                      setIsEssayMode(1);
                    }}
                  >
                    {item.stage > 0 ? '에세이' : ''}
                  </FlexTransparentDiv> */}
                </MainBox>
              );
            })}
          </FlexTransparentDiv>
        </FlexFadeInOutDiv>

        <FlexFadeInOutDiv
          widthSize={'35vw'}
          heightSize={'66vh'}
          paddingSize={'2.5vh 1vw'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'none'}
          className={
            isEssayMode === 2
              ? 'appear'
              : isEssayMode === 1
              ? 'disappear'
              : 'hidden'
          }
          style={{
            backgroundColor: '#D8E7F4',
            boxShadow: '10px 10px 80px rgba(63, 39, 102, 0.1)',
            borderRadius: '2vmin',
          }}
        >
          <FlexTransparentDiv
            widthSize={'33vw'}
            heightSize={'61vh'}
            paddingSize={'0 1vw'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'none'}
            style={{
              cursor: 'pointer',
              fontSize: '3vmin',
              // border: '2px dashed red',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {selectedEssayIdx !== -1 ? (
              <FlexTransparentDiv
                widthSize={'33vw'}
                heightSize={'5vh'}
                paddingSize={'0'}
                flexDirection={'row'}
                justifyContent={'start'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{ position: 'relative' }}
              >
                <img
                  src={`https://threelaka.s3.ap-northeast-2.amazonaws.com/profile${assignmentProgressLst[selectedEssayIdx].profile}.png`}
                  style={{
                    width: '5vmin',
                    height: '5vmin',
                    borderRadius: '10px',
                  }}
                />
                <div
                  style={{
                    width: '20vw',
                    marginLeft: '1vw',
                  }}
                >
                  {assignmentProgressLst[selectedEssayIdx].nickname}의 에세이
                </div>
                <MainBtn
                  widthSize={'5vw'}
                  heightSize={'3.5vh'}
                  paddingSize={'0'}
                  fontSize={'2vmin'}
                  fontColor={'white'}
                  backgroundColor={'black'}
                  onClick={() => setIsEssayMode(0)}
                  style={{ position: 'absolute', right: '2vw' }}
                >
                  돌아가기
                </MainBtn>
              </FlexTransparentDiv>
            ) : (
              ''
            )}

            <BackBlurBox
              widthSize={'31vw'}
              heightSize={'54vh'}
              paddingSize={'2.5vh 2vw'}
              fontColor={'black'}
              fontSize={'2.5vmin'}
              style={{
                marginTop: '2vh',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <FlexTransparentDiv
                widthSize={'26vw'}
                heightSize={'48vh'}
                paddingSize={'0'}
                flexDirection={'column'}
                justifyContent={'start'}
                alignItems={'start'}
                IsBorder={'none'}
                style={{ overflowY: 'scroll', overflowX: 'hidden' }}
              >
                {selectedEssayIdx !== -1
                  ? assignmentProgressLst[selectedEssayIdx].essay
                  : ''}
              </FlexTransparentDiv>
            </BackBlurBox>
          </FlexTransparentDiv>
        </FlexFadeInOutDiv>
      </FlexTransparentDiv>
    </FlexTransparentDiv>
  );
};

export default GuildCompletedVideoInfo;
