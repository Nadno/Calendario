import menuUpdate from "./Calendar/actions";

export function createTask({ text, checked, position, changeContent }) {
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

export function createNotify({ type, title, body, alert, time }, deleteNotify) {
  const notify = document.createElement("li");
  const head = document.createElement("div");
  const button = document.createElement("button");

  notify.className = "notify";
  type ? notify.classList.add(type) : null;

  button.innerText = "X";
  button.addEventListener("click", deleteNotify);

  head.className = "notify__header";
  head.innerHTML = `<strong>${title}</strong>`;
  head.appendChild(button);

  const INFO = `
    <div>${time}, dia ${alert.to}, quinta-feira de outubro</div>
  `;
  const BODY = `
    <div class="notify__body">${body}</div>
  `;

  notify.appendChild(head);
  notify.insertAdjacentHTML("beforeend", INFO);
  notify.insertAdjacentHTML("beforeend", BODY);

  return notify;
}
