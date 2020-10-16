import element from "../Calendar/elements";
import setInitialDate from "../utils/date";
import checkEvents from "../utils/updateDate";

import Notify from "../utils/notify";
import Task from "../utils/task";

import { createNotify, createTask } from "../createElement";
import { getDate, nameOf, selected, DAY, MONTH, WEEK_DAY } from "../date";

import "../utils/updateDate";

export default function () {
  setInitialDate(Notify, Task);
  checkEvents(Notify);
  function renderOnMenu(items, type) {
    element.menu.list.innerHTML = items.length
      ? ""
      : '<div class="alert">Nada encontrado!</div>';

    const createElement = {
      tasks: (item, position) =>  createTask(item, Menu.task.changeContent(position), position),
      events: (item, position) => createNotify(item, Menu.notify.delete(position)),
    };


    items.forEach((item, position) => {
      element.menu.list.appendChild(createElement[type](item, position));
    });
  }

  const SET = {
    Task: (title) => {
      Menu.setTitle(title);
      Task.selectDate(getDate("selected")).get(renderOnMenu);
    },
    Notify: (title) => {
      Menu.setTitle(title);
      Notify.selectDate(getDate("selected")).get(renderOnMenu);
    },
  };

  const Menu = {
    active: function (toggle) {
      if (toggle) return element.menu.self.classList.add("on");
      return element.menu.self.classList.remove("on");
    },

    setDateTitle: (title) => element.menu.title.innerHTML = title,
    setTitle: (title) =>  element.menu.taskTitle.innerHTML = title,

    setDay: function (type) {
      Menu.setDateTitle(
       `${nameOf.day(selected.get(WEEK_DAY))}, 
        ${selected.get(DAY)} de 
        ${nameOf.month(selected.get(MONTH))}
      `);
      SET[type.for](type.title);
    },

    exitDay: function (type) {
      Menu.setDateTitle("");
      SET[type.for](type.title);
    },
    
    create: {
      todo: ({ body }) => Task.create(body()).save().get(renderOnMenu),
      event: (content) =>
        Notify.createEvent(content, selected.get(WEEK_DAY)).save().get(renderOnMenu),
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
