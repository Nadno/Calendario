import { Menu } from "../index";
import element from "../Calendar/elements";

import { selected, DAY, WEEK_DAY, TOTAL_DAYS } from "../date";

export default function (day, week_day) {
  if (day < 0 || day > selected.get(TOTAL_DAYS)) return;
  const DAY_OR_SAME_DAY = () => selected.get(DAY) === day ? "SAME_DAY" : "DAY";
  const eventActive = () => element.create.eventActive.checked;
  const dayElement = () => document.getElementById(day);

  const set = {
    SAME_DAY: () => {
      dayElement().classList.remove("selected");
      selected.set(DAY, 0);

      Menu.exitDay(
        eventActive()
        ? { for: "Notify", title: "Eventos do mês: " }
        : { for: "Task", title: "Tarefas diárias: " }
      );
    },
    
    DAY: () => {
      dayElement().classList.add("selected");
      selected.set(DAY, day);
      selected.set(WEEK_DAY, week_day);

      Menu.setDay(
        eventActive()
        ? { for: "Notify", title: "Eventos: " }
        : { for: "Task", title: "Tarefas: " }
      );
    },
  };

  return function () {
    if (selected.get(DAY)) {
      document.getElementById(selected.get(DAY)).classList.remove("selected");
    }

    set[DAY_OR_SAME_DAY()]();
  };
}
