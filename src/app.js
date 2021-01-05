import createCalendar from "./calendar";
import createDate from "./date";
import createMenu from "./menu";

const createApp = () => ({
  ...createCalendar(),
  ...createDate(),
  ...createMenu(),

  setDependencies() {
    const { calendar, menu, date } = this;

    calendar.date = date;
    calendar.menu = menu;
    menu.date = date;
    menu.calendar = calendar;
  },

  isNewDay() {
    const { day, month } = this.calendar.getLastConnection();
    const { actual } = this.date;
    return day !== actual.day || month !== actual.month;
  },

  start() {
    const { calendar, menu, date } = this;
    this.setDependencies();

    date.start();
    calendar.start();

    if (this.isNewDay()) this.calendar.newDay();

    menu.start();
  },
});

export default createApp;
