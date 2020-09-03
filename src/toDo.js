import Storage from "./storage";
import { update } from "./menu";

class ToDo extends Storage {
  constructor(year, month) {
    super();
    this.calendar = {
      year,
      month,
    };
    this.getStorage(year);
  }

  addNewToDoOnDay(day) {
    this.checkIfYearExists();
    const { task, checked } = this.ToDo;
    const { year, month } = this.calendar;

    if (this.data[year][month][day]) {
      Object.assign(this.data[year][month][day], [
        ...this.data[year][month][day],
        { task, checked },
      ]);

      return this;
    }
    Object.assign(this.data[year][month], {
      [day]: [{ task, checked }],
    });

    return this;
  }

  addNewToDoOnDaily() {
    this.data.Daily.push(this.ToDo);
    return this;
  }

  checkIfYearExists() {
    const { year } = this.calendar;
    if (this.data[year]) return this;

    Object.assign(this.data, {
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
    return this;
  }

  createToDo(ToDo) {
    this.ToDo = { task: ToDo, checked: false };
    return this;
  }

  deleteToDo() {
    return this;
  }

  update() {
    const { year, month } = this.calendar;
    const Month = this.data[year][month];
    update(Month);
    return this;
  }
}

export default ToDo;
