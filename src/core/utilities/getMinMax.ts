import { IData } from '../../types/dataJSON';

export function getMinMax(data: IData[], field: keyof IData) {
  const array: number[] = [];

  data.forEach((item) => {
    array.push(Number(item[field]));
  });

  return [Math.min(...array), Math.max(...array)];
}
