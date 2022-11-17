import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../utils/hooks';
import * as wss from '../../../utils/wss';
import EnglishOnlyZone from './components/EnglishOnlyZone';

// 길드 아이디 type 확정짓기 User에는 string으로 들어오긴함
type EozPageProps = {
  guildId: number;
  nickname: string;
};

const EozPage = (props: EozPageProps) => {
  const { guildId, nickname } = props;
  console.log('MyGuildPage에서 prop받은 guildId: ', guildId);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    wss.connectWithSocketIOServer();
    setBool(wss.joinGuildChannel(nickname, guildId));
    return () => {};
  }, []);

  // redux
  const [guildInfo, setGuildInfo] = useState({
    guildId: guildId,
    rooms: [
      {
        roomNumber: 1,
        videoId: null,
        connectedUsers: [],
      },
      {
        roomNumber: 2,
        videoId: null,
        connectedUsers: [],
      },
      {
        roomNumber: 3,
        videoId: null,
        connectedUsers: [],
      },
    ],
    connectedUsers: [],
  });

  useEffect(() => {
    console.log('guildInfo changed:', guildInfo);
  }, [guildInfo]);

  return (
    <div>
      <EnglishOnlyZone guildInfo={guildInfo} />
    </div>
  );
};

export default EozPage;
