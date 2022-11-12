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
  DashBoardContainer,
} from '../../styles/DashBoard/DashBoardStyle';

import { MainPaleBox } from '../../styles/Common/CommonDivStyle';
import { display } from '@material-ui/system';

const DashBoardPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const pageNum = params.pageNum ? params.pageNum : '1';
  const handleSwitchPage = (pageNum: number) => {
    navigate(`/auth/dashboard/${pageNum}`, { replace: true });
  };

  const guildPageType = params.guildPageType ? params.guildPageType : '0';
  const handleSwitchGuildPage = (guildPageType: string) => {
    navigate(`/auth/guild/${guildPageType}`, { replace: true });
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
          {guildPageType === 'main' && <GuildMain />}
          {guildPageType === 'myGuild' && <MyGuild />}
          {guildPageType === 'admin' && <MasterSetting />}
        </DashBoardBox>
      </MainPaleBox>
    </DashBoardBlock>
  );
};

export default DashBoardPage;
