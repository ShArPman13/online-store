import { IData } from '../../types/dataJSON';
import { getQuery } from './queryParams';

export function searching(data: IData[]) {
  const searchParam = getQuery().search.join().toLowerCase();
  let res: IData[] = [];

  switch (searchParam) {
    case 'Title':
      res = data.filter((item) => item.title.toLowerCase().includes(searchParam));
      break;
    case 'Description':
      res = data.filter((item) => item.description.toLowerCase().includes(searchParam));
      break;
    case 'Price':
      res = data.filter((item) => String(item.price).includes(searchParam));
      break;
    case 'Discount':
      res = data.filter((item) => String(item.discountPercentage).includes(searchParam));
      break;
    case 'Rating':
      res = data.filter((item) => String(item.rating).includes(searchParam));
      break;
    case 'Stock':
      res = data.filter((item) => String(item.rating).includes(searchParam));
      break;
    case 'Brand':
      res = data.filter((item) => item.brand.toLowerCase().includes(searchParam));
      break;

    default:
      res = data.filter((item) => item.category.toLowerCase().includes(searchParam));
  }

  return res;
}
