import { menuUpdate } from "./Menu/menu";
import date from "./date";

const createElement = (name, content, attributes) => {
  const element = document.createElement(name);

  element.innerText = content;

  const attributesAsArray = Object.entries(attributes);
  if (!attributesAsArray) return element;

  const setElementAttributes = ([key, value]) => (element[key] = value);
  attributesAsArray.forEach(setElementAttributes);

  return element;
};

export function createTask({ text, checked }, changeContent, position) {
  const id = `${position}-todo`;

  const li = createElement("li", "", { className: "to-do" });
  const label = createElement("label", "", { htmlFor: id });

  const checkbox = createElement("input", "", {
    className: "input",
    type: "checkbox",
    id,
    checked,
  });
  const content = createElement("div", text, {
    id: "content",
    className: "content",
    contentEditable: true,
  });
  content.addEventListener("blur", changeContent);

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(content);

  return li;
}

export function createDay({ day, month, week_day }) {
  const li = document.createElement("li");
  const button = createElement("button", day, {
    id: day,
    type: "button",
    className: month,
  });
  button.addEventListener("click", menuUpdate(day, week_day));

  li.appendChild(button);

  return li;
}

export const createYearOption = (value) => 
  createElement("option", value, { value });

export function createNotify(
  { type, title, body, alert, day, week_day },
  deleteNotify
) {
  const { actual, DAY_NAME } = date;
  const notify = createElement("li", '', { className: `notify ${type?type:null}`, });
  const head = createElement("div", title, { className: "notify__header" });

  if (deleteNotify) {
    const deleteButton = createElement("button", "X", {
      type: "button",
      className: "delete",
    });
    deleteButton.addEventListener("click", deleteNotify);
    head.appendChild(deleteButton);
  };

  const INFO = `
    <div class="notify__info">
      ${
        actual.day === day
          ? "Evento do dia!"
          : `Evento para ${DAY_NAME[week_day]}, dia ${day}`
      } </br>
      ${alert ? "" : "Finalizado!"}
    </div>
  `;
  const BODY = `
    <div class="notify__body">${body}</div>
  `;

  notify.appendChild(head);
  notify.insertAdjacentHTML("beforeend", INFO);
  notify.insertAdjacentHTML("beforeend", BODY);

  return notify;
}
