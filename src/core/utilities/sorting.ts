import { IData } from '../../types/dataJSON';
import { getQuery } from './queryParams';

export function sorting(data: IData[]) {
  let res = [];
  const sortParam = getQuery().sort[0];

  switch (sortParam) {
    case 'priceAS':
      res = data.sort((a, b) => a.price - b.price);
      break;
    case 'ratingAS':
      res = data.sort((a, b) => a.rating - b.rating);
      break;
    case 'ratingDES':
      res = data.sort((a, b) => b.rating - a.rating);
      break;

    default:
      res = data.sort((a, b) => b.price - a.price);
  }

  return res;
}
