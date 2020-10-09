import element from "../Calendar/elements";
import Task from "../utils/task";
import Notify from "../utils/notify";

import { createNotify, createTask } from "../createElement";
import { getDate } from "../date";

import "../utils/updateDate";

function showNotifications(notifications) {
  element.notifications.innerHTML = "";

  notifications.forEach((notify, position) => {
    element.notifications.appendChild(
      createNotify(notify, deleteNotify(position))
    );
  });
}

function deleteNotify(position) {
  return () => Notify.delete(position, 1).get(showNotifications);
}

const Menu = {
  active: function (toggle) {
    if (toggle) return element.menu.self.classList.add("on");
    return element.menu.self.classList.remove("on");
  },

  setDay: function () {
    const { day, week_day, month, year } = getDate("selected");
    const newFullDate = `${getDate("DAY_NAME")[week_day]}, ${day} de ${
      getDate("MONTH_NAME")[month]
    }`;

    element.menu.title.innerHTML = newFullDate;
    element.menu.taskTitle.innerHTML = "Tarefas:";
    Task.selectDate({ year, month, day }).get(showToDo);
    Notify.selectDate({ year, month, day });
  },

  setDaily: function () {
    const { month, year } = getDate("selected");

    element.menu.title.innerHTML = "";
    element.menu.taskTitle.innerHTML = "Tarefas diárias:";
    Task.selectDate({ year, month, day: 0 }).get(showToDo);
    Notify.selectDate({ year, month, day: 0 });
  },

  create: {
    todo: ({ body }) => Task.create(body()).save().get(showToDo),
    event: (content) => Notify.get().createEvent(content),
  },

  updateToDo: function (position, item, value) {
    Task.update(position, item, value).save();
  },

  deleteToDo: function (from, to = 1) {
    Task.delete(from, to).save().get(showToDo);
  },
};

function changeContent(position) {
  return function ({ target }) {
    const text = String(target.textContent).trim();
    if (text === "")
      return Menu.deleteToDo(position);
    Menu.updateToDo(position, "text", text);
  };
}

function showToDo(tasks) {
  element.menu.list.innerHTML = "";
  tasks.forEach(({ text, checked }, position) => {
    element.menu.list.appendChild(
      createTask({
        text,
        checked,
        position,
        changeContent: changeContent(position),
      })
    );
  });
}

Task.get(showToDo);

export default Menu;
