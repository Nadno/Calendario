import { render } from "./menu";

class todoItems {
  constructor (save) {
    save ? this.save = save : this.save = {
      "0": {},
      "1": {},
      "2": {},
      "3": {},
      "4": {},
      "5": {},
      "6": {},
      "7": {},
      "8": {},
      "9": {},
      "10": {},
      "11": {},
    };
    this.ToDo = { task: "", checked: false };
  };

  addNewToDo (day, month) {
    const { task, checked } = this.ToDo;
    if (this.save[month][day]) {
      Object.assign(this.save[month], {
        [day]: [...this.save[month][day], { task, checked }],
      });
    } else {
      Object.assign(this.save[month], {
        [day]: [{ task, checked }],
      });
    };
    console.log(this.save[month][day]);
    return this;
  };

  createToDo (ToDo) {
    this.ToDo = { task: ToDo, checked: false };
    return this;
  };

  deleteToDo () {
   
    return this;
  };

  update () {
    render(this.save[8][2]);
    return this;
  }
  
};

export default todoItems;