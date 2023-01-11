export default class CheckInput {
  static checkNameAndAddress(name: HTMLInputElement, number: number, length: number) {
    if (name.classList.contains('input__valid')) name.classList.remove('input__valid');
    const arr = name.value.split(' ');
    if (arr.length < number) {
      name.classList.add('input__invalid');
      return false;
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length < length) {
        name.classList.add('input__invalid');
        return false;
      }
    }
    name.classList.remove('input__invalid');
    name.classList.add('input__valid');
    return true;
  }

  static checkPhone(name: HTMLInputElement) {
    if (name.classList.contains('input__valid')) name.classList.remove('input__valid');
    if (name.value.length < 10 || name.value[0] !== '+') {
      name.classList.add('input__invalid');
      return false;
    }
    for (let i = 1; i < name.value.length; i++) {
      if (typeof +name.value[i] !== 'number') {
        return false;
      }
    }
    name.classList.remove('input__invalid');
    name.classList.add('input__valid');
    return true;
  }

  static checkEmail(name: HTMLInputElement) {
    if (name.classList.contains('input__valid')) name.classList.remove('input__valid');
    const expression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = expression.test(String(name.value).toLowerCase());
    if (valid) {
      name.classList.remove('input__invalid');
      name.classList.add('input__valid');
      return true;
    } else {
      name.classList.add('input__invalid');
      return false;
    }
  }
  static checkNumberCard(name: HTMLInputElement) {
    if (name.classList.contains('input__valid')) name.classList.remove('input__valid');
    const img = <HTMLImageElement>document.querySelectorAll('.card-container__number-container__img-container__img')[0];
    if (+name.value[0] === 3) img.src = '../assets/img/Visa.png';
    else if (+name.value[0] === 4) img.src = '../assets/img/mastercard.png';
    else if (+name.value[0] === 5) img.src = '../assets/img/American_Express.png';
    else if (+name.value[0] === 2) img.src = '../assets/img/mir.jpg';
    else img.src = '../assets/img/card.jpg';

    let cardCode = name.value.replace(/[^\d]/g, '').substring(0, 16);
    cardCode = cardCode !== '' ? (cardCode.match(/.{1,4}/g) as RegExpMatchArray).join(' ') : '';
    name.value = cardCode;
    if (name.value.length >= 19) {
      name.classList.remove('input__invalid');
      name.classList.add('input__valid');
      return true;
    } else {
      name.classList.add('input__invalid');
      return false;
    }
  }

  static checkDate(name: HTMLInputElement) {
    if (name.classList.contains('input__valid')) name.classList.remove('input__valid');
    let cardCode = name.value.replace(/[^\d]/g, '').substring(0, 4);
    cardCode = cardCode !== '' ? (cardCode.match(/.{1,2}/g) as RegExpMatchArray).join('/') : '';
    name.value = cardCode;
    if (+name.value.slice(0, 2) > 12) {
      name.classList.add('input__invalid');
      return false;
    }
    if (+name.value.slice(-2) < 23) {
      name.classList.add('input__invalid');
      return false;
    }
    if (name.value.length >= 5) {
      name.classList.remove('input__invalid');
      name.classList.add('input__valid');
      return true;
    } else {
      name.classList.add('input__invalid');
      return false;
    }
  }

  static checkCvv(name: HTMLInputElement) {
    if (name.classList.contains('input__valid')) name.classList.remove('input__valid');
    if (name.value.length > 3) {
      name.value = name.value.slice(0, name.value.length - 1);
    }
    if (name.value.length >= 3) {
      name.classList.remove('input__invalid');
      name.classList.add('input__valid');
      return true;
    } else {
      name.classList.add('input__invalid');
      return false;
    }
  }
}
