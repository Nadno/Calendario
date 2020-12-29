import element from "../_Calendar/elements";

import date from "../date";
import { createYearOption } from "../createElement";

export const setInitialYearAndMonth = (year, month) => {
  element.calendar.month.value = month;
  element.calendar.year.value = year;
};

export const setSelectedDate = (year, month) => {
  const FIRST_DAY = 1;
  const selectedDate = new Date(year, month, FIRST_DAY);
  Object.assign(date.selected, {
    day: 0,
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
    week_day: selectedDate.getDay(),
    total_days: monthTotalDays(selectedDate.getFullYear(), selectedDate.getMonth()),
  });
};

export const setActualDate = () => {
  const actualDate = new Date();
  Object.assign(date.actual, {
    day: actualDate.getDate(),
    month: actualDate.getMonth(),
    year: actualDate.getFullYear(),
    week_day: actualDate.getDay(),
  });
};

export default function setInitialDate() {
  const actual = date.actual;
  setActualDate();
  setSelectedDate(actual.year, actual.month);

  const totalNextYear = actual.year + 10;
  for (let nextYear = actual.year; nextYear <= totalNextYear; nextYear++) {
    element.calendar.year.appendChild(createYearOption(nextYear));
  }

  setInitialYearAndMonth(actual.year, actual.month);
  console.log(date);
}

export function monthTotalDays(year, month) {
  const FEBRUARY = month === 1;

  if (FEBRUARY) {
    const LEAP_YEAR = year % 4 === 0;
    if (LEAP_YEAR) return 29;
    return 28;
  }

  const monthWithThirtyDays = [3, 5, 8, 10];
  if (monthWithThirtyDays.includes(month)) return 30;

  return 31;
}
