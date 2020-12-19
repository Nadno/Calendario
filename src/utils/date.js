import element from "../Calendar/elements";

import {
  selected,
  actual,
  getDate,
  DAY,
  MONTH,
  YEAR,
  WEEK_DAY,
  TOTAL_DAYS,
} from "../date";
import { createYearOption } from "../createElement";

export const setInitialYearAndMonth = (year, month) => {
  element.calendar.month.value = month;
  element.calendar.year.value = year;
};

export const setSelectedDate = (year, month) => {
  const FIRST_DAY = 1;
  const date = new Date(year, month, FIRST_DAY);

  selected.set(DAY, 0);
  selected.set(WEEK_DAY, date.getDay());
  selected.set(MONTH, date.getMonth());
  selected.set(YEAR, date.getFullYear());
  selected.set(
    TOTAL_DAYS,
    monthTotalDays(date.getFullYear(), date.getMonth())
  );
};

export const setActualDate = () => {
  const date = new Date();
  actual.set(DAY, date.getDate());
  actual.set(MONTH, date.getMonth());
  actual.set(YEAR, date.getFullYear());
  actual.set(WEEK_DAY, date.getDay());
};

export default function setInitialDate(calendar) {
  setActualDate();
  setSelectedDate(actual.get(YEAR), actual.get(MONTH));

  const totalNextYear = actual.get(YEAR) + 10;
  for (let nextYear = actual.get(YEAR); nextYear <= totalNextYear; nextYear++) {
    element.calendar.year.appendChild(createYearOption(nextYear));
  }

  setInitialYearAndMonth(actual.get(YEAR), actual.get(MONTH));
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
