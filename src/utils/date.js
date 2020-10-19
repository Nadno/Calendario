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
  const selectedDate = new Date(year, month, FIRST_DAY);

  selected.set(DAY, 0);
  selected.set(WEEK_DAY, selectedDate.getDay());
  selected.set(MONTH, selectedDate.getMonth());
  selected.set(YEAR, selectedDate.getFullYear());
  selected.set(
    TOTAL_DAYS,
    monthTotalDays(selectedDate.getFullYear(), selectedDate.getMonth())
  );
};

export const setActualDate = () => {
  const actualDate = new Date();
  actual.set(DAY, actualDate.getDate());
  actual.set(MONTH, actualDate.getMonth());
  actual.set(YEAR, actualDate.getFullYear());
};

export default function setInitialDate(CalendarData) {
  setActualDate();
  setSelectedDate(actual.get(YEAR), actual.get(MONTH));

  const totalNextYear = actual.get(YEAR) + 10;
  for (let nextYear = actual.get(YEAR); nextYear <= totalNextYear; nextYear++) {
    element.calendar.year.appendChild(createYearOption(nextYear));
  }

  setInitialYearAndMonth(actual.get(YEAR), actual.get(MONTH));
  CalendarData.selectDate(getDate("selected"));
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
