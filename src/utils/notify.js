import CalendarData from "./calendar";
import { monthTotalDays } from "./date";

class Notify extends CalendarData {
  get(callback) {
    const { day, month, year } = this.position;
    const TYPE = "events";

    this.checkIfYearExists();
    this.checkIfDayExists();

    this.selected = day
      ? this.calendar?.[year]?.[month]?.[day][TYPE]
      : this.getAllEvents();
  
    if (callback) return callback(Object.assign([], this.selected), TYPE);
    return this;
  }

  finalize(position) {
    this.selected[position].status = false;
    return this;
  }

  createEvent(content) {
    const month = this.position.month + 1;
    const { day } = this.position;
    if (!day || !month) return this;

    this.selected.push({
      title: content.title(),
      body: content.body(),
      day,
      alert: true,
      type: "event",
    });

    return this;
  }

  createError(body, title = "Ocorreu um erro") {
    return {
      type: "error",
      title,
      body,
      alert: {
        to: date.getDate(),
      },
      time: `${date.getHours()}:${date.getMinutes()}`,
    };
  }

  getAllEvents() {
    const { year, month } = this.position;
    let events = [];

    Object.keys(this.calendar[year][month]).filter((day) => {
      events = [...events, ...this.calendar[year][month][day].events];
    });
    
    return events;
  }

  delete(from, to) {
    this.selected.splice(from, to);
    return this;
  }
}

export default new Notify();
