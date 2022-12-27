import { Page } from '../../core/templates/page';
import { params } from '../../core/utilities/queryParams';

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

    shopButton.addEventListener('click', () => {
      window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
    });

    this.container.append(shopButton);
    return this.container;
  }
}
