import React from 'react';
import SideBar from '../../layout/SideBar';
import { useParams, useNavigate } from 'react-router-dom';
import DailyBoard from '../Dashboard/DailyBoard/DailyBoard';
import HistoryBoard from '../Dashboard/HistoryBoard/HistoryBoard';
import Profile from '../Dashboard/Profile/Profile';
import GuildMain from '../Guild/GuildMainPage';
import MyGuild from '../Guild/MyGuildPage';
import MasterSetting from '../Guild/MasterSettingPage';
import {
  DashBoardBlock,
  DashBoardBox,
} from '../../styles/DashBoard/DashBoardStyle';
import { GuildBoardBox } from '../../styles/Guild/GuildStyle';
import { MainPaleBox } from '../../styles/Common/CommonDivStyle';
const GuildPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const pageNum = params.pageNum ? params.pageNum : '0';
  const handleSwitchPage = (pageNum: number) => {
    navigate(`/auth/dashboard/${pageNum}`, { replace: true });
  };

  const guildPageNum = params.guildPageNum ? params.guildPageNum : '0';
  const handleSwitchGuildPage = (guildPageNum: number) => {
    navigate(`/auth/guild/${guildPageNum}`, { replace: true });
  };

  return (
    <DashBoardBlock>
      <MainPaleBox
        widthSize={'80vw'}
        heightSize={'90vh'}
        paddingSize={'0'}
        fontColor={'black'}
        fontSize={'2vmin'}
        style={{ display: 'flex' }}
      >
        <SideBar
          handleSwitchPage={handleSwitchPage}
          handleSwitchGuildPage={handleSwitchGuildPage}
        ></SideBar>
        <DashBoardBox>
          {pageNum === '1' && <DailyBoard />}
          {pageNum === '2' && <HistoryBoard />}
          {pageNum === '3' && <Profile />}
          {guildPageNum === '1' && <GuildMain />}
          {guildPageNum === '2' && <MyGuild />}
          {guildPageNum === '3' && <MasterSetting />}
        </DashBoardBox>
      </MainPaleBox>
    </DashBoardBlock>
  );
};

export default GuildPage;
