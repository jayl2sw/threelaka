import React, { PropsWithChildren } from 'react';
import { MainPaleBox } from '../../../styles/Common/CommonDivStyle';

type RoomInfoProps = {
  roomnumber: number;
};

const RoomInfo = (roomnumber: RoomInfoProps) => {
  return (
    <MainPaleBox
      widthSize={'26vw'}
      heightSize={'31vh'}
      paddingSize={'0'}
      fontSize={'1vw'}
      fontColor={'black'}
    >
      {roomnumber}
      <div>현재 접속한 사람들 목록</div>

      <div>
        {/* 사람 수에 따라서 분기처리 하기 */}
        <button>EOZ 입장하기</button>
      </div>
    </MainPaleBox>
  );
};

export default RoomInfo;
