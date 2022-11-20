import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../utils/hooks';
import { writingActions } from '../../../../features/writing/writing-slice';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../../../styles/Common/CommonDivStyle';
import { StudyPageParams } from '../../../../models';
import { useAppSelector } from '../../../../utils/hooks';
import { IEssayButtons } from './EssayButtons';
import { useParams } from 'react-router-dom';

const EssayForSpeaking = ({ essayOn, setEssayOn }: IEssayButtons) => {
  const dispatch = useAppDispatch();
  const pageParams: StudyPageParams = useParams() as any;

  const userEssay = useAppSelector((state) => state.write.essay);

  useEffect(() => {
    //내가 쓴 에세이 불러오는거
    dispatch(writingActions.getEssayStart(pageParams.learningRecordId));
  }, []);

  // 에세이 넣어두기
  const [script, setScript] = useState<string[]>([]);

  return (
    <MainBox
      widthSize={'50vw'}
      heightSize={'30vh'}
      paddingSize={'3vw'}
      fontSize={'1.5vw'}
      color={'white'}
      fontColor={'black'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        wordBreak: 'break-word',
      }}
    >
      {userEssay !== '' && essayOn === 1 ? (
        <div>{userEssay}</div>
      ) : userEssay !== '' && essayOn === 0 ? (
        <div style={{ textAlign: 'center' }}>
          에세이를 보지 않고 발음 연습을 해보세요
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>아직 작성한 에세이가 없어요😂</div>
      )}
    </MainBox>
  );
};

export default EssayForSpeaking;
