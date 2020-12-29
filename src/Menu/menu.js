import menuInputs from "./inputs";

import setMenuActions from "../setMenuActions";

import date from "../date";

import "../utils/updateDate";

const menu = {
  element: document.querySelector(".menu"),
  date: document.querySelector(".selected__day"),
  list: document.querySelector(".todo__list"),
  title: document.querySelector("#task-title"),
  events: document.querySelector("#event"),
};


export default function startMenu() {
  setMenuActions(menu);
  menuInputs(menu);
  menu.render();
}

const dayElement = (day) => document.getElementById(day);
const setMenuTo = {
  SAME_DAY: (day) => {
    dayElement(day).classList.remove("selected");
    date.selected.day = 0;

    menu.setTitle("Tarefas diárias:");
    menu.setMenuDateTo("");
  },

  DAY: (day, week_day) => {
    dayElement(day).classList.add("selected");
    Object.assign(date.selected, {
      day,
      week_day,
    });

    menu.setTitle("Tarefas:");
    menu.setMenuDateTo("selected");
  },
};

export function menuUpdate(day, week_day) {
  if (day < 0 || day > date.selected.total_days) return;

  return function setDay() {
    if (date.selected.day) {
      dayElement(date.selected.day).classList.remove("selected");
    }
    const action = date.selected.day === day ? "SAME_DAY" : "DAY";
    setMenuTo[action](day, week_day);
    menu.render();
  };
}
