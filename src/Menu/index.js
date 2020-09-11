import ToDo from "../to-do";
import ElementRender from "../elementRender";

const HTML_LISTING_TODO = "form.listing__todo";

const to_do = new ToDo();
const ListingToDo = new ElementRender(HTML_LISTING_TODO);

const renderToDo = (item) => {
  ListingToDo.create({
    name: "li",
    content: item.text,
  }).render();
};

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

  const ToDoList = {
    setToDos: function (ToDos) {
      Object.assign(ToDoList, {
        ...ToDoList,
        ToDos,
      });
    },
  };

  const toggleMenu = () => htmlMenu.classList.toggle("on");

  const renderMenu = (date) => {
    fullDate.innerHTML = date;
    htmlMenu.querySelector("h2").innerHTML = "Tarefas:";
  };

  const setDaily = () => {
    fullDate.innerHTML = "";
    htmlMenu.querySelector("h2").innerHTML = "Tarefas diárias:";
  };

  const update = (day, week_day, month) => {
    const newFullDate = `${DAY_NAME[week_day]}, ${day} de ${MONTH_NAME[month]}`;
    const actualFullDate = fullDate.textContent;

    if (actualFullDate === newFullDate) return setDaily();
    renderMenu(newFullDate);
  };

  const createToDo = (text, { year, month, day }) => {
    to_do.setPosition(year, month, day);
    if (day === 0) {
      to_do.createToDo(text).addOnDaily().update(ToDoList.setToDos);
    } else {
      to_do.createToDo(text).addOnDay().update(ToDoList.setToDos);
    }
  };

  return {
    toggleMenu,
    createToDo,
    update,
  };
};

export default Menu;
