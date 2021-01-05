import storage from "./utils/storage";
import task from "./utils/setTaskActions";
import notify from "./utils/setNotifyActions";
import setCalendarRender from "./utils/setCalendarRender";

const createCalendar = () => {
  const calendarData = storage.find();

  return {
    calendar: {
      selected: [],
      element: document.querySelector("#calendar"),
      title: document.querySelector("#month-name"),
      selectDate: document.querySelector(`#date`),
      nextStep: document.querySelector("#next-step"),
      backStep: document.querySelector("#back-step"),

      save() {
        storage.save(calendarData);
      },

      selectTask() {
        const { day, month, year } = this.date.selected;

        if (day !== 0) {
          this.checkIfDayExists();
          this.selected = calendarData[year][month].tasks[day];
        } else {
          this.selected = calendarData.daily;
        }
      },

      selectEvent() {
        const { month, year } = this.date.selected;

        this.checkIfHasEvents();
        this.selected = calendarData[year][month].events;
      },

      getMonth() {
        const { year, month } = this.date.selected;
        return calendarData[year][month];
      },

      checkTaskDay() {
        const { day, month, year } = this.date.selected;

        if (day === 0) return;
        if (this.selected && !this.selected.length) {
          delete calendarData[year][month].tasks[day];
        }
      },

      setLastConnection({ day, month }) {
        Object.assign(calendarData.lastConnection, {
          day,
          month,
        });
      },

      getLastConnection() {
        return {
          day: calendarData.lastConnection.day,
          month: calendarData.lastConnection.month,
        };
      },

      checkIfHasEvents() {
        const { year, month } = this.date.selected;
        if (calendarData[year]?.[month].events) return;

        calendarData[year][month].events = [];
      },

      checkIfDayExists() {
        const { year, month, day } = this.date.selected;
        const calendarMonth = calendarData[year][month];

        if (calendarMonth.tasks?.[day]) return;

        Object.assign(calendarData[year][month].tasks, {
          [day]: [],
        });
      },

      checkIfMonthExists() {
        const { year, month } = this.date.selected;
        if (calendarData[year][month]) return;
        Object.assign(calendarData[year], {
          [month]: {
            daysWithTasks: [],
            events: [],
            tasks: {},
          },
        });
      },

      checkIfYearExists() {
        const year = this.date.selected.year;
        if (calendarData[year]) return;

        Object.assign(calendarData, {
          [year]: {},
        });
      },

      ...task(),
      ...notify(),
      ...setCalendarRender(),

      newDay() {
        this.resetDailyTasks(calendarData.daily);
        this.setLastConnection(this.date.actual);
        this.checkEventsForToday();
        this.save();
      },

      start() {
        this.checkIfYearExists();
        this.checkIfMonthExists();
        this.calendarGenerator();
        this.setTaskMarks();
        this.setSelectYearAndMonthEvent();
      },

      restart() {
        this.checkIfYearExists();
        this.checkIfMonthExists();
        this.calendarGenerator();
        this.setTaskMarks();
      },
    },
  };
};

export default createCalendar;
