import element from "../Calendar/elements";
import Menu from "./menu";

element.task.create.addEventListener("click", () => {
  if (!element.task.content.value) return;
  Menu.createToDo(element.task.content.value);
});

const getPosition = ({ id }) => Number(id.slice(7,11).trim());

element.menu.list.addEventListener("change", ({ target }) => {
  Menu.updateToDo(getPosition(target), target.checked);
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