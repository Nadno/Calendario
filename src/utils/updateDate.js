import CalendarData from "./calendar";
import element from "../Calendar/elements";

import resetDailyTasks from "./resetDailyTasks";

import { createNotify } from "../createElement";
import { actual, getDate, DAY, MONTH } from "../date";

const FIVE_MINUTES = 60000 * 5;

const isDifferentDay = () => {
  const day = new Date().getDate();
  const DIFFERENT_DAY = day !== actual.get("day");
  if (DIFFERENT_DAY) location.reload();
};

setInterval(isDifferentDay, FIVE_MINUTES);

export function isNewDay(Notify) {
  const { day, month } = CalendarData.getLastConnection();
  if (day !== actual.get(DAY) || month !== actual.get(MONTH)) {
    resetDailyTasks(CalendarData);
    checkEvents(Notify);
    CalendarData.setLastConnection(getDate("actual")).save();
  }
}

function checkEvents(Notify) {
  CalendarData.selectDate(getDate("actual"));

  function addPastEventsToNotifications(month) {
    Object.keys(month).forEach((day) => {
      if (day < actual.get(DAY) && month?.[day]) 
        month[day].events.map(addEventsToNotifications);
    });
  }

  function addEventsToNotifications(event) {
    if (event.alert) {
      CalendarData.calendar.notifications.push(event);
      event.alert = false;
      return event;
    }
  }

  Notify.get((events) => {
    events.forEach(addEventsToNotifications);
  });
  CalendarData.getMonth(addPastEventsToNotifications);

  CalendarData.selectDate(getDate("selected")).save();
}

export function showNotification(event, position) {
  const deleteNotify = ({ target }) => {
    target.parentNode.parentNode.remove();
    CalendarData.finalizeNotification(position);
  };
  const eventEl = createNotify(event, deleteNotify);
  eventEl.classList.add("on-screen");
  element.notifications.appendChild(eventEl);
}