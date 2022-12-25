import { IData } from '../../types/dataJSON';

export function getFilteredPriceItems(data: IData[], priceMin: number, priceMax: number) {
  if (!priceMin && !priceMax) {
    return data;
  }
  return data.filter((item) => {
    return item.price > priceMin && item.price < priceMax;
  });
}
