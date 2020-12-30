"use strict";

import date from "./date";
import calendarGenerator from "./_Calendar/calendar";

import calendarActions from "./_Calendar/actions";
import startMenu from "./Menu/menu";

import "../public/styles/style.scss";

// isNewDay();
date.setInitialDate();
calendarGenerator();
calendarActions();
startMenu();

// Task.setDayWithItems();
// Notify.getNotifications().forEach(showNotification);