import date from "../date";

export default function setNotifyActions(calendar) {
  calendar.getNotify = function getNotify() {
    const { day, month, year } = date.selected;

    if (day) {
      calendar.checkIfDayExists();
      calendar.selected = calendar.data[year][month][day].events;
    } else {
      calendar.selected = calendar.getAllEvents();
    }

    return Object.assign([], calendar.selected);
  };

  calendar.createEvent = function createEvent({ title, body, week_day }) {
    const { day, month } = date.selected;
    if (!day) return;
    if (!calendar.selected.length) {
      calendar.selected.push({
        title,
        body,
        day,
        week_day,
        month,
        alert: true,
        type: "event",
      });
      calendar.removeMarkFromDays();
      calendar.setDayWithItems();
    }

    calendar.selected.push({
      title,
      body,
      day,
      week_day,
      month,
      alert: true,
      type: "event",
    });
    console.log(calendar.data);
  };

  calendar.createError = function createError(body, title = "Ocorreu um erro") {
    return {
      type: "error",
      title,
      body,
      alert: {
        to: date.getDate(),
      },
      time: `${date.getHours()}:${date.getMinutes()}`,
    };
  };

  calendar.getAllEvents = function () {
    const { year, month } = date.selected;
    let events = [];

    Object.keys(calendar.data[year][month]).filter((day) => {
      events = [...events, ...calendar.data[year][month][day].events];
    });

    return events;
  };

  calendar.deleteNotify = function (from, to) {
    calendar.selected.splice(from, to);
    if (!calendar.selected.length)
      calendar.removeMarkFromDays().setDayWithItems();
  };
}
