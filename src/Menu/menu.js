import element from "../Calendar/elements";
import Task from "../utils/task";
import Notify from "../utils/notify";

import { createNotify, createTask } from "../createElement";
import { getDate } from "../date";

import "../utils/updateDate";

const Menu = {
  active: function (toggle) {
    if (toggle) return element.menu.self.classList.add("on");
    return element.menu.self.classList.remove("on");
  },

  setEvents: function () {
    const { month, year, day } = getDate("selected");

    element.menu.title.innerHTML = "";
    element.menu.taskTitle.innerHTML = "Eventos:";
    Notify.selectDate({ year, month, day }).get(show);
  },

  setDay: function () {
    const { day, week_day, month, year } = getDate("selected");
    const newFullDate = `${getDate("DAY_NAME")[week_day]}, ${day} de ${
      getDate("MONTH_NAME")[month]
    }`;

    element.menu.title.innerHTML = newFullDate;
    element.menu.taskTitle.innerHTML = "Tarefas:";
    Task.selectDate({ year, month, day }).get(show);
  },

  setDaily: function () {
    const { month, year } = getDate("selected");

    element.menu.title.innerHTML = "";
    element.menu.taskTitle.innerHTML = "Tarefas diárias:";
    Task.selectDate({ year, month, day: 0 }).get(show);
  },

  create: {
    todo: ({ body }) => Task.create(body()).save().get(show),
    event: (content) => Notify.get().createEvent(content).save().get(show),
  },

  task: {
    update: function (position, item, value) {
      Task.update(position, item, value).save();
    },

    delete: function (from, to = 1) {
      Task.delete(from, to).save().get(show);
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
      return () => Notify.delete(position, 1).save().get(show);
    },
  },
};

function show(items, type) {
  element.menu.list.innerHTML = items.length
    ? ""
    : '<div class="alert">Nada encontrado!</div>';

  const createElement = {
    task: createTask,
    notify: createNotify,
  };
  const change = {
    task: Menu.task.changeContent,
    notify: Menu.notify.delete,
  };

  items.forEach((item, position) => {
    element.menu.list.appendChild(
      createElement[type](item, change[type](position), position)
    );
  });
}

function showNotifications(notifications) {
  element.notifications.innerHTML = "";

  notifications.forEach((notify, position) => {
    element.notifications.appendChild(
      createNotify(notify, deleteNotify(position))
    );
  });
}

Task.get(show);

export default Menu;
