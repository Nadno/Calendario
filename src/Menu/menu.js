import Task from "../utils/task";

import renderElement from "../render";
import { createTask } from "../createElement";

import { getDate } from "../date";

const element = {
  menu: document.querySelector(".todo__menu"),
  menuTitle: document.getElementById("full__date"),
  menuList: renderElement(".listing__todo"),
};

const Menu = {
  toggleMenu: function (toggle) {
    if (toggle) return htmlMenu.classList.add("on");
    return htmlMenu.classList.remove("on");
  },

  setDay: function () {
    const { day, week_day, month, year } = getDate();
    const DAY_NAME = getDate("DAY_NAME")[week_day];
    const MONTH_NAME = getDate("MONTH_NAME")[month];
    const newFullDate = `${DAY_NAME}, ${day} de ${MONTH_NAME}`;

    element.menuTitle.innerHTML = newFullDate;
    element.menu.querySelector("h2").innerHTML = "Tarefas:";
    Task.selectDate({ year, month, day }).get(showToDo);
  },

  setDaily: function () {
    const { month, year } = getDate();

    element.menuTitle.innerHTML = "";
    element.menu.querySelector("h2").innerHTML = "Tarefas diárias:";
    Task.selectDate({ year, month, day: 0 }).get(showToDo);
  },

  createToDo: function (text) {
    Task.create(text).add().save().get(showToDo);
  },

  updateToDo: function (position, checked) {
    Task.update(position, checked).save();
  },
};

function deleteToDo(from, to = 1) {
  return function () {
    const position = { from, to };
    Task.delete(position).save().get(showToDo);
  };
}

function showToDo(tasks) {
  element.menuList.clear();

  tasks.forEach(({ text, checked }, position) => {
    element.menuList.renderForAppendChild(
      createTask({
        text,
        checked,
        position,
        deleteToDo,
      })
    );
  });
}

Task.get(showToDo);

export default Menu;
