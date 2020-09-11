import Menu from "../Menu";

const CALENDAR = document.querySelector("ul.days");

const menu = Menu();

const MenuUpdate = (target, key) => {
  const month = 8;
  const day = Number(target.id);

  if (day <= 0 || day > 31) return;
  if (key && key !== "Enter") return;
  const week_day = target.dataset.week_day;
  menu.update(day, week_day, month);
};

export const CalendarOnClick = () => {
  return (CALENDAR.onclick = ({ target }) => MenuUpdate(target));
};

export const KeysInputs = () => {
  return (CALENDAR.onkeypress = ({ target, key }) => MenuUpdate(target, key));
};
