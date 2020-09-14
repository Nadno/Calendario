import calendarGenerator from "./index";
import Menu from "../Menu";

import { setDate, updateInputs } from "../index";
import calendar, { selectDate } from "./date";

const HTML_Month = document.getElementById('month');
const HTML_Year = document.getElementById('year');
HTML_Month.addEventListener('change', () => calendarGenerator(calendar()));
HTML_Year.addEventListener('change', () => calendarGenerator(calendar()));

const menuUpdate = ({ target }) => {
  const day = Number(target.id);
  if (day <= 0 || day > 31) return;
  const menu = Menu();
  const { month } = selectDate();

  const week_day = target.dataset.week_day;
  menu.update(day, week_day, month);
  setDate('day', day);
  updateInputs();
};


export default menuUpdate;