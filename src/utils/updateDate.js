// import element from "../_Calendar/elements";

// import resetDailyTasks from "./resetDailyTasks";

// import { createNotify } from "../createElement";

// const FIVE_MINUTES = 60000 * 5;
// const { selected, actual } = date;

// const isDifferentDay = () => {
//   const day = new Date().getDate();
//   const DIFFERENT_DAY = day !== actual.day;
//   if (DIFFERENT_DAY) location.reload();
// };

// setInterval(isDifferentDay, FIVE_MINUTES);

// export function isNewDay(Notify) {
//   const { day, month } = Notify.getLastConnection();
//   if (day !== actual.day || month !== actual.month) {
//     resetDailyTasks(Notify);
//     checkEvents(Notify);
//     Notify.setLastConnection(actual).save();
//   }
// }

// function checkEvents(Notify) {
//   Notify.selectDate(actual);

//   function addPastEventsToNotifications(month) {
//     Object.keys(month).forEach((day) => {
//       if (day < actual.day && month?.[day]) 
//         month[day].events.map(addEventsToNotifications);
//     });
//   }

//   function addEventsToNotifications(event) {
//     if (event.alert) {
//       Notify.calendar.notifications.push(event);
//       event.alert = false;
//       return event;
//     }
//   }

//   Notify.get((events) => {
//     events.forEach(addEventsToNotifications);
//   });
//   Notify.getMonth(addPastEventsToNotifications);
//   Notify.selectDate(selected).save();
// }

// export function showNotification(event, position) {
//   const deleteNotify = ({ target }) => {
//     target.parentNode.parentNode.remove();
//     Notify.finalizeNotification(position);
//   };
//   const eventEl = createNotify(event, deleteNotify);
//   eventEl.classList.add("on-screen");
//   element.notifications.appendChild(eventEl);
// }