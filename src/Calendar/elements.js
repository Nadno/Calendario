const element = {
  menu: {
    self: document.querySelector(".todo__menu"),
    title: document.querySelector("#full__date"),
    list: document.querySelector(".listing__todo"),
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
      body: () => document.querySelector("#content").value,
    },
    eventActive: document.querySelector("#event"),
  },
  mobile: document.querySelector("#mobile-menu"),
  notifications:  document.querySelector(".notifications"),
};

export default element;