import React, { useRef } from 'react';
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
} from '../../styles/Main/MainStyle';
import { NewVideo } from '../../styles/Main/MainSearchStyle';
import RecommendVideoList from './components/RecommendVideoList';
import { useScrollDirection } from 'react-use-scroll-direction';

const MainPage = () => {
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
  const { isScrolling, isScrollingUp, isScrollingDown } = useScrollDirection();
  if (isScrolling) {
    if (isScrollingUp && firstpageBlock.current != null) {
      observer.observe(firstpageBlock.current);
    } else if (isScrollingDown && recentVideoContainer.current != null) {
      observer.observe(recentVideoContainer.current);
    }
  }
  // console.warn('찍고오나');
  return (
    <MainPageBlock>
      <FirstpageBlock ref={firstpageBlock}>
        <SearchBarBlock id="searchBarBlock">
          <LogoBlock>
            <img
              src="https://threelaka.s3.ap-northeast-2.amazonaws.com/mainlogo.png"
              alt="스리라까 로고"
            />
          </LogoBlock>
          <NewVideo>
            {/* <FirstCenterBar> */}
            <SearchBar />
            {/* </FirstCenterBar> */}
          </NewVideo>
        </SearchBarBlock>
        <PageDownButton
          className="toggle"
          style={{ rotate: '270deg' }}
          href="#recentVideoContainer"
        >
          《
        </PageDownButton>
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
        <ListInfo>추천 영상</ListInfo>
        <RecommendVideoList />
      </RecommendVideoContainer>
    </MainPageBlock>
  );
};

export default MainPage;
