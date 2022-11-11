import React from 'react';
import moment from 'moment';
import { useState } from 'react';
import CalendarHeader from './CalendarHeader';
const Calendar = () => {
  const [selectDate, setSelectDate] = useState(moment().toDate());

  return (
    <div>
      <CalendarHeader selectDate={selectDate} setSelectDate={setSelectDate} />
    </div>
  );
};

export default Calendar;
