const SELECTED = "selected";
const ACTUAL = "actual";
export const DAY = "day",
  MONTH = "month",
  YEAR = "year",
  WEEK_DAY = "week_day",
  TOTAL_DAYS = "total_days";

const date = {
  selected: {
    day: 0,
    month: 0,
    year: 0,
    week_day: 0,
    total_days: 0,
  },
  actual: {
    day: 0,
    month: 0,
    year: 0,
    week_day: 0,
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

  events: false,
};

function setDate(type, name, value) {
  if (value < 0) return;
  Object.assign(date[type], {
    ...date[type],
    [name]: value,
  });
}

export function getDate(type, name) {
  return name === undefined ? date[type] : date[type][name];
}

export const selected = {
  get: (name) => getDate(SELECTED, name),
  set: (name, value) => setDate(SELECTED, name, value),
};

export const actual = {
  get: (name) => getDate(ACTUAL, name),
  set: (name, value) => setDate(ACTUAL, name, value),
};

export const nameOf = {
  month: (month) => getDate("MONTH_NAME", month),
  day: (day) => getDate("DAY_NAME", day),
};

export default date;