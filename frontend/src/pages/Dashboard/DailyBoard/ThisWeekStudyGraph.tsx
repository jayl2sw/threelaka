import React, { useEffect, useMemo, useState } from 'react';
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
import { LinearGradient, RadialGradient } from '@vx/gradient';
import { GraphBox } from '../../../styles/DashBoard/DashBoardStyle';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
const verticalMargin = 100;
export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
  mode: number;
  setMode: React.Dispatch<React.SetStateAction<number>>;
};
export default function Example({
  width,
  height,
  events = false,
  mode,
  setMode,
}: BarsProps) {
  // accessors
  const x = (d: TestGraph) => d.label;
  const y = (d: TestGraph) => d.value;
  const dispatch = useAppDispatch();
  const lastWeekdailyStudyTime = useAppSelector(
    (state) => state.dashboard.lastWeekdailyStudyTime
  );
  const thisWeekdailyStudyTime = useAppSelector(
    (state) => state.dashboard.thisWeekdailyStudyTime
  );
  //데일리 공부시간 불러오기
  useEffect(() => {
    dispatch(dashboardActions.getDailyStudyTime());
  }, []);

  console.log(lastWeekdailyStudyTime);
  // const [mode, setMode] = useState(0);

  const timeData: Array<TestGraph> = [];

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  thisWeekdailyStudyTime.map((item, idx) => {
    timeData.push({ label: days[idx], value: Number(item) });
  });
  console.log('얍얍', timeData);
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin; //y축크기

  // scales, memoize for performance`
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, 430], //x축크기
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
    <>
      <GraphBox>
        <FlexTransparentDiv
          widthSize={'13vw'}
          heightSize={'2vh'}
          paddingSize={'2vh 0'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{ fontSize: '2.2vmin' }}
        >
          <IoIosArrowBack onClick={() => setMode(0)}></IoIosArrowBack>
          <div>
            {mode === 0 ? (
              <div>지난 주 공부 시간</div>
            ) : (
              <div>이번 주 공부 시간</div>
            )}
          </div>
          <IoIosArrowForward onClick={() => setMode(1)}></IoIosArrowForward>
        </FlexTransparentDiv>

        <div className="graph">
          <svg width={width} height={height}>
            <LinearGradient id="gradient" from="#4A9FFF" to="#B0FF91" />
            <rect width={width} height={height} fill="#fff" rx={14} />
            <Group top={30} left={80}>
              <AxisLeft
                stroke="#565656"
                tickStroke="#565656"
                strokeDasharray="#565656"
                tickLength={8}
                left={10}
                scale={yScale}
                numTicks={4}
                label="시간 (분)"
                tickLabelProps={() => ({
                  fill: '#565656',
                  fontSize: 11,
                  textAnchor: 'end',
                  dy: '0.33em',
                  dx: '-0.33em',
                })}
              />
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
                    fill={'url(#gradient)'}
                    onClick={() => {
                      if (events)
                        alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                    }}
                  />
                );
              })}
              <AxisBottom
                stroke="#565656"
                tickStroke="#565656"
                strokeDasharray="#565656"
                scale={xScale}
                // label="Study Time in Week"
                labelOffset={15}
                top={yMax}
                tickLabelProps={() => ({
                  fill: '#565656',
                  fontSize: 15,
                  textAnchor: 'middle',
                  dy: '0.33em',
                })}
              />
            </Group>
          </svg>
        </div>
      </GraphBox>
    </>
  );
}
