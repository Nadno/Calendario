import menuInputs from "./inputs";

import setMenuActions from "../utils/setMenuActions";

import date, { selected, DAY, TOTAL_DAYS } from "../date";

import "../utils/updateDate";



const menu = {
  element: document.querySelector(".menu"),
  date: document.querySelector(".selected__day"),
  list: document.querySelector(".todo__list"),
  title: document.querySelector("#task-title"),
  events: document.querySelector("#event"),
};

setMenuActions(menu);

export default function () {
  // menu.render = function () {
  //   const createElement = date.eventsOn ? createNotify : createTask;
  //   const items = date.eventsOn ? calendar.getNotify() : calendar.getTask();

  //   menu.list.innerHTML = items.length
  //     ? ""
  //     : '<div class="alert">Nada encontrado!</div>';

  //   function addItemOnMenu(item, position) {
  //     menu.list.appendChild(createElement(item, menu.changeContent, position));
  //   }

  //   items.forEach(addItemOnMenu);

  //   const itemsElements = Array.from(
  //     document.querySelector(".todo__list").childNodes
  //   );
  //   const render = () => itemsElements.forEach(renderItemOnMenu);
  //   render();

  //   menu.list.addEventListener("scroll", render);
  // };

  menuInputs(menu);
  menu.render();
  return menu;
}

const dayElement = (day) => document.getElementById(day);
const setMenuTo = {
  SAME_DAY: (day) => {
    dayElement(day).classList.remove("selected");
    date.selected.day = 0;

    menu.setTitle("Tarefas diárias:");
    menu.setMenuDateTo("actual");
    menu.render();
  },

  DAY: (day, week_day) => {
    dayElement(day).classList.add("selected");
    Object.assign(date.selected, {
      day,
      week_day,
    });

    menu.setTitle("Tarefas:");
    menu.setMenuDateTo("selected");
    menu.render();
  },
};

export function menuUpdate(day, week_day) {
  if (day < 0 || day > selected.get(TOTAL_DAYS)) return;

  return function setDay() {
    if (date.selected.day) {
      dayElement(date.selected.day).classList.remove("selected");
    }
    const action = date.selected.day === day ? "SAME_DAY" : "DAY";
    setMenuTo[action](day, week_day);
  };
}
