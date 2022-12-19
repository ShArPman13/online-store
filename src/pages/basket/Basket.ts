import { Page } from '../../core/templates/page';
import { BasketItem } from '../../core/components/basketItem';
import { IData } from '../../types/dataJSON';

export class Basket extends Page {
  static textObject = {
    mainTitle: 'Basket Page for Online-Store!',
  };

  container = document.createElement('div');

  constructor(id: string) {
    super(id);
  }

  render() {
    this.container.className = 'basket';
    const basketItems = document.createElement('div');
    basketItems.className = 'basket-items';
    const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
    let locStor: IData[];
    let sum = 0;
    if (stringArray !== null) {
      locStor = JSON.parse(stringArray);
      locStor.forEach((item) => {
        const product = new BasketItem(item);
        basketItems.append(product.render());
        if (item.amount !== undefined) {
          sum += item.price * item.amount;
        } else {
          sum += item.price;
        }
      });
    }
    const totalContainer = document.createElement('div');
    totalContainer.className = 'basket__prices';

    const pricesContainer = document.createElement('div');
    pricesContainer.className = 'basket__prices-container';

    const totalText = document.createElement('div');
    totalText.className = 'prices-container__total';
    totalText.innerText = 'Total: ';

    const totalPrices = document.createElement('div');
    totalPrices.className = 'prices-container__total-prices';
    totalPrices.innerHTML = `${sum}`;

    pricesContainer.append(totalText, totalPrices);

    const totalByu = document.createElement('button');
    totalByu.className = 'prices-container__byu';
    totalByu.innerHTML = `Byu All`;

    totalContainer.append(pricesContainer, totalByu);

    this.container.append(basketItems, totalContainer);

    return this.container;
  }
}
