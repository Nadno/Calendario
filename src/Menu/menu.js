import setMenuActions from "../utils/setMenuActions";

import "../utils/updateDate";

const createMenu = () => ({
  menu: {
    element: document.querySelector(".menu"),
    dateTitle: document.querySelector(".selected__day"),
    list: document.querySelector(".todo__list"),
    title: document.querySelector("#task-title"),
    events: document.querySelector("#event"),
    createItemForm: {
      title: () => document.querySelector("#title").value,
      body: () => document.querySelector("#body").value,
      submit: document.querySelector("#create"),
    },
    mobileMenu: document.querySelector("#mobile-menu"),
    eventsOn: false,

    ...setMenuActions(),

    update(day, week_day) {
      const dayElement = (day) => document.getElementById(day);
      const { selected, } = this.date;

      if (day < 0 || day > selected.total_days) return;

      return () => {
        const setMenuTo = {
          SAME_DAY: (day) => {
            dayElement(day).classList.remove("selected");
            selected.day = 0;

            this.setTitle("Tarefas diárias:");
            this.setMenuDateTo("");
          },

          DAY: (day, week_day) => {
            dayElement(day).classList.add("selected");
            Object.assign(selected, {
              day,
              week_day,
            });

            this.setTitle("Tarefas:");
            this.setMenuDateTo("selected");
          },
        };

        if (selected.day) {
          this.calendar.checkTaskDay();
          dayElement(selected.day).classList.remove("selected");
        }

        const action = selected.day === day ? "SAME_DAY" : "DAY";
        setMenuTo[action](day, week_day);
        
        if (!this.eventsOn) this.render();
      };
    },

    start() {
      this.setEvents();
      this.render();
    },
  },
});

export default createMenu;
