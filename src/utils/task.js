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

  add() {
    if (this.position.day !== 0) this.checkIfDayExists().get();
    const { text, checked } = this.ToDo;

    this.selected.push({ text, checked });
    return this;
  }

  update(position, checked) {
    this.selected[position].checked = checked;
    return this;
  }

  create(text) {
    if (text.trim() === "") return;
    this.ToDo.text = text;
    return this;
  }

  delete({ from, to }) {
    this.selected.splice(from, to);
    return this;
  }
}

export default new Task();
