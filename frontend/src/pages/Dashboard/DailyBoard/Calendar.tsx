import React, { useEffect } from 'react';
import moment from 'moment';
import { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import {
  GradientBorderBox,
  Wrapper,
} from '../../../styles/DashBoard/DashBoardStyle';

const Calendar = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dashboardActions.getMonthStudyTime());
  }, []);
  const [selectDate, setSelectDate] = useState(moment().toDate());
  const seqDays = useAppSelector((state) => state.dashboard.seqDays);

  return (
    <Wrapper>
      <div className="dynamic-text-shadow" style={{ zIndex: '1' }}>
        <span>{seqDays} days streak!</span>
      </div>
      <GradientBorderBox>
        <CalendarHeader selectDate={selectDate} setSelectDate={setSelectDate} />
      </GradientBorderBox>
    </Wrapper>
  );
};

export default Calendar;
