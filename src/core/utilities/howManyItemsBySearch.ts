import { IData } from '../../types/dataJSON';

export function howManyItemsBySearch(data: IData[], cat: keyof IData | string, categor: string[], condition: string) {
  let res = 0;
  switch (condition) {
    case 'brand': {
      data.forEach((item) => {
        categor.forEach((el) => {
          if (item.brand === cat && item.category === el) {
            res += 1;
          }
        });
      });
      break;
    }
    case 'category': {
      data.forEach((item) => {
        if (item.category === cat) {
          res += 1;
        }
      });

      break;
    }
  }
  return res;
}
