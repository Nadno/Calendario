import element from "./_Calendar/elements";

import date from "./date";

import calendar from "./calendar";
import setMenuRender from "./setMenuRender";

const getPosition = (todo) => todo.querySelector("input").id.split("-");

export default function setMenuActions(menu) {
  setMenuRender(menu, calendar);
  
  Object.assign(menu, {
    setMenuDateTo(name) {
      if (!name) return (menu.date.innerHTML = "");

      menu.date.setAttribute(
        "datetime",
        `${date[name].year}-${date[name].month}-${date[name].day}`
      );

      menu.date.innerHTML = `<strong>
        ${date.DAY_NAME[date[name].week_day]}, 
        ${date[name].day} de 
        ${date.MONTH_NAME[date[name].month]}
      </strong>`;
    },

    setTitle(title) {
      menu.title.innerHTML = title;
    },

    active(toggle) {
      if (toggle) return element.menu.self.classList.add("on");
      return element.menu.self.classList.remove("on");
    },

    createItem({ eventsOn, body, title }) {
      if (eventsOn) {
        calendar.createEvent({ title, body, week_day: date.selected.week_day });
      } else {
        calendar.createTask(body);
      }
      menu.render();
    },

    deleteItem({ eventsOn, from }) {
      if (eventsOn) {
        calendar.deleteNotify(from);
        calendar.selectItem("events");
      } else {
        calendar.deleteTask(from);
        calendar.selectItem("tasks");
      }
      menu.render();
    },

    changeContent({ target }) {
      const [position] = getPosition(target.parentNode);
      console.log("***changeContent: ", position)
      const text = String(target.textContent).trim();
      if (!text) {
        const resetPositions = (todo, index) => {
          const id = `${index}-todo`;
          const input = todo.querySelector("input");
          const label = todo.querySelector("label");

          input.id = id;
          label.htmlFor = id;
        };
        
        target.parentNode.remove();
        menu.list.childNodes.forEach(resetPositions);

        return menu.deleteItem({ from: position });
      }
      calendar.updateTask(position, "text", text);
    },
  });

  menu.list.addEventListener("change", ({ target }) => {
    const [position] = getPosition(target.parentNode);
    calendar.updateTask(position, "checked", target.checked);
  });

  menu.events.addEventListener("change", function setEvents({ target }) {
    date.eventsOn = target.checked;
    if (target.checked) {
      document.querySelector(".event__config").classList.add("active");
      menu.render();
    } else {
      document.querySelector(".event__config").classList.remove("active");
      menu.render();
    }
  });
}
