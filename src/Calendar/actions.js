import element from "./elements";

import calendarGenerator from "./calendar";

import { setSelectedDate } from "../utils/date";

export default function (Menu) {
  const changeSelect = () => {
    setSelectedDate(element.calendar.year.value, element.calendar.month.value);
    calendarGenerator();
    Menu.setDaily();
  };

  element.calendar.month.addEventListener("change", changeSelect);
  element.calendar.year.addEventListener("change", changeSelect);
}
