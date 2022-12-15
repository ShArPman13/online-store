import { Page } from '../../core/templates/page';
import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { goodCardSmall } from '../../core/components/goodCardSmall';

const data: IData[] = dataJSON.products;

export class Store extends Page {
  static textObject = {
    mainTitle: 'Store Page for Online-Store!',
  };

  constructor(id: string) {
    super(id);
    this.container.className = 'container-cards';
  }

  render() {
    data.forEach((item) => {
      const card = new goodCardSmall(item);
      this.container.append(card.render());
    });

    return this.container;
  }
}
