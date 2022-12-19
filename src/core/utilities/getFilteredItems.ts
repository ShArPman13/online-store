import { IData } from '../../types/dataJSON';

export function getFilteredItems(keywords: string[][] | null, data: IData[]): IData[] {
  if (!keywords) return data;

  const categories = keywords[0];
  const brands = keywords[1];

  const filteredItems: IData[] = categories.length === 0 ? data : [];

  const res: IData[] = [];

  categories.forEach((category) => {
    data.forEach((item) => {
      if (category === item.category) {
        filteredItems.push(item);
      }
    });
  });

  if (brands.length !== 0) {
    filteredItems.forEach((item) => {
      brands.forEach((brand) => {
        if (item.brand === brand) {
          res.push(item);
        }
      });
    });
    return res;
  }

  return filteredItems;
}
