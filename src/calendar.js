import storage from "./utils/storage";
import task from "./utils/setTaskActions";
import notify from "./utils/setNotifyActions";
import setCalendarRender from "./utils/setCalendarRender";

const createCalendar = () => {
  const calendarData = storage.find();
  console.log(calendarData);
  return {
    calendar: {
      selected: [],
      element: document.querySelector("ul.days"),
      title: document.querySelector(".month__name"),
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

        console.clear()
        console.log("task: ", calendarData[year][month]);
      },

      selectEvent() {
        const { month, year } = this.date.selected;

        this.checkIfHasEvents();
        this.selected = calendarData[year][month].events;

        console.clear()
        console.log("event: ", calendarData[year][month]);
      },

      getMonth() {
        const { year, month } = this.date.selected;
        return calendarData[year][month];
      },

      checkTaskDay() {
        if (this.selected && !this.selected.length) {
          const { day, month, year } = this.date.selected;
          delete calendarData[year][month].tasks[day];
        }
      },

      getNotifications() {
        return Object.assign([], this.notifications);
      },

      setMarks() {
        // const getDaysWithItems = () => {
        //   const { year, month } = this.date.selected;

        //   const daysWithItems = Object.keys(calendarData[year][month].tasks)
        //     .map((day) => day);

        //   const daysWidthEventscalendarData[year][month].events
        //     .forEach((event) => {
        //       if (event.day )
        //     });
        // };

        // const setDaysWithItems = ({ day, hasTasks, hasEvents }) => {
        //   const dayElement = document.getElementById(day);

        //   if (hasTasks && hasEvents) {
        //     dayElement.insertAdjacentHTML(
        //       "afterbegin",
        //       '<div class="has__both"></div>'
        //     );
        //     dayElement.title = "Há Eventos e Tarefas para este dia";
        //   } else if (hasTasks) {
        //     dayElement.insertAdjacentHTML(
        //       "afterbegin",
        //       '<div class="has__task"></div>'
        //     );
        //     dayElement.title = "Há Tarefas para este dia";
        //   } else if (hasEvents) {
        //     dayElement.insertAdjacentHTML(
        //       "afterbegin",
        //       '<div class="has__event"></div>'
        //     );
        //     dayElement.title = "Há Eventos para este dia";
        //   }
        // };

        // getDaysWithItems().forEach(setDaysWithItems);
      },

      removeMarkFromDays() {
        const hasEvent = Array.from(document.querySelectorAll(".has__event"));
        const hasTask = Array.from(document.querySelectorAll(".has__task"));
        const hasBoth = Array.from(document.querySelectorAll(".has__both"));

        if (hasEvent) hasEvent.forEach((mark) => mark.remove());
        if (hasTask) hasTask.forEach((mark) => mark.remove());
        if (hasBoth) hasBoth.forEach((mark) => mark.remove());
      },

      resetMarks() {
        this.removeMarkFromDays();
        this.setMarks();
      },

      setLastConnection({ day, month }) {
        Object.assign(calendarData.lastConnection, {
          day,
          month,
        });

        console.log(calendarData);
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
            daysWithEvents: [],
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
      },

      start() {
        this.checkIfYearExists();
        this.checkIfMonthExists();
        this.calendarGenerator();
        this.setSelectYearAndMonthEvent();
      },

      restart() {
        this.checkIfYearExists();
        this.checkIfMonthExists();
        this.calendarGenerator();
        console.clear();
        console.log(calendarData);
      },
    },
  };
};

export default createCalendar;
