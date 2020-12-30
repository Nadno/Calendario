import storage from "./utils/storage";
import task from "./setTaskActions";
import notify from "./setNotifyActions";

import date from "./date";

const createCalendar = () => {
  const calendarData = storage.find();
  return {
    selected: {},

    save() {
      storage.save(calendarData);
    },
    
    selectItem(ITEM_TYPE) {
      const { day, month, year } = date.selected;

      if (day) {
        this.checkIfDayExists();
        this.selected = calendarData[year][month][day][ITEM_TYPE];
      } else {
        this.selected = ITEM_TYPE === "tasks" ? calendarData.daily : [];
      }
    },

    getNotifications() {
      return Object.assign([], this.notifications);
    },

    setMarks() {
      // ARRUMAR REDENRIZAÇÃO QUANDO APAGAR O ITEM, POIS NÃO RETIRA AS MARACAÇÕES
      const getDaysWithItems = () => {
        const { year, month } = date.selected;

        return Object.keys(calendarData[year][month]).map((day) => {
          const { tasks, events } = calendarData[year][month][day];
          return {
            day,
            hasTasks: tasks.length ? true : false,
            hasEvents: events.length ? true : false,
          };
        });
      };

      const setDaysWithItems = ({ day, hasTasks, hasEvents }) => {
        const dayElement = document.getElementById(day);

        if (hasTasks && hasEvents) {
          dayElement.insertAdjacentHTML(
            "afterbegin",
            '<div class="has__both"></div>'
          );
          dayElement.title = "Há Eventos e Tarefas para este dia";
        } else if (hasTasks) {
          dayElement.insertAdjacentHTML(
            "afterbegin",
            '<div class="has__task"></div>'
          );
          dayElement.title = "Há Tarefas para este dia";
        } else if (hasEvents) {
          dayElement.insertAdjacentHTML(
            "afterbegin",
            '<div class="has__event"></div>'
          );
          dayElement.title = "Há Eventos para este dia";
        }
      };

      getDaysWithItems().forEach(setDaysWithItems);
    },

    removeMarkFromDays() {
      const hasEvent = Array.from(document.querySelectorAll(".has__event"));
      const hasTask = Array.from(document.querySelectorAll(".has__task"));
      const hasBoth = Array.from(document.querySelectorAll(".has__both"));

      hasEvent.forEach((mark) => mark.remove());
      hasTask.forEach((mark) => mark.remove());
      hasBoth.forEach((mark) => mark.remove());
    },

    setLastConnection({ day, month }) {
      const NEW_DAY = day !== this.lastConnection.day;
      const NEW_MONTH = month !== this.lastConnection.month;

      if (NEW_DAY || NEW_MONTH) {
        this.lastConnection.month = month;
        this.lastConnection.day = day;
      }
    },

    getLastConnection() {
      return {
        day: this.lastConnection.day,
        month: this.lastConnection.month,
      };
    },

    checkIfDayExists() {
      const { year, month, day } = date.selected;
      if (calendarData[year]?.[month]?.[day]) return;
      Object.assign(calendarData[year][month], {
        [day]: {
          tasks: [],
          events: [],
        },
      });
    },

    checkIfYearExists() {
      const year = date.selected.year;
      if (calendarData[year]) return;

      Object.assign(calendarData, {
        [year]: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {},
          8: {},
          9: {},
          10: {},
          11: {},
        },
      });
    },

    ...task(),
    ...notify(),
  };
};

export default createCalendar();
