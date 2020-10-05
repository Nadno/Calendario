import menuUpdate from "./Calendar/actions";

export function createTask({ text, checked, position, deleteToDo }) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const span = document.createElement("span");
  const button = document.createElement("button");

  const id = `to-do__${position}`;

  Object.assign(input, {
    className: "input",
    type: "checkbox",
    id,
    checked,
  });
  Object.assign(label, {
    htmlFor: id,
    className: "content",
  });
  Object.assign(span, {
    textContent: text,
    className: "text",
  });
  Object.assign(button, {
    className: "delete",
    type: "button",
    textContent: "X",
  });

  li.className = "to-do";
  button.addEventListener("click", deleteToDo(position));

  label.appendChild(span);
  label.appendChild(button);

  li.appendChild(input);
  li.appendChild(label);
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

export function createNotify({
  type, title, body, alert, time
}, deleteNotify) {
  const notify = document.createElement("li");
  const head = document.createElement("div");
  const button = document.createElement("button");

  notify.className = "notify"
  type
    ? notify.classList.add(type)
    : null;
  console.log(deleteNotify);
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
  `
  notify.appendChild(head);
  notify.insertAdjacentHTML("beforeend", INFO);
  notify.insertAdjacentHTML("beforeend", BODY);

  if (type === 'error') setTimeout(deleteNotify, 7000);
  
  return notify;
}