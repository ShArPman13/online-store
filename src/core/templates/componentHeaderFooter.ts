export abstract class ComponentHeaderFooter {
  protected container: HTMLElement;

  constructor(tagName = 'div', className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  render() {
    return this.container;
  }
}
