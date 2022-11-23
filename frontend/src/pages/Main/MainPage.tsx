import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MainPageBlock,
  FirstpageBlock,
  SecondpageBlock,
  PageDownButton,
} from '../../styles/Main/MainStyle';
// import { useScrollDirection } from 'react-use-scroll-direction';
import VideoModal from '../../utils/VideoModal';
import TagSelectModal from './components/TagSelectModal';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { dashboardActions } from '../../features/dashboard/dashboard-slice';
import { authActions } from '../../features/auth/authSlice';
import CustomSlider from './components/CustomSlider';
import CutomSliderBottom from './components/CustomSliderBottom';
// import './MainPage.css';
import { videoActions } from '../../features/video/video-slice';
import { FlexTransparentDiv } from '../../styles/Common/CommonDivStyle';
import { GradientRoundBtn } from '../../styles/Common/CommonBtnStyle';
import styled from 'styled-components';
import { useScrollBlock } from '../../utils/scrollBlock';

const MainPage = () => {
  const navigate = useNavigate();
  interface TagThumbnailProps
    extends React.ButtonHTMLAttributes<HTMLDivElement> {
    url: string;
  }
  const [blockScroll, allowScroll] = useScrollBlock();
  useEffect(() => {
    // modal이 떠 있을 땐 스크롤 막음
    blockScroll();
    // modal 닫히면 다시 스크롤 가능하도록 함
    return () => allowScroll();
  }, []);

  const TagThumbnail = styled.div<TagThumbnailProps>`
    width: 100vw;
    height: 100vh;
    object-fit: contain;
    background: url(${(props) => props.url}) center no-repeat;
    background-size: 100vw 100vh;
    opacity: 0.3;
  `;

  const [isModal, setIsModal] = useState<boolean>(false);
  const [scrollQuantity, setScrollQuantity] = useState<number>(0);
  const isNewbie = useAppSelector((state) => state.auth.isNewbie);
  const recentVideoDataLst = useAppSelector(
    (state) => state.video.recentVideoData
  );
  const firstBlockRef = useRef<HTMLDivElement>(null);
  const secondBlockRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isNewbie !== false) {
      setIsModal(true);
      dispatch(authActions.resetIsNewbie());
    }
  }, [isNewbie]);

  // 스크롤 방지 밑 일정 횟수이상 스크롤 시 이동하도록 구현
  const throttledScroll = (e: any) => {
    e.preventDefault();
    if (e.wheelDeltaY > 0) {
      setScrollQuantity((scrollQuantity) => scrollQuantity + 1);
    } else {
      setScrollQuantity((scrollQuantity) => scrollQuantity - 1);
    }
    console.log(scrollQuantity);

    // 10 이상 다음 섹션, -10 이하 다음 섹션
    if (scrollQuantity > 3) {
      if (firstBlockRef.current !== null) {
        firstBlockRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
      setScrollQuantity((scrollQuantity) => scrollQuantity - 3);
    } else if (scrollQuantity < -3) {
      if (secondBlockRef.current !== null) {
        console.log('얍얍');
        secondBlockRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
      setScrollQuantity((scrollQuantity) => scrollQuantity + 3);
    }
  };

  const onClickMoveToVideos = () => {
    navigate('/videos');
  };

  useEffect(() => {
    window.addEventListener('wheel', throttledScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', throttledScroll);
    };
  }, [throttledScroll]);
  //

  useEffect(() => {
    dispatch(authActions.fetchUser());
    dispatch(authActions.getUserAlert());
    dispatch(dashboardActions.getTagList());
    dispatch(videoActions.getRecentVideoData());
  }, []);

  // USESTATE
  const [modalToggleVideoId, setModalToggleVideoId] = useState<string>('none');

  return (
    <>
      <VideoModal
        modalStyleNum={1}
        modalToggleVideoId={modalToggleVideoId}
        setModalToggleVideoId={setModalToggleVideoId}
      ></VideoModal>

      {/* <TagSelectModal setIsModal={setIsModal}></TagSelectModal> */}
      {isModal ? (
        <TagSelectModal setIsModal={setIsModal}></TagSelectModal>
      ) : null}
      <MainPageBlock>
        <FirstpageBlock id="FirstpageBlock" ref={firstBlockRef}>
          <CustomSlider></CustomSlider>
          <PageDownButton
            className="toggle down"
            style={{ rotate: '270deg' }}
            href="#SecondpageBlock"
          >
            《
          </PageDownButton>
        </FirstpageBlock>
        <SecondpageBlock id="SecondpageBlock" ref={secondBlockRef}>
          {recentVideoDataLst.length === 0 ? (
            <FlexTransparentDiv
              widthSize={'100vw'}
              heightSize={'100vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{
                fontSize: '10vmin',
                backgroundColor: 'black',
              }}
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
                  // paddingTop: '20vh',
                }}
              >
                <FlexTransparentDiv
                  widthSize={'45vw'}
                  heightSize={'20vh'}
                  paddingSize={'0 4vw'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  IsBorder={'none'}
                  style={{
                    fontSize: '4vmin',
                    color: 'white',
                  }}
                >
                  최근 학습한 영상이 없어요
                </FlexTransparentDiv>
                <GradientRoundBtn
                  widthSize={'13vw'}
                  heightSize={'6vh'}
                  paddingSize={'0 1vw'}
                  fontColor={'white'}
                  fontSize={'2.3vmin'}
                  backgroundColor={'gradient'}
                  style={{ borderRadius: '2vmin', fontWeight: 'bold' }}
                  onClick={() => onClickMoveToVideos()}
                >
                  영상 찾아보기
                </GradientRoundBtn>
              </FlexTransparentDiv>
              <FlexTransparentDiv
                widthSize={'55vw'}
                heightSize={'100vh'}
                paddingSize={'0'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                IsBorder={'none'}
              ></FlexTransparentDiv>
              <TagThumbnail
                style={{
                  position: 'absolute',
                  opacity: '0.5',
                  width: '65vw',
                  marginLeft: '35vw',
                }}
                url="https://threelaka.s3.ap-northeast-2.amazonaws.com/ted.png"
              />
            </FlexTransparentDiv>
          ) : (
            <>
              <CutomSliderBottom
                recentVideoDataLst={recentVideoDataLst}
              ></CutomSliderBottom>
              <PageDownButton
                className="toggle up"
                style={{ rotate: '90deg' }}
                href="#FirstpageBlock"
              >
                《
              </PageDownButton>
            </>
          )}
        </SecondpageBlock>
      </MainPageBlock>
    </>
  );
};

export default MainPage;
