import calendarGenerator from "./index";
import calendar from "./date";
import Menu from "../Menu";

import { getDate, setDate } from "../index";

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

const menuUpdate = ({ target }) => {
  const day = Number(target.id);
  if (day < 0 || day > 31) return;

  const week_day = Number(target.dataset.week_day);
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

export default menuUpdate;
