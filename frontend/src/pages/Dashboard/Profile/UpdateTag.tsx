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
import SelectTag from './SelectTag';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import { borderRadius } from '@material-ui/system';
import { url } from 'inspector';
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

  const changeTagName = (name: string) => {
    if (name === '생물') return 'animals.jpg';
    else if (name === '문화예술') return 'culture.jpg';
    else if (name === '산업') return 'industry.jpg';
    else if (name === '지식') return 'knowledge.jpg';
    else if (name === '인간') return 'human.jpg';
    else if (name === '자연') return 'nature.jpg';
    else if (name === '문명') return 'civilization.jpg';
  };

  return (
    <>
      {/* {isTagOpen ? (
        <UpdateTagModal isTagOpen={isTagOpen} setIsTagOpen={setIsTagOpen} />
      ) : null} */}

      {/* <UpdateTagModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}

      <MainBox
        widthSize={'33vw'}
        heightSize={'71vh'}
        paddingSize={'1vh 0.5vw'}
        fontColor={'black'}
        fontSize={'2vmin'}
        style={{
          marginTop: '11vh',
          boxShadow: 'none',
          background: `linear-gradient(
          106.62deg,
          #83bdff 8.18%,
          rgba(88, 172, 240, 0.861458) 45.03%,
          #c1ffa9 92.42%
        )`,
        }}
      >
        <MainBox
          widthSize={'32vw'}
          heightSize={'69vh'}
          paddingSize={'2vh 2vw'}
          fontColor={'black'}
          fontSize={'2vmin'}
          style={{ boxShadow: 'none' }}
        >
          <h2># 나의 관심 태그</h2>
          <FlexTransparentDiv
            widthSize={'29vw'}
            heightSize={'15vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
          >
            {tagList.length !== 0
              ? tagList.map((item, idx) => {
                  let tagName = changeTagName(item);
                  return (
                    <FlexTransparentDiv
                      widthSize={'8vw'}
                      heightSize={'6vw'}
                      paddingSize={'0'}
                      flexDirection={'row'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      IsBorder={'none'}
                      style={{
                        backgroundColor: 'black',
                        margin: '0 0.5vw',
                        borderRadius: '20px',
                      }}
                    >
                      <FlexTransparentDiv
                        widthSize={'8vw'}
                        heightSize={'6vw'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        IsBorder={'none'}
                        style={{
                          background: `url(https://threelaka.s3.ap-northeast-2.amazonaws.com/${tagName}) 0% 0% / cover`,
                          opacity: '0.5',
                          borderRadius: '20px',
                        }}
                      ></FlexTransparentDiv>
                      <span
                        style={{
                          position: 'fixed',
                          lineHeight: '28px',
                          fontSize: '2.5vmin',
                          fontWeight: 'bold',
                          color: 'white',
                        }}
                      >
                        #{item}
                      </span>
                    </FlexTransparentDiv>
                  );
                })
              : null}
          </FlexTransparentDiv>
          <div
            style={{
              border: '1.2px solid #eee',
              width: '28vw',
              height: '0.3px',
              background: '#eee',
            }}
          ></div>
          <SelectTag></SelectTag>
        </MainBox>
      </MainBox>
    </>
  );
};

export default UpdateTag;
