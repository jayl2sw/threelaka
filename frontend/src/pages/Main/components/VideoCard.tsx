import React from 'react';
// style
import {
  VideoCardBlock,
  VideoDataBox,
  VideoImg,
  SubTagContainer,
  SubTag,
  VideoTitle,
} from '../../../styles/Main/MainStyle';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';

// video별 갖고 있는 정보들
interface VideoCardProps {
  data: {
    videoId: string;
    title: string;
    description: string;
    korScript: boolean;
  };
  setModalToggleVideoId: (nextVideoId: string) => void;
}

const VideoCard = ({ data, setModalToggleVideoId }: VideoCardProps) => {
  // 영상 제목 정제하기 ('이름: 제목' 또는 '제목 | 이름'에서 제목만 남기기)
  const cutIndex = data.title.indexOf('|');
  const videoTitle =
    cutIndex !== -1
      ? data.title.substr(0, cutIndex)
      : data.title.substr(data.title.indexOf(':') + 1);

  return (
    <VideoCardBlock
      onClick={() => {
        console.log('클릭');
        setModalToggleVideoId(data.videoId);
      }}
      style={{ cursor: 'pointer' }}
    >
      <VideoDataBox>
        <FlexTransparentDiv
          widthSize={'19vw'}
          heightSize={'22.5vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            borderTop: '10px solid black',
            borderBottom: '10px solid black',
            borderRadius: '10px',
            background: 'black',
          }}
        >
          <VideoImg src={`https://img.youtube.com/vi/${data.videoId}/0.jpg`} />
          <SubTagContainer>
            {data.korScript && <SubTag>한글</SubTag>}
            <SubTag>ENG</SubTag>
          </SubTagContainer>
        </FlexTransparentDiv>
      </VideoDataBox>
      <VideoTitle>{videoTitle}</VideoTitle>
    </VideoCardBlock>
  );
};

export default VideoCard;
