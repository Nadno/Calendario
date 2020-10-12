const SELECTED = "selected";
const ACTUAL = "actual";

const date = {
  selected: {
    day: 0,
    month: 0,
    year: 0,
    week_day: 0,
  },
  actual: {
    day: 0,
    month: 0,
    year: 0,
  },
  MONTH_NAME: [
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
  ],
  DAY_NAME: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
};

function setDate(type, name, value) {
  if (value < 0) return;
  Object.assign(date[type], {
    ...date[type],
    [name]: value,
  });
}

export function getDate(type, name) {
  return !name ? date[type] : date[type][name];
}

export const selected = {
  get: (name) => getDate(SELECTED, name),
  set: (name, value) => setDate(SELECTED, name, value),
};

export const actual = {
  get: (name) => getDate(ACTUAL, name),
  set: (name, value) => setDate(ACTUAL, name, value),
};
