import { render } from "./menu";

class Storage {
  constructor() {
    this.data;
  }

  save(data) {}

  delete(month, day, position) {}

  getStorage(year) {
    const save = JSON.parse(localStorage.getItem(year));
    if (save) this.data = save;

    this.data = {
      Daily: [],
    };
  }
}

class todoItems extends Storage {
  constructor(year, month) {
    super();
    this.getStorage(2324);
    this.calendar = {
      year,
      month,
    };
  };

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
    };
    Object.assign(this.data[year][month], {
      [day]: [{ task, checked }]
    });
    
    return this;
  };

  addNewToDoOnDaily() {
    this.data.Daily.push(this.ToDo);
    return this;
  };

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
    render(this.data[2020][8][2]);
    return this;
  }
}

export default todoItems;
