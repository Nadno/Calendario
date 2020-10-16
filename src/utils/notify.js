import CalendarData from "./calendar";

class Notify extends CalendarData {
  get(callback) {
    const { day, month, year } = this.position;
    const TYPE = "events";

    this.checkIfYearExists();
    if (day) {
      this.checkIfDayExists();
      this.selected = this.calendar[year][month][day][TYPE];
    } else {
      this.selected = this.getAllEvents();
    }
    
    if (callback) return callback(Object.assign([], this.selected), TYPE);
    return this;
  }

  finalize(position) {
    this.selected[position].alert = false;
    return this;
  }

  createEvent(content, week_day) {
    const { day } = this.position;
    if (!day) return this;

    this.selected.push({
      title: content.title(),
      body: content.body(),
      day,
      week_day,
      month,
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
