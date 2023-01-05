/**
 * @jest-environment jsdom
 */

import { Store } from '../../pages/store/Store';

const testStore = new Store('/store');

it('check categoryArray', () => {
  expect(testStore.categoryArray()).toEqual([
    'laptops',
    'smartphones',
    'motorcycle',
    'furniture',
    'tops',
    'womens-dresses',
    'fragrances',
    'womens-shoes',
    'mens-watches',
    'womens-jewellery',
    'skincare',
    'groceries',
    'womens-bags',
    'mens-shirts',
    'home-decoration',
    'womens-watches',
    'mens-shoes',
    'sunglasses',
    'lighting',
    'automotive',
  ]);
});
