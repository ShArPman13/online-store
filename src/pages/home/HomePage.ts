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
    const shopButton = document.createElement('a');
    shopButton.className = 'main-container__button';
    shopButton.innerText = 'Go Shopping';

    // const imgButton = document.createElement('img');
    // imgButton.src = '../assets/img/back_btn.png';

    // shopButton.append(imgButton);

    shopButton.addEventListener('click', () => {
      window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
    });
    this.container.className = 'home-container';
    this.container.append(shopButton);
    return this.container;
  }
}
