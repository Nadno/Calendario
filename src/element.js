class Element {
  constructor () {
    this.element;
  }

  render (render) {
    document.querySelector(render).appendChild(this.element);
    return this;
  }
  
  create ({
    name, className, content, id
  }) {
    this.element = document.createElement(name);

    content ? this.element.innerText = content : null;
    id ? this.element.id = id : null;
    className ? this.element.classList.add(className) : null;

    return this;
  }

  day () {
    
  }
};

export default Element;