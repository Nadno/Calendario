import date from "../date";
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

export default function setMenuRender(menu, calendar) {
  menu.render = function () {
    const createElement = date.eventsOn ? createNotify : createTask;
    const items = date.eventsOn ? calendar.getNotify() : calendar.getTask();
  
    menu.list.innerHTML = items.length
      ? ""
      : '<div class="alert">Nada encontrado!</div>';
  
    function addItemOnMenu(item, position) {
      menu.list.appendChild(createElement(item, menu.changeContent, position));
    }
  
    items.forEach(addItemOnMenu);
  
    const itemsElements = Array.from(
      document.querySelector(".todo__list").childNodes
    );
    const render = () => itemsElements.forEach(renderItemOnMenu);
    render();
  
    menu.list.addEventListener("scroll", render);
  }
};