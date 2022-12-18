import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { Product } from './Product';

const data: IData[] = dataJSON.products;

export default class SelectProduct {
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
}
