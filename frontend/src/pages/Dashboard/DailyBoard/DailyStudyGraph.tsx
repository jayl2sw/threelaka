import React, { useEffect, useMemo } from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientTealBlue } from '@vx/gradient';

import { scaleBand, scaleLinear } from '@vx/scale';

import { AxisBottom, AxisLeft } from '@vx/axis';
import { timeParse, timeFormat } from 'd3-time-format';
import { TestGraph } from '../../../models/dashboard';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const verticalMargin = 120;

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};
export default function Example({ width, height, events = false }: BarsProps) {
  // accessors
  const x = (d: TestGraph) => d.label;
  const y = (d: TestGraph) => d.value;
  const dispatch = useAppDispatch();
  const dailyStudyTime = useAppSelector(
    (state) => state.dashboard.dailyStudyTime
  );
  //데일리 공부시간 불러오기
  useEffect(() => {
    dispatch(dashboardActions.getDailyStudyTime());
  }, []);

  console.log(dailyStudyTime);
  const timeData: Array<TestGraph> = [];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dailyStudyTime.map((item, idx) => {
    timeData.push({ label: days[idx], value: Number(item) });
  });
  console.log('얍얍', timeData);
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance`
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, 300],
        round: true,
        domain: timeData.map(x),
        padding: 0.4,
      }),
    [timeData, xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [0, yMax],
        round: true,
        domain: [Math.max(...timeData.map(y)), 0],
      }),
    [timeData, yMax]
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={25} left={55}>
        <AxisLeft left={10} scale={yScale} numTicks={4} label="Times(Min)" />
        {timeData.map((d) => {
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
          label="Study Time in Week"
          labelOffset={15}
          top={yMax}
        />
      </Group>
    </svg>
  );
}
