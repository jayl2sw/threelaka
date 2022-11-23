import React, { useEffect, useState } from 'react';
import SideBar from '../../layout/SideBar';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import GuildMain from './GuildMainPage';
import MyGuild from '../Guild/MyGuildPage';
import MasterSetting from '../Guild/MasterSettingPage';
import { DashBoardBlock } from '../../styles/DashBoard/DashBoardStyle';
import {
  FlexTransparentDiv,
  MainPaleBox,
} from '../../styles/Common/CommonDivStyle';
import { guildActions } from '../../features/guild/guild-slice';
import VideoModal from '../../utils/VideoModal';
import DailyBoard from '../Dashboard/DailyBoard/DailyBoard';
import HistoryBoard from '../Dashboard/HistoryBoard/HistoryBoard';
import Profile from '../Dashboard/Profile/Profile';
import WebRtcPage from '../WebRtc/WebRtcpage';

const GuildPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // const pageNum = params.pageNum ? params.pageNum : '1';
  const pageNum = params.pageNum;
  const guildPageType = params.guildPageType;
  // const guildPageType = params.guildPageType ? params.guildPageType : 'main';

  // useState
  const [isMaster, setIsMaster] = useState<boolean>(false);
  const [modalToggleVideoId, setModalToggleVideoId] = useState<string>('none');
  // selector
  const guildMasterId: number = useAppSelector(
    (state) => state.guild.myGuildInfo.masterId
  );
  const userId = useAppSelector((state) => state.auth.currentUser?.userId);

  // useEffect
  useEffect(() => {
    dispatch(guildActions.getSearchGuildStart());
  }, []);

  useEffect(() => {
    if (guildMasterId === userId) {
      setIsMaster(true);
    } else {
      setIsMaster(false);
    }
  }, [guildMasterId]);

  return (
    <>
      <VideoModal
        modalStyleNum={1}
        modalToggleVideoId={modalToggleVideoId}
        setModalToggleVideoId={setModalToggleVideoId}
      ></VideoModal>
      <DashBoardBlock>
        <MainPaleBox
          widthSize={'85vw'}
          heightSize={'90vh'}
          paddingSize={'0'}
          fontColor={'black'}
          fontSize={'2vmin'}
          style={{ display: 'flex' }}
        >
          <SideBar isMaster={isMaster}></SideBar>
          <FlexTransparentDiv
            widthSize={'68vw'}
            heightSize={'82vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'none'}
            style={{
              marginTop: '4vh',
              marginLeft: '2vw',
              fontFamily: 'pretendardRegular',
              // border: '2px solid green',
            }}
          >
            {pageNum === '1' && (
              <DailyBoard setModalToggleVideoId={setModalToggleVideoId} />
            )}
            {pageNum === '2' && <HistoryBoard />}
            {pageNum === '3' && <Profile />}
            {pageNum === '4' && <WebRtcPage />}
            {guildPageType === 'main' && <GuildMain />}
            {guildPageType === 'myGuild' && <MyGuild />}
            {guildPageType === 'admin' && <MasterSetting />}
          </FlexTransparentDiv>
        </MainPaleBox>
      </DashBoardBlock>
    </>
  );
};

export default GuildPage;
