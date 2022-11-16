import React, { useState } from 'react';
import { videoActions } from '../../features/video/video-slice';
import { FlexTransparentDiv } from '../../styles/Common/CommonDivStyle';
import GradientInput from '../../utils/GradientInput';
import { useAppDispatch } from '../../utils/hooks';
import { useAppSelector } from './../../utils/hooks';
import VideoCard from '../Main/components/VideoCard';
import VideoModal from '../../utils/VideoModal';

const VideosPage = () => {
  const dispatch = useAppDispatch();
  // useSelector
  const searchResultVideo = useAppSelector(
    (state) => state.video.keywordSearchVideoList
  );

  //useState
  const [inputValue, setInpuValue] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [modalToggleVideoId, setModalToggleVideoId] = useState<string>('none');
  // onClickHandler
  const onClickSearchVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const keyword = inputValue.trim();
    if (keyword.length < 2) {
      alert('키워드를 2글자 이상 입력해주세요');
    } else {
      dispatch(videoActions.getKeywordSearchVideosStart(keyword));
      setSearchKeyword(keyword);
    }
  };
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
      >
        Spacer
      </FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'100vw'}
        heightSize={'92vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'none'}
      >
        <FlexTransparentDiv
          widthSize={'100vw'}
          heightSize={'20vh'}
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
            {searchKeyword}의 검색결과 입니다.
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
            {searchResultVideo &&
              searchResultVideo.map((videoData, i) => {
                return (
                  <VideoCard
                    setModalToggleVideoId={setModalToggleVideoId}
                    data={videoData}
                    key={`video-${i}`}
                  />
                );
              })}
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
