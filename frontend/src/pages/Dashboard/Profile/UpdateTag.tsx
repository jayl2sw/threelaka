import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../../styles/Common/CommonDivStyle';
import {
  ProfileImgBox,
  ProfileCenter,
  EditBtn,
} from '../../../styles/DashBoard/DashBoardStyle';
import { useAppSelector, useAppDispatch } from '../../../utils/hooks';
import ModifyUserInfo from './ModifyUserInfo';
import SelectProfile from './SelectProfile';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import UpdateTagModal from './UpdateTagModal';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
const UpdateTag = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [profileNum, setProfileNum] = useState('');

  const openModalProfle = () => {
    setIsOpen(!isOpen);
  };
  const openModalTag = () => {
    setIsTagOpen(!isTagOpen);
  };
  const profile = useAppSelector((state) => state.auth.currentUser?.profile);
  const myGuildInfo = useAppSelector((state) => state.guild.myGuildInfo);
  const tagList = useAppSelector((state) => state.dashboard.tagList);
  const dispatch = useAppDispatch();
  const totalStudyTime = useAppSelector(
    (state) => state.dashboard.totalStudyTime
  );
  const username = useAppSelector((state) => state.auth.currentUser?.username);
  const nickname = useAppSelector((state) => state.auth.currentUser?.nickname);
  useEffect(() => {
    dispatch(dashboardActions.getTotalStudyTime());
  }, []);

  return (
    <>
      {isTagOpen ? (
        <UpdateTagModal isTagOpen={isTagOpen} setIsTagOpen={setIsTagOpen} />
      ) : null}

      {/* <UpdateTagModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}

      <MainBox
        widthSize={'28vw'}
        heightSize={'28vh'}
        paddingSize={'2vh 2vw'}
        fontColor={'black'}
        fontSize={'2vmin'}
        style={{ marginTop: '9vh', boxShadow: 'none' }}
      >
        <h3>나의 관심 태그</h3>
        <FlexTransparentDiv
          widthSize={'24vw'}
          heightSize={'17vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          {tagList.length !== 0
            ? tagList.map((item, idx) => {
                return (
                  <span
                    style={{
                      marginRight: '1vw',
                      lineHeight: '28px',
                      fontSize: '3vmin',
                      fontWeight: 'bold',
                    }}
                  >
                    #{item}
                  </span>
                );
              })
            : null}
        </FlexTransparentDiv>
        <MainBtn
          widthSize={'5vw'}
          heightSize={'4vh'}
          paddingSize={'0'}
          fontSize={'2.5vmin'}
          fontColor={'white'}
          backgroundColor={'black'}
          style={{ marginLeft: '9vw', borderRadius: '5vmin' }}
          onClick={openModalTag}
        >
          수정
        </MainBtn>
      </MainBox>
    </>
  );
};

export default UpdateTag;
