import React from 'react';
import { MainBox } from '../../styles/Common/CommonDivStyle';
import { GreetingText } from '../../styles/Guild/GuildStyle';
import {
  GuildSettingLeftBox,
  GuildSettingRightBox,
} from '../../styles/Guild/MasterSetting';
const MasterSetting = () => {
  return (
    <div>
      <GreetingText>마스터님, 길드를 관리하세요 </GreetingText>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <GuildSettingLeftBox>
          <MainBox
            widthSize={'32vw'}
            heightSize={'30vh'}
            paddingSize={'2vw 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '2vh',
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

          <MainBox
            widthSize={'32vw'}
            heightSize={'40vh'}
            paddingSize={'2vw 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p> VIDEOS</p>
            <p>진행중인, 예정된 영상 정보들이 옵니다</p>
          </MainBox>
        </GuildSettingLeftBox>
        <GuildSettingRightBox>
          <MainBox
            widthSize={'2vw'}
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
            <p> MEMBERS</p>
            <p>멤버들 정보가 옵니다</p>
          </MainBox>
        </GuildSettingRightBox>
      </div>
    </div>
  );
};

export default MasterSetting;
