import React from 'react';
import moment from 'moment';
import { useState } from 'react';
import CalendarHeader from './CalendarHeader';
const Calendar = () => {
  const [selectDate, setSelectDate] = useState(moment().toDate());

  const getDaysInMonth = (month: number, year: number) => {
    return moment(`${month}-${year}`, 'MM-YYYY').daysInMonth();
  };

  console.log(getDaysInMonth(11, 2022));

  const getFirstWeekdayOfMonth = (month: number, year: number) => {
    return moment(`${month}-${year}`, 'MM-YYYY').startOf('month').weekday();
  };

  // Note, since we use MomentJs's formatting, we do not index the month. This is getting the first weekday of the month for January 2020. Result is 0-indexed
  console.log(getFirstWeekdayOfMonth(11, 2022));

  const getPrevMonthYear = (month: number, year: number) => {
    // If it is January... prev month is Dec of the previous year
    if (month === 1) {
      return {
        month: 12,
        year: year - 1,
      };
    }

    // Otherwise, same year, but month - 1
    return {
      month: month - 1,
      year,
    };
  };

  const getNextMonthYear = (month: number, year: number) => {
    // If it is January... prev month is Dec of the previous year
    if (month === 1) {
      return {
        month: month + 1,
        year,
      };
    }

    // Otherwise, same year, but month - 1
    return {
      month: 12,
      year: year + 1,
    };
  };
  const getDatesInMonthDisplay = (month: number, year: number) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstWeekday = getFirstWeekdayOfMonth(month, year);
    const result = [];

    const prev = getPrevMonthYear(month, year);
    const prevDaysInMonth = getDaysInMonth(prev.month, prev.year);

    // Add prev overflow dates...
    for (let j = firstWeekday - 1; j >= 0; j--) {
      result.push({
        date: moment(
          `${prev.month}-${prevDaysInMonth - j}-${prev.year}`,
          'MM-DD-YYYY'
        ).toDate(),
        currentMonth: false,
      });
    }

    // Add current month's dates
    for (let i = 1; i <= daysInMonth; i++) {
      result.push({
        date: moment(`${month}-${i}-${year}`, 'MM-DD-YYYY').toDate(),
        currentMonth: true,
      });
    }

    // Overflow dates for next month to meet 42 days per month display   requirement
    if (result.length < 42) {
      const daysToAdd = 42 - result.length;
      const next = getNextMonthYear(month, year);

      for (let k = 1; k <= daysToAdd; k++) {
        result.push({
          date: moment(
            `${next.month}-${k}-${next.year}`,
            'MM-DD-YYYY'
          ).toDate(),
          currentMonth: false,
        });
      }
    }

    return result;
  };

  // July 2020

  // Note, since we use MomentJs's formatting, we do not index the month. This is getting the first weekday of the month for January 2020. Result is 0-indexed

  console.log(getDatesInMonthDisplay(11, 2022));

  return (
    <div>
      <CalendarHeader selectDate={selectDate} setSelectDate={setSelectDate} />
    </div>
  );
};

export default Calendar;
