import React from 'react';
import { useAppSelector } from '../../../utils/hooks';
import { ModalBackdrop } from '../../../styles/DashBoard/DashBoardStyle';
import {
  FlexTransparentDiv,
  MainBox,
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
          overflow: 'auto',
          overflowX: 'hidden',
        }}
      >
        <MainBtn
          widthSize={'12vw'}
          heightSize={'4vh'}
          paddingSize={'0'}
          fontSize={'2.2vmin'}
          fontColor={'white'}
          backgroundColor={'black'}
          style={{ borderRadius: '1.5vmin', marginBottom: '1.5vh' }}
          onClick={openWordTestModal}
        >
          Word Test !
        </MainBtn>
        <AiFillCloseCircle
          size={25}
          color={'black'}
          style={{
            position: 'absolute',
            top: '2.2vh',
            right: '1.5vw',
            cursor: 'pointer',
          }}
          onClick={() => {
            closeModalWordList();
          }}
        ></AiFillCloseCircle>
        {userWordInfo.map((item, idx) => {
          return (
            <MainBox
              widthSize={'25vw'}
              heightSize={'16vh'}
              paddingSize={'0 1vw'}
              fontColor={'black'}
              fontSize={'2vmin'}
              style={{
                display: 'flex',
                flexDirection: 'column',

                transition: 'all 0.8s ease-in-out',
                background: '#f1f1f1',
                marginBottom: '2vh',
              }}
            >
              <h3>{item.word}</h3>

              <span style={{ fontSize: '2vmin', color: '#4a9fff' }}>
                {'example'}{' '}
              </span>
              <span
                style={{
                  fontSize: item.example.length > 100 ? '1.5vmin' : '2vmin',
                }}
              >
                &nbsp;&nbsp;{item.example}
              </span>
            </MainBox>
            // <ArcodianBox
            //   key={`word-${idx}`}
            //   // style={{ transition: 'all 0.8s ease-in-out' }}
            // >
            //   {/* <WordCheckBox
            //     className={filterTarget.includes(aWord.word) ? 'checked' : ''}
            //   /> */}
            //   <WordText>
            //     <p>{item.word}</p>
            //     <p className="back">
            //       <span
            //         style={{
            //           fontSize: '2.5vmin',
            //         }}
            //       >
            //         {item.word}
            //       </span>
            //       <br />
            //       <br />
            //       <span style={{ fontSize: '2vmin', color: '#4a9fff' }}>
            //         {'example'}
            //       </span>
            //       <br style={{ marginBottom: '5vmin' }} />
            //       <span
            //         style={{
            //           fontSize: item.example.length > 100 ? '1.5vmin' : '2vmin',
            //         }}
            //       >
            //         &nbsp;&nbsp;{item.example}
            //       </span>
            //     </p>
            //   </WordText>
            //   {item.example}
            // </ArcodianBox>
          );
        })}
      </MainBox>
    </ModalBackdrop>
  );
};

export default WordList;
