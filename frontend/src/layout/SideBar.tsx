import React,{useState} from 'react';

import {SideBarBlock} from "../styles/DashBoard/DashBoardStyle"

interface IOnClickProps {
  handleSwitchPage: (pageNum: number) => void
  handleSwitchGuildPage: (guildPageNum: number) => void
}
const SideBar = ({ handleSwitchPage, handleSwitchGuildPage } : IOnClickProps) => {
 

  return (
    <SideBarBlock>
      <button onClick={() => {handleSwitchPage(1)}}>데일리보드</button>
      <button onClick={() => {handleSwitchPage(2)}}>히스토리보드</button>
      <button onClick={() => {handleSwitchPage(3)}}>프로필</button>
      <button onClick={() => {handleSwitchGuildPage(1)}}>길드 메인</button>
      <button onClick={() => {handleSwitchGuildPage(2)}}>내 길드</button>
      <button onClick={() => {handleSwitchGuildPage(3)}}>길드관리</button>
    </SideBarBlock>
  );
};

export default SideBar;
