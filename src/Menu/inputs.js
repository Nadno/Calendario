import Menu from "./index";

const createButton = document.getElementById("create-todo-button");
createButton.onclick = () => {
  const toDoText = document.getElementById("create-todo-input").value;
  if (!toDoText) return;
  Menu.createToDo(toDoText);
};

const todoList = document.querySelector(".listing__todo");
todoList.addEventListener("change", ({ target }) => {
  const position = Number(target.id);
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