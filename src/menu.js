import ToDo from "./to-do";
import ElementRender from "./elementRender";

const HTML_LISTING_TODO = 'form.listing__todo';

const todos = new ToDo(2020, 8);
const ListingToDo = new ElementRender(HTML_LISTING_TODO);



export const update = (Month) => {
  const TODO_STATE = "ToDoOnThisMonth";
  setState(TODO_STATE, Month);
  render();
};

const Menu = () => {
  

  return {
    "ok": "ae"
  };
};

export default Menu;