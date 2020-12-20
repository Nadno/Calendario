import Notify from "../utils/notify";
import element from "../Calendar/elements";

import { createNotify, createTask } from "../createElement";

import date, {
  getDate,
  selected,
  DAY,
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

  menu.createItem = function createItem({ eventsOn, body, title }) {
    if (eventsOn) {
      Notify.createEvent({ title, body });
    } else {
      calendar.createTask(body);
      calendar.getTask(menu.render);
    }
  };

  menu.deleteItem = function deleteItem({ eventsOn, from, to }) {
    if (eventsOn) {
    } else {
      calendar.deleteTask(from, to);
    }
  };

  menu.list.addEventListener("change", ({ target }) => {
    const getPosition = (id) => Number(id.slice(7, 11).trim());
    calendar.updateTask(getPosition(target.id), "checked", target.checked);
  });

  menu.changeContent = function (position) {
    return function ({ target }) {
      const text = String(target.textContent).trim();
      if (!text) {
        calendar.deleteTask(from, to);
        return calendar.getTask(menu.render);
      }
      calendar.updateTask(position, "text", text);
    };
  };

  menu.notify = {
    delete: function (position) {
      return () => Notify.delete(position, 1).get(menu.render);
    },
  };

  menu.createElement = {
    tasks: (item, position) =>
      createTask(item, menu.changeContent(position), position),
    events: (item, position) => {
      if (selected.get(DAY))
        return createNotify(item, menu.notify.delete(position));
      return createNotify(item);
    },
  };
}
