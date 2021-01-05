import { createNotify, createTask } from "../createElement";

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

export const setMenuRender = () => ({
  render() {
    const { calendar, date, list } = this;
    const createItemElement = this.eventsOn ? createNotify : createTask;
    
    this.eventsOn
      ? calendar.selectEvent()
      : calendar.selectTask();
    
    list.innerHTML = calendar.selected.length
      ? ""
      : '<div class="alert">Nada encontrado!</div>';

    const addItemOnList = (item, position) => {
      list.appendChild(createItemElement(item, position, date));
    }

    calendar.selected.forEach(addItemOnList);

    const itemsElements = Array.from(list.childNodes);
    const render = () => itemsElements.forEach(renderItemOnMenu);
    render();

    list.addEventListener("scroll", render);
  },
});

export default setMenuRender;