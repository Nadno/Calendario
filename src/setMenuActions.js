import element from "./_Calendar/elements";

import date from "./date";

import calendar from "./calendar";
import setMenuRender from "./setMenuRender";

const getPosition = (todo) => todo.querySelector("input").id.split("-");

const setMenuActions = () => ({
  ...setMenuRender(calendar),

  setMenuDateTo(name) {
    if (!name) return (this.date.innerHTML = "");

    this.date.setAttribute(
      "datetime",
      `${date[name].year}-${date[name].month}-${date[name].day}`
    );

    this.date.innerHTML = `<strong>
      ${date.DAY_NAME[date[name].week_day]}, 
      ${date[name].day} de 
      ${date.MONTH_NAME[date[name].month]}
    </strong>`;
  },

  setTitle(title) {
    this.title.innerHTML = title;
  },

  active(toggle) {
    if (toggle) return this.element.self.classList.add("on");
    return this.element.classList.remove("on");
  },

  createItem({ eventsOn, body, title }) {
    if (eventsOn) {
      calendar.createEvent({ title, body, week_day: date.selected.week_day });
    } else {
      calendar.createTask(body);
    }
    this.render();
  },

  deleteItem({ eventsOn, from }) {
    if (eventsOn) {
      calendar.deleteNotify(from);
      calendar.selectItem("events");
    } else {
      calendar.deleteTask(from);
      calendar.selectItem("tasks");
    }
    this.render();
  },

  changeContent() {
    const deleteTask = (todo, position) => {
      const resetPositions = (todo, index) => {
        const id = `${index}-todo`;
        const input = todo.querySelector("input");
        const label = todo.querySelector("label");

        input.id = id;
        label.htmlFor = id;
      };

      todo.remove();
      this.list.childNodes.forEach(resetPositions);
      this.deleteItem({ from: position });
    }

    return function({ target }) {
      const [position] = getPosition(target.parentNode);
      const text = String(target.textContent).trim();
      
      if (!text) return deleteTask(target.parentNode, position);
      calendar.updateTask(position, "text", text);
    }
  },

  setEvents() {
    this.list.addEventListener("change", ({ target }) => {
      const [position] = getPosition(target.parentNode);
      calendar.updateTask(position, "checked", target.checked);
    });
    
    this.events.addEventListener("change", ({ target }) => {
      date.eventsOn = target.checked;
      if (target.checked) {
        document.querySelector(".event__config").classList.add("active");
        this.render();
      } else {
        document.querySelector(".event__config").classList.remove("active");
        this.render();
      }
    });
  },
});

export default setMenuActions;
