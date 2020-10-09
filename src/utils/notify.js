import CalendarData from "./calendar";

class Notify extends CalendarData {
  constructor() {
    super();
    this.notifications = [];
  }

  get(callback) {
    const { month, year } = this.position;
    this.checkIfYearExists(year);

    if (!this.calendar?.[year]?.[month]?.events)
      this.calendar[year][month].events = [];

    this.selected = this.calendar[year][month].events;

    if (callback) return callback(this.notifications);
    return this;
  }

  createEvent({ body, time, from, to }) {
    this.selected.push({
      type: "event",
      body,
      alert: {
        from,
        to,
      },
      time,
    });
    return this;
  }

  createError(body, title = "Ocorreu um erro") {
    const date = new Date();
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
    this.notifications.splice(from, to);
    return this;
  }
}

export default new Notify();
