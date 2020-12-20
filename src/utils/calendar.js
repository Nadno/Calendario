import date, { getDate } from "../date";
import storage from "./storage";

const calendar = {
  // const save = () => {
  //   storage.save(this.calendar);
  // }

  data: storage.find(),
  selected: {},

  getNotifications() {
    return Object.assign([], calendar.notifications);
  },

  finalizeNotification(position) {
    calendar.notifications.splice(position, 1);
    save();
  },

  getMonth(callback) {
    const { year, month } = position;
    return callback(calendar[year][month]);
  },

  getDaysWithItems() {
    const { year, month } = position;
    return Object.keys(calendar[year][month]).map((day) => {
      const { tasks, events } = calendar[year][month][day];
      return {
        day,
        hasTasks: tasks.length ? true : false,
        hasEvents: events.length ? true : false,
      };
    });
  },

  setDayWithItems() {
    getDaysWithItems().forEach(({ day, hasTasks, hasEvents }) => {
      const dayElement = document.getElementById(day);

      if (hasTasks && hasEvents) {
        dayElement.insertAdjacentHTML(
          "afterbegin",
          '<div class="has__both" title="Há Eventos e Tarefas para este dia."></div>'
        );
      } else if (hasTasks) {
        dayElement.insertAdjacentHTML(
          "afterbegin",
          '<div class="has__task" title="Há Tarefas para este dia."></div>'
        );
      } else if (hasEvents) {
        dayElement.insertAdjacentHTML(
          "afterbegin",
          '<div class="has__event" title="Há Eventos para este dia."></div>'
        );
      }
    });
  },

  removeMarkFromDays() {
    const hasEvent = Array.from(document.querySelectorAll(".has__event"));
    const hasTask = Array.from(document.querySelectorAll(".has__task"));
    const hasBoth = Array.from(document.querySelectorAll(".has__both"));

    hasEvent.forEach((mark) => mark.remove());
    hasTask.forEach((mark) => mark.remove());
    hasBoth.forEach((mark) => mark.remove());
  },

  setLastConnection({ day, month }) {
    const NEW_DAY = day !== calendar.lastConnection.day;
    const NEW_MONTH = month !== calendar.lastConnection.month;

    if (NEW_DAY || NEW_MONTH) {
      calendar.lastConnection.month = month;
      calendar.lastConnection.day = day;
    }
  },

  getLastConnection() {
    return {
      day: calendar.lastConnection.day,
      month: calendar.lastConnection.month,
    };
  },

  checkIfDayExists() {
    const { year, month, day } = getDate("selected");
    if (calendar.data[year]?.[month]?.[day]) return;
    Object.assign(calendar.data[year][month], {
      [day]: {
        tasks: [],
        events: [],
      },
    });
  },

  checkIfYearExists() {
    const year = date.selected.year;
    if (calendar.data[year]) return;

    Object.assign(calendar.data, {
      [year]: {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {},
      },
    });
  },
};

export default calendar;
