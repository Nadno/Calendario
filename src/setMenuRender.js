import date from "./date";
import { createNotify, createTask } from "./createElement";

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

export const setMenuRender = (calendar) => ({
  render() {
    const ITEM_TYPE = date.eventsOn ? "events" : "tasks";
    calendar.selectItem(ITEM_TYPE);

    this.list.innerHTML = calendar.selected.length
      ? ""
      : '<div class="alert">Nada encontrado!</div>';

    const addItemOnList = (item, position) => {
      const elementsTypes = {
        tasks: () => createTask(item, this.changeContent(), position),
        events: () =>
          createNotify(item, () =>
            this.deleteItem({ eventsOn: date.eventsOn, from: position })
          ),
      };

      this.list.appendChild(elementsTypes[ITEM_TYPE]());
    }

    calendar.selected.forEach(addItemOnList);

    const itemsElements = Array.from(this.list.childNodes);
    const render = () => itemsElements.forEach(renderItemOnMenu);
    render();

    this.list.addEventListener("scroll", render);
  },
});

export default setMenuRender;