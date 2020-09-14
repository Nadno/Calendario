"use strict";

import calendarGenerator from "./Calendar/index";
import calendar, { getActualDate } from "./Calendar/date";
import { CloseMenu, CreateToDoOnClick, MobileMenu } from "./Menu/inputs";

import "../public/styles/style.scss";

const initial = true;
calendarGenerator(calendar(initial));

const { month, year } = getActualDate();

const date = {
  day: 0,
  month,
  year,
};

export const setDate = (name, value) => {
  if (date.day === value) value = 0;
    Object.assign(date, {
      ...date,
      [name]: value,
    });
};

export const updateInputs = () => {
  MobileMenu(date);
  CreateToDoOnClick(date);
};

export const updateCalendar = () => {
  calendar();
};

CloseMenu();
MobileMenu(date);
CreateToDoOnClick(date);