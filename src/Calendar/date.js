export const selectDate = (year, month) => {
  const FIRST_DAY = 1;

  const selectedDate = new Date(year, month, FIRST_DAY);
  const selected = {
    day: selectedDate.getDate(),
    week_day: selectedDate.getDay(),
    month: selectedDate.getMonth(),
    year: selectedDate.getUTCFullYear(),
  };
  return selected;
};

export const getActualDate = () => {
  const actualDate = new Date();

  return {
    day: actualDate.getDate(),
    month: actualDate.getMonth(),
    year: actualDate.getUTCFullYear(),
  };
};

const initialCalendar = () => {
  const actual = getActualDate();
  const selected = selectDate(
    actual.year,
    actual.month,
  );

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

export default initialCalendar;
