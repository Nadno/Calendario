import Notify from "../utils/notify";
import element from "../Calendar/elements";

import { createNotify, createTask } from "../createElement";

import date, {
  getDate,
  nameOf,
  selected,
  actual,
  DAY,
  MONTH,
  YEAR,
  WEEK_DAY,
} from "../date";

import calendar from "./calendar";

export default function setMenuActions(menu) {
  menu.setMenuDateTo = (name) => {
    menu.date.setAttribute(
      "datetime",
      `${date[name].year}-${date[name].month}-${date[name].day}`
    );

    menu.date.innerHTML = `<strong>
      ${date.DAY_NAME[date[name].week_day]}, 
      ${date[name].day} de 
      ${date.MONTH_NAME[date[name].month]}
    </strong>`;
  };
  menu.setTitle = (title) => (menu.title.innerHTML = title);

  const SET = {
    Notify: (title) => {
      Notify.selectDate(getDate("selected"));
      setTitle(title);
      Notify.get(menu.render);
    },
  };

  menu.active = function (toggle) {
    if (toggle) return element.menu.self.classList.add("on");
    return element.menu.self.classList.remove("on");
  };

  menu.renderTasks = function () {
    calendar.getTask(menu.render);
  };

  menu.exitDay = function (type) {
    setMenuDateTo("actual");
    SET[type.for](type.title);
  };

  menu.create = {
    todo: ({ body }) => {
      calendar.createTask(body());
      calendar.getTask(menu.render);
    },
    event: (content) =>
      Notify.createEvent(content, selected.get(WEEK_DAY)).get(menu.render),
  };

  menu.task = {
    update: function (position, item, value) {
      calendar.updateTask(position, item, value);
    },

    delete: function (from, to = 1) {
      calendar.deleteTask(from, to);
    },

    changeContent: function (position) {
      return function ({ target }) {
        const text = String(target.textContent).trim();
        if (!text) {
          menu.task.delete(position);
          return calendar.getTask(menu.render);
        }
        menu.task.update(position, "text", text);
      };
    },
  };

  menu.notify = {
    delete: function (position) {
      return () => Notify.delete(position, 1).get(menu.render);
    },
  };

  menu.createElement = {
    tasks: (item, position) =>
      createTask(item, menu.task.changeContent(position), position),
    events: (item, position) => {
      if (selected.get(DAY))
        return createNotify(item, menu.notify.delete(position));
      return createNotify(item);
    },
  };
}
