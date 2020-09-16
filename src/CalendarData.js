import Storage from "./storage";

const CALENDAR = "cronos";

class CalendarData {
  constructor() {
    this.calendar = Storage.get(CALENDAR).getData();
    this.position = {
      year: 0,
      month: 0,
      day: 0,
    };
    this.dayExist = false;

    this.ToDo = { text: "", checked: false };
    this.selected;
  }

  save() {
    Storage.set(this.calendar).save();
    return this;
  }

  get(callback) {
    const { day, month, year } = this.position;
    this.checkIfYearExists(year);

    this.selected = day
      ? this.calendar?.[year]?.[month]?.days?.[day] || []
      : this.calendar.daily;
  
    if (callback) return callback(this.selected || []);
    return this;
  }

  add() {
    if (this.position.day !== 0) this.checkIfDayExists().get();
    const { text, checked } = this.ToDo;

    this.selected.push({ text, checked });
    return this;
  }

  update(position, checked) {
    this.selected[position].checked = checked;
    return this;
  }

  create(text) {
    if (text.trim() === "") return;
    this.ToDo.text = text;
    return this;
  }

  delete({ from, to }) {
    this.selected.splice(from, to);
    return this;
  }

  setPosition(year, month, day) {
    Object.assign(this.position, {
      year,
      month,
      day,
    });
    console.log(this.position);
    return this;
  }

  checkIfDayExists() {
    const { year, month, day } = this.position;
    if (this.calendar[year][month].days?.[day]) return this;

    Object.assign(this.calendar[year][month].days, {
      [day]: [],
    });
    return this;
  }

  checkIfYearExists(year) {
    if (this.calendar[year]) return this;
    const days = {};

    Object.assign(this.calendar, {
      [year]: {
        0: {
          days,
        },
        1: {
          days,
        },
        2: {
          days,
        },
        3: {
          days,
        },
        4: {
          days,
        },
        5: {
          days,
        },
        6: {
          days,
        },
        7: {
          days,
        },
        8: {
          days,
        },
        9: {
          days,
        },
        10: {
          days,
        },
        11: {
          days,
        },
      },
    });
    return this;
  }
  
}

export default new CalendarData();
