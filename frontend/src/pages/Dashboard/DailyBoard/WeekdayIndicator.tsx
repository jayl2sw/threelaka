import React from 'react';
import { WeekdayIndocatorContainer } from '../../../styles/DashBoard/DashBoardStyle';
const WeekdayIndicator = () => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <WeekdayIndocatorContainer>
      {weekdays.map((day, idx) => {
        return (
          <div
            style={{ margin: '1vw' }}
            key={`day-${idx}`}
            className="weekday-indicator-icon"
          >
            {day}
          </div>
        );
      })}
    </WeekdayIndocatorContainer>
  );
};

export default WeekdayIndicator;
