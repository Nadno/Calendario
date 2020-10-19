import element from "../Calendar/elements";
import { selected, DAY } from "../date";

export default function (Menu) {
  let creatType = "todo";

  element.create.submit.addEventListener("click", () => {
    if (!element.create.content.body()) return;
    Menu.create[creatType](element.create.content);
  });

  const setEvents = ({ target }) => {
    if (selected.get(DAY)) {
      document.getElementById(selected.get(DAY)).classList.remove("selected");
      selected.set(DAY, 0);
    }

    if (target.checked) {
      creatType = "event";
      Menu.exitDay({ for: "Notify", title: "Eventos do mês: " });
      document.querySelector(".event__config").classList.add("active");
    } else {
      creatType = "todo";
      Menu.exitDay({ for: "Task", title: "Tarefas diárias: " });
      document.querySelector(".event__config").classList.remove("active");
    }
  };
  element.create.eventActive.addEventListener("change", setEvents);

  const getPosition = (id) => Number(id.slice(7, 11).trim());

  element.menu.list.addEventListener("change", ({ target }) => {
    Menu.task.update(getPosition(target.id), "checked", target.checked);
  });

  let active = false;
  element.mobile.addEventListener("click", () => {
    const PRIMARY_COLOR = "#60cdff";
    const RED_COLOR = "red";

    active = !active;
    element.mobile.style.backgroundColor = active ? RED_COLOR : PRIMARY_COLOR;
    element.mobile.innerHTML = active ? "Fechar" : "Menu";
    Menu.active(active);
  });
}
