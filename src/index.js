'use strict'

import calendar from './Calendar/index';
import { getActualDate } from './Calendar/date';
import { CreateToDoOnClick } from './Menu/actions';
import { CalendarOnClick, KeysInputs } from './Calendar/inputs';

import '../public/styles/style.scss';

const { month, year } = getActualDate();

const date = {
  day: 0,
  month,
  year,
  setCalendar: function (name, value) {
    if (State.day === value) value = 0;
  Object.assign(State, {
    ...State,
    [name]: value,
  });
  
  }
};

calendar();

CalendarOnClick();
KeysInputs();

CreateToDoOnClick();