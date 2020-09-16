"use strict";

import calendarGenerator from "./Calendar/index";
import calendar from "./Calendar/date";
import "./Menu/inputs";

import "../public/styles/style.scss";

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

export const setDate = (name, value) => {
  if (value < 0) return;
  Object.assign(date, {
    ...date,
    [name]: value,
  });
};

export const getDate = (name) => {
  const { day, month, year, week_day } = date;
  return name ? date[name] : { day, month, year, week_day };
};

const initial = true;
calendarGenerator(calendar(initial));