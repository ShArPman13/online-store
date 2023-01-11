/**
 * @jest-environment jsdom
 */

import { copyQuery, params } from '../utilities/queryParams';

it('test copyQuery', () => {
  expect(copyQuery()).toEqual(params.toString());
});
