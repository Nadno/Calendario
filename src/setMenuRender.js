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

export default function setMenuRender(menu, calendar) {

  
  menu.render = function () {
    const ITEM_TYPE = date.eventsOn ? "events" : "tasks";
    calendar.selectItem(ITEM_TYPE);

    menu.list.innerHTML = calendar.selected.length
      ? ""
      : '<div class="alert">Nada encontrado!</div>';

    function addItemOnList(item, position) {
      const elementsTypes = {
        tasks: () => createTask(item, menu.changeContent, position),
        events: () =>
          createNotify(item, () =>
            menu.deleteItem({ eventsOn: date.eventsOn, from: position })
          ),
      };

      return menu.list.appendChild(elementsTypes[ITEM_TYPE]());
    }

    calendar.selected.forEach(addItemOnList);

    const itemsElements = Array.from(menu.list.childNodes);
    const render = () => itemsElements.forEach(renderItemOnMenu);
    render();

    menu.list.addEventListener("scroll", render);
  };
}
