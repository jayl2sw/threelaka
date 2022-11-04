import React from 'react';
import { ScoreIndicatorBlock } from '../../../../styles/Speaking/SpeakingStyle';
interface IScoreIndicatorProps {
  value: number;
  maxValue: number;
}
const ScoreIndicator = ({ value, maxValue }: IScoreIndicatorProps) => {
  const val = (value / maxValue) * 100;
  const deg = (180 / 100) * val;
  return (
    <ScoreIndicatorBlock>
      <div className="indicator">
        <span className="bar" style={{ transform: `rotate(${deg}deg)` }} />
        <span className="result">
          <div style={{ color: '', fontSize: '3vmin', paddingBottom: '2vh' }}>
            Total
          </div>
          <span style={{ fontSize: '3vmin' }}>{value}</span>/
          <span>{maxValue}</span>
        </span>
      </div>
    </ScoreIndicatorBlock>
  );
};

export default ScoreIndicator;
