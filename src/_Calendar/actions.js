import element from "./elements";

import calendarGenerator from "./calendar";

import { setSelectedDate } from "../utils/date";
import date, { getDate } from "../date";

export default function () {
  const changeSelect = () => {
    setSelectedDate(element.calendar.year.value, element.calendar.month.value);
    calendarGenerator();
    Object.assign(date.selected, {
      year: element.calendar.year.value,
      month: element.calendar.month.value,
    });
  };

  element.calendar.month.addEventListener("change", changeSelect);
  element.calendar.year.addEventListener("change", changeSelect);
}
