import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { Product } from './Product';

const data: IData[] = dataJSON.products;

export default class SelectProduct {
  static changeCurrentItems() {
    const bastetScore = document.querySelectorAll('.basket-container__score')[0];
    const totalAmount = document.querySelectorAll('.basket-container__total-amount')[0];
    const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
    if (stringArray == null) {
      bastetScore.innerHTML = '0';
      totalAmount.innerHTML = '0';
      bastetScore.classList.add('null-basket-container__score');
      return false;
    }
    const locStor: IData[] = JSON.parse(stringArray);

    if (locStor.length == 0) {
      const current = 0;
      bastetScore.innerHTML = `${current}`;
      totalAmount.innerHTML = `${current}`;
      bastetScore.classList.add('null-basket-container__score');
      return false;
    }

    const current = locStor
      .map((item) => item.amount)
      .reduce((item, acc) => {
        if (item !== undefined && acc !== undefined) {
          return item + acc;
        }
      });
    bastetScore.innerHTML = `${current}`;
    bastetScore.classList.remove('null-basket-container__score');
    let currentAmount = 0;
    locStor.forEach((item) => {
      if (item.amount !== undefined) {
        currentAmount += item.price * item.amount;
      } else {
        currentAmount += item.price;
      }
    });
    totalAmount.innerHTML = `${currentAmount}$`;
  }
  static chooseProduct() {
    document.addEventListener('click', (e: Event) => {
      const elem = <HTMLElement>e.target;
      if (
        ((!elem.closest('.card-small-container') || elem.classList.contains('bottom-container__basketImg')) &&
          !elem.closest('.basket-item-container')) ||
        elem.closest('.basket__price-container')
      )
        return false;
      const id = Number(
        (elem.closest('.card-small-container') || elem.closest('.basket-item-container'))?.className.replace(
          /[\D]+/g,
          ''
        )
      );
      const findItem = data.find((el) => el.id === id);
      if (findItem == undefined) return false;
      const card = new Product('123', findItem);
      const main = document.getElementById('root');
      if (main == null) return false;
      main.innerHTML = ``;
      main.append(card.render());
      window.location.hash = `#/product/${findItem.id}`;
    });
  }

  static addAndRemoveInBasket() {
    document.addEventListener('click', (e: Event) => {
      const elem = <HTMLElement>e.target;
      if (
        !elem.classList.contains('bottom-container__basketImg') &&
        !elem.classList.contains('btn-container__basket') &&
        !elem.classList.contains('btn-container__fastBuy')
      )
        return false;

      // eslint-disable-next-line no-console
      console.log('asda');

      const id = Number(
        (elem.closest('.card-small-container') || elem.closest('.card-container'))?.className.replace(/[\D]+/g, '')
      );
      const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
      const findItem = data.find((el) => el.id === id);
      if (stringArray == null) {
        const locStor: IData[] = [];
        if (findItem !== undefined) {
          findItem.amount = 1;
          locStor.push(findItem);
        }

        localStorage.setItem('onlineStoreShoppingBasket', JSON.stringify(locStor));
        SelectProduct.changeCurrentItems();
        return false;
      }
      const locStor = JSON.parse(stringArray);

      if (locStor.find((i: IData) => i.id == id)) {
        const index: number = locStor.findIndex((item: IData) => item.id == id);
        if (locStor.length === 1) {
          localStorage.removeItem('onlineStoreShoppingBasket');
          SelectProduct.changeCurrentItems();
          return false;
        } else {
          locStor.splice(index, 1);
        }
      } else {
        if (findItem !== undefined) {
          findItem.amount = 1;
          locStor.push(findItem);
        }
      }
      localStorage.setItem('onlineStoreShoppingBasket', JSON.stringify(locStor));
      SelectProduct.changeCurrentItems();
    });
  }
}
