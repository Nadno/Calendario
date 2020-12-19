import Notify from "../utils/notify";
import element from "../Calendar/elements";

import { createNotify, createTask } from "../createElement";

import {
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

export default function (Menu) {
  const setMenuDateTo = (name) => {
    let get;
    if (name === "selected") {
      get = selected.get;
    } else {
      get = actual.get;
    }

    element.menu.date.setAttribute(
      "datetime",
      `${get(YEAR)}-${get(MONTH)}-${get(DAY)}`
    );

    element.menu.date.innerHTML = `<strong>
      ${nameOf.day(get(WEEK_DAY))}, 
      ${get(DAY)} de 
      ${nameOf.month(get(MONTH))}
    </strong>`;
  };
  const setTitle = (title) => (element.menu.taskTitle.innerHTML = title);

  const SET = {
    Task: (title) => {
      Object.assign(calendar.position, getDate("selected"));
      setTitle(title);
      calendar.getTask(Menu.render);
    },
    Notify: (title) => {
      Notify.selectDate(getDate("selected"));
      setTitle(title);
      Notify.get(Menu.render);
    },
  };

  Menu.active = function (toggle) {
    if (toggle) return element.menu.self.classList.add("on");
    return element.menu.self.classList.remove("on");
  };

  Menu.setDay = function (type) {
    setMenuDateTo("selected");
    SET[type.for](type.title);
  };

  Menu.exitDay = function (type) {
    setMenuDateTo("actual");
    SET[type.for](type.title);
  };

  Menu.create = {
    todo: ({ body }) => {
      calendar.createTask(body());
      calendar.getTask(Menu.render);
    },
    event: (content) =>
      Notify.createEvent(content, selected.get(WEEK_DAY)).get(Menu.render),
  };

  Menu.task = {
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
          Menu.task.delete(position);
          return calendar.getTask(Menu.render);
        }
        Menu.task.update(position, "text", text);
      };
    },
  };

  Menu.notify = {
    delete: function (position) {
      return () => Notify.delete(position, 1).get(Menu.render);
    },
  };

  Menu.createElement = {
    tasks: (item, position) =>
      createTask(item, Menu.task.changeContent(position), position),
    events: (item, position) => {
      if (selected.get(DAY))
        return createNotify(item, Menu.notify.delete(position));
      return createNotify(item);
    },
  };
}
