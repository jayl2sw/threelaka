import React from 'react';
import { AlertDropDownContainer } from '../../../styles/Main/MainStyle';
import { MainBox } from '../../../styles/Common/CommonDivStyle';
import Card from './Card';
import { useEffect } from 'react';
import { useScrollBlock } from '../../../utils/scrollBlock';

export interface IAlertDropDownProps {
  setToggleDropDown: React.Dispatch<React.SetStateAction<boolean>>;

  setModalToggleVideoId: (nextVideoId: string) => void;
}
const AlertDropDown = ({
  setModalToggleVideoId,
  setToggleDropDown,
}: IAlertDropDownProps) => {
  // const [blockScroll, allowScroll] = useScrollBlock();
  // useEffect(() => {
  //   // modal이 떠 있을 땐 스크롤 막음
  //   blockScroll();
  //   // modal 닫히면 다시 스크롤 가능하도록 함
  //   return () => allowScroll();
  // }, []);
  return (
    <AlertDropDownContainer>
      <div className="dropdown">
        <MainBox
          widthSize={'28vw'}
          heightSize={'37vh'}
          paddingSize={'1vh 0'}
          fontColor={'black'}
          fontSize={'1vmin'}
          className="dropdown-content"
          style={{
            overflowY: 'auto',
            minHeight: '24vh',
            overflowX: 'hidden',
          }}
        >
          <div
            style={{
              padding: '1vh 2.3vw',
              fontSize: '2.5vmin',
              fontWeight: 'bold',
            }}
          >
            알림
          </div>
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
