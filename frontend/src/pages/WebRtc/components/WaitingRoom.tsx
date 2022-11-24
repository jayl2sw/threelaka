import React, { useState } from 'react';
import RoomInfo from './RoomInfo';

// style
import {
  WaitingRoomBlock,
  RoomNumBtnContainer,
  RoomNumBtn,
  RoomInfoBlock,
} from '../../../styles/WebRtc/WebRtcStyle';

import { TopBtn } from '../../../styles/Common/CommonBtnStyle';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';

type WaitingRoomProps = {
  guildInfo: any;
  messages: string;
  localStream: any;
};

const WaitingRoom = ({
  guildInfo,
  messages,
  localStream,
}: WaitingRoomProps) => {
  const [roomNumber, setRoomNumber] = useState<number>(1);
  console.log(roomNumber);

  return (
    <WaitingRoomBlock>
      <FlexTransparentDiv
        widthSize={'60vw'}
        heightSize={'5vh'}
        paddingSize={'0'}
        flexDirection={'row'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'none'}
      >
        <TopBtn
          widthSize={'6vw'}
          heightSize={'4.5vh'}
          paddingSize={'0'}
          fontColor={'white'}
          fontSize={'2vmin'}
          backgroundColor={'blue'}
          onClick={() => setRoomNumber(1)}
          style={{ opacity: roomNumber === 1 ? '' : '0.5' }}
        >
          ZONE 1
        </TopBtn>
        <TopBtn
          widthSize={'6vw'}
          heightSize={'4.5vh'}
          paddingSize={'0'}
          fontColor={'white'}
          fontSize={'2vmin'}
          backgroundColor={'blue'}
          onClick={() => setRoomNumber(2)}
          style={{
            opacity: roomNumber === 2 ? '' : '0.5',
            marginLeft: '0.5vw',
          }}
        >
          ZONE 2
        </TopBtn>
        <TopBtn
          widthSize={'6vw'}
          heightSize={'4.5vh'}
          paddingSize={'0'}
          fontColor={'white'}
          fontSize={'2vmin'}
          backgroundColor={'blue'}
          onClick={() => setRoomNumber(3)}
          style={{
            opacity: roomNumber === 3 ? '' : '0.5',
            marginLeft: '0.5vw',
          }}
        >
          ZONE 3
        </TopBtn>
      </FlexTransparentDiv>

      <RoomInfo
        messages={messages}
        localStream={localStream}
        guildInfo={guildInfo}
        roomNumber={roomNumber}
      />
    </WaitingRoomBlock>
  );
};

export default WaitingRoom;
