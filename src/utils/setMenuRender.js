import createElement from "../createElement";

function isOnScreen(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top > 0 &&
    rect.bottom <
      document.querySelector(".todo__list").getBoundingClientRect().bottom
  );
}

function renderItemOnMenu(item) {
  if (isOnScreen(item)) return item.classList.add("on-screen");
}

const createTask = ({ text, checked }, changeContent, position) => {
  const id = `${position}-todo`;

  const li = createElement("li", "", { className: "to-do" });
  const label = createElement("label", "", { htmlFor: id });

  const checkbox = createElement("input", "", {
    className: "input",
    type: "checkbox",
    id,
    checked,
  });
  const content = createElement("div", text, {
    id: "content",
    className: "content",
    contentEditable: true,
  });
  content.addEventListener("blur", changeContent);

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(content);

  return li;
}

const createNotify = (
  { type, title, body, alert, day, week_day },
  deleteNotify, date
) => {
  const { actual, DAY_NAME } = date;
  const notify = createElement("li", '', { className: `notify ${type?type:null}`, });
  const head = createElement("div", title, { className: "notify__header" });

  if (deleteNotify) {
    const deleteButton = createElement("button", "X", {
      type: "button",
      className: "delete",
    });
    deleteButton.addEventListener("click", deleteNotify);
    head.appendChild(deleteButton);
  };

  const INFO = `
    <div class="notify__info">
      ${
        actual.day === day
          ? "Evento do dia!"
          : `Evento para ${DAY_NAME[week_day]}, dia ${day}`
      } </br>
      ${alert ? "" : "Finalizado!"}
    </div>
  `;
  const BODY = `
    <div class="notify__body">${body}</div>
  `;

  notify.appendChild(head);
  notify.insertAdjacentHTML("beforeend", INFO);
  notify.insertAdjacentHTML("beforeend", BODY);

  return notify;
}

export const setMenuRender = () => ({
  render() {
    const { calendar, date, list } = this;
    const ITEM_TYPE = date.eventsOn ? "events" : "tasks";
    calendar.selectItem(ITEM_TYPE);
    list.innerHTML = calendar.selected.length
      ? ""
      : '<div class="alert">Nada encontrado!</div>';

    const addItemOnList = (item, position) => {
      const elementsTypes = {
        tasks: () => createTask(item, this.changeContent(), position),
        events: () =>
          createNotify(item, 
            () => this.deleteItem({ eventsOn: date.eventsOn, from: position }), date
          ),
      };

      list.appendChild(elementsTypes[ITEM_TYPE]());
    }

    calendar.selected.forEach(addItemOnList);

    const itemsElements = Array.from(list.childNodes);
    const render = () => itemsElements.forEach(renderItemOnMenu);
    render();

    list.addEventListener("scroll", render);
  },
});

export default setMenuRender;