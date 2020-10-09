import CalendarData from "./calendar";

class Task extends CalendarData {
  get(callback) {
    const { day, month, year } = this.position;
    this.checkIfYearExists(year);

    this.selected = day
      ? this.calendar?.[year]?.[month]?.days?.[day]
      : this.calendar.daily;

    if (callback) return callback(this.selected || []);
    return this;
  }

  update(position, item, value) {
    if (this.selected[position])
      this.selected[position][item] = value;
    return this;
  }

  create(text) {
    if (this.position.day) this.checkIfDayExists().get();
    if (text.trim() === "") return;

    this.selected.push({ text, checked: false });
    return this;
  }

  delete(from, to) {
    this.selected.splice(from, to);
    return this;
  }
}

export default new Task();
