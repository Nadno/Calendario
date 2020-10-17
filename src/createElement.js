import { menuUpdate } from "./Menu/menu";
import { nameOf } from "./date";

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

export function createDay({ day, month, week_day }) {
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

function deleteNotifyButton(head, deleteNotify) {
  const button = document.createElement("button");
  button.type = "button";
  button.innerText = "X";
  button.className = "delete";
  button.addEventListener("click", deleteNotify);
  head.appendChild(button);
}

export function createNotify(
  { type, title, body, alert, day, week_day },
  deleteNotify
) {
  const notify = document.createElement("li");
  const head = document.createElement("div");

  notify.className = "notify";
  if (type) notify.classList.add(type);

  head.className = "notify__header";
  head.innerHTML = `<strong>${title}</strong>`;

  if (deleteNotify) deleteNotifyButton(head, deleteNotify);

  const INFO = `
    <div class="notify__info">
      ${`Evento para ${nameOf.day(week_day)}, dia ${day}`} </br>
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
