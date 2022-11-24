import React, { useEffect } from 'react';
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
import { useRef } from 'react';
export interface IDateIndicatorProps {
  selectDate: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DateIndicator = ({ selectDate, setSelectDate }: IDateIndicatorProps) => {
  const dateRef = useRef<HTMLDivElement>(null);
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

  // useEffect(() => {
  //   if (!dateRef.current?.getAttribute('date-active-month')) {
  //     console.warn('얍얍');
  //     dateRef.current?.classList.add('notThisMonth');
  //   }
  // }, []);

  return (
    <DateIndicatorContainer style={{ zIndex: '1' }}>
      {datesInMonth.map((item, idx) => {
        if (item.currentMonth && item.beforeToday) {
          const time = (
            (monthStudyTime[getDayOfMonth(item.date)] as number) / 60
          ).toFixed(1);

          return (
            <div
              ref={dateRef}
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
              // style={{
              //   color: dateRef.current?.getAttribute('date-active-month')
              //     ? ''
              //     : 'red',
              // }}
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
