import { updateInputs } from "../index";
import Menu from "../Menu";

const CALENDAR = document.querySelector("ul.days");

const menu = Menu();

const MenuUpdate = (target, { month, setDate }, key) => {
  if (key && key !== "Enter") return;
  const day = Number(target.id);

  if (day <= 0 || day > 31) return;
  const week_day = target.dataset.week_day;

  menu.update(day, week_day, month);
  setDate('day', day);
  updateInputs();
};

export const CalendarOnClick = (date) => {
  return (CALENDAR.onclick = ({ target }) => MenuUpdate(target, date));
};

export const KeysInputs = (date) => {
  return (CALENDAR.onkeypress = ({ target, key }) => MenuUpdate(target, date, key));
};
