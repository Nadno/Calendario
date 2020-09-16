import calendarGenerator from "./index";
import calendar from "./date";
import Menu from "../Menu";

import { getDate, setDate } from "../index";

const HTML_Month = document.getElementById("month");
const HTML_Year = document.getElementById("year");

HTML_Month.addEventListener("change", ({ target }) => {
  const date = calendar();
  calendarGenerator(date);
  setDate("year", target.value);
});

HTML_Year.addEventListener("change", ({ target }) => {
  const date = calendar();
  calendarGenerator(date);
  setDate("month", target.value);
});

const menuUpdate = ({ target }) => {
  const day = Number(target.id);
  if (day < 0 || day > 31) return;
  const menu = Menu();
  
  const week_day = Number(target.dataset.week_day);
  const dayElement = document.getElementById(day);
  const selectedDay = getDate("day");
  
  if (selectedDay) {
    document.getElementById(selectedDay).classList.remove("selected");
  };

  if (selectedDay === day) {
    menu.setDaily();
    setDate("day", 0);
    setDate("week_day", 0);
    dayElement.classList.remove("selected");
  } else {
    dayElement.classList.add("selected");
    
    setDate("day", day);
    setDate("week_day", week_day);
    menu.setDay();
  };
};

export default menuUpdate;
