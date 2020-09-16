import menuUpdate from "./Calendar/actions";

export const ToDo = ({ position, checked, text, deleteToDo }) => {
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
};

export const Day = ({ day, month, week_day }) => {
  const li = document.createElement("li");
  const button = document.createElement("button");

  Object.assign(button, {
    id: day,
    type: "button",
    innerText: day,
    className: month,
  });
  button.dataset.week_day = week_day;
  button.addEventListener("click", menuUpdate);
  li.appendChild(button);

  return li;
};

export const YearOption = (value) => {
  const op = document.createElement("option");
  Object.assign(op, {
    value,
    innerText: value,
  });
  return op;
};
