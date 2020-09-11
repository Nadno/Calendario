import Menu from "./index";

const HTML_CREATE_TODO_INPUT = "create-todo-input";
const HTML_CREATE_TODO_BUTTON = "create-todo-button";
const HTML_MOBILE_MENU_BUTTON = "mobile-menu";

const menu = Menu();

export const CreateToDoOnClick = ({ day, month, year }) => {
  const ToDo = document.getElementById(HTML_CREATE_TODO_INPUT);
  const create = document.getElementById(HTML_CREATE_TODO_BUTTON);
  return (create.onclick = () => {
    if (!ToDo.value) return;
    menu.createToDo(ToDo.value, {
      day,
      month,
      year,
    });
  });
};

export const MobileMenu = (date) => {
  const button = document.getElementById(HTML_MOBILE_MENU_BUTTON);
  let active = false;

  return (button.onclick = () => {
    button.style.backgroundColor = active ? "#60cdff" : "red";
    menu.toggleMenu(date.day);
    active = !active;
  });
};
