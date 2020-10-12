import { Menu } from "../index";
import element from "../Calendar/elements";

import { selected } from "../date";

export default function (day, week_day) {
  if (day < 0 || day > 31) return;
  const sameDay = () => selected.get("day") === day;
  const eventsSelected = () => element.create.eventActive.checked;

  return function () {
    const dayElement = document.getElementById(day);
    if (selected.get("day")) {
      document.getElementById(selected.get("day")).classList.remove("selected");
    }

    if (sameDay()) {
      dayElement.classList.remove("selected");
      selected.set("day", 0);

      if (eventsSelected()) return Menu.setEvents();
      Menu.setDaily();
    } else {
      dayElement.classList.add("selected");
      selected.set("day", day);
      selected.set("week_day", week_day);

      if (eventsSelected()) return Menu.setEvents();
      Menu.setDay();
    }
  };
}
