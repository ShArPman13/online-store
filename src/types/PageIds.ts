import dataJSON from '../assets/data/data.json';
import { IData } from '../types/dataJSON';

const data: IData[] = dataJSON.products;
const dataId: string[] = [];
data.forEach((item) => {
  dataId.push(`product/${item.id}`);
});

export const PageIds: { [props: string]: string | string[] } = {
  HomePage: '/home-page',
  BasketPage: '/basket',
  StorePage: '/store',
  Product: dataId,
};
