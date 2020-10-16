import { Menu } from "../index";
import element from "../Calendar/elements";

import { selected, DAY, WEEK_DAY, TOTAL_DAYS } from "../date";

export default function (day, week_day) {
  if (day < 0 || day > selected.get(TOTAL_DAYS)) return;
  const type = () => selected.get(DAY) === day ? "SAME_DAY" : "DAY";
  const forType = () => element.create.eventActive.checked ? "Notify" : "Task";

  return function () {
    const dayElement = document.getElementById(day);
    if (selected.get(DAY)) {
      document.getElementById(selected.get(DAY)).classList.remove("selected");
    }

    const set = {
      SAME_DAY: () => {
        dayElement.classList.remove("selected");
        selected.set(DAY, 0);

        Menu.exitDay(forType());
      },
      
      DAY: () => {
        dayElement.classList.add("selected");
        selected.set(DAY, day);
        selected.set(WEEK_DAY, week_day);

        Menu.setDay(forType());
      },
    };

    set[type()]();
    // if (sameDay()) {
    //   dayElement.classList.remove("selected");
    //   if (eventsSelected()) {
    //     selected.set(DAY, -1);
    //     return Menu.setEvents();
    //   }
    //   selected.set(DAY, 0);
    //   Menu.setDaily();
    // } else {
    //   dayElement.classList.add("selected");
    //   selected.set(DAY, day);
    //   selected.set(WEEK_DAY, week_day);

    //   //if (eventsSelected()) return Menu.setEvents();
    //   Menu.setDay();
    // }
  };
}
