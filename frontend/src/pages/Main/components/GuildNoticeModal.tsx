import React, { useEffect } from 'react';
import { NoticeModalType } from '../../../models/guild';
import { useAppDispatch } from '../../../utils/hooks';
import { MainBox } from '../../../styles/Common/CommonDivStyle';
import zIndex from '@material-ui/core/styles/zIndex';
const GuildNoticeModal = (props: NoticeModalType) => {
  const dispatch = useAppDispatch();

  // const guildId = props.guildId;
  // const guildName = props.guildName;
  const notice = props.notice;
  const onClickModal = props.toggle;

  return (
    <MainBox
      widthSize={'40vw'}
      heightSize={'40vh'}
      paddingSize={'4vh 0 2vh 2vw'}
      fontColor={'black'}
      fontSize={'1.5vmin'}
      style={{ marginTop: '2vh', zIndex: '10', border: '1px red solid' }}
      onClick={onClickModal}
    >
      {notice}
    </MainBox>
  );
};

export default GuildNoticeModal;
