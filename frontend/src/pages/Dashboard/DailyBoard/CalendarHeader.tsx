import React from 'react';
import moment from 'moment';
import { getYear } from '../../../utils/moment';
import DateIndicator from './DateIndicator';
import WeekdayIndicator from '../../Dashboard/DailyBoard/WeekdayIndicator';
interface ICalendarHeaderProps {
  selectDate: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarHeader = ({
  selectDate,
  setSelectDate,
}: ICalendarHeaderProps) => {
  return (
    <div>
      <h3>{getYear(selectDate)}</h3>
      <WeekdayIndicator />
      <DateIndicator selectDate={selectDate} setSelectDate={setSelectDate} />
    </div>
  );
};

export default CalendarHeader;
