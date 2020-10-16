"use strict";

import calendarActions from "./Calendar/actions";
import calendarGenerator from "./Calendar/calendar";
import createMenu from "./Menu/menu";
import menuInputs from "./Menu/inputs";

import "../public/styles/style.scss";

export const Menu = createMenu();

calendarActions(Menu);
menuInputs(Menu);

calendarGenerator();