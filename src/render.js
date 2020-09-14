const renderElement = (name) => {
  const element = document.querySelector(name);

  const renderForAppendChild = (child) => {
    element.appendChild(child);
  }

  const renderForInnerHTML = (content) => {
    element.innerHTML += content;
  };

  const clear = () => {
    element.innerHTML = "";
  };

  return {
    renderForAppendChild,
    renderForInnerHTML,
    clear,
  }
};

export default renderElement;