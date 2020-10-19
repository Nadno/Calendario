"use strict";

import setInitialDate from "./utils/date";
import { isNewDay, showNotification } from "./utils/updateDate";
import calendarGenerator from "./Calendar/calendar";

import calendarActions from "./Calendar/actions";
import createMenu from "./Menu/menu";

import CalendarData from "./utils/calendar";
import Notify from "./utils/notify";
import Task from "./utils/task";

import "../public/styles/style.scss";

setInitialDate(CalendarData);
isNewDay(Notify);
createMenu(Notify, Task);
calendarActions(CalendarData);

calendarGenerator();
CalendarData.setDayWithItems();
CalendarData.getNotifications().forEach(showNotification);;
