import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { GradientRoundBtn } from '../../../styles/Common/CommonBtnStyle';
import CustomSliderItem from './CustomSliderItem';
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

const TOTAL_SLIDES = 6; // 7개 라는 뜻
const CutomSlider = () => {
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
    const timer = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide === TOTAL_SLIDES ? 0 : currentSlide + 1
      );
    }, 5000);

    if (slideRef.current !== null) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
    }

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide]);

  return (
    <Container>
      <SliderContainer ref={slideRef}>
        <CustomSliderItem
          sThreeUrl={
            'https://threelaka.s3.ap-northeast-2.amazonaws.com/animals.jpg'
          }
          korTitle={'생물'}
          title={'ANIMALS'}
          content={
            '박테리아부터 코끼리까지, 알수록 더 궁금한, 생물의 세계로 빠져볼까요?'
          }
          tagContent={'#동물 #식물 #곤충 #미생물'}
        />
        <CustomSliderItem
          sThreeUrl={
            'https://threelaka.s3.ap-northeast-2.amazonaws.com/culture.jpg'
          }
          korTitle={'문화'}
          title={'CULTURE'}
          content={
            '인간이 그려낸 아름다움에 대하여, 형형색색의 미를 만나보세요'
          }
          tagContent={'#영화 #음악 #문화유산 #종교'}
        />
        <CustomSliderItem
          sThreeUrl={
            'https://threelaka.s3.ap-northeast-2.amazonaws.com/industry.jpg'
          }
          korTitle={'산업'}
          title={'INDUSTRY'}
          content={'세상을 움직이는 힘, 어떻게 발전하고 있을까요?'}
          tagContent={'#발명 #발전 #기술 #에너지 #공업'}
        />
        <CustomSliderItem
          sThreeUrl={
            'https://threelaka.s3.ap-northeast-2.amazonaws.com/knowledge.jpg'
          }
          korTitle={'지식'}
          title={'KNOWLEDGE'}
          content={
            ' 끊임없이 탐구하는 당신을 위한, 세계적인 석학들의 강의를 만나보세요'
          }
          tagContent={'#철학 #과학 #수학 #정치 #의학'}
        />
        <CustomSliderItem
          sThreeUrl={
            'https://threelaka.s3.ap-northeast-2.amazonaws.com/human.jpg'
          }
          korTitle={'인간'}
          title={'HUMAN'}
          content={
            '당신은 인간을 얼마나 알고있나요?, 더 깊이 더 많이 알아보세요'
          }
          tagContent={'#진화 #심리 #감각 #감정 #인류'}
        />
        <CustomSliderItem
          sThreeUrl={
            'https://threelaka.s3.ap-northeast-2.amazonaws.com/nature.jpg'
          }
          korTitle={'자연'}
          title={'NATURE'}
          content={
            '인간보다 거대한 존재들의 이야기, 바다부터 우주까지, 미지의 세계를 탐구해보세요'
          }
          tagContent={'#해양 #우주 #환경 #오염'}
        />
        <CustomSliderItem
          sThreeUrl={
            'https://threelaka.s3.ap-northeast-2.amazonaws.com/civilization.jpg'
          }
          korTitle={'문명'}
          title={'CIVILIZATION'}
          content={'우리가 살고 있는 이곳은, 어떻게 변해왔을까요?'}
          tagContent={'#IT #건축 #도시 #국가 #경영'}
        />
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
      {/* <button
        style={{ width: '10vw', height: '10vh', backgroundColor: 'blue' }}
        onClick={prevSlide}
      >
        Previous Slide
      </button>
      <button
        style={{ width: '10vw', height: '10vh', backgroundColor: 'red' }}
        onClick={nextSlide}
      >
        Next Slide
      </button> */}
    </Container>
  );
};

export default CutomSlider;
