import Menu from "./menu";

const createButton = document.getElementById("create-todo-button");
createButton.onclick = () => {
  const to_do = document.getElementById("create-todo-input").value;
  if (!to_do) return;
  Menu.createToDo(to_do);
};

const getPosition = ({ id }) => Number(id.slice(7,11).trim());
const todoList = document.querySelector(".listing__todo");
todoList.addEventListener("change", ({ target }) => {
  const position = getPosition(target);
  const checked = target.checked;
  Menu.updateToDo(position, checked);
});

const mobileButton = document.getElementById("mobile-menu");
let activeMenu = false;

mobileButton.onclick = () => {
  const PRIMARY_COLOR = "#60cdff";
  const RED_COLOR = "red";

  activeMenu = !activeMenu;
  mobileButton.style.backgroundColor = activeMenu ? RED_COLOR : PRIMARY_COLOR;
  mobileButton.innerHTML = activeMenu ? "Fechar" : "Abrir";
  Menu.toggleMenu(activeMenu);
};