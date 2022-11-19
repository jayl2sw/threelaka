import React, { useRef, useState, useEffect } from 'react';
import MainHeader from '../../layout/MainHeader';
import SearchBar from './components/SearchBar';
import RecentVideo from './components/RecentVideo';
import {
  MainPageBlock,
  RecommendVideos,
  RecentVideoContainer,
  SearchBarBlock,
  LogoBlock,
  FirstpageBlock,
  RecommendVideoContainer,
  ListInfo,
  PageDownButton,
  FirstCenterBar,
  TitleBlock,
  ThumbnailBlock,
  VideoImg,
  ThumbnailImg,
} from '../../styles/Main/MainStyle';
import { NewVideo } from '../../styles/Main/MainSearchStyle';
import RecommendVideoList from './components/RecommendVideoList';
import { useScrollDirection } from 'react-use-scroll-direction';
import VideoModal from '../../utils/VideoModal';
import TagSelectModal from './components/TagSelectModal';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { dashboardActions } from '../../features/dashboard/dashboard-slice';
import { authActions } from '../../features/auth/authSlice';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

const MainPage = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [isModal, setIsModal] = useState<boolean>(false);
  const isNewbie = useAppSelector((state) => state.auth.isNewbie);
  const tagList = useAppSelector((state) => state.dashboard.tagList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isNewbie !== false) {
      setIsModal(true);
      dispatch(authActions.resetIsNewbie());
    }
  }, [isNewbie]);
  let observer = new IntersectionObserver((e) => {
    // console.log('observer start', e);
    if (e[0].isIntersecting) {
      // console.log('intersect');
      // console.log(e[0].target);
      window.scrollBy(0, e[0].boundingClientRect.top);
    }
    return;
  });
  const firstpageBlock = useRef<HTMLDivElement>(null);
  const recentVideoContainer = useRef<HTMLDivElement>(null);
  // USESTATE
  const [modalToggleVideoId, setModalToggleVideoId] = useState<string>('none');
  const { isScrolling, isScrollingUp, isScrollingDown } = useScrollDirection();
  if (isScrolling) {
    if (isScrollingUp && firstpageBlock.current != null) {
      observer.observe(firstpageBlock.current);
    } else if (isScrollingDown && recentVideoContainer.current != null) {
      observer.observe(recentVideoContainer.current);
    }
  }

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
        <FirstpageBlock ref={firstpageBlock}>
          <TitleBlock>
            <div className="tagName"># TAG NAME</div>
            <div className="tagDesc">description</div>
          </TitleBlock>
          <ThumbnailBlock>
            <ThumbnailImg />
          </ThumbnailBlock>
        </FirstpageBlock>
        <RecentVideoContainer
          id="recentVideoContainer"
          ref={recentVideoContainer}
        >
          <PageDownButton
            className="toggle"
            style={{ rotate: '90deg' }}
            href="#searchBarBlock"
          >
            《
          </PageDownButton>
          <RecentVideo />
        </RecentVideoContainer>
        <RecommendVideoContainer>
          <ListInfo>
            <div style={{ marginRight: '1vw' }}>추천영상</div>
            <div style={{ fontSize: '2.5vmin' }}>
              {tagList.length !== 0
                ? tagList.map((item, idx) => {
                    return (
                      <span style={{ marginRight: '1vw', lineHeight: '28px' }}>
                        #{item}
                      </span>
                    );
                  })
                : null}
            </div>
          </ListInfo>

          <RecommendVideoList
            setModalToggleVideoId={setModalToggleVideoId}
          ></RecommendVideoList>
        </RecommendVideoContainer>
      </MainPageBlock>
    </>
  );
};

export default MainPage;

{
  /* <SearchBarBlock id="searchBarBlock">
            <NewVideo>
              <SearchBar
                setModalToggleVideoId={setModalToggleVideoId}
              ></SearchBar>

            </NewVideo>
          </SearchBarBlock>
          <PageDownButton
            className="toggle"
            style={{ rotate: '270deg' }}
            href="#recentVideoContainer"
          >
            《
          </PageDownButton> */
}
