import addPricePromo from './addPricePromo';

export class PromoCode {
  container: HTMLElement;
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.container = document.createElement('div');
    this.container.className = 'promo-container__list__item';
    this.name = name;
    this.value = value;
  }

  removePromo() {
    const button = document.createElement('button');
    button.className = 'list__item__promo-button';
    button.textContent = 'X';
    button.addEventListener('click', () => {
      button.parentElement?.remove();
      addPricePromo();
    });
    return button;
  }

  render() {
    const namePromo = document.createElement('div');
    namePromo.className = 'list__item__promo-name';
    namePromo.textContent = this.name;
    const nameValue = document.createElement('div');
    nameValue.className = 'list__item__promo-value';
    nameValue.textContent = `-${this.value}%`;
    this.container.append(namePromo, nameValue, this.removePromo());
    return this.container;
  }
}
