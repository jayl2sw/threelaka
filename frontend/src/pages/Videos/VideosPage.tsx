import React, { useEffect, useState } from 'react';
import { videoActions } from '../../features/video/video-slice';
import { FlexTransparentDiv } from '../../styles/Common/CommonDivStyle';
import { MainBtn } from '../../styles/Common/CommonBtnStyle';
import GradientInput from '../../utils/GradientInput';
import { useAppDispatch } from '../../utils/hooks';
import { useAppSelector } from './../../utils/hooks';
import VideoCard from '../Main/components/VideoCard';
import VideoModal from '../../utils/VideoModal';
import { useLocation } from 'react-router-dom';

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

const VideosPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  let tagConv = '';
  if (location.state !== null) {
    tagConv = location.state.tagConv;
  }
  // useSelector
  const searchResultVideo = useAppSelector(
    (state) => state.video.keywordSearchVideoList
  );

  const tagSearchResultVideo = useAppSelector(
    (state) => state.video.tagSearchVideoList
  );

  // useEffect
  useEffect(() => {
    if (tagConv !== '') {
      console.log(tagConv);
      onClickTagVideo(tagConv);
    }
  }, [tagConv]);

  //useState
  const [inputValue, setInpuValue] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [modalToggleVideoId, setModalToggleVideoId] = useState<string>('none');
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
      dispatch(videoActions.getKeywordSearchVideosStart(keyword));
      setSearchKeyword(keyword);
      setSearchMode('search');
    }
  };

  const onClickTagVideo = (targetTagVal: string) => {
    const tagId: number = tagIdDict[targetTagVal];

    dispatch(videoActions.getTagSearchVideosStart(tagId));
    setSelectedTag(targetTagVal);
    setSearchMode('tag');
  };
  //
  return (
    <>
      <VideoModal
        modalStyleNum={1}
        modalToggleVideoId={modalToggleVideoId}
        setModalToggleVideoId={setModalToggleVideoId}
      ></VideoModal>
      <FlexTransparentDiv
        widthSize={'100vw'}
        heightSize={'8vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'none'}
      ></FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'100vw'}
        heightSize={'100%'}
        paddingSize={'10vh 0 0 0'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'none'}
      >
        <FlexTransparentDiv
          widthSize={'100vw'}
          heightSize={'10vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          <GradientInput
            widthSize={60}
            onClickHandler={onClickSearchVideo}
            placeHolderText={'안녕하세요'}
            inputName={'keyword'}
            inputValue={inputValue}
            setInputValue={setInpuValue}
          ></GradientInput>
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'100vw'}
          heightSize={'7vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          <MainBtn
            widthSize={'10vw'}
            heightSize={'5vh'}
            paddingSize={'0'}
            fontSize={'2vmin'}
            fontColor={'white'}
            backgroundColor={'black'}
            style={{ marginRight: '1vw' }}
            onClick={() => onClickTagVideo('인간')}
          >
            #인간
          </MainBtn>
          <MainBtn
            widthSize={'10vw'}
            heightSize={'5vh'}
            paddingSize={'0'}
            fontSize={'2vmin'}
            fontColor={'white'}
            backgroundColor={'black'}
            style={{ marginRight: '1vw' }}
            onClick={() => onClickTagVideo('산업')}
          >
            #산업
          </MainBtn>
          <MainBtn
            widthSize={'10vw'}
            heightSize={'5vh'}
            paddingSize={'0'}
            fontSize={'2vmin'}
            fontColor={'white'}
            backgroundColor={'black'}
            style={{ marginRight: '1vw' }}
            onClick={() => onClickTagVideo('생물')}
          >
            #생물
          </MainBtn>
          <MainBtn
            widthSize={'10vw'}
            heightSize={'5vh'}
            paddingSize={'0'}
            fontSize={'2vmin'}
            fontColor={'white'}
            backgroundColor={'black'}
            style={{ marginRight: '1vw' }}
            onClick={() => onClickTagVideo('문화예술')}
          >
            #문화예술
          </MainBtn>
          <MainBtn
            widthSize={'10vw'}
            heightSize={'5vh'}
            paddingSize={'0'}
            fontSize={'2vmin'}
            fontColor={'white'}
            backgroundColor={'black'}
            style={{ marginRight: '1vw' }}
            onClick={() => onClickTagVideo('문명')}
          >
            #문명
          </MainBtn>
          <MainBtn
            widthSize={'10vw'}
            heightSize={'5vh'}
            paddingSize={'0'}
            fontSize={'2vmin'}
            fontColor={'white'}
            backgroundColor={'black'}
            style={{ marginRight: '1vw' }}
            onClick={() => onClickTagVideo('자연')}
          >
            #자연
          </MainBtn>
          <MainBtn
            widthSize={'10vw'}
            heightSize={'5vh'}
            paddingSize={'0'}
            fontSize={'2vmin'}
            fontColor={'white'}
            backgroundColor={'black'}
            onClick={() => onClickTagVideo('지식')}
          >
            #지식
          </MainBtn>
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'100vw'}
          heightSize={'72vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          <FlexTransparentDiv
            widthSize={'100vw'}
            heightSize={'10vh'}
            paddingSize={'0 10vw'}
            flexDirection={'row'}
            justifyContent={'start'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{ fontSize: '5vmin' }}
          >
            {serachMode === 'tag'
              ? `${selectedTag}과 관련된 영상들입니다.`
              : searchKeyword !== ''
              ? `${searchKeyword}의 검색결과 입니다.`
              : ''}
          </FlexTransparentDiv>
          <FlexTransparentDiv
            widthSize={'100vw'}
            heightSize={'60vh'}
            paddingSize={'0 8vw'}
            flexDirection={'row'}
            justifyContent={'start'}
            alignItems={'center'}
            IsBorder={'none'}
            style={{ flexWrap: 'wrap' }}
          >
            {serachMode === 'tag'
              ? tagSearchResultVideo &&
                tagSearchResultVideo.map((videoData, i) => {
                  return (
                    <VideoCard
                      setModalToggleVideoId={setModalToggleVideoId}
                      data={videoData}
                      key={`video-${i}`}
                    />
                  );
                })
              : searchResultVideo &&
                searchResultVideo.map((videoData, i) => {
                  return (
                    <VideoCard
                      setModalToggleVideoId={setModalToggleVideoId}
                      data={videoData}
                      key={`video-${i}`}
                    />
                  );
                })}
            {}
            {/* {searchResultVideo.length > 0
              ? searchResultVideo[0].description
              : ''} */}
          </FlexTransparentDiv>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </>
  );
};

export default VideosPage;
