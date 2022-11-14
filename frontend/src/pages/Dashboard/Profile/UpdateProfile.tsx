import React from 'react';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../../styles/Common/CommonDivStyle';

const UpdateProfile = () => {
  return (
    <div>
      <FlexTransparentDiv
        widthSize={'30vw'}
        heightSize={'60vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'none'}
        style={{ position: 'relative' }}
      >
        {/* <ProfileImg> */}
        <img
          src="https://threelaka.s3.ap-northeast-2.amazonaws.com/mainlogo.png"
          alt="사용자프로필"
          style={{ width: '13vw' }}
        />
        {/* </ProfileImg> */}
        <MainBox
          widthSize={'30vw'}
          heightSize={'60vh'}
          paddingSize={'0'}
          fontColor={'black'}
          fontSize={'2vmin'}
          style={{ display: 'flex' }}
        ></MainBox>
      </FlexTransparentDiv>
    </div>
  );
};

export default UpdateProfile;
