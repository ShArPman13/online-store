/**
 * @jest-environment jsdom
 */

import CheckInput from '../../pages/modalWindow/checkInput';

test('check name and surname', () => {
  const name = document.createElement('input');
  name.value = 'Zack Snyder';
  expect(CheckInput.checkNameAndAddress(name, 2, 3)).toEqual(true);
  name.value = 'Z S';
  expect(CheckInput.checkNameAndAddress(name, 2, 3)).toEqual(false);
  name.value = 'Snyder';
  expect(CheckInput.checkNameAndAddress(name, 2, 3)).toEqual(false);
});

test('check phone number', () => {
  const phone = document.createElement('input');
  phone.value = '+375297778899';
  expect(CheckInput.checkPhone(phone)).toEqual(true);
  phone.value = '+37529777';
  expect(CheckInput.checkPhone(phone)).toEqual(false);
});

test('check email address', () => {
  const email = document.createElement('input');
  email.value = 'RSSchool@gmail.com';
  expect(CheckInput.checkEmail(email)).toEqual(true);
  email.value = 'RSSchool@gmailcom';
  expect(CheckInput.checkEmail(email)).toEqual(false);
});

test('check date card', () => {
  const date = document.createElement('input');
  date.value = '1224';
  expect(CheckInput.checkDate(date)).toEqual(true);
  date.value = '122';
  expect(CheckInput.checkDate(date)).toEqual(false);
});

test('check CVV', () => {
  const cvv = document.createElement('input');
  cvv.value = '123';
  expect(CheckInput.checkCvv(cvv)).toEqual(true);
  cvv.value = '12';
  expect(CheckInput.checkCvv(cvv)).toEqual(false);
});
