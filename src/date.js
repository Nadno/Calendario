import setDateActions from "./utils/setDateActions";

const createDate = () => {
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
  const selected = {
    day: 0,
    month: 0,
    year: 0,
    week_day: 0,
    total_days: 0,
  };
  const actual = {
    day: 0,
    month: 0,
    year: 0,
    week_day: 0,
  };

  Object.freeze(DAY_NAME);
  Object.freeze(MONTH_NAME);
  Object.preventExtensions(actual);
  Object.preventExtensions(selected);

  return Object.preventExtensions({
    date: {
      selected,
      actual,
      DAY_NAME,
      MONTH_NAME,
      ...setDateActions(),
    },
  });
};

export default createDate;
