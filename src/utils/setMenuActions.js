import Notify from "../utils/notify";
import element from "../Calendar/elements";

import { createNotify, createTask } from "../createElement";

import date, { getDate, selected, DAY } from "../date";

import calendar from "./calendar";
import setMenuRender from "./setMenuRender";

export default function setMenuActions(menu) {
  setMenuRender(menu, calendar);

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

  menu.active = function (toggle) {
    if (toggle) return element.menu.self.classList.add("on");
    return element.menu.self.classList.remove("on");
  };

  menu.exitDay = function (type) {
    setMenuDateTo("actual");
    SET[type.for](type.title);
  };

  menu.events.addEventListener("change", function setEvents({ target }) {
    date.eventsOn = target.checked;
    if (target.checked) {
      document.querySelector(".event__config").classList.add("active");
      menu.render();
    } else {
      document.querySelector(".event__config").classList.remove("active");
      menu.render();
    }
    console.log(calendar);
  });

  menu.createItem = function createItem({ eventsOn, body, title }) {
    if (eventsOn) {
      calendar.createEvent({ title, body, week_day: date.selected.week_day });
    } else {
      calendar.createTask(body);
    }
    menu.render();
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
        calendar.deleteTask(position);
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
}
