export const initialSelectedDate = (year, month) => {
  const HTML_month = document.getElementById('month');
  const HTML_year = document.getElementById('year');

  HTML_month.value = month;
  HTML_year.value = year;
};

export const selectDate = () => {
  const month = document.getElementById('month');
  const year = document.getElementById('year');

  const FIRST_DAY = 1;
  const selectedDate = new Date(year.value, month.value, FIRST_DAY);
  return {
    day: selectedDate.getDate(),
    week_day: selectedDate.getDay(),
    month: selectedDate.getMonth(),
    year: selectedDate.getUTCFullYear(),
  };
};

export const getActualDate = () => {
  const actualDate = new Date();
  return {
    day: actualDate.getDate(),
    month: actualDate.getMonth(),
    year: actualDate.getUTCFullYear(),
  };
};

const calendar = (initial) => {
  const actual = getActualDate();
  if (initial) initialSelectedDate(
    actual.year,
    actual.month,
  );

  const selected = selectDate();
  return {
    actual,
    selected,
  };
};

export const monthTotalDays = (year, month) => {
  const monthWithThirtyDays = [3, 5, 8, 10];

  if (month === 1) {
    if (year % 4 === 0) return 29;
    return 28;
  }
  if (monthWithThirtyDays.indexOf(month) !== -1) return 30;

  return 31;
};

export default calendar;
