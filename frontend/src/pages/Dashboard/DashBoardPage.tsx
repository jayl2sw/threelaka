import React from 'react';
import SideBar from '../../layout/SideBar';
import { useParams, useNavigate } from 'react-router-dom';
import DailyBoard from './DailyBoard/DailyBoard';
import HistoryBoard from './HistoryBoard/HistoryBoard';
import Profile from './Profile/Profile';
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

  return (
    <DashBoardBlock>
      <SideBar handleSwitchPage={handleSwitchPage}></SideBar>

      <DashBoardBox>
        {pageNum === '1' && <DailyBoard />}
        {pageNum === '2' && <HistoryBoard />}
        {pageNum === '3' && <Profile />}
      </DashBoardBox>
    </DashBoardBlock>
  );
};

export default DashBoardPage;
