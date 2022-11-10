import React from 'react';

const WeekdayIndicator = () => {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div style={{ display: 'flex' }}>
      {weekdays.map((day, key) => {
        return (
          <div style={{ margin: '1vw' }} key={key}>
            {day}
          </div>
        );
      })}
    </div>
  );
};

export default WeekdayIndicator;
