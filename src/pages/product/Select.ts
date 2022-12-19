import dataJSON from '../../assets/data/data.json';
import { IData, localStor } from '../../types/dataJSON';
import { Product } from './Product';

const data: IData[] = dataJSON.products;

export default class SelectProduct {
  static changeCurrentItems() {
    const bastetScore = document.querySelectorAll('.basket-container__score')[0];
    const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
    if (stringArray == null) {
      bastetScore.innerHTML = '0';
      return false;
    }
    const locStor: IData[] = JSON.parse(stringArray);

    if (locStor.length == 0) {
      const current = 0;
      bastetScore.innerHTML = `${current}`;
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
  }
  static chooseProduct() {
    document.addEventListener('click', (e: Event) => {
      const elem = <HTMLElement>e.target;
      if (!elem.closest('.card-small-container') || elem.classList.contains('bottom-container__basketImg'))
        return false;
      const id = Number(elem.closest('.card-small-container')?.className.replace(/[\D]+/g, ''));
      const findItem = data.find((el) => el.id === id);
      // eslint-disable-next-line no-console
      console.log(findItem);
      if (findItem == undefined) return false;
      const card = new Product('123', findItem);
      const main = document.getElementById('root');
      if (main == null) return false;
      main.innerHTML = ``;
      main.append(card.render());
      window.location.hash = `#Product/${findItem.id}`;
    });
  }

  static addAndRemoveInBasket() {
    document.addEventListener('click', (e: Event) => {
      const elem = <HTMLElement>e.target;
      if (!elem.classList.contains('bottom-container__basketImg')) return false;
      const id = Number(elem.closest('.card-small-container')?.className.replace(/[\D]+/g, ''));
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
      // eslint-disable-next-line no-console
      console.log(locStor);

      if (locStor.find((i: localStor) => i.id == id)) {
        const index: number = locStor.findIndex((item: localStor) => item.id == id);
        locStor.splice(index, 1);
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
