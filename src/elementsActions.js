import todoItems from './todoItems';

const HTML_CALENDAR = 'ul.days';
const HTML_CREATE_TODO_INPUT = 'create-todo-input';
const HTML_CREATE_TODO_BUTTON = 'create-todo-button';

const todos = new todoItems(2020, 8);

export const CalendarOnClick = () => {
  const calendar = document.querySelector(HTML_CALENDAR);
  return calendar.onclick = ({ target }) => {
    const day = Number(target.id);
    if (day <= 0 || day > 31) return;

 
  };
};

export const CreateToDoOnClick = () => {
  const ToDo = document.getElementById(HTML_CREATE_TODO_INPUT);
  const create = document.getElementById(HTML_CREATE_TODO_BUTTON);
  return create.onclick = () => {
    if (!ToDo.value) return;
    todos
      .createToDo(ToDo.value)
      .addNewToDo(2)
      .update();
  };
};