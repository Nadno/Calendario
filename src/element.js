class Element {
  constructor () {
    this.element;
  }

  renderOn (elementRender) {
    const renderEl = document.querySelector(elementRender);
    renderEl ? renderEl.appendChild(this.element) : null;
    return this;
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

  clear (element) {
    document.querySelector(element).innerHTML = '';
    return this;
  };
};

export default Element;