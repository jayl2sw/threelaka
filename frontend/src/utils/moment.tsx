import moment from 'moment';
export const getSpecificDate = (
  month: number,
  dayOfMonth: number,
  year: number
) => {
  return moment(`${month}-${dayOfMonth}-${year}`, 'MM-DD-YYYY').toDate();
};

export const getDayOfMonth = (date: Date) => moment(date).date();

export const getMonth = (date: Date) => moment(date).month();

export const getYear = (date: Date) => moment(date).year();

export const getToday = () => moment().toDate();

export const getReadableWeekday = (date: Date) => moment(date).format('dddd'); //Thursday

export const getReadableMonthDate = (date: Date) =>
  moment(date).format('MMMM Do');

export const getMonthDayYear = (date: Date) =>
  moment(date).format('MM-DD-YYYY');
