import React, { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import { useAppDispatch } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import { GradientBorderBox } from '../../../styles/DashBoard/DashBoardStyle';
const Calendar = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dashboardActions.getMonthStudyTime());
  }, []);
  const [selectDate, setSelectDate] = useState(moment().toDate());

  return (
    <GradientBorderBox>
      <CalendarHeader selectDate={selectDate} setSelectDate={setSelectDate} />
    </GradientBorderBox>
  );
};

export default Calendar;
