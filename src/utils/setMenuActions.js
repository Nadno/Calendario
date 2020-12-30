import setMenuRender from "./setMenuRender";

const getPosition = (todo) => todo.querySelector("input").id.split("-");

const setMenuActions = () => ({
  ...setMenuRender(),

  setMenuDateTo(name) {
    if (!name) return (this.dateTitle.innerHTML = "");

    this.dateTitle.setAttribute(
      "datetime",
      `${this.date[name].year}-${this.date[name].month}-${this.date[name].day}`
    );

    this.dateTitle.innerHTML = `<strong>
      ${this.date.DAY_NAME[this.date[name].week_day]}, 
      ${this.date[name].day} de 
      ${this.date.MONTH_NAME[this.date[name].month]}
    </strong>`;
  },

  setTitle(title) {
    this.title.innerHTML = title;
  },

  active(toggle) {
    if (toggle) return this.element.classList.add("on");
    return this.element.classList.remove("on");
  },

  createItem({ eventsOn, body, title }) {
    if (eventsOn) {
      const { week_day } = this.date.selected;
      this.calendar.createEvent({ title, body, week_day });
    } else {
      this.calendar.createTask(body);
    }
    this.render();
  },

  deleteItem({ eventsOn, from }) {
    const { calendar } = this;
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
    };

    return function ({ target }) {
      const [position] = getPosition(target.parentNode);
      const text = String(target.textContent).trim();

      if (!text) return deleteTask(target.parentNode, position);
      this.calendar.updateTask(position, "text", text);
    };
  },

  setEvents() {
    const { list, events, createItemForm, mobileMenu, date } = this;

    const updateTask = ({ target }) => {
      const [position] = getPosition(target.parentNode);
      this.calendar.updateTask(position, "checked", target.checked);
    };
    list.addEventListener("change", updateTask);

    const toggleEvents = ({ target }) => {
      date.eventsOn = target.checked;
      if (target.checked) {
        document.querySelector(".event__config").classList.add("active");
        this.render();
      } else {
        document.querySelector(".event__config").classList.remove("active");
        this.render();
      }
    }
    events.addEventListener("change", toggleEvents);

    const createTaskOrEvent = () => {
      const { body, title } = createItemForm;
      if (!body()) return;

      this.createItem({
        eventsOn: date.eventsOn,
        body: body(),
        title: title(),
      });
    }
    createItemForm.submit.addEventListener("click", createTaskOrEvent);

    let active = false;
    const toggleMobileMenu = () => {
      const PRIMARY_COLOR = "#60cdff";
      const RED_COLOR = "red";

      active = !active;
      mobileMenu.style.backgroundColor = active ? RED_COLOR : PRIMARY_COLOR;
      mobileMenu.innerHTML = active ? "Fechar" : "Menu";
      this.active(active);
    }
    mobileMenu.addEventListener("click", toggleMobileMenu);
  },
});

export default setMenuActions;
