const ToDoItem = ({ position, checked, text }) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");
  const span = document.createElement("span");
  const button = document.createElement("button");

  span.className = "text";
  input.className = "input";
  label.className = "content";
  button.className = "delete";

  button.type = "button";
  input.type = "checkbox";

  button.textContent = "X";
  li.className = "to-do";

  input.id = position;
  input.checked = checked;

  label.htmlFor = position;
  span.textContent = text;

  label.appendChild(span);
  label.appendChild(button);

  li.appendChild(input);
  li.appendChild(label);
  return li;
};

export default ToDoItem;
