import { actual, DAY, MONTH, YEAR } from "../date";
import Storage from "./storage";

const CALENDAR = "cronos";

class CalendarData {
  constructor() {
    this.calendar = Storage.get(CALENDAR);
    this.position = {
      year: actual.get(YEAR),
      month: actual.get(MONTH),
      day: 0,
    };

    this.selected;
  }

  setLastConnection() {
    this.calendar.lastConnection.year = actual.get(YEAR);
    this.calendar.lastConnection.month = actual.get(MONTH);
    this.calendar.lastConnection.day = actual.get(DAY);

    return this;
  }

  isNewDay() {
    const IS_NEW_DAY = this.calendar.lastConnection.day >= actual.get(DAY);
    const IS_NEW_MONTH = this.calendar.lastConnection.month !== actual.get(MONTH);
    return IS_NEW_DAY || IS_NEW_MONTH;
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
