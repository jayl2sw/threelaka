import React from 'react';
import { MainBox } from '../../../styles/Common/CommonDivStyle';
import ModifyUserInfo from './ModifyUserInfo';
const UpdateUserInfo = () => {
  return (
    <div>
      <MainBox
        widthSize={'34vw'}
        heightSize={'81.5vh'}
        paddingSize={'2vh 2vw'}
        fontColor={'black'}
        fontSize={'2vmin'}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <ModifyUserInfo></ModifyUserInfo>
      </MainBox>
    </div>
  );
};

export default UpdateUserInfo;
