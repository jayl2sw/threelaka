import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { RecentVideoData } from '../../../models';
import CutomSliderBottomItem from './CutomSliderBottomItem';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden; // 선을 넘어간 이미지들은 보이지 않도록 처리합니다.
`;

const SliderContainer = styled.div`
  width: 100vw;
  display: flex; //이미지들을 가로로 나열합니다.
`;

interface TagThumbnailProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  url: string;
}

const ThumnailBlock = styled.div<TagThumbnailProps>`
  position: absolute;
  right: 10vw;
  top: 30vh;
  width: 30vw;
  height: 40vh;
  /* border: 5px solid pink; */
  z-index: 2;
  box-shadow: 20px 20px 20px rgba(255, 255, 255, 0.3);
  object-fit: cover;
  background: url(${(props) => props.url}) center no-repeat;
  background-size: 30vw 40vh;
`;

interface ICustomSliderBottomProps {
  recentVideoDataLst: RecentVideoData[];
}

const CutomSliderBottom = ({
  recentVideoDataLst,
}: ICustomSliderBottomProps) => {
  const TOTAL_SLIDES = recentVideoDataLst.length - 1; // 7개 라는 뜻
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  // const slideRef = useRef(null);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    if (slideRef.current !== null) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }
  }, [currentSlide]);

  return (
    <Container>
      {recentVideoDataLst.length !== 0 ? (
        <ThumnailBlock
          url={`https://img.youtube.com/vi/${recentVideoDataLst[currentSlide].video.videoId}/0.jpg`}
        >
          sdsd
        </ThumnailBlock>
      ) : (
        ''
      )}
      <SliderContainer ref={slideRef}>
        {recentVideoDataLst.map((videoInfo, idx) => {
          return (
            <CutomSliderBottomItem
              key={`recent-video-${idx}`}
              sThreeUrl={`https://img.youtube.com/vi/${videoInfo.video.videoId}/0.jpg`}
              title={videoInfo.video.title}
              content={videoInfo.video.description}
              stage={videoInfo.learningRecord.stage}
              learningRecordId={videoInfo.learningRecord.learningRecordId}
              videoId={videoInfo.learningRecord.videoId}
            />
          );
        })}
      </SliderContainer>
      <div
        style={{
          width: '10vmin',
          height: '10vmin',
          position: 'absolute',
          cursor: 'pointer',
          top: '50vh',
          left: '2vw',
        }}
        onClick={prevSlide}
      >
        <IoIosArrowBack size={30} color={'white'}></IoIosArrowBack>
      </div>

      <div
        style={{
          width: '10vmin',
          height: '10vmin',
          position: 'absolute',
          cursor: 'pointer',
          top: '50vh',
          right: '-1vw',
        }}
        onClick={nextSlide}
      >
        <IoIosArrowForward size={30} color={'white'}></IoIosArrowForward>
      </div>
    </Container>
  );
};

export default CutomSliderBottom;
