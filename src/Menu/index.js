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
  const htmlMenu = document.querySelector('.todo__menu')
  const title = document.querySelector('.menu__date>h1');
  const fullDate = document.getElementById('full__date');

  const toggleMenu = () => htmlMenu.classList.toggle('on');

  const update = (day, week_day, month) => {
    const newFullDate = `${DAY_NAME[week_day]}, dia ${day} de ${MONTH_NAME[month]}`;
    const actualFullDate = fullDate.textContent;

    if (actualFullDate === newFullDate) {
      toggleMenu();
      return fullDate.innerHTML = '';
    };
    toggleMenu();
    fullDate.innerHTML = newFullDate;
  };

  const createToDo = ({
    text,
    calendar: {
      year, month, day
    },
  }) => {
    to_do
      .setPosition(year, month, day)
      .createToDo(text)
      .addNewToDoOnDay()
      .update(update);
  };

  return {
    createToDo,
    update,
  };
};

export default Menu;
