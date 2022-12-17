import { Page } from '../../core/templates/page';
import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { goodCardSmall } from '../../core/components/goodCardSmall';
import { DropDawnSearchByCategory } from '../../core/components/DropDawnSearchByCategory';
import { filterCategory } from '../../core/utilities/filterCategory';

const data: IData[] = dataJSON.products;

export class Store extends Page {
  static textObject = {
    mainTitle: 'Store Page for Online-Store!',
    classPrefixForCategory: '_category',
    classPrefixForBrand: '_brand',
  };

  constructor(id: string) {
    super(id);
    this.container.className = 'main-container';
  }

  render() {
    const dropDawnSearchByCategory = new DropDawnSearchByCategory(
      this.categoryArray(),
      Store.textObject.classPrefixForCategory
    );
    const dropDawnSearchByBrand = new DropDawnSearchByCategory(this.brandArray(), Store.textObject.classPrefixForBrand);

    const filterContainer = document.createElement('div');
    filterContainer.className = 'filterContainer';

    filterContainer.append(
      dropDawnSearchByCategory.renderDropDownListWithCaption('category'),
      dropDawnSearchByBrand.renderDropDownListWithCaption('brands')
    );

    const cardContainer = document.createElement('div');
    cardContainer.className = 'container-cards';

    data.forEach((item) => {
      const card = new goodCardSmall(item);
      cardContainer.append(card.render());
    });

    this.container.append(filterContainer, cardContainer);
    return this.container;
  }

  categoryArray = () => {
    return [...new Set(data.map((item) => <keyof IData>item.category))];
  };

  brandArray = () => {
    return [...new Set(data.map((item) => <keyof IData>item.brand))];
  };
}

filterCategory(['laptops', 'smartphones'], data);
