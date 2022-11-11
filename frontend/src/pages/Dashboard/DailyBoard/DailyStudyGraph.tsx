import React, { useEffect, useMemo } from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientTealBlue } from '@vx/gradient';

import { scaleBand, scaleLinear } from '@vx/scale';

import { AxisBottom, AxisLeft } from '@vx/axis';
import { timeParse, timeFormat } from 'd3-time-format';
import { TestGraph } from '../../../models/dashboard';

import { useAppDispatch } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
export const purple3 = '#a44afe';

const verticalMargin = 120;

const defaultData1 = [
  {
    label: 'Happy',
    value: 4000,
  },
  {
    label: 'Sad',
    value: 2000,
  },
  {
    label: 'Angry',
    value: 3000,
  },
  {
    label: 'Joyful',
    value: 4500,
  },
  {
    label: 'Anxious',
    value: 7000,
  },
];

// accessors
const x = (d: TestGraph) => d.label;
const y = (d: TestGraph) => d.value;

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

export default function Example({ width, height, events = false }: BarsProps) {
  const dispatch = useAppDispatch();
  //데일리 공부시간 불러오기
  useEffect(() => {
    dispatch(dashboardActions.getDailyStudyTime());
  }, []);

  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance`
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: defaultData1.map(x),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [0, yMax],
        round: true,
        domain: [Math.max(...defaultData1.map(y)), 0],
      }),
    [yMax]
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={25} left={55}>
        <AxisLeft left={10} scale={yScale} numTicks={4} label="Times" />
        {defaultData1.map((d) => {
          // const letter = getLetter(d);
          // const barWidth = xScale.bandwidth();
          // // const barHeight = yMax - yScale(getLetterFrequency(d));
          // const barHeight = yMax - 3;
          // const barX = xScale(letter);
          // const barY = yMax - barHeight;
          const label = x(d);
          const value = y(d);
          const scaleY: any = yScale(value);
          const barWidth = xScale.bandwidth();

          const barHeight = yMax - scaleY;
          const barX = xScale(label);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${label}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={() => {
                if (events)
                  alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
        <AxisBottom
          scale={xScale}
          label="Emotion"
          labelOffset={15}
          top={yMax}
          // top={yMax + margin.top}

          // top={verticalMargin / 2}
          // scale={dateScale}
          // tickFormat={formatDate}
          // stroke={purple3}
          // tickStroke={purple3}
          // tickLabelProps={() => ({
          //   fill: purple3,
          //   fontSize: 11,
          //   textAnchor: 'middle',
          // })}
        />
      </Group>
    </svg>
  );
}
