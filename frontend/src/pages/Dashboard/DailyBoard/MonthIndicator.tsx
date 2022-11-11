import React from 'react';
import { IDateIndicatorProps } from './DateIndicator';
import { getMonth } from '../../../utils/moment';
import { getMonthSet } from '../../../utils/moment';
import { MonthIndicatorContainer } from '../../../styles/DashBoard/DashBoardStyle';
const MonthIndicator = ({ setSelectDate, selectDate }: IDateIndicatorProps) => {
  const monthsFull = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthSet = getMonthSet(selectDate);
  const changeMonth = (e: React.MouseEvent<HTMLDivElement>, nextDate: Date) => {
    setSelectDate(nextDate);
  };
  return (
    <MonthIndicatorContainer>
      {/* 사용자의 과거 학습기록을 불러오는 데이터가 추가로 있다면 과거도 보여줄수있음 */}
      {/* <h4
        className="month"
        data-date={monthSet.prev}
        onClick={(e) => changeMonth(e, monthSet.prev)}
      >
        {monthsFull[getMonth(monthSet.prev)]}
      </h4> */}
      <h4 className="month">{monthsFull[getMonth(monthSet.current)]}</h4>
      {/* <h4
        data-date={monthSet.next}
        onClick={(e) => changeMonth(e, monthSet.next)}
        className="month"
      >
        {monthsFull[getMonth(monthSet.next)]}
      </h4> */}
    </MonthIndicatorContainer>
  );
};

export default MonthIndicator;
