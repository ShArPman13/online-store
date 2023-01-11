import { IData } from '../../types/dataJSON';

export function getFilteredStockItems(data: IData[], stockMin: number, stockMax: number) {
  if (!stockMin && !stockMax) {
    return data;
  }
  return data.filter((item) => {
    return item.stock >= stockMin && item.stock <= stockMax;
  });
}
