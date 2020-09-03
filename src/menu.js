import ElementRender from "./elementRender";


const HTML_LISTING_TODO = 'form.listing__todo';

const ListingToDo = new ElementRender(HTML_LISTING_TODO);

export const render = (ToDos) => {
  ListingToDo.clear();

  ToDos.forEach(item => {
    ListingToDo.create({
      name: 'li', content: item.task,
    }).render();
  });
};