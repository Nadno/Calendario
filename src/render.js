const render = (virtualElement, renderElement) => {
  document.querySelector(renderElement).appendChild(virtualElement);
};

export default render;