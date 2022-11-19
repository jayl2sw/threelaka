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
  SecondpageBlock,
  RecommendVideoContainer,
  ListInfo,
  PageDownButton,
  FirstCenterBar,
  TitleBlock,
  ThumbnailBlock,
  VideoImg,
  BackgroundImg,
  ThumbnailImg,
} from '../../styles/Main/MainStyle';
import { NewVideo } from '../../styles/Main/MainSearchStyle';
import RecommendVideoList from './components/RecommendVideoList';
// import { useScrollDirection } from 'react-use-scroll-direction';
import VideoModal from '../../utils/VideoModal';
import TagSelectModal from './components/TagSelectModal';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { dashboardActions } from '../../features/dashboard/dashboard-slice';
import { authActions } from '../../features/auth/authSlice';
import { GradientRoundBtn } from '../../styles/Common/CommonBtnStyle';

const MainPage = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const isNewbie = useAppSelector((state) => state.auth.isNewbie);
  const tagList = useAppSelector((state) => state.dashboard.tagList);
  const userAlertList = useAppSelector((state) => state.auth.userAlertList);
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

  useEffect(() => {
    dispatch(authActions.getUserAlert());
    dispatch(dashboardActions.getTagList());
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
        <FirstpageBlock id="FirstpageBlock">
          <TitleBlock>
            <div className="tagName">KNOWLEDGE</div>
            <div className="tagDesc">
              끊임없이 탐구하는 당신을 위하여
              <br />
              세계적인 석학의 강의를 만나보세요
            </div>
            <div className="smallTags">
              #철학 #과학 #수학 #정치 #생물학 #의학
            </div>
            <GradientRoundBtn
              widthSize={'13vw'}
              heightSize={'7vh'}
              paddingSize={'0'}
              fontColor={'white'}
              fontSize={'2vmin'}
              backgroundColor={'blue'}
              style={{
                position: 'absolute',
                top: '70%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              더 알아보러 가기
            </GradientRoundBtn>
          </TitleBlock>
          <ThumbnailBlock>
            <BackgroundImg />
          </ThumbnailBlock>
          <PageDownButton
            className="toggle down"
            style={{ rotate: '270deg' }}
            href="#SecondpageBlock"
          >
            《
          </PageDownButton>
        </FirstpageBlock>
        <SecondpageBlock id="SecondpageBlock">
          <PageDownButton
            className="toggle up"
            style={{ rotate: '90deg' }}
            href="#FirstpageBlock"
          >
            《
          </PageDownButton>
          <TitleBlock className="youtubeTitleBlock">
            <div className="recent tagName">
              Alberto Cairo: There are no scraps of men
            </div>
            <div className="recent tagDesc">
              Alberto Cairo's clinics in Afghanistan used to close down during
              active fighting. Now, they stay open. At TEDxRC2 (the RC stands
              for Red Cross/Red Crescent), Cairo tells the powerful story of why
              -- and how he found humanity and dignity in the midst of war.
              TEDTalks is a daily video podcast of the best talks and
              performances from the TED Conference, where the world's leading
              thinkers and doers give the talk of their lives in 18 minutes.
              Featured speakers have included Al Gore on climate change,
              Philippe Starck on design, Jill Bolte Taylor on observing her own
              stroke, Nicholas Negroponte on One Laptop per Child, Jane Goodall
              on chimpanzees, Bill Gates on malaria and mosquitoes, Pattie Maes
              on the "Sixth Sense" wearable tech, and "Lost" producer JJ Abrams
              on the allure of mystery. TED stands for Technology,
              Entertainment, Design, and TEDTalks cover these topics as well as
              science, business, development and the arts. Closed captions and
              translated subtitles in a variety of languages are now available
              on TED.
            </div>
            <div
              style={{
                position: 'absolute',
                top: '65%',
                left: '25%',
                width: '50%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                transform: 'translateX(-25%)',
              }}
            >
              <GradientRoundBtn
                widthSize={'13vw'}
                heightSize={'7vh'}
                paddingSize={'0'}
                fontColor={'white'}
                fontSize={'2vmin'}
                backgroundColor={'blue'}
                style={{
                  marginRight: '3vw',
                }}
              >
                새로운 학습 시작하기
              </GradientRoundBtn>
              <GradientRoundBtn
                widthSize={'13vw'}
                heightSize={'7vh'}
                paddingSize={'0'}
                fontColor={'white'}
                fontSize={'2vmin'}
                backgroundColor={'blue'}
                style={{
                  backgroundColor: 'gray',
                }}
              >
                기존 학습 이어하기
              </GradientRoundBtn>
            </div>
          </TitleBlock>
          <ThumbnailBlock>
            <ThumbnailImg />
          </ThumbnailBlock>
          <RecentVideoContainer></RecentVideoContainer>
          {/* <RecentVideo /> */}
        </SecondpageBlock>
        {/* <RecommendVideoContainer>
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
        </RecommendVideoContainer> */}
      </MainPageBlock>
    </>
  );
};

export default MainPage;

{
  // <SearchBarBlock id="searchBarBlock">
  //           <NewVideo>
  //             <SearchBar
  //               setModalToggleVideoId={setModalToggleVideoId}
  //             ></SearchBar>
  //           </NewVideo>
  //         </SearchBarBlock>
}
