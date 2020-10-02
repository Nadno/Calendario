import Storage from "./storage";

const CALENDAR = "cronos";

class Calendar {
  constructor() {
    this.calendar = Storage.get(CALENDAR).getData();
    this.position = {
      year: 0,
      month: 0,
      day: 0,
    };
    this.ToDo = { text: "", checked: false };
    this.selected;
  }

  selectDate({ year, month, day }) {
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

  save() {
    Storage.set(this.calendar).save();
    return this;
  }
  
}

export default Calendar;
