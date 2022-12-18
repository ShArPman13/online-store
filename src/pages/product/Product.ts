import { Page } from '../../core/templates/page';
import { IData } from '../../types/dataJSON';
import './product.scss';

export class Product extends Page {
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

  constructor(id: string, card: IData) {
    super(id);
    this.container.className = 'container-card';
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
  }

  chooseImage() {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    const mainImage = document.createElement('div');
    mainImage.className = 'image-container__main-image';

    const sliderImages = document.createElement('div');
    sliderImages.className = 'image-container__slider-images';

    imageContainer.append(mainImage, sliderImages);

    const image = document.createElement('img');
    image.className = 'image-container__image';

    image.src = this.images[0];
    image.alt = this.title;

    mainImage.append(image);

    this.images.forEach((image, index) => {
      const container = document.createElement('div');
      if (index === 0) {
        container.className = 'slider-images__container active-slider';
      } else {
        container.className = 'slider-images__container';
      }
      sliderImages.append(container);
      const img = document.createElement('img');
      img.className = 'slider-images__container__img';
      img.src = image;
      img.alt = this.title;
      container.append(img);
    });

    sliderImages.addEventListener('click', (e: Event) => {
      const elem = <HTMLElement>e.target;

      if (!elem.classList.contains('slider-images__container__img') || elem.classList.contains('active-slider-images'))
        return false;
      // eslint-disable-next-line no-console
      image.src = (e.target as HTMLMediaElement).currentSrc;
      const listImg = document.querySelectorAll('.slider-images__container');
      listImg.forEach((item) => {
        if (item.classList.contains('active-slider')) {
          item.classList.remove('active-slider');
        }
      });
      elem.parentElement?.classList.add('active-slider');
    });
    return imageContainer;
  }

  chooseButton() {
    const containerBtn = document.createElement('div');
    containerBtn.className = 'btn-container';

    const addInBasket = document.createElement('button');
    addInBasket.className = 'btn-container__basket';
    addInBasket.innerText = 'Add in Basket';

    const fastBuy = document.createElement('button');
    fastBuy.className = 'btn-container__fastBuy';
    fastBuy.innerText = 'Fast buy';
    containerBtn.append(addInBasket, fastBuy);

    addInBasket.addEventListener('click', (e) => {
      // eslint-disable-next-line no-console
      console.log('addInBasket', e);
    });

    fastBuy.addEventListener('click', (e) => {
      // eslint-disable-next-line no-console
      console.log('fastBuy', e);
    });

    return containerBtn;
  }

  render() {
    this.container.className = `card-container`;

    const path = document.createElement('div');
    path.className = 'card-container__path';
    path.innerText = `Store >> ${this.category} >> ${this.brand} >> ${this.title}`;

    const product = document.createElement('div');
    product.className = 'card-container__product';

    this.container.append(path, product);

    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';

    product.append(this.chooseImage(), infoContainer);

    const brand = document.createElement('div');
    brand.className = 'info-container__brand';
    brand.innerText = `Brand: ${this.brand}`;

    const category = document.createElement('div');
    category.className = 'info-container__category';
    category.innerText = `Category: ${this.category}`;

    const description = document.createElement('div');
    description.className = 'info-container__description';
    description.innerText = `Description: ${this.description}`;

    const discountPercentage = document.createElement('div');
    discountPercentage.className = 'info-container__discountPercentage';
    discountPercentage.innerText = `Discount Percentage: ${this.discountPercentage}`;

    const price = document.createElement('div');
    price.className = 'info-container__price';
    price.innerText = `Price: ${this.price}$`;

    const rating = document.createElement('div');
    rating.className = 'info-container__rating';
    rating.innerText = `Rating: ${this.rating}`;

    const stock = document.createElement('div');
    stock.className = 'info-container__stock';
    stock.innerText = `Stock: ${this.stock}`;

    const title = document.createElement('div');
    title.className = 'info-container__title';
    title.innerText = `Title: ${this.title}`;

    infoContainer.append(
      brand,
      category,
      description,
      discountPercentage,
      price,
      rating,
      stock,
      title,
      this.chooseButton()
    );
    // const bottomContainer = document.createElement('div');
    // bottomContainer.className = 'card__bottom-container';

    // bottomContainer.append(textContainer, this.addToBasket());

    // this.container.append(imageContainer, bottomContainer);
    return this.container;
  }
}
