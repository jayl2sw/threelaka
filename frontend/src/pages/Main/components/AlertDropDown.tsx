import React from 'react';
import { AlertDropDownContainer } from '../../../styles/Main/MainStyle';
import { MainBox } from '../../../styles/Common/CommonDivStyle';
import Card from './Card';

export interface IAlertDropDownProps {
  setToggleDropDown: React.Dispatch<React.SetStateAction<boolean>>;

  setModalToggleVideoId: (nextVideoId: string) => void;
}
const AlertDropDown = ({
  setModalToggleVideoId,
  setToggleDropDown,
}: IAlertDropDownProps) => {
  return (
    <AlertDropDownContainer>
      <div className="dropdown">
        <MainBox
          widthSize={'22vw'}
          heightSize={'22vh'}
          paddingSize={'1.5vh 0.5vw 0 0.5vw'}
          fontColor={'black'}
          fontSize={'1vmin'}
          className="dropdown-content"
          style={{ overflowY: 'auto', minHeight: '24vh' }}
        >
          <Card
            setModalToggleVideoId={setModalToggleVideoId}
            setToggleDropDown={setToggleDropDown}
          ></Card>
        </MainBox>
      </div>
    </AlertDropDownContainer>
  );
};

export default AlertDropDown;
