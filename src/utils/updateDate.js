import element from "../Calendar/elements";

import { actual } from "../date";
import { createNotify } from "../createElement";

const FIVE_MINUTES = 60000 * 5;

setInterval(updateDate, FIVE_MINUTES);

function updateDate() {
  const day = new Date().getDate();

  if (day === actual.get("day")) return;
  checkEvents();
}

export default function checkEvents(Notify) {
  Notify.selectDate(actual.get("year"), actual.get("month"));
  if (Notify.get(hasEvent)) {
    Notify.get((events) => {
      events.forEach((notify, position) => {
        if (isEventDay(notify)) {
          element.notifications.appendChild(createNotify(notify));
          // Notify.finalize(position);
        }
      });
    });
  }
}

function hasEvent(events) {
  return events.length ? true : false;
}

function isEventDay({ alert, from, to }) {
  return (
    alert &&
    from.year >= actual.get("year") &&
    from.month >= actual.get("month") &&
    validDay(from, to)
  );
}

function validDay(from, to) {
  return actual.get("day") >= from.day && actual.get("day") <= to;
}
