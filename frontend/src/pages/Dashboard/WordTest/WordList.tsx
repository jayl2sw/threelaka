import React from 'react';
import { useAppSelector } from '../../../utils/hooks';
import { ModalBackdrop } from '../../../styles/DashBoard/DashBoardStyle';
import {
  FlexTransparentDiv,
  MainBox,
  BackBlurBox,
} from '../../../styles/Common/CommonDivStyle';

import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import { AiFillCloseCircle } from 'react-icons/ai';

interface IWordListProps {
  setIsOpenWordList: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenWordList: boolean;
  setIsOpenTest: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenTest: boolean;
}
const WordList = ({
  setIsOpenWordList,
  isOpenWordList,
  setIsOpenTest,
  isOpenTest,
}: IWordListProps) => {
  const userWordInfo = useAppSelector((state) => state.dashboard.userWordInfo);
  const closeModalWordList = () => {
    setIsOpenWordList(!isOpenWordList);
  };
  const openWordTestModal = () => {
    setIsOpenWordList(false);
    setIsOpenTest(!isOpenTest);
  };
  return (
    <ModalBackdrop>
      <MainBox
        widthSize={'28vw'}
        heightSize={'70vh'}
        paddingSize={'1vw'}
        fontColor={'black'}
        fontSize={'2vmin'}
        style={{
          // display: 'flex',
          position: 'relative',
          transition: 'all 0.8s ease-in-out',
          // overflow: 'auto',
          // overflowX: 'hidden',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '18vw',
              fontSize: '3vmin',
              margin: '3vh',
              fontWeight: 'bold',
            }}
          >
            단어테스트 시작해 VOCA?
          </div>
          <img
            style={{
              width: '7vmin',
              height: '7vmin',
              objectFit: 'cover',
              marginBottom: '1.5vh',
            }}
            src={`https://threelaka.s3.ap-northeast-2.amazonaws.com/white.png`}
          ></img>

          <MainBtn
            widthSize={'5vw'}
            heightSize={'4vh'}
            paddingSize={'0'}
            fontSize={'2.2vmin'}
            fontColor={'white'}
            backgroundColor={'gradient'}
            style={{ borderRadius: '1.5vmin', marginBottom: '2vh' }}
            onClick={openWordTestModal}
          >
            시작하기
          </MainBtn>
        </div>

        <AiFillCloseCircle
          size={25}
          color={'black'}
          style={{
            position: 'absolute',
            top: '2.2vh',
            right: '1vw',
            cursor: 'pointer',
          }}
          onClick={() => {
            closeModalWordList();
          }}
        ></AiFillCloseCircle>
        <BackBlurBox
          widthSize={'26vw'}
          heightSize={'40vh'}
          paddingSize={'1vh 1vw'}
          fontColor={'black'}
          fontSize={'2vmin'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            flexDirection: 'column',
            transition: 'all 0.8s ease-in-out',
            marginBottom: '2vh',
            overflow: 'auto',
            overflowX: 'hidden',
          }}
        >
          {userWordInfo.map((item, idx) => {
            return (
              <MainBox
                widthSize={'24vw'}
                heightSize={'auto'}
                paddingSize={'0 1vw'}
                fontColor={'black'}
                fontSize={'2vmin'}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '2vh',
                  transition: 'all 0.8s ease-in-out',
                  background: '#f1f1f1',
                  // marginBottom: '2vh',
                }}
              >
                <div
                  style={{
                    fontSize: '3vmin',
                    height: '4vh',
                    fontWeight: 'bold',
                    margin: '1vh 0 1vh 0',
                  }}
                >
                  {item.word}
                </div>

                <div
                  style={{ height: '3vh', fontSize: '2vmin', color: '#4a9fff' }}
                >
                  {'example'}{' '}
                </div>
                <div
                  style={{
                    height: 'auto',
                    fontSize: '2vmin',
                    paddingBottom: '2vh',
                  }}
                >
                  &nbsp;&nbsp;{item.example}
                </div>
              </MainBox>
            );
          })}
        </BackBlurBox>
      </MainBox>
    </ModalBackdrop>
  );
};

export default WordList;
