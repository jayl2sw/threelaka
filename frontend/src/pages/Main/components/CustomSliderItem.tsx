import React from 'react';
import styled from 'styled-components';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { GradientRoundBtn } from '../../../styles/Common/CommonBtnStyle';
import { useNavigate } from 'react-router-dom';

interface ICustomSliderProps {
  sThreeUrl: string;
  title: string;
  content: string;
  tagContent: string;
}

interface TagThumbnailProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  url: string;
}

const TagThumbnail = styled.div<TagThumbnailProps>`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  background: url(${(props) => props.url}) center no-repeat;
  background-size: 100vw 100vh;
`;

interface ItagIdConvDict {
  [index: string]: string;
  ANIMALS: string;
  CULTURE: string;
  INDUSTRY: string;
  KNOWLEDGE: string;
  HUMAN: string;
  NATURE: string;
  CIVILIZATION: string;
}

const tagIdConvDict: ItagIdConvDict = {
  ANIMALS: '생물',
  CULTURE: '문화예술',
  INDUSTRY: '산업',
  KNOWLEDGE: '지식',
  HUMAN: '인간',
  NATURE: '자연',
  CIVILIZATION: '문명',
};

const CustomSliderItem = ({
  sThreeUrl,
  title,
  content,
  tagContent,
}: ICustomSliderProps) => {
  const navigate = useNavigate();
  // tag번호 찾기
  const tagConv: string = tagIdConvDict[title];
  const onClickMoveToTagSearch = () => {
    navigate('/videos', {
      state: {
        tagConv: tagConv,
      },
    });
  };

  return (
    <FlexTransparentDiv
      widthSize={'100vw'}
      heightSize={'100vh'}
      paddingSize={'0'}
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      IsBorder={'none'}
    >
      <FlexTransparentDiv
        widthSize={'35vw'}
        heightSize={'100vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'start'}
        IsBorder={'none'}
        style={{
          background:
            'linear-gradient(90deg, rgba(0, 0, 0, 1), 90%, rgba(0, 0, 0, 0))',
          zIndex: 1,
        }}
      >
        <FlexTransparentDiv
          widthSize={'35vw'}
          heightSize={'20vh'}
          paddingSize={'0 5vw'}
          flexDirection={'row'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            fontSize: '7vmin',
            color: 'white',
            fontFamily: 'pretendardextrabold',
          }}
        >
          {title}
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'35vw'}
          heightSize={'20vh'}
          paddingSize={'0 5vw'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{ fontSize: '3vmin', color: 'white', wordBreak: 'break-all' }}
        >
          {content.split(',').map((item) => {
            return (
              <FlexTransparentDiv
                widthSize={'25vw'}
                heightSize={'5vh'}
                paddingSize={'0'}
                flexDirection={'row'}
                justifyContent={'start'}
                alignItems={'center'}
                IsBorder={'none'}
              >
                {item}
              </FlexTransparentDiv>
            );
          })}
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'35vw'}
          heightSize={'10vh'}
          paddingSize={'0 5vw'}
          flexDirection={'row'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            letterSpacing: '0.4vmin',
            color: 'white',
          }}
        >
          {tagContent}
        </FlexTransparentDiv>
        <GradientRoundBtn
          widthSize={'13vw'}
          heightSize={'8vh'}
          paddingSize={'0'}
          fontColor={'white'}
          fontSize={'2vmin'}
          backgroundColor={'blue'}
          style={{ marginTop: '5vh', marginLeft: '4vw' }}
          onClick={() => onClickMoveToTagSearch()}
        >
          더 알아보러 가기
        </GradientRoundBtn>
      </FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'65vw'}
        heightSize={'100vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'is'}
      >
        <TagThumbnail url={sThreeUrl} />
      </FlexTransparentDiv>
    </FlexTransparentDiv>
  );
};

export default CustomSliderItem;
