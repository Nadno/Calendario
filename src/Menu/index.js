import ToDo from "../to-do";
import renderElement from "../render";
import ToDoItem from "../elements";

import { getDate } from "..";

const to_do = new ToDo();

const Menu = () => {
  const MONTH_NAME = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const DAY_NAME = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const htmlMenu = document.querySelector(".todo__menu");
  const fullDate = document.getElementById("full__date");

  const showToDo = (list) => {
    const todoList = renderElement(".listing__todo");
    todoList.clear();

    list.forEach(({ text, checked }, position) => {
      const to_do = ToDoItem({
        text,
        checked,
        position,
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
    const newFullDate = `${DAY_NAME[week_day]}, ${day} de ${MONTH_NAME[month]}`;

    fullDate.innerHTML = newFullDate;
    htmlMenu.querySelector("h2").innerHTML = "Tarefas:";
    to_do.setPosition(year, month, day).getDay(showToDo);
  };

  const setDaily = () => {
    const { month, year } = getDate();

    fullDate.innerHTML = "";
    htmlMenu.querySelector("h2").innerHTML = "Tarefas diárias:";
    to_do.setPosition(year, month, 0).getDaily(showToDo);
  };

  const createToDo = (text) => {
    const day = getDate("day");
    if (day === 0) {
      to_do.create(text).addOnDaily().getDaily(showToDo);
    } else {
      to_do.create(text).addOnDay().getDay(showToDo);
    }
  };

  const updateToDo = (position, checked) => {
    const day = getDate("day");
    day
      ? to_do.updateDay(position, checked)
      : to_do.updateDaily(position, checked);
  };

  return {
    toggleMenu,
    createToDo,
    updateToDo,
    setDaily,
    setDay,
  };
};

export default Menu;
