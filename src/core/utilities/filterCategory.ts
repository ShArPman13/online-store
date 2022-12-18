import { IData } from '../../types/dataJSON';

export function filterCategory(categories: string[] | null, data: IData[]): IData[] {
  if (!categories) return data;

  const filteredItems: IData[] = [];
  categories.forEach((category) => {
    data.forEach((item) => {
      if (category === item.category || category === item.brand) {
        filteredItems.push(item);
      }
    });
  });
  return filteredItems;
}
