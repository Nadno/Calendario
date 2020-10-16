const { default: element } = require("../Calendar/elements");
const { createNotify } = require("../createElement");
const { actual, DAY, MONTH, YEAR } = require("../date");

const FIVE_MINUTES = 60000 * 5;

setInterval(() => {
  console.log("OK")
}, FIVE_MINUTES);

export default function checkEvents(Notify) {
  if (!Notify.isNewDay()) return;
  Notify.selectDate({
    year: actual.get(YEAR),
    month: actual.get(MONTH),
    day: actual.get(DAY),
  }).setLastConnection().save();

  function showNotification(event, position) {
    if (event.alert) {
      element.notifications.appendChild(createNotify(event));
      Notify.finalize(position).save();
    };
  }

  Notify.get(events => {
    if (events.length) events.forEach(showNotification);
  });
}
