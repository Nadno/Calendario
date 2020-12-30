import createCalendar from "./calendar";
import createDate from "./date";
import createMenu from "./Menu/menu";

const createApp = () => {
  const app = {
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

    start() {
      const { calendar, menu, date } = this;
      this.setDependencies();
      
      date.start();
      calendar.start();
      menu.start();
    },

  };

  return app;
};

export default createApp;