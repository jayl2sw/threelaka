import React from 'react';
import DailyStudyGraph from '../DailyBoard/DailyStudyGraph';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { RiBearSmileLine } from 'react-icons/ri';
const GraphContainer = () => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RiBearSmileLine size={26} />
        <h3 style={{ margin: '0' }}>&nbsp;이번 주 나의 공부 시간</h3>
      </div>
      <DailyStudyGraph width={550} height={280} />
    </div>
  );
};

export default GraphContainer;
