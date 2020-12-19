import element from "../Calendar/elements";
import menuInputs from "./inputs";

import createMenu from "../utils/menu";

import { selected, DAY, WEEK_DAY, TOTAL_DAYS } from "../date";

import "../utils/updateDate";

let Menu = {};

function isOnScreen(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top > 0 &&
    rect.bottom <
      document.querySelector(".todo__list").getBoundingClientRect().bottom
  );
}

function renderItemOnMenu(item) {
  if (isOnScreen(item)) return item.classList.add("on-screen");
}

export default function (calendar) {
  Menu.render = function (items, type) {
    element.menu.list.innerHTML = items.length
      ? ""
      : '<div class="alert">Nada encontrado!</div>';

    function addItemOnMenu(item, position) {
      element.menu.list.appendChild(Menu.createElement[type](item, position));
    }

    items.forEach(addItemOnMenu);

    const itemsElements = Array.from(
      document.querySelector(".todo__list").childNodes
    );
    const render = () => itemsElements.forEach(renderItemOnMenu);
    render();

    element.menu.list.addEventListener("scroll", render);
  };

  createMenu(Menu);
  menuInputs(Menu);
  calendar.getTask(Menu.render);
  return Menu;
}

export function menuUpdate(day, week_day) {
  if (day < 0 || day > selected.get(TOTAL_DAYS)) return;
  const DAY_OR_SAME_DAY = () =>
    selected.get(DAY) === day ? "SAME_DAY" : "DAY";
  const eventActive = () => element.create.eventActive.checked;
  const dayElement = () => document.getElementById(day);

  const set = {
    SAME_DAY: () => {
      dayElement().classList.remove("selected");
      selected.set(DAY, 0);

      Menu.exitDay(
        eventActive()
          ? { for: "Notify", title: "Eventos do mês: " }
          : { for: "Task", title: "Tarefas diárias: " }
      );
    },

    DAY: () => {
      dayElement().classList.add("selected");
      selected.set(DAY, day);
      selected.set(WEEK_DAY, week_day);

      Menu.setDay(
        eventActive()
          ? { for: "Notify", title: "Eventos: " }
          : { for: "Task", title: "Tarefas: " }
      );
    },
  };

  return function () {
    if (selected.get(DAY)) {
      document.getElementById(selected.get(DAY)).classList.remove("selected");
    }

    set[DAY_OR_SAME_DAY()]();
  };
}
