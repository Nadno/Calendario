const date = {
  day: 0,
  month: 0,
  year: 0,
  week_day: 0,
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

export function setDate(name, value) {
  if (value < 0) return;
  Object.assign(date, {
    ...date,
    [name]: value,
  });
};

export function getDate(name) {
  const { day, month, year, week_day } = date;
  return name ? date[name] : { day, month, year, week_day };
};