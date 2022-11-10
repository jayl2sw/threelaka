import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// style
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
import { RightBtn } from '../../../../styles/Common/CommonBtnStyle';

const ModeButtons = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const modeCode = useLocation().search.replace('?mode=', '');

  const onClickTest = () => {
    navigate({
      pathname: currentPath,
      search: '?mode=test',
    });
  };
  const onClickVideo = () => {
    navigate({
      pathname: currentPath,
      search: '?mode=video',
    });
  };
  const onClickAudio = () => {
    navigate({
      pathname: currentPath,
      search: '?mode=audio',
    });
  };

  return (
    <FlexTransparentDiv
      widthSize={'6vw'}
      heightSize={modeCode === 'test' ? '82vh' : '50vh'}
      paddingSize={'0'}
      flexDirection={'column'}
      justifyContent={'start'}
      alignItems={'start'}
      IsBorder={'none'}
    >
      <RightBtn
        widthSize={'5vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1vw'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '2vh' }}
        onClick={onClickTest}
      >
        발음 연습
      </RightBtn>
      <RightBtn
        widthSize={'5vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1vw'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '0.5vh' }}
        onClick={onClickVideo}
      >
        실전 녹화
      </RightBtn>
      <RightBtn
        widthSize={'5vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1vw'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '0.5vh' }}
        onClick={onClickAudio}
      >
        실전 녹음{' '}
      </RightBtn>
    </FlexTransparentDiv>
  );
};

export default ModeButtons;
