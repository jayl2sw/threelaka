import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// style
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
import { RightBtn } from '../../../../styles/Common/CommonBtnStyle';
import { EssayOnOffContainer } from '../../../../styles/Speaking/SpeakingStyle';

const EssayButtons = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const modeCode = useLocation().search.replace('?mode=', '');

  const [isOn, setIsOn] = useState<boolean>(true);

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
    <EssayOnOffContainer>
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
            className={isOn ? '' : 'not-active'}
            onClick={() => {
              setIsOn(true);
            }}
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
            className={isOn ? 'not-active' : ''}
            onClick={() => {
              setIsOn(false);
            }}
          >
            OFF
          </RightBtn>
        </div>
      )}
    </EssayOnOffContainer>
  );
};

export default EssayButtons;
