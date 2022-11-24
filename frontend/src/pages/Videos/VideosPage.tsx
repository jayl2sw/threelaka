import React, { useEffect, useState, useRef } from 'react';
import { videoActions } from '../../features/video/video-slice';
import {
  FlexTransparentDiv,
  ToastContainer,
} from '../../styles/Common/CommonDivStyle';
import { ToastMessage } from '../../utils/ToastMessage';
import { MainBtn } from '../../styles/Common/CommonBtnStyle';
import GradientInput from '../../utils/GradientInput';
import { PageDownButton } from '../../styles/Main/MainStyle';
import { useAppDispatch } from '../../utils/hooks';
import { useAppSelector } from './../../utils/hooks';
import VideoCardTwo from '../Main/components/VideoCardTwo';
import VideoModal from '../../utils/VideoModal';
import { useLocation } from 'react-router-dom';
import { dashboardActions } from '../../features/dashboard/dashboard-slice';
import { useScrollBlock } from '../../utils/scrollBlock';
import { StickyBackDiv, BlackBlurDiv } from './VideoStyle';

interface ItagIdDict {
  [index: string]: number;
  인간: number;
  산업: number;
  생물: number;
  문화예술: number;
  문명: number;
  자연: number;
  지식: number;
}

const tagIdDict: ItagIdDict = {
  인간: 19,
  산업: 53,
  생물: 20,
  문화예술: 35,
  문명: 52,
  자연: 54,
  지식: 16,
};

const tagStringLst = [
  '인간',
  '산업',
  '생물',
  '문화예술',
  '문명',
  '자연',
  '지식',
];

interface ItagIdCommentDict {
  [index: string]: string;
  인간: string;
  산업: string;
  생물: string;
  문화예술: string;
  문명: string;
  자연: string;
  지식: string;
}

const tagComment: ItagIdCommentDict = {
  인간: '당신은 인간을 얼마나 알고있나요? 더 깊이 더 많이 알아보세요',
  산업: '세상을 움직이는 힘, 어떻게 발전하고 있을까요?',
  생물: '박테리아부터 코끼리까지, 알수록 더 궁금한 생물의 세계로 빠져볼까요?',
  문화예술: '인간이 그려낸 아름다움에 대하여, 형형색색의 미를 만나보세요',
  문명: '우리가 살고 있는 이곳은 어떻게 변해왔을까요?',
  자연: '인간보다 거대한 존재들의 이야기 바다부터 우주까지, 미지의 세계를 탐구해보세요',
  지식: '끊임없이 탐구하는 당신을 위하여, 세계적인 석학들의 강의를 만나보세요',
};

const tagUrl: ItagIdCommentDict = {
  인간: 'https://threelaka.s3.ap-northeast-2.amazonaws.com/human.jpg',
  산업: 'https://threelaka.s3.ap-northeast-2.amazonaws.com/industry.jpg',
  생물: 'https://threelaka.s3.ap-northeast-2.amazonaws.com/animals.jpg',
  문화예술: 'https://threelaka.s3.ap-northeast-2.amazonaws.com/culture.jpg',
  문명: 'https://threelaka.s3.ap-northeast-2.amazonaws.com/civilization.jpg',
  자연: 'https://threelaka.s3.ap-northeast-2.amazonaws.com/nature.jpg',
  지식: 'https://threelaka.s3.ap-northeast-2.amazonaws.com/knowledge.jpg',
};

const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

const VideosPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  const [blockScroll, allowScroll] = useScrollBlock();

  let tagConv = '';
  if (location.state !== null) {
    tagConv = location.state.tagConv;
  }
  // useSelector
  const searchResultVideo = useAppSelector(
    (state) => state.video.keywordSearchVideoList
  );

  const modelRecommendVideo = useAppSelector(
    (state) => state.video.recommendVideoList
  );
  const recommendModelType = useAppSelector(
    (state) => state.video.recommendVideoType
  );

  const tagSearchResultVideo = useAppSelector(
    (state) => state.video.tagSearchVideoList
  );

  const mySelectedTags = useAppSelector((state) => state.dashboard.tagList);

  // useEffect
  useEffect(() => {
    if (tagConv !== '') {
      console.log(tagConv);
      onClickTagVideo(tagConv);
    }
  }, [tagConv]);

  useEffect(() => {
    dispatch(dashboardActions.getTagList());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //useState
  const [inputValue, setInpuValue] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [modalToggleVideoId, setModalToggleVideoId] = useState<string>('none');
  const [isKorean, setIsKorean] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [serachMode, setSearchMode] = useState<string>('search');
  // onClickHandler
  const onClickSearchVideo = (
    e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>,
    targetInputVal: string
  ) => {
    const keyword = targetInputVal.trim();
    if (keyword.length < 2) {
      alert('키워드를 2글자 이상 입력해주세요');
    } else {
      if (check.test(keyword)) {
        setIsKorean(true);
        setInpuValue('');
        setTimeout(() => {
          setIsKorean(false);
        }, 2000);
        return;
      }

      dispatch(videoActions.getKeywordSearchVideosStart(keyword));
      setSearchKeyword(keyword);
      setSearchMode('search');
      if (secondRef.current !== null) {
        secondRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }
  };

  const onClickTagVideo = (targetTagVal: string) => {
    const tagId: number = tagIdDict[targetTagVal];

    if (secondRef.current !== null) {
      secondRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }

    dispatch(videoActions.getTagSearchVideosStart(tagId));
    setSelectedTag(targetTagVal);
    setSearchMode('tag');
  };

  const moveToFirst = () => {
    if (firstRef.current !== null) {
      firstRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  const getModelRecommentVideo = () => {
    dispatch(videoActions.getRecommendVideos());
    setSearchMode('model');
    if (secondRef.current !== null) {
      secondRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };
  //
  return (
    <>
      {isKorean && (
        <ToastContainer
          widthSize={'20vw'}
          heightSize={'20vh'}
          paddingSize={'2vh 1vw'}
          fontColor={'black'}
          top={'40vh'}
          left={'40vw'}
        >
          <ToastMessage text={'한글로 입력해주세요'}></ToastMessage>
        </ToastContainer>
      )}
      {serachMode === 'tag' ? (
        <>
          <BlackBlurDiv></BlackBlurDiv>
          <StickyBackDiv url={tagUrl[selectedTag]}></StickyBackDiv>
        </>
      ) : (
        <>
          <BlackBlurDiv></BlackBlurDiv>
          <StickyBackDiv
            url={
              'https://threelaka.s3.ap-northeast-2.amazonaws.com/recommend.jpg'
            }
          ></StickyBackDiv>
        </>
      )}

      <FlexTransparentDiv
        widthSize={'100vw'}
        heightSize={'auto'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'none'}
        style={{
          backgroundColor: 'transparent',
          minHeight: '100vh',
          // border: '3px solid yellowgreen',
        }}
        ref={firstRef}
      >
        <VideoModal
          modalStyleNum={1}
          modalToggleVideoId={modalToggleVideoId}
          setModalToggleVideoId={setModalToggleVideoId}
        ></VideoModal>
        <FlexTransparentDiv
          widthSize={'100vw'}
          heightSize={'20vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            position: 'sticky',
            minHeight: '20vh',
            top: '0vh',
          }}
        ></FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'100vw'}
          heightSize={'auto'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'start'}
          IsBorder={'none'}
        >
          <FlexTransparentDiv
            widthSize={'100vw'}
            heightSize={'80vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{ minHeight: '85vh' }}
          >
            <GradientInput
              widthSize={60}
              onClickHandler={onClickSearchVideo}
              placeHolderText={'검색페이지인풋'}
              inputName={'keyword'}
              inputValue={inputValue}
              setInputValue={setInpuValue}
            ></GradientInput>
            <FlexTransparentDiv
              widthSize={'100vw'}
              heightSize={'7vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{ marginTop: '2vh' }}
            >
              {tagStringLst.map((tagName, idx) => {
                if (mySelectedTags.includes(tagName)) {
                  return (
                    <MainBtn
                      key={`upper-tag-btn-${idx}`}
                      widthSize={'8vw'}
                      heightSize={'5vh'}
                      paddingSize={'0'}
                      fontSize={'2.5vmin'}
                      fontColor={'black'}
                      backgroundColor={'black'}
                      style={{
                        marginRight: '1vw',
                        borderRadius: '5px',
                        backgroundColor: '#C1FFA9',
                      }}
                      onClick={() => onClickTagVideo(tagName)}
                    >
                      #{tagName}
                    </MainBtn>
                  );
                }
              })}
            </FlexTransparentDiv>
            <FlexTransparentDiv
              widthSize={'100vw'}
              heightSize={'7vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{ marginTop: '2vh' }}
            >
              {tagStringLst.map((tagName, idx) => {
                if (!mySelectedTags.includes(tagName)) {
                  return (
                    <MainBtn
                      key={`bottom-tag-btn-${idx}`}
                      widthSize={'8vw'}
                      heightSize={'5vh'}
                      paddingSize={'0'}
                      fontSize={'2.5vmin'}
                      fontColor={'white'}
                      backgroundColor={'blue'}
                      style={{ marginRight: '1vw', borderRadius: '5px' }}
                      onClick={() => onClickTagVideo(tagName)}
                    >
                      #{tagName}
                    </MainBtn>
                  );
                }
              })}
            </FlexTransparentDiv>
            <FlexTransparentDiv
              widthSize={'100vw'}
              heightSize={'7vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{ color: 'white', marginTop: '15vh' }}
            >
              <FlexTransparentDiv
                widthSize={'20vw'}
                heightSize={'7vh'}
                paddingSize={'0'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{ color: 'white', fontSize: '4vmin' }}
              >
                라카의 추천을 원한다면?
              </FlexTransparentDiv>
            </FlexTransparentDiv>
            <MainBtn
              widthSize={'8vw'}
              heightSize={'5vh'}
              paddingSize={'0'}
              fontSize={'2.5vmin'}
              fontColor={'black'}
              backgroundColor={'gradient'}
              style={{
                borderRadius: '5px',
                marginTop: '1vh',
              }}
              onClick={() => getModelRecommentVideo()}
            >
              #추천
            </MainBtn>
          </FlexTransparentDiv>

          <FlexTransparentDiv
            ref={secondRef}
            widthSize={'100vw'}
            heightSize={'auto'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{
              // border: '5px solid pink',
              minHeight: '100vh',
              transition: 'height 1s ease',
              position: 'relative',
            }}
          >
            <FlexTransparentDiv
              widthSize={'100vw'}
              heightSize={'25vh'}
              paddingSize={'0 10vw'}
              flexDirection={'row'}
              justifyContent={'start'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{
                fontSize: serachMode === 'tag' ? '3.5vmin' : '5vmin',
                color: 'white',
                paddingTop: '15vh',
                paddingRight: '15vw',
              }}
            >
              {serachMode === 'tag'
                ? `${tagComment[selectedTag]}`
                : serachMode === 'model'
                ? `LAKA의 알고리즘 추천 영상입니다.`
                : searchKeyword !== ''
                ? searchResultVideo.length === 0
                  ? `검색결과를 찾지 못했어요..`
                  : `${searchKeyword}의 검색결과 입니다.`
                : ''}
            </FlexTransparentDiv>
            <FlexTransparentDiv
              widthSize={'100vw'}
              heightSize={'auto'}
              paddingSize={'0 8vw'}
              flexDirection={'row'}
              justifyContent={'start'}
              alignItems={'start'}
              IsBorder={'none'}
              style={{ flexWrap: 'wrap' }}
            >
              {serachMode === 'tag' ? (
                tagSearchResultVideo &&
                tagSearchResultVideo.map((videoData, i) => {
                  return (
                    <VideoCardTwo
                      setModalToggleVideoId={setModalToggleVideoId}
                      data={videoData}
                      key={`video-${i}`}
                    />
                  );
                })
              ) : serachMode === 'model' ? (
                modelRecommendVideo.map((videoData, i) => {
                  return (
                    <VideoCardTwo
                      setModalToggleVideoId={setModalToggleVideoId}
                      data={videoData}
                      key={`video-${i}`}
                    />
                  );
                })
              ) : searchResultVideo.length === 0 ? (
                <FlexTransparentDiv
                  widthSize={'100vw'}
                  heightSize={'60vh'}
                  paddingSize={'0'}
                  flexDirection={'row'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  IsBorder={'none'}
                  style={{ flexWrap: 'wrap' }}
                >
                  <img
                    style={{
                      width: '40vmin',
                      height: '35vmin',
                      objectFit: 'cover',
                    }}
                    src={`https://threelaka.s3.ap-northeast-2.amazonaws.com/blue.png`}
                  ></img>
                </FlexTransparentDiv>
              ) : (
                searchResultVideo.map((videoData, i) => {
                  return (
                    <VideoCardTwo
                      setModalToggleVideoId={setModalToggleVideoId}
                      data={videoData}
                      key={`video-${i}`}
                    />
                  );
                })
              )}
              {}
              {/* {searchResultVideo.length > 0
              ? searchResultVideo[0].description
              : ''} */}
            </FlexTransparentDiv>
            <PageDownButton
              className="toggle up"
              style={{
                rotate: '90deg',
                position: 'absolute',
                bottom: '-12vh',
                marginBottom: '5vh',
                left: '48vw',
              }}
              onClick={() => {
                moveToFirst();
              }}
            >
              《
            </PageDownButton>
            <FlexTransparentDiv
              widthSize={'100vw'}
              heightSize={'10vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{ position: 'absolute', bottom: '-10vh' }}
            ></FlexTransparentDiv>
          </FlexTransparentDiv>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </>
  );
};

export default VideosPage;
