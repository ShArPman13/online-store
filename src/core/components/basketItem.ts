import { IData } from '../../types/dataJSON';
import SelectProduct from '../../pages/product/Select';
import { App } from '../../pages/app';
import addPricePromo from './addPricePromo';
import { params, getQuery } from '../../core/utilities/queryParams';

export class BasketItem {
  container = document.createElement('div');
  images;
  price;
  brand;
  title;
  id;
  category;
  description;
  discountPercentage;
  rating;
  stock;
  amount;

  constructor(card: IData) {
    this.images = card.images;
    this.price = card.price;
    this.brand = card.brand;
    this.title = card.title;
    this.id = card.id;
    this.category = card.category;
    this.description = card.description;
    this.discountPercentage = card.discountPercentage;
    this.rating = card.rating;
    this.stock = card.stock;
    this.amount = card.amount;
  }

  render() {
    this.container.className = `basket-item-container ${this.id}`;

    const serialNumber = document.createElement('div');
    serialNumber.className = 'basket__serial-number';

    const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
    if (stringArray !== null) {
      const locStor: IData[] = JSON.parse(stringArray);
      const findIndex = locStor.findIndex((el) => el.id === this.id);
      serialNumber.innerText = `${findIndex + 1}`;
    }
    const imageContainer = document.createElement('div');
    imageContainer.className = 'basket__image-container';

    const image = document.createElement('img');
    image.className = 'basket__image-container__img';
    image.src = this.images[0];
    image.alt = this.title;

    imageContainer.append(image);

    const textContainer = document.createElement('div');
    textContainer.className = 'basket__text-container';

    const brand = document.createElement('div');
    brand.className = 'basket__text-container__brand';
    brand.innerText = `${this.brand} ${this.title}`;

    const description = document.createElement('div');
    description.className = 'basket__text-container__description';
    description.innerText = this.description;

    const discountPercentage = document.createElement('div');
    discountPercentage.className = 'basket__text-container__discountPercentage';
    discountPercentage.innerText = `${this.discountPercentage}`;

    textContainer.append(brand, description, discountPercentage);

    this.container.append(serialNumber, imageContainer, textContainer, this.addProduct());
    return this.container;
  }

  clickButton(amountProduct: number, amount: HTMLElement, price: HTMLElement) {
    amount.innerText = `${amountProduct}`;
    const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
    if (stringArray !== null) {
      const locStor: IData[] = JSON.parse(stringArray);
      const findIndex = locStor.findIndex((el) => el.id === this.id);
      if (findIndex !== undefined) {
        locStor[findIndex].amount = amountProduct;
        price.innerText = `${this.price * amountProduct}$`;
        localStorage.setItem('onlineStoreShoppingBasket', JSON.stringify(locStor));
        SelectProduct.changeCurrentItems();
        const totalAmount = document.querySelectorAll('.prices-container__total-prices')[0];
        let sum = 0;
        locStor.forEach((item) => {
          if (item.amount !== undefined) {
            sum += item.price * item.amount;
          } else {
            sum += item.price;
          }
        });
        totalAmount.innerHTML = `${sum}`;
      }
    }
  }

  addProduct() {
    const priceContainer = document.createElement('div');
    priceContainer.className = 'basket__price-container';

    const priceBlock = document.createElement('div');
    priceBlock.className = 'basket__price-container__price-block';

    const price = document.createElement('div');
    price.className = 'basket__price-container__price';

    priceBlock.append(price);
    if (this.amount !== undefined) {
      price.innerText = `${this.price * this.amount}$`;
    } else {
      price.innerText = `${this.price}$`;
    }

    const buttonPrice = document.createElement('div');
    buttonPrice.className = 'basket__price-container__button-price';

    const buttonMinus = document.createElement('button');
    buttonMinus.className = 'button-price__minus';
    buttonMinus.innerText = '-';

    const amount = document.createElement('div');
    amount.className = 'button-price__amount';
    amount.innerText = `${this.amount}`;

    const buttonPlus = document.createElement('button');
    buttonPlus.className = 'button-price__plus';
    buttonPlus.innerText = '+';

    const stock = document.createElement('div');
    stock.className = 'basket__price-container__stock';
    stock.innerText = `${this.stock}`;

    buttonPlus.addEventListener('click', () => {
      if (Number(amount.innerText) == this.stock) return false;
      const amountProduct = Number(amount.innerText) + 1;
      this.clickButton(amountProduct, amount, price);
      addPricePromo();
    });

    buttonMinus.addEventListener('click', () => {
      const amountProduct = Number(amount.innerText) - 1;
      this.clickButton(amountProduct, amount, price);
      addPricePromo();
      if (amountProduct == 0) {
        const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
        if (stringArray !== null) {
          const locStor: IData[] = JSON.parse(stringArray);
          const findIndex = locStor.findIndex((el) => el.id === this.id);
          const app = new App();
          if (findIndex !== undefined) {
            if (locStor.length === 1) {
              localStorage.removeItem('onlineStoreShoppingBasket');
              window.location.hash = `/basket`;
              app.renderNewPage('/basket');
              return;
            } else {
              locStor.splice(findIndex, 1);
              localStorage.setItem('onlineStoreShoppingBasket', JSON.stringify(locStor));
            }
            if (document.querySelectorAll('.basket-item-container').length === 1) {
              if (getQuery().page == '1') params.set('page', `${getQuery().page}`);
              else params.set('page', `${+getQuery().page - 1}`);
              amount.innerText = `${amountProduct}`;
            }
            window.location.hash = params.toString() ? `/basket?${params.toString()}` : `/basket`;
            app.renderNewPage('/basket');
          }
        }
      }
    });

    buttonPrice.append(buttonPlus, amount, buttonMinus);
    priceContainer.append(stock, buttonPrice, priceBlock);
    return priceContainer;
  }
}
