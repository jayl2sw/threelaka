import React from 'react';
import { MainBox } from '../../../styles/Common/CommonDivStyle';
import ModifyUserInfo from './ModifyUserInfo';
const UpdateUserInfo = () => {
  return (
    <div>
      {/* update user Info */}
      <MainBox
        widthSize={'30vw'}
        heightSize={'40vh'}
        paddingSize={'2vh 2vw'}
        fontColor={'black'}
        fontSize={'2vmin'}
        style={{
          display: 'flex',
          justifyContent: 'center',
          boxShadow: 'none',
          margin: '1vh 1vw',
        }}
      >
        <ModifyUserInfo></ModifyUserInfo>
      </MainBox>
    </div>
  );
};

export default UpdateUserInfo;
