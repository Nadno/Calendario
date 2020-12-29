"use strict";

import setInitialDate from "./utils/date";
import { isNewDay, showNotification } from "./utils/updateDate";
import calendarGenerator from "./_Calendar/calendar";

import calendarActions from "./_Calendar/actions";
import startMenu from "./Menu/menu";

import "../public/styles/style.scss";

// isNewDay();

setInitialDate();
calendarGenerator();
calendarActions();
startMenu();

// Task.setDayWithItems();
// Notify.getNotifications().forEach(showNotification);