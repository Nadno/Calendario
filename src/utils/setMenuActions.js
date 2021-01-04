import setMenuRender from "./setMenuRender";

const getToDoPosition = element => {
  const [, position] = element.querySelector("input").id.split("-");
  return position;
};

const getEventPosition = element => {
  const [, position] = element.id.split("-");
  return position;
}

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

  createItem({ body, title }) {
    if (this.eventsOn) {
      const { week_day } = this.date.selected;
      this.calendar.createEvent({ title, body, week_day });
    } else {
      this.calendar.createTask(body);
    }
    this.render();
  },

  changeContent() {
    const deleteTask = (todo, position) => {
      const resetPositions = (todo, index) => {
        const id = `todoAt-${index}`;
        const input = todo.querySelector("input");
        const label = todo.querySelector("label");

        input.id = id;
        label.htmlFor = id;
      };

      todo.remove();
      this.list.childNodes.forEach(resetPositions);

      this.calendar.deleteTask(position);
      this.calendar.selectTask();
      this.render();
    };

    return (event) => {
      event.stopPropagation();

      const { target } = event;
      if (target.id !== "content") throw new Error("Elemento inesperado");

      const text = String(target.textContent).trim();

      if (!text)
        return deleteTask(
          target.parentNode,
          getToDoPosition(target.parentNode)
        );
        
      this.calendar.updateTask(
        getToDoPosition(target.parentNode),
        "text",
        text
      );
    };
  },

  setEvents() {
    const { list, events, createItemForm, mobileMenu } = this;

    const updateTask = ({ target }) =>
      this.calendar.updateTask(
        getToDoPosition(target.parentNode),
        "checked",
        target.checked
      );

    const deleteEvent = (event) => {
      event.stopPropagation();

      const { target } = event;
      if (target.className !== "delete-button") return;

      this.calendar.deleteNotify(getEventPosition(target));
      this.calendar.selectEvent();
      this.render();
    };

    list.addEventListener("change", updateTask);
    list.addEventListener("click", deleteEvent);
    list.addEventListener("focusout", this.changeContent());

    const toggleEvents = ({ target }) => {
      this.eventsOn = target.checked;
      
      if (target.checked) {
        document.querySelector(".event__config").classList.add("active");
        this.calendar.selectEvent();
        this.setTitle("Eventos:");
        this.render();
      } else {
        document.querySelector(".event__config").classList.remove("active");
        this.calendar.selectTask();
        this.render();
      }
    };
    events.addEventListener("change", toggleEvents);

    const createTaskOrEvent = () => {
      const { body, title } = createItemForm;
      if (!body()) return;

      this.createItem({
        body: body(),
        title: title(),
      });
    };
    createItemForm.submit.addEventListener("click", createTaskOrEvent);

    let active = false;
    const toggleMobileMenu = () => {
      const PRIMARY_COLOR = "#60cdff";
      const RED_COLOR = "red";

      active = !active;
      mobileMenu.style.backgroundColor = active ? RED_COLOR : PRIMARY_COLOR;
      mobileMenu.innerHTML = active ? "Fechar" : "Menu";
      this.active(active);
    };
    mobileMenu.addEventListener("click", toggleMobileMenu);
  },
});

export default setMenuActions;
