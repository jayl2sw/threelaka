import React from 'react';

type TodayVideoProps = {
  videoId: string | null;
};

const TodayVideo = (props: TodayVideoProps) => {
  const { videoId } = props;
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
        <p>아직 학습 전이에요</p>
      </div>
    );
  }
};

export default TodayVideo;
