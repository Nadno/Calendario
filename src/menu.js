import ToDo from "./toDo";
import ElementRender from "./elementRender";

const HTML_LISTING_TODO = 'form.listing__todo';

const todos = new ToDo(2020, 8);
const ListingToDo = new ElementRender(HTML_LISTING_TODO);

const State = {
  day: 0,
  ToDoOnThisMonth: {},
};


export const setState = (name, value) => {
  if (State.day === value) value = 0;
  return Object.assign(State, {
    ...State,
    [name]: value,
  });
};

export const render = () => {
  ListingToDo.clear();

  State.ToDoOnThisMonth[State.day].forEach(item => {
    ListingToDo.create({
      name: 'li', content: item.task,
    }).render();
  });
};

export const update = (Month) => {
  const TODO_STATE = "ToDoOnThisMonth";
  setState(TODO_STATE, Month);
  render();
};

const Menu = () => {
  const createToDo = (text) => {
    todos
        .createToDo(text)
        .addNewToDoOnDay(State.day)
        .update();
  };

  return {
    createToDo,
  };
};

export default Menu;