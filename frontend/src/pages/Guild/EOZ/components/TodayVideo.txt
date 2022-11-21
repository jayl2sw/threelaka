import React from 'react';

type TodayVideoProps = {
  videoId: string | null;
};

const TodayVideo = (props: TodayVideoProps) => {
  const { videoId } = props;
  if (videoId) {
    return (
      <div style={{ width: '50%', border: '1px solid red' }}>
        <img
          src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
          alt=""
          style={{ width: '15vw', height: '12vh' }}
        />
      </div>
    );
  } else {
    return (
      <div style={{ border: '1px solid green', width: '50%' }}>
        학습할 영상을 선택해주세요
      </div>
    );
  }
};

export default TodayVideo;
