import React, { useState } from 'react';
import { FlexTransparentDiv } from '../styles/Common/CommonDivStyle';

import { SideBarBlock } from '../styles/DashBoard/DashBoardStyle';
import { MenuItems } from '../styles/Layout/SideBarStyle';
import { LogoBlock } from '../styles/Main/MainStyle';

interface IOnClickProps {
  handleSwitchPage: (pageNum: number) => void;
  handleSwitchGuildPage: (guildPageType: string) => void;
}
const SideBar = ({
  handleSwitchPage,
  handleSwitchGuildPage,
}: IOnClickProps) => {
  return (
    <SideBarBlock>
      <FlexTransparentDiv
        widthSize={'13vw'}
        heightSize={'10vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'none'}
      >
        <img
          src="https://threelaka.s3.ap-northeast-2.amazonaws.com/mainlogo.png"
          alt="스리라까 로고"
          style={{ width: '13vw' }}
        />
      </FlexTransparentDiv>

      <MenuItems
        onClick={() => {
          handleSwitchPage(1);
        }}
      >
        <span className="icon"></span>
        <span className="title">DailyBoard</span>
      </MenuItems>

      <MenuItems
        onClick={() => {
          handleSwitchPage(3);
        }}
      >
        <span className="icon"></span>
        <span className="title">Profile</span>
      </MenuItems>

      <MenuItems
        onClick={() => {
          handleSwitchGuildPage('main');
        }}
      >
        <span className="icon"></span>
        <span className="title">Guild</span>
      </MenuItems>

      <MenuItems
        onClick={() => {
          handleSwitchGuildPage('myGuild');
        }}
      >
        <span className="icon"></span>
        <span className="title">MyGuild</span>
      </MenuItems>

      <MenuItems
        onClick={() => {
          handleSwitchGuildPage('admin');
        }}
      >
        <span className="icon"></span>
        <span className="title">GuildAdmin</span>
      </MenuItems>

      {/* <button
        onClick={() => {
          handleSwitchPage(1);
        }}
      >
        데일리보드
      </button>
      <button
        onClick={() => {
          handleSwitchPage(2);
        }}
      >
        히스토리보드
      </button>
      <button
        onClick={() => {
          handleSwitchPage(3);
        }}
      >
        프로필
      </button>
      <button
        onClick={() => {
          handleSwitchGuildPage('main');
        }}
      >
        길드 메인
      </button>
      <button
        onClick={() => {
          handleSwitchGuildPage('myGuild');
        }}
      >
        내 길드
      </button>
      <button
        onClick={() => {
          handleSwitchGuildPage('admin');
        }}
      >
        길드관리
      </button> */}
    </SideBarBlock>
  );
};

export default SideBar;
