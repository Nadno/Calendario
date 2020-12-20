"use strict";

import setInitialDate from "./utils/date";
import { isNewDay, showNotification } from "./utils/updateDate";
import calendarGenerator from "./Calendar/calendar";

import calendarActions from "./Calendar/actions";
import createMenu from "./Menu/menu";

import calendar from "./utils/calendar";


import "../public/styles/style.scss";

setInitialDate();
// isNewDay();
createMenu(calendar);
calendarActions(calendar);

calendarGenerator();

// Task.setDayWithItems();
// Notify.getNotifications().forEach(showNotification);