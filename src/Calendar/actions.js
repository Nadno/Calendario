import Menu from "../Menu/menu";
import calendarGenerator from "./index";
import calendar from "../utils/date";

import { getDate, setDate } from "../date";

const HTML_Month = document.getElementById("month");
const HTML_Year = document.getElementById("year");

const resetMenu = () => {
  Menu.setDaily();
  setDate("day", 0);
  setDate("week_day", 0);
};

const changeSelect = (DATE_NAME) => {
  return function ({ target }) {
    const date = calendar();
    calendarGenerator(date);
    setDate(DATE_NAME, Number(target.value));
    resetMenu();
  };
};
const changeMonth = changeSelect("month");
const changeYear = changeSelect("year");

HTML_Month.addEventListener("change", changeMonth);
HTML_Year.addEventListener("change", changeYear);

const menuUpdate = (day, week_day) => {
  if (day < 0 || day > 31) return;

  return function () {
    const dayElement = document.getElementById(day);
    const selectedDay = getDate("day");

    if (selectedDay) {
      document.getElementById(selectedDay).classList.remove("selected");
    }

    if (selectedDay === day) {
      resetMenu();
      dayElement.classList.remove("selected");
    } else {
      dayElement.classList.add("selected");
      setDate("day", day);
      setDate("week_day", week_day);
      Menu.setDay();
    }
  };
};

export default menuUpdate;
