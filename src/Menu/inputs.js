import element from "../Calendar/elements";
import date from "../date";

export default function (menu) {
  element.create.submit.addEventListener("click", () => {
    const { create } = element;
    if (!create.content.body()) return;
    menu.createItem({
      eventsOn: date.eventsOn,
      body: create.content.body(),
      title: create.content.title(),
    });
  });

  const setEvents = ({ target }) => date.eventsOn = target.checked;
  menu.events.addEventListener("change", setEvents);

 

  let active = false;
  element.mobile.addEventListener("click", () => {
    const PRIMARY_COLOR = "#60cdff";
    const RED_COLOR = "red";

    active = !active;
    element.mobile.style.backgroundColor = active ? RED_COLOR : PRIMARY_COLOR;
    element.mobile.innerHTML = active ? "Fechar" : "Menu";
    menu.active(active);
  });
}
