import element from "../Calendar/elements";
import Menu from "./menu";

let creatType = "todo";

element.create.submit.addEventListener("click", () => {
  if (!element.create.content.body()) return;
  Menu.create[creatType](element.create.content);
});

const setCreateEvent = ({ target }) => {
  if (target.checked) {
    creatType = "event";
    document.querySelector(".event__config").classList.add("active");
  } else {
    creatType = "todo";
    document.querySelector(".event__config").classList.remove("active");
  }
};

element.create.eventActive.addEventListener("change", setCreateEvent);

const getPosition = ({ id }) => Number(id.slice(7, 11).trim());

element.menu.list.addEventListener("change", ({ target }) => {
  Menu.updateToDo(getPosition(target), "checked", target.checked);
});

let active = false;
element.mobile.addEventListener("click", () => {
  const PRIMARY_COLOR = "#60cdff";
  const RED_COLOR = "red";

  active = !active;
  element.mobile.style.backgroundColor = active ? RED_COLOR : PRIMARY_COLOR;
  element.mobile.innerHTML = active ? "Fechar" : "Abrir";
  Menu.active(active);
});
