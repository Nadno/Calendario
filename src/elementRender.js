class ElementRender {
  constructor (renderElement) {
    this.element;
    this.renderElement = renderElement;
  }
  
  create ({
    name, className, content, tabindex, id, week_day,
  }) {
    this.element = document.createElement(name);

    id ? this.element.id = id : null;
    content ? this.element.innerText = content : null;
    tabindex ? this.element.tabIndex = tabindex : null;
    className ? this.element.classList.add(className) : null;
    week_day >= 0 ? this.element.dataset.week_day = week_day : null;

    return this;
  };

  render () {
    const renderEl = document.querySelector(this.renderElement);
    renderEl ? renderEl.appendChild(this.element) : null;
    return this;
  }

  clear () {
    document.querySelector(this.renderElement).innerHTML = '';
    return this;
  };

};

export default ElementRender;