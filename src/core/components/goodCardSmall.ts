import { IData } from '../../types/dataJSON';

export class goodCardSmall {
  container = document.createElement('div');
  images;
  price;
  brand;
  title;
  id;

  constructor(card: IData) {
    this.images = card.images;
    this.price = card.price;
    this.brand = card.brand;
    this.title = card.title;
    this.id = card.id;
  }

  render() {
    this.container.className = `card-small-container ${this.id}`;
    const imageContainer = document.createElement('div');
    imageContainer.className = 'card__image-container';

    const image = document.createElement('img');
    image.className = 'image-container__image';
    image.src = this.images[0];
    image.alt = this.title;

    imageContainer.append(image);

    const textContainer = document.createElement('div');
    textContainer.className = 'bottom-container__text-container';

    const price = document.createElement('div');
    price.className = 'text-container__price';
    price.innerText = `${this.price}$`;

    const brand = document.createElement('div');
    brand.className = 'text-container__brand';
    brand.innerText = this.brand;

    const title = document.createElement('div');
    title.className = 'text-container__title';
    title.innerText = this.title;

    textContainer.append(price, brand, title);

    const bottomContainer = document.createElement('div');
    bottomContainer.className = 'card__bottom-container';

    bottomContainer.append(textContainer, this.addToBasket());

    this.container.append(imageContainer, bottomContainer);
    return this.container;
  }

  addToBasket() {
    const basketImg = document.createElement('img');
    basketImg.className = 'bottom-container__basketImg';

    const stringArray = localStorage.getItem('onlineStoreShoppingBasket');
    if (stringArray !== null) {
      const locStor = JSON.parse(stringArray);
      if (locStor.find((i: IData) => i.id == this.id)) {
        basketImg.src = '../assets/svg/basket_added.svg';
        basketImg.classList.toggle('in-basket');
      } else {
        basketImg.src = '../assets/svg/basket_add.svg';
      }
    } else {
      basketImg.src = '../assets/svg/basket_add.svg';
    }
    basketImg.addEventListener('click', () => {
      basketImg.classList.toggle('in-basket');
      if (basketImg.classList.contains('in-basket')) {
        basketImg.src = '../assets/svg/basket_added.svg';
      } else {
        basketImg.src = '../assets/svg/basket_add.svg';
      }
    });
    return basketImg;
  }
}
