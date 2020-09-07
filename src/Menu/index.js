import { getActualDate } from "../date";
import ToDo from "../to-do";
import ElementRender from "../elementRender";

const HTML_LISTING_TODO = "form.listing__todo";

const todos = new ToDo();
const ListingToDo = new ElementRender(HTML_LISTING_TODO);

const renderToDo = (item) => {
  ListingToDo.create({
    name: "li",
    content: item.text,
  }).render();
};

const Menu = () => {
  const { year, month } = getActualDate();
  const State = {
    day: 0,
    month,
    year,
    ToDoOnThisMonth: {},
  };

  const setState = (name, value) => {
    if (State.day === value) value = 0;
    Object.assign(State, {
      ...State,
      [name]: value,
    });
    
  };

  const render = () => {
    ListingToDo.clear();

    State.ToDoOnThisMonth[State.day].forEach(renderToDo);
  };

  const update = (data) => {
    setState("ToDoOnThisMonth", data);
    render();
  };

  const createToDo = (text) => {
    const { year, month, day } = State;
    
    todos
      .setPosition(year, month, day)
      .createToDo(text)
      .addNewToDoOnDay()
      .update(update);
  };

  return {
    setState,
    render,
    createToDo,
  };
};

export default Menu;
