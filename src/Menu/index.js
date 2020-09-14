import ToDo from "../to-do";
import ElementRender from "../render";
import renderElement from "../render";

const HTML_LISTING_TODO = "form.listing__todo";

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
    const todoList = renderElement('.listing__todo');
    todoList.clear();
    list.forEach(({ text, checked }, position) => {
      todoList.renderForInnerHTML(`
        <li class="to-do">
          <input class="input" type="checkbox" id="${position}" ${checked ? 'checked' : null} />
          <label class="content" for="${position}">
            <span class="text" >${text}</span>
            <button class="delete" type="button">X</button>
          </label>
        </li>
      `);
    });
  };

  const toggleMenu = (toggle) => {
    if (toggle) return htmlMenu.classList.add('on');
    return htmlMenu.classList.remove('on');
  };

  const setDay = (date) => {
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
    setDay(newFullDate);
  };

  const createToDo = (text, { year, month, day }) => {
    to_do.setPosition(year, month, day);
    if (day === 0) {
      to_do.createToDo(text).addOnDaily().updateDaily(showToDo);
    } else {
      to_do.createToDo(text).addOnDay().updateDay(showToDo, year);
    }
  };

  return {
    toggleMenu,
    createToDo,
    update,
  };
};

export default Menu;
