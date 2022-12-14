import { Page } from '../../core/templates/page';

export class Store extends Page {
  static textObject = {
    mainTitle: 'Store Page for Online-Store!',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(Store.textObject.mainTitle);
    this.container.append(title);
    return this.container;
  }
}
