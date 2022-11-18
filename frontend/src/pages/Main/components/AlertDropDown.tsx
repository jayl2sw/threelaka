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
          heightSize={'25vh'}
          paddingSize={'0'}
          fontColor={'black'}
          fontSize={'1vmin'}
          className="dropdown-content"
          style={{ overflowY: 'auto', minHeight: '25vh' }}
        >
          <Card></Card>
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
          {/* <a href="#">Link 3</a>
          <a href="#">Link 3</a>
          <a href="#">Link 3</a>
          <a href="#">Link 3</a> */}
        </MainBox>
      </div>
    </AlertDropDownContainer>
  );
};

export default AlertDropDown;
