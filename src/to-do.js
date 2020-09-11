import Storage from "./storage";

const storage = Storage();
storage.getCalendarDataOnStorage();

class ToDo {
  constructor() {
    this.ToDo = { text: "", checked: false };
    this.calendar = storage.getCalendarData();
    this.position = {
      year: 0,
      month: 0,
      day: 0,
    };
  };

  setPosition(year, month, day) {
    Object.assign(this.position, {
      year, month, day,
    });
    return this;
  };
  
  createNewDay() {
    const { year, month, day } = this.position;
    Object.assign(this.calendar[year][month].days, {
      [day]: [],
    });
  };

  addOnDay() {
    const { year, month, day } = this.position;
    this.checkIfYearExists();

    if (!this.calendar[year][month].days[day]) {
      this.createNewDay({
        year, month, day,
      });
    };

    Object.assign(this.calendar[year][month].days, {
      [day]: [...this.calendar[year][month].days[day], { text: this.ToDo, checked: false }],
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
  };

  checkIfYearExists() {
    const { year } = this.position;
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

  createToDo(text) {
    this.ToDo.text = text;
    return this;
  }

  deleteToDo() {
    return this;
  }

  update(functionToUpdate) {
    functionToUpdate(this.calendar);
    return this;
  }
}

export default ToDo;
