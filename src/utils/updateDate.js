import element from "../Calendar/elements";

import { actual } from "../date";
import { createNotify } from "../createElement";

const FIVE_MINUTES = 60000 * 5;

setInterval(checkEvents, FIVE_MINUTES);

export default function checkEvents(Notify) {
  if (
    !Notify.isNewDay(actual.get("year"), actual.get("month"), actual.get("day"))
  )
    return;

  Notify.selectDate(actual.get("year"), actual.get("month"))
    .setConnection(actual.get("year"), actual.get("month"), actual.get("day"))
    .save();

  if (Notify.get(hasEvent)) {
    Notify.get((events) => {
      events.forEach((notify, position) => {
        if (finalizeEvent(notify.to)) Notify.finalize(position);
        if (notify.status && validDate(notify)) {
          element.notifications.appendChild(createNotify(notify));
        }
      });
    });
  }
}

function hasEvent(events) {
  return events.length ? true : false;
}

function validDate({ from, to }) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const BIGGER_THAN_FROM_DATE =
    actual.get("year") >= fromDate.getUTCFullYear() &&
    actual.get("month") >= fromDate.getUTCMonth() &&
    actual.get("day") >= fromDate.getUTCDate();

  const LESS_THAN_TO_DATE =
    actual.get("year") <= toDate.getUTCFullYear() &&
    actual.get("month") <= toDate.getUTCMonth() &&
    actual.get("day") <= toDate.getUTCDate();

  return BIGGER_THAN_FROM_DATE && LESS_THAN_TO_DATE;
}

function finalizeEvent(to) {
  const toDate = new Date(to);

  const FINALIZE_EVENT =
    actual.get("year") >= toDate.getUTCFullYear() &&
    actual.get("month") >= toDate.getUTCMonth() &&
    actual.get("day") > toDate.getUTCDate();

  return FINALIZE_EVENT;
}
