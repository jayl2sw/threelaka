import React from 'react';
import { MainBox } from '../../styles/Common/CommonDivStyle';
import { RightBtn } from '../../styles/Common/CommonBtnStyle';
import { GreetingText } from '../../styles/Guild/GuildStyle';
import {
  GuildSettingLeftBox,
  GuildSettingRightBox,
} from '../../styles/Guild/MasterSetting';

const GuildMain = () => {
  return (
    <div>
      <GreetingText>이번주 우수 길드</GreetingText>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <GuildSettingLeftBox>
          <MainBox
            widthSize={'32vw'}
            heightSize={'20vh'}
            paddingSize={'2vw 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '2vh',
              // border: 'solid black 1px',
            }}
          >
            우수길드 3개 프로필 이미지
          </MainBox>
          <MainBox
            widthSize={'32vw'}
            heightSize={'50vh'}
            paddingSize={'2vw 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div>
              {' '}
              길드 없으면 : 길드가 없으니 만들거나 가입하라는 문구 (만들기
              누르면 만드는 모달 떠야함)
              <hr></hr>길드 있으면 : 내 길드 정보 + 바로가기 버튼 (피그마 참고)
            </div>
          </MainBox>
        </GuildSettingLeftBox>
        <GuildSettingRightBox>
          <MainBox
            widthSize={'22vw'}
            heightSize={'72vh'}
            paddingSize={'2vw 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button>활동순</button>
            <button>인원순</button>
            <button>가나다순</button>
            <button>길드 검색 (누르면 모달 뜨기)</button>

            <p> 활동순, 인원순, 가나다순으로 정렬된 길드 정보들</p>
          </MainBox>
        </GuildSettingRightBox>
      </div>
    </div>
  );
};

export default GuildMain;
