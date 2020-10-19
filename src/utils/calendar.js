import Storage from "./storage";

const CALENDAR = "cronos";

class CalendarData {
  constructor() {
    this.calendar = Storage.get(CALENDAR);
    this.position = {
      year: 0,
      month: 0,
      day: 0,
    };
    this.selected;
  }

  getNotifications() {
    return Object.assign([], this.calendar.notifications);
  }

  finalizeNotification(position) {
    this.calendar.notifications.splice(position, 1);
    this.save();
  }

  getMonth(callback) {
    const { year, month } =this.position;
    return callback(this.calendar[year][month]);
  }

  getDaysWithItems() {
    const { year, month } = this.position;
    return Object.keys(this.calendar[year][month]).map((day) => {
      const { tasks, events } = this.calendar[year][month][day];
      return {
        day,
        hasTasks: tasks.length ? true : false,
        hasEvents: events.length ? true : false,
      };
    });
  }

  setDayWithItems() {
    this.getDaysWithItems().forEach(({ day, hasTasks, hasEvents }) => {
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
    return this;
  }

  removeMarkFromDays() {
    const hasEvent = Array.from(document.querySelectorAll(".has__event"));
    const hasTask = Array.from(document.querySelectorAll(".has__task"));
    const hasBoth = Array.from(document.querySelectorAll(".has__both"));

    hasEvent.forEach((mark) => mark.remove());
    hasTask.forEach((mark) => mark.remove());
    hasBoth.forEach((mark) => mark.remove());
    return this;
  }

  setLastConnection({ day, month }) {
    const NEW_DAY = day !== this.calendar.lastConnection.day;
    const NEW_MONTH = month !== this.calendar.lastConnection.month;

    if (NEW_DAY || NEW_MONTH) {
      this.calendar.lastConnection.month = month;
      this.calendar.lastConnection.day = day;
    };

    return this;
  }

  getLastConnection() {
    return {
      day: this.calendar.lastConnection.day,
      month: this.calendar.lastConnection.month,
    };
  }

  selectDate({ year, month, day }) {
    if (year) this.position.year = year;
    if (month >= 0 && month <= 11) this.position.month = month;
    if (day >= 0) this.position.day = day;
    
    this.checkIfYearExists();
    return this;
  }

  checkIfDayExists() {
    const { year, month, day } = this.position;
    if (this.calendar[year][month]?.[day]) return this;

    Object.assign(this.calendar[year][month], {
      [day]: {
        tasks: [],
        events: [],
      },
    });
    return this;
  }

  checkIfYearExists() {
    if (this.calendar[this.position.year]) return this;

    Object.assign(this.calendar, {
      [this.position.year]: {
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
    return this;
  }

  save() {
    Storage.set(this.calendar);
    return this;
  }
}

export default new CalendarData();
