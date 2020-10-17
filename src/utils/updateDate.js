import element from "../Calendar/elements";
import { createNotify } from "../createElement";
import { actual, DAY, MONTH, YEAR } from "../date";

const FIVE_MINUTES = 60000 * 5;

setInterval(() => {
  console.log("OK")
}, FIVE_MINUTES);

export default function checkEvents(Notify) {
  Notify.selectDate({
    year: actual.get(YEAR),
    month: actual.get(MONTH),
    day: actual.get(DAY),
  });

  function showNotification(event, position) {
    console.log(event);
    if (event.alert) {
      const deleteNotify = ({ target }) => {
        target.parentNode.parentNode.remove();
        Notify.finalize(position).save();
      };
      const eventEl = createNotify(event, deleteNotify);
      eventEl.classList.add("on-screen");
      element.notifications.appendChild(eventEl);
    };
  }

  Notify.get(events => {
    if (events.length) events.forEach(showNotification);
  });
}
