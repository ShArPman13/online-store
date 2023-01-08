/**
 * @jest-environment jsdom
 */

import CheckInput from '../../pages/modalWindow/checkInput';

test('check name and surname', () => {
  const name = document.createElement('input');
  name.value = 'Zack Snyder';
  expect(CheckInput.checkNameAndAdress(name, 2, 3)).toEqual(true);
});

test('check phone number', () => {
  const phone = document.createElement('input');
  phone.value = '+375297778899';
  expect(CheckInput.checkPhone(phone)).toEqual(true);
});

test('check email addrese', () => {
  const email = document.createElement('input');
  email.value = 'RSSchool@gmail.com';
  expect(CheckInput.checkEmail(email)).toEqual(true);
});

test('check date card', () => {
  const date = document.createElement('input');
  date.value = '1224';
  expect(CheckInput.checkDate(date)).toEqual(true);
});

test('check CVV', () => {
  const cvv = document.createElement('input');
  cvv.value = '123';
  expect(CheckInput.checkCvv(cvv)).toEqual(true);
});
