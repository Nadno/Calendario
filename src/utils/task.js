import CalendarData from "./calendar";

class Task extends CalendarData {
  get(callback) {
    const { day, month, year } = this.position;
    const TYPE = "task";

    this.checkIfYearExists(year);
    this.checkIfDayExists();
    
    this.selected = day
      ? this.calendar?.[year]?.[month]?.[day]
      : this.calendar.daily;
    
    if (callback) return callback(Object.assign([], this.selected), TYPE);
    return this;
  }

  update(position, item, value) {
    if (this.selected[position])
      this.selected[position][item] = value;
    return this;
  }

  create(text) {
    this.selected.push({ text, checked: false });
    return this;
  }

  delete(from, to) {
    this.selected.splice(from, to);
    return this;
  }
}

export default new Task();
