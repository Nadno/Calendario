import element from "../Calendar/elements";

import { selected, actual, getDate } from "../date";
import { createYearOption } from "../createElement";

const DAY = "day",
  MONTH = "month",
  YEAR = "year",
  WEEK_DAY = "week_day";

export const setInitialYearAndMonth = (year, month) => {
  element.calendar.month.value = month;
  element.calendar.year.value = year;
};

export const setSelectedDate = (year, month) => {
  const FIRST_DAY = 1;
  const selectedDate = new Date(year, month, FIRST_DAY);

  selected.set(DAY, 0);
  selected.set(WEEK_DAY, selectedDate.getDay());
  selected.set(MONTH, selectedDate.getMonth());
  selected.set(YEAR, selectedDate.getFullYear());
};

export const setActualDate = () => {
  const actualDate = new Date();
  actual.set(DAY, actualDate.getDate());
  actual.set(MONTH, actualDate.getMonth());
  actual.set(YEAR, actualDate.getFullYear());
};

export default function initialConfig(Notify, Task) {
  setActualDate();
  setSelectedDate(actual.get(YEAR), actual.get(MONTH));

  const totalNextYear = actual.get(YEAR) + 10;
  for (let nextYear = actual.get(YEAR); nextYear <= totalNextYear; nextYear++) {
    element.calendar.year.appendChild(createYearOption(nextYear));
  }

  setInitialYearAndMonth(actual.get(YEAR), actual.get(MONTH));
  Notify.selectDate(getDate("selected"));
  Task.selectDate(getDate("selected"));
}

export const monthTotalDays = (year, month) => {
  const FEBRUARY = month === 1;

  if (FEBRUARY) {
    const LEAP_YEAR = year % 4 === 0;
    if (LEAP_YEAR) return 29;
    return 28;
  }

  const monthWithThirtyDays = [3, 5, 8, 10];
  if (monthWithThirtyDays.includes(month)) return 30;

  return 31;
};
