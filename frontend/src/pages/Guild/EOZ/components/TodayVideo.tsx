import React from 'react';

type TodayVideoProps = {
  videoId: string | null;
};

const TodayVideo = (props: TodayVideoProps) => {
  const { videoId } = props;
  console.log(videoId);
  if (videoId) {
    return (
      <div className="video-box">
        <img
          src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
          alt="학습할 영상 썸네일"
        />
      </div>
    );
  } else {
    return (
      <div className="video-box">
        <p>학습할 영상을 선택해주세요</p>
      </div>
    );
  }
};

export default TodayVideo;
