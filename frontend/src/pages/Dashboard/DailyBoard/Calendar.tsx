import React, { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import { useAppDispatch } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
const Calendar = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dashboardActions.getMonthStudyTime());
  }, []);
  const [selectDate, setSelectDate] = useState(moment().toDate());

  return (
    <div>
      <CalendarHeader selectDate={selectDate} setSelectDate={setSelectDate} />
    </div>
  );
};

export default Calendar;
