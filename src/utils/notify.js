import CalendarData from "./calendar";

class Notify {
  get(callback) {
    const { day, month, year } = CalendarData.position;
    const TYPE = "events";

    if (day) {
      CalendarData.checkIfDayExists();
      this.selected = CalendarData.calendar[year][month][day][TYPE];
    } else {
      this.selected = this.getAllEvents();
    }

    if (callback) return callback(Object.assign([], this.selected), TYPE);
    return this;
  }

  finalize(position) {
    this.selected[position].alert = false;
    CalendarData.save();
    return this;
  }

  createEvent(content, week_day) {
    const { day } = CalendarData.position;
    if (!day) return this;
    if (!this.selected.length) {
      this.selected.push({
        title: content.title(),
        body: content.body(),
        day,
        week_day,
        month,
        alert: true,
        type: "event",
      });
      CalendarData.removeMarkFromDays().setDayWithItems();
      return this;
    }

    this.selected.push({
      title: content.title(),
      body: content.body(),
      day,
      week_day,
      month,
      alert: true,
      type: "event",
    });
    
    CalendarData.save();
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
    const { year, month } = CalendarData.position;
    let events = [];

    Object.keys(CalendarData.calendar[year][month]).filter((day) => {
      events = [...events, ...CalendarData.calendar[year][month][day].events];
    });

    return events;
  }

  delete(from, to) {
    this.selected.splice(from, to);
    if (!this.selected.length)
      CalendarData.removeMarkFromDays().setDayWithItems();

    CalendarData.save();
    return this;
  }
}

export default new Notify();
