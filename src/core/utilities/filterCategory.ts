import { IData } from '../../types/dataJSON';

export function filterCategory(categories: string[], data: IData[]): IData[] {
  const filteredItems: IData[] = [];
  categories.forEach((category) => {
    data.forEach((item) => {
      if (category === item.category) {
        filteredItems.push(item);
      }
    });
  });
  return filteredItems;
}
