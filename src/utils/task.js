import CalendarData from "./calendar";

class Task extends CalendarData {
  get(callback) {
    const { day, month, year } = this.position;
    const TYPE = "tasks";

    if (day) {
      this.checkIfDayExists();
      this.selected = this.calendar[year][month][day][TYPE];
    } else {
      this.selected = this.calendar.daily;
    }
  
    if (callback) return callback(Object.assign([], this.selected), TYPE);
    return this;
  }

  update(position, item, value) {
    if (this.selected[position]) this.selected[position][item] = value;

    this.save();
    return this;
  }

  create(text) {
    if (!this.selected.length) {
      this.selected.push({ text, checked: false });

      this.removeMarkFromDays().setDayWithItems();
      this.save();
      return this;
    }
    this.selected.push({ text, checked: false });

    this.save();
    return this;
  }

  delete(from, to) {
    this.selected.splice(from, to);
    if (!this.selected.length)
      this.removeMarkFromDays().setDayWithItems();

    this.save();
    return this;
  }
}

export default new Task();
