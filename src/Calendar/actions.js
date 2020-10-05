import element from "./elements";

import Menu from "../Menu/menu";
import calendarGenerator from "./calendar";

import { selected } from "../date";
import { setSelectedDate } from "../utils/date";

const changeSelect = () => {
  setSelectedDate(
    element.calendar.year.value,
    element.calendar.month.value
  );
  calendarGenerator();
  Menu.setDaily();
};

element.calendar.month.addEventListener("change", changeSelect);
element.calendar.year.addEventListener("change", changeSelect);

const menuUpdate = (day, week_day) => {
  if (day < 0 || day > 31) return;

  const sameDay = () => selected.get("day") === day;

  return function () {
    const dayElement = document.getElementById(day);
    if (selected.get("day")) {
      document.getElementById(selected.get("day")).classList.remove("selected");
    }

    if (sameDay()) {
      Menu.setDaily();
      dayElement.classList.remove("selected");
      selected.set("day", 0);
    } else {
      dayElement.classList.add("selected");
      selected.set("day", day);
      selected.set("week_day", week_day);
      Menu.setDay();
    }
  };
};

export default menuUpdate;
