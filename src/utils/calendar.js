import { actual } from "../date";
import Storage from "./storage";

const CALENDAR = "cronos";

class CalendarData {
  constructor() {
    this.calendar = Storage.get(CALENDAR);
    this.position = {
      year: actual.get("year"),
      month: actual.get("month"),
      day: 0,
    };

    this.selected;
  }

  setConnection(year, month, day) {
    this.calendar.lastConnection.year = year;
    this.calendar.lastConnection.month = month;
    this.calendar.lastConnection.day = day;
    console.log(this.calendar.lastConnection);
    return this;
  }

  isNewDay(year, month, day) {
    return (
      year > this.calendar.lastConnection.year ||
      month > this.calendar.lastConnection.month ||
      day > this.calendar.lastConnection.day
    );
  }

  selectDate({ year, month, day }) {
    if (year) this.position.year = year;
    if (month >= 0 && month <= 11) this.position.month = month;
    if (day >= 0) this.position.day = day;
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

export default CalendarData;
