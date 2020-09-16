import CalendarData from "../CalendarData";
import renderElement from "../render";
import { ToDo } from "../elements";

import { getDate } from "..";

const Menu = () => {
  const htmlMenu = document.querySelector(".todo__menu");
  const fullDate = document.getElementById("full__date");

  const showToDo = (list) => {
    const todoList = renderElement(".listing__todo");
    todoList.clear();

    list.forEach(({ text, checked }, position) => {
      const to_do = ToDo({
        text,
        checked,
        position,
        deleteToDo,
      });
      todoList.renderForAppendChild(to_do);
    });
  };

  const toggleMenu = (toggle) => {
    if (toggle) return htmlMenu.classList.add("on");
    return htmlMenu.classList.remove("on");
  };

  const setDay = () => {
    const { day, week_day, month, year } = getDate();
    const DAY_NAME = getDate("DAY_NAME")[week_day];
    const MONTH_NAME = getDate("MONTH_NAME")[month];
    const newFullDate = `${DAY_NAME}, ${day} de ${MONTH_NAME}`;

    fullDate.innerHTML = newFullDate;
    htmlMenu.querySelector("h2").innerHTML = "Tarefas:";
    CalendarData.setPosition(year, month, day).get(showToDo);
  };

  const setDaily = () => {
    const { month, year } = getDate();

    fullDate.innerHTML = "";
    htmlMenu.querySelector("h2").innerHTML = "Tarefas diárias:";
    CalendarData.setPosition(year, month, 0).get(showToDo);
  };

  function createToDo(text) {
    CalendarData.create(text).add().save().get(showToDo);
  };

  function updateToDo(position, checked) {
    CalendarData.update(position, checked).save();
  };

  function deleteToDo(from) {
    return function() {
      const position = { from, to: 1, };
      CalendarData.delete(position).get(showToDo);
    };
  };

  return {
    toggleMenu,
    createToDo,
    updateToDo,
    setDaily,
    setDay,
  };
};

export default Menu();
