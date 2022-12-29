class FlexComponent {
  htmlElement;

  constructor({ children }) {
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'd-flex gap-5 align-items-start';
    this.htmlElement.append(...children);
  }
}

export default FlexComponent;
