import element from "../Calendar/elements";

import { selected, actual } from "../date";
import { createYearOption } from "../createElement";
import calendarGenerator from "../Calendar/calendar";

export const setInitialYearAndMonth = (year, month) => {
  element.calendar.month.value = month;
  element.calendar.year.value = year;
};

export const setSelectedDate = (year, month) => {
  const FIRST_DAY = 1;
  const selectedDate = new Date(year, month, FIRST_DAY);

  selected.set("day", 0);
  selected.set("week_day", selectedDate.getDay())
  selected.set("month", selectedDate.getMonth());
  selected.set("year", selectedDate.getFullYear());
};

export const setActualDate = () => {
  const actualDate = new Date();
  actual.set("day", actualDate.getDate());
  actual.set("month", actualDate.getMonth());
  actual.set("year", actualDate.getUTCFullYear());
};

export default function initialConfig() {
  setActualDate();
  setSelectedDate(actual.get("year"), actual.get("month"));

  const totalNextYear = actual.get("year") + 10;
  for (let nextYear = actual.get("year"); nextYear <= totalNextYear; nextYear++) {
    element.calendar.year.appendChild(createYearOption(nextYear));
  }

  setInitialYearAndMonth(actual.get("year"), actual.get("month"));
  calendarGenerator();
};

export const monthTotalDays = (year, month) => {
  const LEAP_YEAR = year % 4 === 0;
  const FEBRUARY = month === 1;

  if (FEBRUARY) {
    if (LEAP_YEAR) return 29;
    return 28;
  }

  const monthWithThirtyDays = [3, 5, 8, 10];
  if (monthWithThirtyDays.includes(month)) return 30;

  return 31;
};
