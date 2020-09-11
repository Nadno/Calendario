"use strict";

import calendar from "./Calendar/index";
import { getActualDate } from "./Calendar/date";
import { CreateToDoOnClick, MobileMenu } from "./Menu/inputs";
import { CalendarOnClick, KeysInputs } from "./Calendar/inputs";

import "../public/styles/style.scss";

const { month, year } = getActualDate();

const date = {
  day: 0,
  month,
  year,
  setDate: function (name, value) {
    if (date.day === value) value = 0;
    Object.assign(date, {
      ...date,
      [name]: value,
    });
  },
};

export const updateInputs = () => {
  CalendarOnClick(date);
  KeysInputs(date);
  MobileMenu(date);
  CreateToDoOnClick(date);
};

export const updateCalendar = () => {
  calendar();
};

calendar();

CalendarOnClick(date);
KeysInputs(date);
MobileMenu(date);
CreateToDoOnClick(date);