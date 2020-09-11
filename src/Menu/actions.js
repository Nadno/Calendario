import Menu from "./index";

const HTML_CREATE_TODO_INPUT = 'create-todo-input';
const HTML_CREATE_TODO_BUTTON = 'create-todo-button';

const menu = Menu();

export const CreateToDoOnClick = () => {
  const ToDo = document.getElementById(HTML_CREATE_TODO_INPUT);
  const create = document.getElementById(HTML_CREATE_TODO_BUTTON);
  return create.onclick = () => {
    if (!ToDo.value) return;
    menu.createToDo(ToDo.value);
  };
};