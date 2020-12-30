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