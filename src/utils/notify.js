import CalendarData from "./calendar";
import { monthTotalDays } from "./date";

class Notify extends CalendarData {
  constructor() {
    super();
    this.notifications = [];
  }

  get(callback) {
    const TYPE = "notify";

    this.selected = this.calendar.events[this.position.month];
    
    if (callback) return callback(Object.assign([], this.selected), TYPE);
    return this;
  }

  finalize(position) {
    this.selected[position].alert = false;
    return this;
  }

  createEvent(content) {
    const { day, month, year } = this.position;
    if (!day) return this;

    this.selected.push({
      title: content.title(),
      body: content.body(),
      notDay: [],
      from: this.checkFrom(day - Number(content.alertDays())),
      to: `${year}-${month}-${day}`,
      status: true,
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

  backOneMonth(year, month, day) {
    const totalDays = monthTotalDays(from.year, from.month);
    let from;
    if (month === 0) {
      from = `${year - 1}-${month}-${day === 0 ? totalDays : totalDays + day}`;
      // {
      //   year: year - 1,
      //   month: 11,
      // };
    } else {
      from = `${year}-${month - 1}-${day === 0 ? totalDays : totalDays + day}`;
      // from = {
      //   year,
      //   month: month - 1,
      // };
    }

    return from;
  }

  checkFrom(day) {
    const { year, month } = this.position;
    if (day > 0) return `${year}-${month}-${day}`;
    return this.backOneMonth(year, month, day);
  }
}

export default new Notify();
