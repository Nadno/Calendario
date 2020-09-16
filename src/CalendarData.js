import Storage from "./storage";

const CALENDAR = "cronos";

class CalendarData {
  constructor() {
    this.ToDo = { text: "", checked: false };
    this.calendar = Storage.get(CALENDAR).getData();
    this.position = {
      year: 0,
      month: 0,
      day: 0,
    };
  }

  save() {
    Storage.set(this.calendar).save();
    return this;
  }

  create(text) {
    if (text.trim() === "") return;
    this.ToDo.text = text;
    return this;
  }

  createNewDay() {
    const { year, month, day } = this.position;
    Object.assign(this.calendar[year][month].days, {
      [day]: [],
    });
  }

  addOnDay() {
    const { year, month, day } = this.position;
    this.checkIfYearExists(year);
    if (!this.calendar[year][month].days[day]) {
      this.createNewDay({
        year,
        month,
        day,
      });
    }

    const { text, checked } = this.ToDo;
    Object.assign(this.calendar[year][month].days, {
      [day]: [...this.calendar[year][month].days[day], { text, checked }],
    });

    return this;
  }

  addOnDaily() {
    const { text, checked } = this.ToDo;
    this.calendar.daily.push({
      text,
      checked,
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

  updateDaily(to_do, checked) {
    this.calendar.daily[to_do].checked = checked;
    return this;
  }

  updateDay(to_do, checked) {
    const { day, month, year } = this.position;
    this.calendar[year][month].days[day][to_do].checked = checked;
    return this;
  }

  delete() {
    const { day, month, year } = this.position;

    return this;
  }

  getDay(callback) {
    const { day, month, year } = this.position;
    return callback(this.calendar[year]?.[month]?.days?.[day] || []);
  }

  getDaily(callback) {
    return callback(this.calendar?.daily);
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
}

export default new CalendarData;
