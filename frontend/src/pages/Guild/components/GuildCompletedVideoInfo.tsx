import React, { useEffect, useState } from 'react';
import {
  FlexTransparentDiv,
  MainBox,
  FlexFadeInOutDiv,
  MainPaleBox,
} from '../../../styles/Common/CommonDivStyle';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import { VideoInfo } from '../../../models/guild';
import {
  VscTriangleLeft,
  VscTriangleRight,
  VscTriangleUp,
  VscTriangleDown,
} from 'react-icons/vsc';
import { guildActions } from '../../../features/guild/guild-slice';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

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

  return (
    <FlexTransparentDiv
      widthSize={'63vw'}
      heightSize={'76vh'}
      paddingSize={'0'}
      flexDirection={'column'}
      justifyContent={'start'}
      alignItems={'start'}
      IsBorder={'is'}
    >
      <FlexTransparentDiv
        widthSize={'63vw'}
        heightSize={'10vh'}
        paddingSize={'0 0 0 2vw'}
        flexDirection={'row'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'is'}
        style={{ fontSize: '5vmin', position: 'relative' }}
      >
        완료된 과제
        <MainBtn
          widthSize={'10vw'}
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
            backgroundColor: '#9897a9',
          }}
        >
          <FlexTransparentDiv
            widthSize={'25vw'}
            heightSize={'54vh'}
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
                    widthSize={'21vw'}
                    heightSize={'11.5vh'}
                    paddingSize={'0'}
                    fontColor={'black'}
                    fontSize={'2vmin'}
                    style={{
                      display: 'flex',
                      marginBottom: '2vh',
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
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
                      IsBorder={'is'}
                      style={{
                        border: '1px solid blue',
                        marginRight: '1vw',
                        background: `url(https://img.youtube.com/vi/${video.videoId}/0.jpg) center no-repeat`,
                        backgroundSize: '6vw 9vh',
                        borderRadius: '10px',
                      }}
                    ></FlexTransparentDiv>
                    <FlexTransparentDiv
                      widthSize={'13vw'}
                      heightSize={'8vh'}
                      paddingSize={'0'}
                      flexDirection={'column'}
                      justifyContent={'space-between'}
                      alignItems={'start'}
                      IsBorder={'none'}
                    >
                      <div style={{ fontSize: '1.5vmin' }}>
                        title: {video.videoTitle}
                      </div>
                      <div style={{ fontSize: '2vmin' }}>
                        {video.startDate}~{video.endDate}
                      </div>
                    </FlexTransparentDiv>
                  </MainPaleBox>
                );
              })}
          </FlexTransparentDiv>
          <FlexTransparentDiv
            widthSize={'25vw'}
            heightSize={'10vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{
              // border: '2px solid yellow',
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
              <VscTriangleLeft
                size={30}
                onClick={() => setPageNum((pageNum) => pageNum - 1)}
              ></VscTriangleLeft>
            )}
            {pageNum}&nbsp;/&nbsp;{totalPageNum}
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
              <VscTriangleRight
                onClick={() => setPageNum((pageNum) => pageNum + 1)}
                size={30}
              ></VscTriangleRight>
            )}
          </FlexTransparentDiv>
        </FlexTransparentDiv>
        <FlexFadeInOutDiv
          widthSize={'35vw'}
          heightSize={'60vh'}
          paddingSize={'2.5vh 1vw'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'is'}
          className={
            isEssayMode === 2
              ? 'hidden'
              : isEssayMode === 1
              ? 'disappear'
              : 'appear'
          }
        >
          <FlexTransparentDiv
            widthSize={'32vw'}
            heightSize={'15vh'}
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
                  widthSize={'10vw'}
                  heightSize={'14vh'}
                  paddingSize={'0'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  IsBorder={'none'}
                >
                  <img
                    src={`https://img.youtube.com/vi/${completeTaskLst[selectedIdx].videoId}/0.jpg`}
                    style={{
                      width: '10vw',
                      height: '13vh',
                      borderRadius: '5px',
                    }}
                  />
                </FlexTransparentDiv>
                <FlexTransparentDiv
                  widthSize={'22vw'}
                  heightSize={'14vh'}
                  paddingSize={'1vh 0 0 1vw'}
                  flexDirection={'column'}
                  justifyContent={'start'}
                  alignItems={'start'}
                  IsBorder={'none'}
                  style={{
                    fontSize: '2vmin',
                  }}
                >
                  <div style={{ height: '5vh', fontWeight: 'bold' }}>
                    {completeTaskLst[selectedIdx].videoTitle}
                  </div>
                  <div style={{ height: '2vh' }}>과제진행날짜</div>
                  <div style={{ height: '6vh' }}>
                    {completeTaskLst[selectedIdx].startDate} ~{' '}
                    {completeTaskLst[selectedIdx].endDate}
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
            paddingSize={'0 1vw'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{
              position: 'relative',
              overflowY: 'auto',
            }}
          >
            {assignmentProgressLst.map((item, idx) => {
              return (
                <MainBox
                  widthSize={'28vw'}
                  heightSize={'10vh'}
                  paddingSize={'0'}
                  fontColor={'black'}
                  fontSize={'1vmin'}
                  style={{
                    minHeight: '5vh',
                    border: '1px solid black',
                    marginBottom: '2vh',
                    display: 'flex',
                  }}
                >
                  <FlexTransparentDiv
                    key={`member-progress-${idx}`}
                    widthSize={'5vw'}
                    heightSize={'5vh'}
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
                    widthSize={'7vw'}
                    heightSize={'5vh'}
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
                    heightSize={'5vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    IsBorder={'none'}
                    style={{ marginRight: '4vw', fontSize: '2vmin' }}
                  >
                    {item.stage === 0
                      ? 'R/L'
                      : item.stage === 1
                      ? 'Writing'
                      : item.stage === 2
                      ? 'Speaking'
                      : 'Completed'}
                  </FlexTransparentDiv>
                  <FlexTransparentDiv
                    widthSize={'7vw'}
                    heightSize={'5vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    IsBorder={'none'}
                    style={{ cursor: 'pointer', fontSize: '2vmin' }}
                    onClick={() => {
                      setSelectedEssayIdx(idx);
                      setIsEssayMode(1);
                    }}
                  >
                    {item.stage > 0 ? '에세이' : ''}
                  </FlexTransparentDiv>
                </MainBox>
              );
            })}
          </FlexTransparentDiv>
        </FlexFadeInOutDiv>

        <FlexFadeInOutDiv
          widthSize={'35vw'}
          heightSize={'60vh'}
          paddingSize={'2.5vh 1vw'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'is'}
          className={
            isEssayMode === 2
              ? 'appear'
              : isEssayMode === 1
              ? 'disappear'
              : 'hidden'
          }
        >
          <FlexTransparentDiv
            widthSize={'35vw'}
            heightSize={'60vh'}
            paddingSize={'1vh 1vw'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'none'}
            style={{
              cursor: 'pointer',
              fontSize: '3vmin',
              border: '2px dashed red',
              overflowY: 'auto',
            }}
          >
            <MainBtn
              widthSize={'10vw'}
              heightSize={'5vh'}
              paddingSize={'0'}
              fontSize={'2vmin'}
              fontColor={'white'}
              backgroundColor={'black'}
              onClick={() => setIsEssayMode(0)}
              style={{ marginLeft: '22vw' }}
            >
              돌아가기
            </MainBtn>

            {selectedEssayIdx !== -1
              ? assignmentProgressLst[selectedEssayIdx].essay
              : ''}
          </FlexTransparentDiv>
        </FlexFadeInOutDiv>
      </FlexTransparentDiv>
    </FlexTransparentDiv>
  );
};

export default GuildCompletedVideoInfo;
