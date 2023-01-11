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
];

export class Header extends ComponentHeaderFooter {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderNavButtons() {
    const wrapper = document.createElement('div');
    wrapper.className = 'header-wrapper';

    const navButtons = document.createElement('div');
    navButtons.className = 'header__nav';
    buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}?`;
      buttonHTML.innerText = button.text;
      navButtons.append(buttonHTML);
    });
    this.container.innerHTML = '';
    wrapper.append(navButtons);

    const basketContainer = document.createElement('div');
    basketContainer.className = 'header__basket-container';

    const basketInfo = document.createElement('a');
    basketInfo.href = '#/basket';
    basketInfo.className = 'basket-container__info';

    const bastetScore = document.createElement('div');
    bastetScore.className = 'basket-container__score';

    basketInfo.append(bastetScore);

    const amountContainer = document.createElement('div');
    amountContainer.className = 'basket-container__amount-container';

    const infoAmount = document.createElement('div');
    infoAmount.className = 'basket-container__amount';
    infoAmount.innerText = 'Total:';

    const totalAmount = document.createElement('div');
    totalAmount.className = 'basket-container__total-amount';

    amountContainer.append(infoAmount, totalAmount);
    wrapper.append(amountContainer, basketContainer);

    basketContainer.append(basketInfo);
    this.container.append(wrapper);
  }

  render() {
    this.renderNavButtons();
    return this.container;
  }
}
