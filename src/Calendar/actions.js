import element from "./elements";

import calendarGenerator from "./calendar";

import { setSelectedDate } from "../utils/date";
import { getDate } from "../date";

export default function (CalendarData) {
  const changeSelect = () => {
    setSelectedDate(element.calendar.year.value, element.calendar.month.value);
    calendarGenerator();
    CalendarData.selectDate(getDate("selected")).setDayWithItems();
  };

  element.calendar.month.addEventListener("change", changeSelect);
  element.calendar.year.addEventListener("change", changeSelect);
}
