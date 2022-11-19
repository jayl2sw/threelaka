import React from 'react';
import { AlertDropDownContainer } from '../../../styles/Main/MainStyle';
import { MainBox } from '../../../styles/Common/CommonDivStyle';
import Card from './Card';
const AlertDropDown = () => {
  return (
    <AlertDropDownContainer>
      <div className="dropdown">
        <MainBox
          widthSize={'20vw'}
          heightSize={'22vh'}
          paddingSize={'1.5vh 0.5vw 0 0.5vw'}
          fontColor={'black'}
          fontSize={'1vmin'}
          className="dropdown-content"
          style={{ overflowY: 'auto', minHeight: '24vh' }}
        >
          <Card></Card>
        </MainBox>
      </div>
    </AlertDropDownContainer>
  );
};

export default AlertDropDown;
