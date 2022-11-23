import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../utils/hooks';
import { VideoInfo } from '../../../models/guild';
import { useHorizontalScroll } from '../../../utils/useSideScroll';

// style
import {
  WaitingRoomVideoBox,
  PickedVideoDataContainer,
  EozBtn,
} from '../../../styles/WebRtc/WebRtcStyle';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';

type RoomVideoInfoProps = {
  setVideoId: (value: string) => void;
  videoId: string | null;
  completeTaskLst: VideoInfo[];
  roomNumber: number;
};

const RoomVideoInfo = ({
  setVideoId,
  videoId,
  completeTaskLst,
  roomNumber,
}: RoomVideoInfoProps) => {
  const [mode, setMode] = useState<number>(0);
  const [isVideoPicked, setIsVideoPicked] = useState<boolean>(false);
  const [pickedVideo, setPickedVideo] = useState<any>();

  // 수평 스크롤
  const scrollRef = useHorizontalScroll([
    mode,
  ]) as React.MutableRefObject<HTMLDivElement>;

  return (
    <div>
      {videoId === null ? (
        <WaitingRoomVideoBox ref={scrollRef}>
          {completeTaskLst.length > 0 ? (
            <>
              {isVideoPicked ? (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <img
                      style={{
                        width: '15vw',
                        height: '20vh',
                        borderRadius: '1vmin',
                        overflow: 'cover',
                        marginTop: '1vh',
                      }}
                      src={`https://img.youtube.com/vi/${pickedVideo.videoId}/0.jpg`}
                    />

                    <PickedVideoDataContainer>
                      <p className="container-title">
                        Zone {roomNumber + 1}에서 학습할 영상
                      </p>
                      <div className="title-container">
                        <p className="video-title">{pickedVideo.videoTitle}</p>
                        <button
                          onClick={() => {
                            setIsVideoPicked(false);
                          }}
                        >
                          다시 선택하기
                        </button>
                      </div>
                      <div className="study-period-box">
                        <p className="study-period">학습 기간</p>
                        <p>
                          {pickedVideo.startDate} ~ {pickedVideo.endDate}
                        </p>
                      </div>
                    </PickedVideoDataContainer>
                  </div>
                </div>
              ) : (
                <>
                  {completeTaskLst.map((video: any, idx: number) => {
                    return (
                      <FlexTransparentDiv
                        key={`video-progree-${idx}`}
                        widthSize={'15vw'}
                        heightSize={'20vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        IsBorder={'none'}
                        onClick={() => {
                          //   setModalToggleVideoId(video.videoId);
                          //   setVideoId(video.videoId);
                          setIsVideoPicked(true);
                          setVideoId(video.videoId);
                          // setThumbnail(video.videoId);
                          setPickedVideo(video);
                        }}
                        style={{
                          cursor: 'pointer',
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
                            width: '15vw',
                            height: '18vh',
                            objectFit: 'cover',
                          }}
                          src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
                        />
                      </FlexTransparentDiv>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <>
              <div>아직 완료한 과제가 없습니다</div>
            </>
          )}

          {/* <p>videoId</p>
          <input onChange={(e) => setVideoId(e.target.value)} /> */}
        </WaitingRoomVideoBox>
      ) : (
        <div>
          <WaitingRoomVideoBox>
            <p>영상선택 완료: {videoId}</p>{' '}
          </WaitingRoomVideoBox>
        </div>
      )}
    </div>
  );
  //   if (videoId === null) {
  //     return (
  //       <WaitingRoomVideoBox ref={scrollRef}>
  //         <VideoPickModal
  //           modalToggleVideoId={modalToggleVideoId}
  //           setModalToggleVideoId={setModalToggleVideoId}
  //           setVideoId={setVideoId}
  //         />
  //         {completeTaskLst.length > 0 ? (
  //           <>
  //             {completeTaskLst.map((video: any, idx: number) => {
  //               return (
  //                 <FlexTransparentDiv
  //                   key={`video-progree-${idx}`}
  //                   widthSize={'15vw'}
  //                   heightSize={'20vh'}
  //                   paddingSize={'0'}
  //                   flexDirection={'row'}
  //                   justifyContent={'center'}
  //                   alignItems={'center'}
  //                   IsBorder={'none'}
  //                   onClick={() => {
  //                     setModalToggleVideoId(video.videoId);
  //                     setVideoId(video.videoId);
  //                   }}
  //                   style={{
  //                     cursor: 'pointer',
  //                     borderTop: '10px solid black',
  //                     borderBottom: '10px solid black',
  //                     borderRadius: '10px',
  //                     background: 'black',
  //                     margin: '0.5vw',
  //                     position: 'relative',
  //                   }}
  //                 >
  //                   <img
  //                     style={{
  //                       width: '15vw',
  //                       height: '18vh',
  //                       objectFit: 'cover',
  //                     }}
  //                     src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
  //                   />
  //                 </FlexTransparentDiv>
  //               );
  //             })}
  //           </>
  //         ) : (
  //           <>
  //             <div>아직 완료한 학습이 없습니다</div>
  //           </>
  //         )}

  //         {/* <p>videoId</p>
  //         <input onChange={(e) => setVideoId(e.target.value)} /> */}
  //       </WaitingRoomVideoBox>
  //     );
  //   } else {
  //     return (
  //       <WaitingRoomVideoBox>
  //         <p>영상선택 완료: {videoId}</p>
  //       </WaitingRoomVideoBox>
  //     );
  //   }
};

export default RoomVideoInfo;
