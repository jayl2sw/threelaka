import React, { useState, useRef } from 'react';
import { useAppSelector } from '../utils/hooks';
import { FlexTransparentDiv } from '../styles/Common/CommonDivStyle';

import { SideBarBlock } from '../styles/DashBoard/DashBoardStyle';
import { MenuItems } from '../styles/Layout/SideBarStyle';
import { LogoBlock } from '../styles/Main/MainStyle';
import { RiBearSmileLine } from 'react-icons/ri';
import {
  ProfileImgBox,
  ProfileCenter,
} from '../styles/DashBoard/DashBoardStyle';
import { useNavigate, NavLink } from 'react-router-dom';

interface IOnClickProps {
  handleSwitchPage: (pageNum: number) => void;
  handleSwitchGuildPage: (guildPageType: string) => void;
}
const SideBar = ({
  handleSwitchPage,
  handleSwitchGuildPage,
}: IOnClickProps) => {
  const profile = useAppSelector((state) => state.auth.currentUser?.profile);
  const nickname = useAppSelector((state) => state.auth.currentUser?.nickname);

  const [selectedItem, setSelectedItem] = useState<number>(1);
  const onClickMenu = (props: number) => {
    setSelectedItem(props);
  };
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };

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
          style={{ width: '11vw', cursor: 'pointer' }}
          onClick={goToHome}
        />
      </FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'13vw'}
        heightSize={'10vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'none'}
      >
        <ProfileImgBox
          style={{
            width: '10vmin',
            height: '10vmin',
            background: `linear-gradient(
                110.64deg,
                #4a9fff 5.65%,
                rgba(88, 172, 240, 0.861458) 45.15%,
                #b0ff91 84.64%
              )`,
            borderRadius: '50%',
            border: '4px solid #fff',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            // top: '-6vh',
          }}
        >
          <ProfileCenter
            className={profile !== '0' ? 'profileImg' + profile : 'default'}
            style={{ backgroundSize: '7vmin 7vmin' }}
          ></ProfileCenter>
        </ProfileImgBox>
      </FlexTransparentDiv>
      {nickname && (
        <div style={{ color: 'white', textAlign: 'center', marginTop: '1vh' }}>
          {nickname}
        </div>
      )}
      <FlexTransparentDiv
        widthSize={'13vw'}
        heightSize={'40vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'none'}
        style={{ marginTop: '2vh' }}
      >
        <MenuItems>
          <NavLink
            to="/auth/dashboard/1"
            className={({ isActive }) => (isActive ? 'clicked' : 'not')}
          >
            <RiBearSmileLine className="icon" size={20} />
            <span className="title">DailyBoard</span>
          </NavLink>
        </MenuItems>
        <MenuItems>
          <NavLink
            to="/auth/dashboard/3"
            className={({ isActive }) => (isActive ? 'clicked' : 'not')}
          >
            <RiBearSmileLine className="icon" size={20} />
            <span className="title">Profile</span>
          </NavLink>
        </MenuItems>
        {/* <MenuItems>
          <NavLink
            to="/auth/guild/main"
            className={({ isActive }) => (isActive ? 'clicked' : 'not')}
          >
            <RiBearSmileLine className="icon" size={20} />
            <span className="title">Guild</span>
          </NavLink>
        </MenuItems>
        <MenuItems>
          <NavLink
            to="/auth/guild/myGuild"
            className={({ isActive }) => (isActive ? 'clicked' : 'not')}
          >
            <RiBearSmileLine className="icon" size={20} />
            <span className="title">MyGuild</span>
          </NavLink>
        </MenuItems>
        <MenuItems>
          <NavLink
            to="/auth/guild/admin"
            className={({ isActive }) => (isActive ? 'clicked' : 'not')}
          >
            <RiBearSmileLine className="icon" size={20} />
            <span className="title">GuildAdmin</span>
          </NavLink>
        </MenuItems> */}
        <FlexTransparentDiv
          widthSize={'100vw'}
          heightSize={'30vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          Spacer
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </SideBarBlock>
  );
};

export default SideBar;
