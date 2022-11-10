import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// style
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
import { RightBtn } from '../../../../styles/Common/CommonBtnStyle';

const EssayButtons = () => {
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

  return (
    <FlexTransparentDiv
      widthSize={'6vw'}
      heightSize={'30vh'}
      paddingSize={'0'}
      flexDirection={'column'}
      justifyContent={'start'}
      alignItems={'start'}
      IsBorder={'none'}
    >
      {modeCode !== 'test' && (
        <div>
          <RightBtn
            widthSize={'5vw'}
            heightSize={'5vh'}
            paddingSize={'2'}
            fontSize={'1vw'}
            fontColor={'white'}
            backgroundColor={'blue'}
            style={{ marginTop: '2vh', fontFamily: 'PretendardRegular' }}
          >
            ON
          </RightBtn>
          <RightBtn
            widthSize={'5vw'}
            heightSize={'5vh'}
            paddingSize={'2'}
            fontSize={'1vw'}
            fontColor={'white'}
            backgroundColor={'blue'}
            style={{ marginTop: '0.5vh', fontFamily: 'PretendardRegular' }}
          >
            OFF
          </RightBtn>
        </div>
      )}
    </FlexTransparentDiv>
  );
};

export default EssayButtons;
