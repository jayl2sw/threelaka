import React, { useState } from 'react';
import LastWeekStudyGraph from './LastWeekStudyGraph';
import ThisWeekStudyGraph from './ThisWeekStudyGraph';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { RiBearSmileLine } from 'react-icons/ri';
import ParentSize from '@vx/responsive/lib/components/ParentSize';

const GraphContainer = () => {
  const [mode, setMode] = useState(0);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RiBearSmileLine size={26} />
        <h3 style={{ margin: '0' }}>&nbsp;나의 주간 공부 시간</h3>
      </div>
      {mode === 0 ? (
        <ParentSize>
          {({ width, height }) => {
            return (
              <LastWeekStudyGraph
                width={width}
                height={250}
                mode={mode}
                setMode={setMode}
              />
            );
          }}
        </ParentSize>
      ) : (
        <ThisWeekStudyGraph
          width={550}
          height={250}
          mode={mode}
          setMode={setMode}
        />
      )}
    </div>
  );
};

export default GraphContainer;
