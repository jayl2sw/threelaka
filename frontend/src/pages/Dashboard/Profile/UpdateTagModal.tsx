import React, { SetStateAction } from 'react';
import {
  ModalBackdrop,
  ModalView,
  RadioBtn,
  BtnDiv,
  CancelBtn,
  CheckBtn,
} from '../../../styles/DashBoard/DashBoardStyle';
import { useState, useEffect } from 'react';
import {
  ProfileImgBox,
  ProfileCenter,
} from '../../../styles/DashBoard/DashBoardStyle';
import customAxios from '../../../services/customAxios';
import { useAppDispatch } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';

interface IUpdateTagModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateTagModal = ({ isOpen, setIsOpen }: IUpdateTagModalProps) => {
  const dispatch = useAppDispatch();
  const profileNum = ['1', '2', '3', '4'];
  // const handleClickRadioButton = (e: React.ChangeEvent<unknown>, checked: boolean) => {
  //   setNum(e.target.value);
  // };
  const handleClickRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNum(e.currentTarget.value);
  };
  const [num, setNum] = useState('1');

  const closeModalProfile = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileChange = (profileNo: string) => {
    dispatch(dashboardActions.updateProfile(profileNo));
  };

  return (
    <ModalBackdrop>
      <ModalView>
        <FlexTransparentDiv
          widthSize={'24vw'}
          heightSize={'10vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          {profileNum.map((item, idx) => {
            return (
              <label>
                <RadioBtn
                  className="1"
                  type="radio"
                  value={item}
                  checked={num === `${item}`}
                  onChange={(e) => handleClickRadioButton(e)}
                ></RadioBtn>
                <ProfileImgBox style={{ width: '11vmin', height: '11vmin' }}>
                  <ProfileCenter
                    className={'profileImg' + `${item}`}
                  ></ProfileCenter>
                </ProfileImgBox>
              </label>
            );
          })}
        </FlexTransparentDiv>
        <BtnDiv>
          <CheckBtn onClick={() => handleProfileChange(num)}>저장</CheckBtn>
          <CancelBtn onClick={closeModalProfile}>취소</CancelBtn>
        </BtnDiv>
      </ModalView>
    </ModalBackdrop>
  );
};

export default UpdateTagModal;
