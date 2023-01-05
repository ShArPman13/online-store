/**
 * @jest-environment jsdom
 */

import { Store } from '../../pages/store/Store';

const testStore = new Store('/store');

it('check brandArray', () => {
  expect(testStore.brandArray().length).toBe(78);
});
