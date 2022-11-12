import React from 'react';
import moment from 'moment';
import { getYear } from '../../../utils/moment';
import DateIndicator from './DateIndicator';
import WeekdayIndicator from '../../Dashboard/DailyBoard/WeekdayIndicator';
import MonthIndicator from '../../Dashboard/DailyBoard/MonthIndicator';
// import { CalendarContainer } from '../../../styles/DashBoard/DashBoardStyles';
import { CalendarContainer } from '../../../styles/DashBoard/DashBoardStyle';

interface ICalendarHeaderProps {
  selectDate: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarHeader = ({
  selectDate,
  setSelectDate,
}: ICalendarHeaderProps) => {
  return (
    <CalendarContainer className="innerBox">
      <h3 style={{ marginTop: '1vh', marginBottom: 0 }}>
        {getYear(selectDate)}
      </h3>
      <MonthIndicator
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      ></MonthIndicator>
      <WeekdayIndicator />
      <DateIndicator selectDate={selectDate} setSelectDate={setSelectDate} />
    </CalendarContainer>
  );
};

export default CalendarHeader;
