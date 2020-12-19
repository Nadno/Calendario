import { getDate } from "../date";

const ITEM_TYPE = "tasks";

const task = (calendar) => {
  

  calendar.getTask = function getTask(callback) {
    const { day, month, year } = getDate("selected");

    if (day) {
      calendar.checkIfDayExists();
      calendar.selected = calendar.data[year][month][day][ITEM_TYPE];
    } else {
      calendar.selected = calendar.data.daily;
    }


  
    if (callback) return callback(Object.assign([], calendar.selected), ITEM_TYPE);
  }

  // update(position, item, value) {
  //   if (this.selected[position]) this.selected[position][item] = value;

  //   this.save();
  //   return this;
  // },

  // create(text) {
  //   if (!this.selected.length) {
  //     this.selected.push({ text, checked: false });

  //     removeMarkFromDays().setDayWithItems();
  //     return this;
  //   }
  //   this.selected.push({ text, checked: false });

  //   this.save();
  //   return this;
  // },

  // delete(from, to) {
  //   this.selected.splice(from, to);
  //   if (!this.selected.length)
  //     this.removeMarkFromDays().setDayWithItems();

  //   this.save();
  //   return this;
  // },
};

export default task;