const element = {
  menu: {
    self: document.querySelector(".menu"),
    date: document.querySelector(".selected__day"),
    list: document.querySelector(".todo__list"),
    taskTitle: document.querySelector("#task-title"),
  },
  calendar: {
    self: document.querySelector("ul.days"),
    title: document.querySelector(".month__name"),
    year: document.querySelector(`#year`),
    month: document.querySelector(`#month`),
  },
  create: {
    submit: document.querySelector("#create"),
    content: {
      title: () => document.querySelector("#title").value,
      body: () => document.querySelector("#body").value,
    },
    eventActive: document.querySelector("#event"),
  },
  mobile: document.querySelector("#mobile-menu"),
  notifications:  document.querySelector(".notifications"),
};

export default element;