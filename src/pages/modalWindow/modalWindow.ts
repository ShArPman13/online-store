import CheckInput from './checkInput';
import { App } from '../app';

export default class ModalWindow {
  render() {
    const container = document.createElement('div');
    container.className = 'modul-window';

    const background = document.createElement('div');
    background.className = 'modul-window-background';
    document.body.append(background);
    const info = document.createElement('div');
    info.className = 'modul-window__info';
    info.innerText = 'Personal details';

    const nameContainer = document.createElement('div');
    nameContainer.className = 'modul-window__containers';
    const name = document.createElement('input');
    name.className = 'modul-window__input modul-window__name';
    name.type = 'text';
    name.placeholder = 'Name and Surname';
    name.setAttribute('data-tooltip', 'Value contains at least two words, the length of each is at least 3 characters');

    nameContainer.append(name);

    name.addEventListener('input', () => {
      CheckInput.checkNameAndAdress(name, 2, 3);
    });

    const phoneContainer = document.createElement('div');
    phoneContainer.className = 'modul-window__containers';
    const phone = document.createElement('input');
    phone.className = 'modul-window__input modul-window__phone';
    phone.type = 'tel';
    phone.placeholder = 'Phone';
    phone.setAttribute('data-tooltip', 'Value must start with ' + ', only digits and be at least 9 digits');

    phoneContainer.append(phone);

    phone.addEventListener('input', () => {
      CheckInput.checkPhone(phone);
    });

    const addressContainer = document.createElement('div');
    addressContainer.className = 'modul-window__containers';
    const address = document.createElement('input');
    address.className = 'modul-window__input modul-window__address';
    address.type = 'text';
    address.placeholder = 'Address';
    address.setAttribute('data-tooltip', 'Value contains at least three words, each at least 5 characters long');

    addressContainer.append(address);

    address.addEventListener('input', () => {
      CheckInput.checkNameAndAdress(address, 3, 5);
    });

    const emailContainer = document.createElement('div');
    emailContainer.className = 'modul-window__containers';

    const email = document.createElement('input');
    email.className = 'modul-window__input modul-window__email';
    email.type = 'email';
    email.placeholder = 'Email';
    email.setAttribute('data-tooltip', 'Value must be email');

    emailContainer.append(email);

    email.addEventListener('input', () => {
      CheckInput.checkEmail(email);
    });

    const cardContainer = document.createElement('div');
    cardContainer.className = 'modul-window__card-container';

    const infoCard = document.createElement('div');
    infoCard.className = 'card-container__info';
    infoCard.innerText = 'Credit card details';

    const card = document.createElement('div');
    card.className = 'card-container__card';

    const numberContainer = document.createElement('div');
    numberContainer.className = 'card-container__number-container';

    const imgContainer = document.createElement('div');
    imgContainer.className = 'card-container__number-container__img-container';

    const img = document.createElement('img');
    img.className = 'card-container__number-container__img-container__img';
    img.alt = 'type card';
    img.src = '../assets/img/card.jpg';
    imgContainer.append(img);

    const numberBlock = document.createElement('div');
    numberBlock.className = 'card-container__number-container__number-block';

    const numberInput = document.createElement('input');
    numberInput.className = 'modul-window__input card-container__number-container__number-block__input';
    numberInput.type = 'text';
    numberInput.placeholder = 'XXXX XXXX XXXX XXXX';

    numberInput.addEventListener('input', () => {
      CheckInput.checkNumberCard(numberInput);
    });

    numberBlock.append(numberInput);

    const dataCard = document.createElement('div');
    dataCard.className = 'card-container__data-card';

    const dateContainer = document.createElement('div');
    dateContainer.className = 'card-container__data-card__date-container';

    const dateInfo = document.createElement('div');
    dateInfo.className = 'card-container__data-card__date-container__info';
    dateInfo.innerText = 'MM/YY';

    const containerInput = document.createElement('div');
    containerInput.className = 'date-container__container-input';

    const dateInput = document.createElement('input');
    dateInput.className = 'modul-window__input card-container__data-card__date-container__input';
    dateInput.type = 'text';
    dateInput.placeholder = 'MM/YY';

    dateInput.addEventListener('input', () => {
      CheckInput.checkDate(dateInput);
    });
    containerInput.append(dateInput);
    dateContainer.append(dateInfo, containerInput);

    const cvvContainer = document.createElement('div');
    cvvContainer.className = 'card-container__data-card__cvv-container';

    const cvvInfo = document.createElement('div');
    cvvInfo.className = 'card-container__data-card__cvv-container__info';
    cvvInfo.innerText = 'CVV:';

    const containerInputCvv = document.createElement('div');
    containerInputCvv.className = 'date-container__container-input';

    const cvvInput = document.createElement('input');
    cvvInput.className = 'modul-window__input card-container__data-card__cvv-container__input';
    cvvInput.type = 'number';
    cvvInput.placeholder = 'CVV';

    cvvInput.addEventListener('input', () => {
      CheckInput.checkCvv(cvvInput);
    });

    containerInputCvv.append(cvvInput);

    cvvContainer.append(cvvInfo, containerInputCvv);

    dataCard.append(dateContainer, cvvContainer);
    numberContainer.append(imgContainer, numberBlock);
    card.append(numberContainer, dataCard);

    cardContainer.append(infoCard, card);
    const button = document.createElement('button');
    button.className = 'modul-window__button';
    button.innerText = 'Submit';

    const buttonClose = document.createElement('button');
    buttonClose.className = 'modul-window__button-close';
    buttonClose.innerText = 'Close';

    buttonClose.addEventListener('click', () => {
      background.remove();
      container.remove();
    });

    button.addEventListener('click', () => {
      const listInput = document.querySelectorAll('.modul-window__input');
      for (let i = 0; i < listInput.length; i++) {
        const item = <HTMLInputElement>listInput[i];
        const itemParent = item.parentElement;
        if (listInput[i].classList.contains('modul-window__name') && itemParent) {
          this.checkError(itemParent, item, CheckInput.checkNameAndAdress(item, 2, 3));
        } else if (listInput[i].classList.contains('modul-window__phone') && itemParent) {
          this.checkError(itemParent, item, CheckInput.checkPhone(item));
        } else if (listInput[i].classList.contains('modul-window__address') && itemParent) {
          this.checkError(itemParent, item, CheckInput.checkNameAndAdress(item, 3, 5));
        } else if (listInput[i].classList.contains('modul-window__email') && itemParent) {
          this.checkError(itemParent, item, CheckInput.checkEmail(item));
        } else if (
          listInput[i].classList.contains('card-container__number-container__number-block__input') &&
          itemParent
        ) {
          this.checkError(itemParent, item, CheckInput.checkNumberCard(item));
        } else if (listInput[i].classList.contains('card-container__data-card__date-container__input') && itemParent) {
          this.checkError(itemParent, item, CheckInput.checkDate(item));
        } else if (listInput[i].classList.contains('card-container__data-card__cvv-container__input') && itemParent) {
          this.checkError(itemParent, item, CheckInput.checkCvv(item));
        }
      }
      const listError = document.querySelectorAll('.modul-window__err');
      if (listError.length === 0) {
        setTimeout(() => {
          container.innerHTML = `Congratulations, order is processed!`;
          container.classList.add('finish');
        }, 500);
        setTimeout(() => {
          background.remove();
          container.remove();
          localStorage.clear();
          const app = new App();
          app.renderNewPage('/store');
        }, 3000);
      }
    });

    let tooltipElem: HTMLElement;

    container.addEventListener('mouseover', (event) => {
      const target = <HTMLInputElement>event.target;
      if (
        !target.classList.contains('modul-window__name') &&
        !target.classList.contains('modul-window__phone') &&
        !target.classList.contains('modul-window__address') &&
        !target.classList.contains('modul-window__email')
      )
        return;
      const tooltipHtml = (target as HTMLInputElement).dataset.tooltip;
      if (!tooltipHtml) return;
      tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = tooltipHtml;
      document.body.append(tooltipElem);
      if (!target) return;
      const coords = (target as HTMLInputElement).getBoundingClientRect();
      let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0;
      let top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
      }
      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    });

    document.addEventListener('mouseout', () => {
      if (tooltipElem) {
        tooltipElem.remove();
      }
    });

    container.append(
      info,
      nameContainer,
      phoneContainer,
      addressContainer,
      emailContainer,
      cardContainer,
      button,
      buttonClose
    );
    // container.append(formContainer, buttonClose);
    return container;
  }

  checkError(itemParent: Element, item: HTMLInputElement, func: boolean) {
    itemParent.innerHTML = '';
    itemParent.append(item);
    if (!func) {
      const err = document.createElement('div');
      err.className = 'modul-window__err';
      err.innerText = 'Error';
      itemParent.append(err);
    }
  }
}
