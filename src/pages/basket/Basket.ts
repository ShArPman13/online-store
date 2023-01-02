import { Page } from '../../core/templates/page';
import { BasketItem } from '../../core/components/basketItem';
import { IData } from '../../types/dataJSON';
import { PromoCode } from '../../core/components/promocode';
import addPricePromo from '../../core/components/addPricePromo';
import ModalWindow from '../modalWindow/modalWindow';
import { params, getQuery, delAllQuery } from '../../core/utilities/queryParams';

export class Basket extends Page {
  static textObject = {
    mainTitle: 'Basket Page for Online-Store!',
  };

  container = document.createElement('div');

  constructor(id: string) {
    super(id);
  }

  changeAmountItems() {
    const inputRows = <HTMLInputElement>document.querySelectorAll('.amount-rows__input')[0];
    const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
    if (stringArray == null) {
      return;
    }
    const locStor: IData[] = JSON.parse(stringArray);
    if (Number(inputRows.value) < 1) return false;
    const page = +document.querySelectorAll('.amount-pages__page')[0].innerHTML;
    const start = (page - 1) * +inputRows.value;
    const end = +inputRows.value;
    const newlocStor = locStor.splice(start, end);
    const block = document.querySelectorAll('.basket-items')[0];
    const info = document.querySelectorAll('.basket__info-container')[0];
    block.remove();
    info.after(this.addProduct(newlocStor));
  }

  changeInputNumber() {
    const amountRows = document.createElement('div');
    amountRows.className = 'pagination-container__amount-rows';

    const textRows = document.createElement('div');
    const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
    if (stringArray == null) {
      return amountRows;
    }
    const locStor: IData[] = JSON.parse(stringArray);
    textRows.className = 'amount-rows__text';
    textRows.innerText = 'Item';
    const inputRows = document.createElement('input');
    inputRows.className = 'amount-rows__input';
    inputRows.type = 'number';
    inputRows.id = 'amount-rows__input';
    inputRows.value = `${locStor.length}`;
    if (getQuery().limit !== undefined) inputRows.value = getQuery().limit;

    amountRows.append(textRows, inputRows);

    inputRows.addEventListener('input', () => {
      if (+inputRows.value < 1) inputRows.value = '1';
      document.querySelectorAll('.amount-pages__page')[0].innerHTML = '1';
      delAllQuery();
      params.set('limit', inputRows.value);
      window.location.hash = params.toString() ? `/basket?${params.toString()}` : `/basket`;
      this.changeAmountItems();
      addPricePromo();
    });

    return amountRows;
  }

  pagination() {
    const infoContainer = document.createElement('div');
    const stringArray = localStorage.getItem('onlineStoreShoppingBasket');

    if (stringArray == null) {
      return infoContainer;
    }

    infoContainer.className = 'basket__info-container';

    const nameColumn = document.createElement('div');
    nameColumn.className = 'basket__info-container__name';
    nameColumn.innerText = 'Product in the basket';

    const amountPages = document.createElement('div');
    amountPages.className = 'pagination-container__amount-pages';

    const buttonMinus = document.createElement('button');
    buttonMinus.className = 'amount-rows__button-minus';
    buttonMinus.innerText = '-';

    const page = document.createElement('div');
    page.className = 'amount-pages__page';
    page.innerText = '1';

    if (getQuery().page !== undefined) page.innerText = getQuery().page;

    const buttonPlus = document.createElement('button');
    buttonPlus.className = 'amount-rows__button-plus';
    buttonPlus.innerText = '+';

    amountPages.append(buttonMinus, page, buttonPlus);
    infoContainer.append(nameColumn, this.changeInputNumber(), amountPages);

    buttonPlus.addEventListener('click', () => {
      const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
      if (stringArray == null) return;
      const locStor: IData[] = JSON.parse(stringArray);
      const input = <HTMLInputElement>document.getElementById('amount-rows__input');
      const pages = Math.ceil(locStor.length / +input.value);
      const currentPage = document.querySelectorAll('.amount-pages__page')[0];
      if (Number(currentPage.innerHTML) === pages) return false;
      currentPage.innerHTML = `${Number(currentPage.innerHTML) + 1}`;
      params.set('page', currentPage.innerHTML);
      window.location.hash = params.toString() ? `/basket?${params.toString()}` : `/basket`;
      this.changeAmountItems();
      addPricePromo();
    });

    buttonMinus.addEventListener('click', () => {
      const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
      if (stringArray == null) return;
      const currentPage = document.querySelectorAll('.amount-pages__page')[0];
      if (Number(currentPage.innerHTML) === 1) return false;
      currentPage.innerHTML = `${Number(currentPage.innerHTML) - 1}`;
      params.set('page', currentPage.innerHTML);
      window.location.hash = params.toString() ? `/basket?${params.toString()}` : `/basket`;
      this.changeAmountItems();
      addPricePromo();
    });

    return infoContainer;
  }

  addProduct(newlocStor?: IData[]) {
    const basketItems = document.createElement('div');
    basketItems.className = 'basket-items';
    const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
    if (stringArray == null || stringArray === undefined) {
      this.container.innerText = 'Basket is empty';
      return this.container;
    }
    let locStor: IData[];
    if (stringArray !== null) {
      locStor = JSON.parse(stringArray);
      if (newlocStor) locStor = newlocStor;
      else {
        if (getQuery().limit !== undefined) {
          let page: string;
          if (getQuery().page == undefined) page = '1';
          else page = getQuery().page;
          locStor = locStor.splice((+page - 1) * +getQuery().limit, +getQuery().limit);
        }
      }
      locStor.forEach((item) => {
        const product = new BasketItem(item);
        basketItems.append(product.render());
        addPricePromo();
      });
    }
    return basketItems;
  }

  render() {
    delAllQuery();
    this.container.className = 'basket';
    const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
    if (stringArray == null || stringArray === undefined) {
      this.container.innerText = 'Basket is empty';
      return this.container;
    }
    let locStor: IData[];
    let sum = 0;
    if (stringArray !== null) {
      locStor = JSON.parse(stringArray);
      locStor.forEach((item) => {
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

    const totalPricesContainer = document.createElement('div');
    totalPricesContainer.className = 'prices-container__total-prices-container';

    const totalPrices = document.createElement('div');
    totalPrices.className = 'prices-container__total-prices';
    totalPrices.innerHTML = `${sum}$`;

    totalPricesContainer.append(totalPrices);

    pricesContainer.append(totalText, totalPricesContainer);

    totalContainer.append(pricesContainer, this.clickButtonByu());
    this.container.append(this.pagination(), this.addProduct(), this.checkPromoCode(), totalContainer);

    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';

    mainContainer.append(this.container);

    return mainContainer;
  }

  clickButtonByu() {
    const totalByu = document.createElement('button');
    totalByu.className = 'prices-container__byu';
    totalByu.innerHTML = `Buy All`;

    totalByu.addEventListener('click', () => {
      const modal = new ModalWindow();
      this.container.append(modal.render());
    });
    return totalByu;
  }

  checkPromoCode() {
    const promoContainer = document.createElement('div');
    promoContainer.className = 'basket__promo-container';

    const promoList = document.createElement('div');
    promoList.className = 'promo-container__list';

    const promoFunctional = document.createElement('div');
    promoFunctional.className = 'promo-container__functional';

    const functionalInput = document.createElement('input');
    functionalInput.className = 'promo-container__functional__input';
    functionalInput.type = 'text';
    functionalInput.placeholder = 'RS, Stage2, 2023,';

    const functionalButton = document.createElement('button');
    functionalButton.className = 'promo-container__functional__button';
    functionalButton.innerText = 'Enter promo';

    promoFunctional.append(functionalInput, functionalButton);
    promoContainer.append(promoList, promoFunctional);

    functionalButton.addEventListener('click', () => {
      const input = <HTMLInputElement>document.querySelectorAll('.promo-container__functional__input')[0];
      const block = document.querySelectorAll('.promo-container__list')[0];
      const listPromo = document.querySelectorAll('.list__item__promo-name');
      for (let i = 0; i < listPromo.length; i++) {
        if (listPromo[i].innerHTML === input.value) return;
      }
      let number = '3';
      if (input.value === 'RS') number = '10';
      else if (input.value === 'Stage2') number = '7';
      else if (input.value === '2023') number = '5';
      else return;
      const item = new PromoCode(input.value, number);
      input.value = '';
      block.append(item.render());
      addPricePromo();
    });
    return promoContainer;
  }
}
