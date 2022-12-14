import { Page } from '../../core/templates/page';

export class Basket extends Page {
  static textObject = {
    mainTitle: 'Basket Page for Online-Store!',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(Basket.textObject.mainTitle);
    this.container.append(title);
    return this.container;
  }
}
