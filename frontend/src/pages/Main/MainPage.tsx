import React, { useRef, useState, useEffect, useMemo } from 'react';
import { throttle } from 'lodash';
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

const MainPage = () => {
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

  useEffect(() => {
    window.addEventListener('wheel', throttledScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', throttledScroll);
    };
  }, [throttledScroll]);
  //

  useEffect(() => {
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
        </SecondpageBlock>
      </MainPageBlock>
    </>
  );
};

export default MainPage;
