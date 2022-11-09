import React from 'react';
import SideBar from '../../layout/SideBar';
import { useParams, useNavigate } from 'react-router-dom';
import DailyBoard from './DailyBoard/DailyBoard';
import HistoryBoard from './HistoryBoard/HistoryBoard';
import Profile from './Profile/Profile';
import GuildMain from '../Guild/GuildMainPage';
import MyGuild from '../Guild/MyGuildPage';
import MasterSetting from '../Guild/MasterSettingPage';
import {
  DashBoardBlock,
  DashBoardBox,
} from '../../styles/DashBoard/DashBoardStyle';
const DashBoardPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const pageNum = params.pageNum ? params.pageNum : '1';
  const handleSwitchPage = (pageNum: number) => {
    navigate(`/auth/dashboard/${pageNum}`, { replace: true });
  };

  const guildpageNum = params.guildpageNum ? params.guildpageNum : '0';
  const handleSwitchGuildPage = (guildPageNum: number) => {
    navigate(`/auth/guild/${guildPageNum}`, { replace: true });
  };

  return (
    <DashBoardBlock>
      <SideBar handleSwitchPage={handleSwitchPage} handleSwitchGuildPage={handleSwitchGuildPage}></SideBar>

      <DashBoardBox>
        {pageNum === '1' && <DailyBoard />}
        {pageNum === '2' && <HistoryBoard />}
        {pageNum === '3' && <Profile />}
        {guildpageNum === '1' && <GuildMain />}
        {guildpageNum === '2' && <MyGuild />}
        {guildpageNum === '3' && <MasterSetting />}

      </DashBoardBox>
    </DashBoardBlock>
  );
};

export default DashBoardPage;
