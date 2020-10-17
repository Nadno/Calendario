import CalendarData from "./calendar";

class Task {
  get(callback) {
    const { day, month, year } = CalendarData.position;
    const TYPE = "tasks";

    if (day) {
      CalendarData.checkIfDayExists();
      this.selected = CalendarData.calendar[year][month][day][TYPE];
    } else {
      this.selected = CalendarData.calendar.daily;
    }
  
    if (callback) return callback(Object.assign([], this.selected), TYPE);
    return this;
  }

  update(position, item, value) {
    if (this.selected[position]) this.selected[position][item] = value;

    CalendarData.save();
    return this;
  }

  create(text) {
    if (!this.selected.length) {
      this.selected.push({ text, checked: false });

      CalendarData.removeMarkFromDays().setDayWithItems();
      CalendarData.save();
      return this;
    }
    this.selected.push({ text, checked: false });

    CalendarData.save();
    return this;
  }

  delete(from, to) {
    this.selected.splice(from, to);
    if (!this.selected.length)
      CalendarData.removeMarkFromDays().setDayWithItems();

    CalendarData.save();
    return this;
  }
}

export default new Task();
