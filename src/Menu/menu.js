import CalendarData from "../utils/calendar";
import element from "../Calendar/elements";
import menuInputs from "./inputs";

import { createNotify, createTask } from "../createElement";
import { getDate, nameOf, selected, DAY, MONTH, WEEK_DAY, TOTAL_DAYS } from "../date";

import "../utils/updateDate";

let Menu = {};

function isOnScreen(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top > 0 &&
    rect.bottom <
      document.querySelector(".listing__todo").getBoundingClientRect().bottom
  );
}

function renderItemOnMenu(item) {
  if (isOnScreen(item)) return item.classList.add("on-screen");
}

export default function (Notify, Task) {
  function renderOnMenu(items, type) {
    element.menu.list.innerHTML = items.length
      ? ""
      : '<div class="alert">Nada encontrado!</div>';

    function addItemOnMenu(item, position) {
      element.menu.list.appendChild(Menu.createElement[type](item, position));
    }

    items.forEach(addItemOnMenu);

    const itemsElements = Array.from(
      document.querySelector(".listing__todo").childNodes
    );
    const render = () => itemsElements.forEach(renderItemOnMenu);
    render();

    element.menu.list.addEventListener("scroll", render);
  }

  const SET = {
    Task: (title) => {
      CalendarData.selectDate(getDate("selected"));
      Menu.setTitle(title);
      Task.get(renderOnMenu);
    },
    Notify: (title) => {
      CalendarData.selectDate(getDate("selected"));
      Menu.setTitle(title);
      Notify.get(renderOnMenu);
    },
  };

  Menu = {
    active: function (toggle) {
      if (toggle) return element.menu.self.classList.add("on");
      return element.menu.self.classList.remove("on");
    },

    setDateTitle: (title) => (element.menu.title.innerHTML = title),
    setTitle: (title) => (element.menu.taskTitle.innerHTML = title),

    setDay: function (type) {
      Menu.setDateTitle(
        `${nameOf.day(selected.get(WEEK_DAY))}, 
        ${selected.get(DAY)} de 
        ${nameOf.month(selected.get(MONTH))}
      `
      );
      SET[type.for](type.title);
    },

    exitDay: function (type) {
      Menu.setDateTitle("");
      SET[type.for](type.title);
    },

    create: {
      todo: ({ body }) => Task.create(body()).get(renderOnMenu),
      event: (content) =>
        Notify.createEvent(content, selected.get(WEEK_DAY))
          .get(renderOnMenu),
    },

    task: {
      update: function (position, item, value) {
        Task.update(position, item, value);
      },

      delete: function (from, to = 1) {
        Task.delete(from, to).get(renderOnMenu);
      },

      changeContent: function (position) {
        return function ({ target }) {
          const text = String(target.textContent).trim();
          if (!text) return Menu.task.delete(position);
          Menu.task.update(position, "text", text);
        };
      },
    },

    notify: {
      delete: function (position) {
        return () => Notify.delete(position, 1).get(renderOnMenu);
      },
    },

    createElement: {
      tasks: (item, position) =>
        createTask(item, Menu.task.changeContent(position), position),
      events: (item, position) => {
        if (selected.get(DAY)) return createNotify(item, Menu.notify.delete(position));
        return createNotify(item);
      },
    },
  };

  Task.get(renderOnMenu);
  menuInputs(Menu);
  return Menu;
}

export function menuUpdate(day, week_day) {
  if (day < 0 || day > selected.get(TOTAL_DAYS)) return;
  const DAY_OR_SAME_DAY = () => selected.get(DAY) === day ? "SAME_DAY" : "DAY";
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
