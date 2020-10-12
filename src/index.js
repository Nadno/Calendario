"use strict";

import calendarActions from "./Calendar/actions";
import calendarGenerator from "./Calendar/calendar";
import createMenu from './Menu/menu';
import menuInputs from './Menu/inputs';

import initialConfig from "./utils/date";
import checkEvents from "./utils/updateDate";

import Notify from "./utils/notify";
import Task from "./utils/task";

import "../public/styles/style.scss";

initialConfig(Notify, Task);

export const Menu = createMenu(Notify, Task);

calendarActions(Menu);
menuInputs(Menu);


calendarGenerator();
checkEvents(Notify);