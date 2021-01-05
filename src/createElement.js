const createElement = (name, content, attributes) => {
  const element = document.createElement(name);

  element.innerText = content;

  const attributesAsArray = Object.entries(attributes);
  if (!attributesAsArray) return element;

  const setElementAttributes = ([key, value]) => (element[key] = value);
  attributesAsArray.forEach(setElementAttributes);

  return element;
};

export default createElement;

export const createTask = ({ text, checked }, position) => {
  const id = `todoAt-${position}`;

  const li = createElement("li", "", { className: "c-todo" });
  const label = createElement("label", "", { htmlFor: id });

  const checkbox = createElement("input", "", {
    className: "c-todo__input",
    type: "checkbox",
    id,
    checked,
  });
  const content = createElement("div", text, {
    className: "c-todo__content",
    contentEditable: true,
  });

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(content);

  return li;
}

export const createNotify = (
  { type, title, body, alert, day, week_day },
  position, date
) => {
  const { actual, DAY_NAME } = date;
  const notify = createElement("li", '', { className: `c-notify ${type?type:null} on-screen`, });
  const head = createElement("div", title, { className: "c-notify__header" });

  const deleteButton = createElement("span", "X", {
    id: `eventAt-${position}`,
    className: "delete-button",
  });
  head.appendChild(deleteButton);

  const INFO = `
    <div class="c-notify__info">
      ${
        actual.day === day
          ? "Evento do dia!"
          : `Evento para ${DAY_NAME[week_day]}, dia ${day}`
      } </br>
      ${alert ? "" : "Finalizado!"}
    </div>
  `;
  const BODY = `
    <div class="c-notify__body">${body}</div>
  `;

  notify.appendChild(head);
  notify.insertAdjacentHTML("beforeend", INFO);
  notify.insertAdjacentHTML("beforeend", BODY);

  return notify;
}