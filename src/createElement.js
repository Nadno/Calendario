import menuUpdate from './utils/updateMenu';
import { getDate } from "./date";

export function createTask({ text, checked }, changeContent, position) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const content = document.createElement("div");
  const label = document.createElement("label");

  const id = `to-do__${position}`;
  label.htmlFor = id;
  li.className = "to-do";

  Object.assign(checkbox, {
    className: "input",
    type: "checkbox",
    id,
    checked,
  });

  Object.assign(content, {
    id: "content",
    className: "content",
    contentEditable: true,
    innerText: text,
  });

  content.addEventListener("blur", changeContent);
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(content);

  return li;
}

export function createDay({ day, month, week_day }, Menu) {
  const li = document.createElement("li");
  const button = document.createElement("button");

  Object.assign(button, {
    id: day,
    type: "button",
    innerText: day,
    className: month,
  });

  button.addEventListener("click", menuUpdate(day, week_day));
  li.appendChild(button);

  return li;
}

export function createYearOption(value) {
  const op = document.createElement("option");
  Object.assign(op, {
    value,
    innerText: value,
  });
  return op;
}

export function createNotify(
  { type, title, body, alert, from, to, time },
  deleteNotify
) {
  const notify = document.createElement("li");
  const head = document.createElement("div");
  const button = document.createElement("button");

  notify.className = "notify";
  if (type) notify.classList.add(type);

  button.type = "button";
  button.innerText = "X";
  button.className = "delete";
  button.addEventListener(
    "click",
    deleteNotify ? deleteNotify : () => notify.remove()
  );

  head.className = "notify__header";
  head.innerHTML = `<strong>${title}</strong>`;
  head.appendChild(button);

  const INFO = `
    <div>
      ${
        alert
          ? `<div>Alerta para: 
              Dia ${from.day} de ${getDate("MONTH_NAME")[from.month]} de ${
              from.year
            }</div>
             </div>`
          : "Evento Finalizado"
      }
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
