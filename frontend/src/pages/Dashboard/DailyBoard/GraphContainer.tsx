import React from 'react';
import DailyStudyGraph from '../DailyBoard/DailyStudyGraph';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { RiBearSmileLine } from 'react-icons/ri';
const GraphContainer = () => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RiBearSmileLine size={26} />
        <h3 style={{ margin: '0' }}>주간 공부 시간</h3>
      </div>
      <DailyStudyGraph width={600} height={300} />
    </div>
  );
};

export default GraphContainer;
