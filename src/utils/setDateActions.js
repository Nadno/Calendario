import element from "../_Calendar/elements";

import { createYearOption } from "../createElement";

const dateActions = () => ({
  setInitialYearAndMonth(year, month){
    element.calendar.month.value = month;
    element.calendar.year.value = year;
  },

  setSelectedDate(year, month) {
    const FIRST_DAY = 1;
    const selectedDate = new Date(year, month, FIRST_DAY);
    Object.assign(this.selected, {
      day: 0,
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
      week_day: selectedDate.getDay(),
      total_days: this.monthTotalDays(selectedDate.getFullYear(), selectedDate.getMonth()),
    });
  },
  
  setActualDate() {
    const actualDate = new Date();
    Object.assign(this.actual, {
      day: actualDate.getDate(),
      month: actualDate.getMonth(),
      year: actualDate.getFullYear(),
      week_day: actualDate.getDay(),
    });
  },
  
  setInitialDate() {
    const actual = this.actual;
    this.setActualDate();
    this.setSelectedDate(actual.year, actual.month);
  
    const totalNextYear = actual.year + 10;
    for (let nextYear = actual.year; nextYear <= totalNextYear; nextYear++) {
      element.calendar.year.appendChild(createYearOption(nextYear));
    }
  
    this.setInitialYearAndMonth(actual.year, actual.month);
    console.log(this);
  },
  
  monthTotalDays(year, month) {
    const FEBRUARY = month === 1;
  
    if (FEBRUARY) {
      const LEAP_YEAR = year % 4 === 0;
      if (LEAP_YEAR) return 29;
      return 28;
    }
  
    const monthWithThirtyDays = [3, 5, 8, 10];
    if (monthWithThirtyDays.includes(month)) return 30;
  
    return 31;
  },
});

export default dateActions;