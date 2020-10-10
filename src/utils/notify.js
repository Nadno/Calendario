import CalendarData from "./calendar";

class Notify extends CalendarData {
  constructor() {
    super();
    this.notifications = [];
  }

  get(callback) {
    const { month, year } = this.position;
    const TYPE = "notify"

    this.checkIfYearExists(year);
    if (!this.calendar?.[year]?.[month]?.events)
      this.calendar[year][month].events = [];

    this.selected = this.calendar[year][month].events;

    if (callback) return callback(Object.assign([], this.selected), TYPE);
    return this;
  }

  createEvent(content) {
    const { day } = this.position;
    if (!day) return this;

    this.selected.push({
      title: content.title(),
      body: content.body(),
      alert: {
        from: day - Number(content.firstAlert()),
        to: day,
      },
      type: "event",
    });

    return this;
  }

  createError(body, title = "Ocorreu um erro") {
    this.notifications.push({
      type: "error",
      title,
      body,
      alert: {
        to: date.getDate(),
      },
      time: `${date.getHours()}:${date.getMinutes()}`,
    });

    return this;
  }

  delete(from, to) {
    this.selected.splice(from, to);
    return this;
  }
}

export default new Notify();
