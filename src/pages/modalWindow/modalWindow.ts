import CheckInput from './checkInput';

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
    name.setAttribute('data-toggle', 'tooltip');
    name.setAttribute('data-placement', 'left');
    name.setAttribute('title', 'topasdasdasd');

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

    const dateInput = document.createElement('input');
    dateInput.className = 'modul-window__input card-container__data-card__date-container__input';
    dateInput.type = 'text';

    dateInput.addEventListener('input', () => {
      CheckInput.checkDate(dateInput);
    });

    dateContainer.append(dateInfo, dateInput);

    const cvvContainer = document.createElement('div');
    cvvContainer.className = 'card-container__data-card__cvv-container';

    const cvvInfo = document.createElement('div');
    cvvInfo.className = 'card-container__data-card__cvv-container__info';
    cvvInfo.innerText = 'CVV:';

    const cvvInput = document.createElement('input');
    cvvInput.className = 'modul-window__input card-container__data-card__cvv-container__input';
    cvvInput.type = 'number';

    cvvInput.addEventListener('input', () => {
      CheckInput.checkCvv(cvvInput);
    });

    cvvContainer.append(cvvInfo, cvvInput);

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
          alert('asdasd');
        }, 300);
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
