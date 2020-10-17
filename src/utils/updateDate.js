import CalendarData from "./calendar";
import element from "../Calendar/elements";

import { createNotify } from "../createElement";
import { actual, getDate } from "../date";

const FIVE_MINUTES = 60000 * 5;

const isDifferentDay = () => {
  const day = new Date().getDate();
  const DIFFERENT_DAY = day !== actual.get("day");
  if (DIFFERENT_DAY) location.reload();
};

setInterval(isDifferentDay, FIVE_MINUTES);

export default function checkEvents(Notify) {
  CalendarData.selectDate(getDate("actual"));

  function showNotification(event, position) {
    if (event.alert) {
      const deleteNotify = ({ target }) => {
        target.parentNode.parentNode.remove();
        Notify.finalize(position);
      };
      const eventEl = createNotify(event, deleteNotify);
      eventEl.classList.add("on-screen");
      element.notifications.appendChild(eventEl);
    }
  }

  Notify.get((events) => {
    if (events.length) events.forEach(showNotification);
  });
}
