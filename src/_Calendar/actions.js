import element from "./elements";

import calendarGenerator from "./calendar";

import date from "../date";

export default function () {
  const changeSelect = () => {
    date.setSelectedDate(element.calendar.year.value, element.calendar.month.value);
    calendarGenerator();
    Object.assign(date.selected, {
      year: element.calendar.year.value,
      month: element.calendar.month.value,
    });
  };

  element.calendar.month.addEventListener("change", changeSelect);
  element.calendar.year.addEventListener("change", changeSelect);
}
