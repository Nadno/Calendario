import Element from "./element";

const element = new Element();

const HTML_LISTING_TODOS = 'form.listing__todo';

export const render = (ToDos) => {
  element.clear(HTML_LISTING_TODOS);

  ToDos.map(item => {
    element.create({
      name: 'li', content: item.task,
    }).renderOn(HTML_LISTING_TODOS);
  });
};