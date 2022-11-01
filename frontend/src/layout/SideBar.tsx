import React,{useState} from 'react';

import {SideBarBlock} from "../styles/DashBoard/DashBoardStyle"

interface IOnClickProps {
  handleSwitchPage: (pageNum: number) => void
}
const SideBar = ({ handleSwitchPage } : IOnClickProps) => {
 

  return (
    <SideBarBlock>
      <button onClick={() => {handleSwitchPage(1)}}>데일리보드</button>
      <button onClick={() => {handleSwitchPage(2)}}>히스토리보드</button>
      <button onClick={() => {handleSwitchPage(3)}}>프로필</button>
    </SideBarBlock>
  );
};

export default SideBar;
