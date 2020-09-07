import Menu from "./index";

const HTML_CALENDAR = 'ul.days';
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


export const CalendarOnClick = () => {
  const calendar = document.querySelector(HTML_CALENDAR);
  return calendar.onclick = ({ target }) => {
    const day = Number(target.id);
    if (day <= 0 || day > 31) return;

    menu.setState("day", Number(day));
  };
};