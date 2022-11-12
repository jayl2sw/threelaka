import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../utils/hooks';
import { writingActions } from '../../../../features/writing/writing-slice';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../../../styles/Common/CommonDivStyle';

const EssayForSpeaking = () => {
  const dispatch = useAppDispatch();
  const learningRecordId = 240;

  // 에세이 불러오기
  useEffect(() => {
    dispatch(writingActions.getEssayStart(learningRecordId));
  }, []);

  // 에세이 넣어두기
  const [script, setScript] = useState<string[]>([]);

  return (
    <MainBox
      widthSize={'50vw'}
      heightSize={'30vh'}
      paddingSize={'0'}
      fontSize={'1.5vw'}
      color={'white'}
      fontColor={'black'}
      style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll' }}
    >
      에세이 띄워주세요ㅠ
    </MainBox>
  );
};

export default EssayForSpeaking;
