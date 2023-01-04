import { Page } from '../../core/templates/page';
import { params, delAllQueryBasket } from '../../core/utilities/queryParams';

export class HomePage extends Page {
  static textObject = {
    mainTitle: 'Home Page for Online-Store!',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    delAllQueryBasket();
    const shopButton = document.createElement('a');
    shopButton.className = 'main-container__button';
    shopButton.innerText = 'Go Shopping';

    shopButton.addEventListener('click', () => {
      window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
    });
    this.container.className = 'home-container';
    this.container.append(shopButton);
    return this.container;
  }
}
