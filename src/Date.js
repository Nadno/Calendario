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

const initialCalendar = () => {
  const actualDate = new Date();
  const selected = selectDate(
    actualDate.getFullYear(),
    actualDate.getMonth()
  );

  const calendar = {
    actual: {
      day: actualDate.getDate(),
      month: actualDate.getMonth(),
      year: actualDate.getUTCFullYear(),
    },
    selected,
  };

  return calendar;
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
