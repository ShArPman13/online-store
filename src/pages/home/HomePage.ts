import { Page } from '../../core/templates/page';

export class HomePage extends Page {
  static textObject = {
    mainTitle: 'Home Page for Online-Store!',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const shopButton = document.createElement('button');
    shopButton.className = 'main-container__button';
    shopButton.innerText = 'Go Shopping';
    this.container.append(shopButton);
    return this.container;
  }
}
