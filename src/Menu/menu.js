import element from "../Calendar/elements";
import setInitialDate from "../utils/date";
import checkEvents from "../utils/updateDate";

import Notify from "../utils/notify";
import Task from "../utils/task";

import { createNotify, createTask } from "../createElement";
import { getDate, nameOf } from "../date";

import "../utils/updateDate";

export default function () {
  setInitialDate(Notify, Task);
  checkEvents(Notify);

  function renderOnMenu(items, type) {
    element.menu.list.innerHTML = items.length
      ? ""
      : '<div class="alert">Nada encontrado!</div>';

    const createElement = {
      tasks: createTask,
      events: createNotify,
    };

    const change = {
      tasks: Menu.task.changeContent,
      events: Menu.notify.delete,
    };

    items.forEach((item, position) => {
      element.menu.list.appendChild(
        createElement[type](item, change[type](position), position)
      );
    });
  }

  const Menu = {
    active: function (toggle) {
      if (toggle) return element.menu.self.classList.add("on");
      return element.menu.self.classList.remove("on");
    },

    setDateTitle: (title) => element.menu.title.innerHTML = title,
    setTitle: (title) =>  element.menu.taskTitle.innerHTML = title,

    setDay: function (forType) {
      const { day, week_day, month, year } = getDate("selected");
      const SET = {
        Task: () => {
          Menu.setTitle("Tarefas: ");
          Task.selectDate({ day, month, year }).get(renderOnMenu);
          console.log("exit Task");
        },
        Notify: () => {
          Menu.setTitle("Eventos: ");
          Notify.selectDate({ day, month, year }).get(renderOnMenu);
          console.log("exit Notify");
        },
      };
      
      Menu.setDateTitle(`${nameOf.day(week_day)}, ${day} de ${nameOf.month(month)}`);
      SET[forType]();
    },

    exitDay: function (forType) {
      const SET = {
        Task: () => {
          Menu.setTitle("Tarefas diárias: ");
          Task.selectDate(getDate("selected")).get(renderOnMenu);
        },
        Notify: () => {
          Menu.setTitle("Eventos do mês: ");
          Notify.selectDate(getDate("selected")).get(renderOnMenu);
        },
      };

      Menu.setDateTitle("");
      SET[forType]();
    },
    
    create: {
      todo: ({ body }) => Task.create(body()).save().get(renderOnMenu),
      event: (content) =>
        Notify.createEvent(content).save().get(renderOnMenu),
    },

    task: {
      update: function (position, item, value) {
        Task.update(position, item, value).save();
      },

      delete: function (from, to = 1) {
        Task.delete(from, to).save().get(renderOnMenu);
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
        return () => Notify.delete(position, 1).save().get(renderOnMenu);
      },
    },
  };

  Task.get(renderOnMenu);
  return Menu;
}
