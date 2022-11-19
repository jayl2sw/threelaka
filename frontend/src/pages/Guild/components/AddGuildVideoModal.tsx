import React, { useEffect, useState, useRef } from 'react';
import { videoActions } from '../../../features/video/video-slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
  MainBox,
  FlexTransparentDiv,
  BackBlurBox,
} from '../../../styles/Common/CommonDivStyle';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import { ModalBackdrop } from '../../../styles/DashBoard/DashBoardStyle';
import GradientInput from '../../../utils/GradientInput';
import { YoutubeVideoInfoBox } from '../../../styles/Guild/MasterSetting';
import { addDays, format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { differenceInCalendarDays } from 'date-fns';
import { DateRange, Row, DayPicker, RowProps } from 'react-day-picker';
import './datePicker.css';
import { guildActions } from '../../../features/guild/guild-slice';
import { GuildAssignment } from '../../../models/guild';

const pastMonth = new Date();

interface IVideoModalProps {
  modalToggle: boolean;
  setModalToggle: (nextToggle: boolean) => void;
}

const AddGuildVideoModal = ({
  modalToggle,
  setModalToggle,
}: IVideoModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const outside = useRef<HTMLDivElement>(null);
  // 버튼 클릭으로 영상 정보 조회
  const [inputValue, setInpuValue] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
        </p>
      );
    }
  }

  function isPastDate(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  function OnlyFutureRow(props: RowProps) {
    const isPastRow = props.dates.every(isPastDate);
    if (isPastRow) return <></>;
    return <Row {...props} />;
  }

  // selector
  const searchResultVideo = useAppSelector(
    (state) => state.video.keywordSearchVideoList
  );

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
    }
  };

  const onClickCreateAssignment = () => {
    const payload: GuildAssignment = {
      videoId: searchResultVideo[selectedIdx].videoId,
      startDate: `${range?.from
        ?.toLocaleDateString()
        .replace('. ', '-')
        .replace('. ', '-')
        .replace('.', '')}`,
      endDate: `${range?.to
        ?.toLocaleDateString()
        .replace('. ', '-')
        .replace('. ', '-')
        .replace('.', '')}`,
    };
    dispatch(guildActions.postGuildAssignmentStart(payload));
  };

  return (
    <ModalBackdrop
      ref={outside}
      onClick={(e) => {
        if (e.target === outside.current) {
          setModalToggle(false);
        }
      }}
    >
      <MainBox
        widthSize={'50vw'}
        heightSize={'80vh'}
        paddingSize={'5vh 3vw 0vh 3vw'}
        fontColor={'black'}
        fontSize={'1.5vmin'}
        style={{
          position: 'fixed',
          top: '10vh',
          left: '25vw',
          zIndex: '1000',
          // border: '1px solid green',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <GradientInput
          widthSize={45}
          onClickHandler={onClickSearchVideo}
          placeHolderText={'안녕하세요'}
          inputName={'keyword'}
          inputValue={inputValue}
          setInputValue={setInpuValue}
        ></GradientInput>
        <div style={{ width: '45vw', height: '5vh', fontSize: '3vmin' }}>
          {searchKeyword.length === 0
            ? '키워드로 검색해주세요'
            : `${searchKeyword}의 검색결과입니다`}
        </div>
        <FlexTransparentDiv
          widthSize={'44vw'}
          heightSize={'30vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{ overflowY: 'auto', overflowX: 'hidden' }}
        >
          {searchResultVideo.map((item, idx) => {
            return (
              <YoutubeVideoInfoBox
                key={`youtube-info-${idx}`}
                onClick={() => setSelectedIdx(idx)}
              >
                <img
                  style={{
                    width: '10vw',
                    height: '8vh',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                  src={`https://img.youtube.com/vi/${item.videoId}/0.jpg`}
                ></img>
                <FlexTransparentDiv
                  widthSize={'34vw'}
                  heightSize={'8vh'}
                  paddingSize={'0 1vw'}
                  flexDirection={'row'}
                  justifyContent={'start'}
                  alignItems={'center'}
                  IsBorder={'none'}
                  style={{ minHeight: '10vh', fontSize: '2vmin' }}
                >
                  {item.title}
                </FlexTransparentDiv>
              </YoutubeVideoInfoBox>
            );
          })}
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'34vw'}
          heightSize={'8vh'}
          paddingSize={'0 1vw'}
          flexDirection={'row'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{ fontSize: '2.5vmin' }}
        >
          선택된 영상
        </FlexTransparentDiv>
        {searchResultVideo.length !== 0 ? (
          selectedIdx !== -1 ? (
            <>
              {' '}
              <BackBlurBox
                widthSize={'35vw'}
                heightSize={'8vh'}
                paddingSize={'1vh 1vw'}
                fontColor={'white'}
                fontSize={'2vmin'}
                style={{
                  minHeight: '10vh',
                  fontSize: '2vmin',
                  margin: '0 auto',
                  backgroundColor: '#4a9fff',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <img
                  style={{
                    width: '10vw',
                    height: '8vh',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginRight: '1vw',
                  }}
                  src={`https://img.youtube.com/vi/${searchResultVideo[selectedIdx].videoId}/0.jpg`}
                ></img>
                {searchResultVideo[selectedIdx].title}
              </BackBlurBox>
              <FlexTransparentDiv
                widthSize={'40vw'}
                heightSize={'28vh'}
                paddingSize={'0 1vw'}
                flexDirection={'row'}
                justifyContent={'start'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{ marginLeft: '2vw', marginTop: '1vh' }}
              >
                <DayPicker
                  mode="range"
                  defaultMonth={pastMonth}
                  selected={range}
                  onSelect={setRange}
                  footer={footer}
                  locale={ko}
                  hidden={isPastDate}
                />
                <FlexTransparentDiv
                  widthSize={'25vw'}
                  heightSize={'28vh'}
                  paddingSize={'0 1vw'}
                  flexDirection={'row'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  IsBorder={'none'}
                  style={{ marginLeft: '2vw', marginTop: '1vh' }}
                >
                  <MainBtn
                    widthSize={'15vw'}
                    heightSize={'10vh'}
                    paddingSize={'0'}
                    fontSize={'2vmin'}
                    fontColor={'white'}
                    backgroundColor={'gradient'}
                    onClick={() => onClickCreateAssignment()}
                  >
                    과제 만들기
                  </MainBtn>
                </FlexTransparentDiv>
              </FlexTransparentDiv>
            </>
          ) : (
            '없다'
          )
        ) : (
          ''
        )}
      </MainBox>
    </ModalBackdrop>
  );
};

export default AddGuildVideoModal;
