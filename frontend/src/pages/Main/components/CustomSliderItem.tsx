import React from 'react';
import styled from 'styled-components';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { GradientRoundBtn } from '../../../styles/Common/CommonBtnStyle';
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

const CustomSliderItem = ({
  sThreeUrl,
  title,
  content,
  tagContent,
}: ICustomSliderProps) => {
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
        alignItems={'center'}
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
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{ fontSize: '7vmin', color: 'white' }}
        >
          {title}
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'35vw'}
          heightSize={'20vh'}
          paddingSize={'0 5vw'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{ fontSize: '3vmin', color: 'white', wordBreak: 'break-all' }}
        >
          {content}
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'35vw'}
          heightSize={'10vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{ letterSpacing: '0.4vmin', color: 'white' }}
        >
          {tagContent}
        </FlexTransparentDiv>
        <GradientRoundBtn
          widthSize={'13vw'}
          heightSize={'10vh'}
          paddingSize={'0'}
          fontColor={'white'}
          fontSize={'2vmin'}
          backgroundColor={'blue'}
          style={{ marginTop: '5vh' }}
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
