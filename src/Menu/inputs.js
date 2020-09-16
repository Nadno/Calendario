import Menu from "./index";

const menu = Menu();

const createButton = document.getElementById("create-todo-button");
createButton.onclick = () => {
  const toDoText = document.getElementById("create-todo-input").value;
  if (!toDoText) return;
  menu.createToDo(toDoText);
};

const todoList = document.querySelector(".listing__todo");
todoList.addEventListener("change", ({ target }) => {
  const position = Number(target.id);
  const checked = target.checked;
  menu.updateToDo(position, checked);
});

const mobileButton = document.getElementById("mobile-menu");
let activeMenu = false;

mobileButton.onclick = () => {
  const PRIMARY_COLOR = "#60cdff";
  const RED_COLOR = "red";

  activeMenu = !activeMenu;
  mobileButton.style.backgroundColor = activeMenu ? RED_COLOR : PRIMARY_COLOR;
  mobileButton.innerHTML = activeMenu ? "Fechar" : "Abrir";
  menu.toggleMenu(activeMenu);
};