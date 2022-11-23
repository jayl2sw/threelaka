import React from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from '../../../utils/moment';
import { useState } from 'react';

import { getDatesInMonthDisplay } from '../../../utils/date';
import { getMonthSet } from '../../../utils/moment';

import { DateIndicatorContainer } from '../../../styles/DashBoard/DashBoardStyle';

import { useAppSelector } from '../../../utils/hooks';
import moment from 'moment';
export interface IDateIndicatorProps {
  selectDate: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DateIndicator = ({ selectDate, setSelectDate }: IDateIndicatorProps) => {
  // const [hourMonthStudyTime, setHourMonthStudyTime] = useState<Array<object>>(
  //   []
  // );
  const monthStudyTime = useAppSelector(
    (state) => state.dashboard.monthStudyTime
  );
  const datesInMonth = getDatesInMonthDisplay(
    getMonth(selectDate) + 1,
    getYear(selectDate)
  );
  const changeDate = (e: React.MouseEvent<HTMLDivElement>, nextDate: Date) => {
    // const target = e.target as HTMLDivElement;
    setSelectDate(nextDate);
  };
  // const handleStudyTime = (studyTime: Array<object>) => {
  //   return;
  // };
  //
  //0~1시간 verybad 1~ 2시간bad 2~ 3시간well 3~4시간good 4시간이상 verygood

  return (
    <DateIndicatorContainer style={{ zIndex: '10' }}>
      {datesInMonth.map((item, idx) => {
        if (item.currentMonth && item.beforeToday) {
          const time = (
            (monthStudyTime[getDayOfMonth(item.date)] as number) / 60
          ).toFixed(1);

          return (
            <div
              data-tooltip={`이 날의 공부 : ${time}분`}
              className={`${
                monthStudyTime[getDayOfMonth(item.date)] === 0
                  ? 'noStudy'
                  : monthStudyTime[getDayOfMonth(item.date)] <= 3600
                  ? `verybad`
                  : monthStudyTime[getDayOfMonth(item.date)] <= 3600 * 2
                  ? 'bad'
                  : monthStudyTime[getDayOfMonth(item.date)] <= 3600 * 3
                  ? 'well'
                  : monthStudyTime[getDayOfMonth(item.date)] <= 3600 * 4
                  ? 'good'
                  : `verygood`
              }
              } date-icon streak`}
              date-active-month={item.currentMonth.toString()}
              date-date={item.date.toString()}
              key={`date-${idx}`}
              // date-date를 getattribute하는 대신 i.date 값을 직접 넘겨주기
              // onClick={(e) => changeDate(e, item.date)}
            >
              {getDayOfMonth(item.date)}
            </div>
          );
        } else {
          return (
            <div
              className="date-icon"
              date-active-month={item.currentMonth.toString()}
              date-date={item.date.toString()}
              key={`date-${idx}`}
              // date-date를 getattribute하는 대신 i.date 값을 직접 넘겨주기
              onClick={(e) => changeDate(e, item.date)}
            >
              {getDayOfMonth(item.date)}
            </div>
          );
        }
        // return (
        //   <div
        //     className="date-icon"
        //     date-active-month={item.currentMonth.toString()}
        //     date-date={item.date.toString()}
        //     key={`date-${idx}`}
        //     // date-date를 getattribute하는 대신 i.date 값을 직접 넘겨주기
        //     onClick={(e) => changeDate(e, item.date)}
        //   >
        //     {getDayOfMonth(item.date)}
        //   </div>
        // );
      })}
    </DateIndicatorContainer>
  );
};

export default DateIndicator;
