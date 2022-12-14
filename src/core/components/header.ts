import { ComponentHeaderFooter } from '../templates/componentHeaderFooter';
import { PageIds } from '../../types/PageIds';

const buttons = [
  {
    id: PageIds.HomePage,
    text: 'Home',
  },
  {
    id: PageIds.StorePage,
    text: 'Shop',
  },
  {
    id: PageIds.BasketPage,
    text: 'Basket',
  },
];

export class Header extends ComponentHeaderFooter {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderNavButtons() {
    const navButtons = document.createElement('div');
    navButtons.className = 'header__nav';
    buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      navButtons.append(buttonHTML);
    });
    this.container.innerHTML = '';
    this.container.append(navButtons);
  }

  render() {
    this.renderNavButtons();
    return this.container;
  }
}
