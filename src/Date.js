export const monthTotalDays = (year, month) => {
  const monthWithThirtyDays = [3, 5, 8, 10];

  if (month === 1) {
    if (year % 4 === 0) return 29;
    return 28;
  };
  if (monthWithThirtyDays.indexOf(month) !== -1) return 30;

  return 31;
};

const calendarGenerator = (year, month) => {
  const actualDate = new Date();
  let selectedDate;

  if (year && month) {
    selectedDate = new Date(year, month, 1);
  } else {
    selectedDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), 1);
  };

  const calendar = {
    selected: {
      day: selectedDate.getDate(),
      week_day: selectedDate.getDay(),
      month: selectedDate.getMonth(),
      year: selectedDate.getUTCFullYear(),
    },
    actual: {
      day: actualDate.getDate(),
      month: actualDate.getMonth(),
      year: actualDate.getUTCFullYear(),
    },
  };

  return calendar;
};

export default calendarGenerator;