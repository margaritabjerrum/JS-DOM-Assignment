class GridComponent {
  htmlElement;

  constructor({ children }) {
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'd-grid';
    this.htmlElement.append(...children);
  }
}

export default GridComponent;
