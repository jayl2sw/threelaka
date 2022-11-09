import React from 'react';
import { MainBox } from '../../styles/Common/CommonDivStyle';
import { RightBtn } from "../../styles/Common/CommonBtnStyle";

const GuildMain = () => {
  return (
    <div>
      <h1>마스터님, 길드를 관리하세요 </h1>
    <MainBox         
    widthSize={'28vw'}
    heightSize={'30vh'}
    paddingSize={'2vw 1vw'}
    fontColor={'black'}
    fontSize={'3vmin'}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',       
      }}
      >
      <p> NOTICE</p>
      <p>길드 공지 내용이 들어올 자리입니다.</p>
      {/* <RightBtn
      widthSize={'6vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1rem'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '1rem' }}
        onClick={}> 생성
      </RightBtn>

      <RightBtn
      widthSize={'6vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1rem'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '1rem' }}
        onClick={}> 수정
      </RightBtn>

      <RightBtn
      widthSize={'6vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1rem'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '1rem' }}
        onClick={}> 삭제
      </RightBtn> */}
      
    </MainBox>
    </div>

  );
};

export default GuildMain;