import { Page } from '../../core/templates/page';
import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { goodCardSmall } from '../../core/components/goodCardSmall';
import { DropDawnSearchByCategory } from '../../core/components/DropDawnSearchByCategory';

const data: IData[] = dataJSON.products;

export class Store extends Page {
  static textObject = {
    mainTitle: 'Store Page for Online-Store!',
    classPrefixForCategory: '_category',
    classPrefixForBrand: '_brand',
  };

  filteredObjectCategory: IData[] = [];
  filteredObjectBrand: IData[] = [];

  dropDawnSearchByCategory: DropDawnSearchByCategory;
  dropDawnSearchByBrand: DropDawnSearchByCategory;

  constructor(id: string) {
    super(id);
    this.container.className = 'main-container';
    this.filteredObjectCategory;
    this.filteredObjectBrand;

    this.dropDawnSearchByCategory = new DropDawnSearchByCategory(
      this.categoryArray(),
      Store.textObject.classPrefixForCategory,
      this.filterCategory
    );
    this.dropDawnSearchByBrand = new DropDawnSearchByCategory(
      this.brandArray(),
      Store.textObject.classPrefixForBrand,
      this.filterBrand
    );
  }

  render() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filterContainer';

    filterContainer.append(
      this.dropDawnSearchByCategory.renderDropDownListWithCaption('category'),
      this.dropDawnSearchByBrand.renderDropDownListWithCaption('brands')
    );
    this.container.append(filterContainer, this.getItemCards());
    return this.container;
  }

  getItemCards = () => {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'container-cards';

    data.forEach((item) => {
      const card = new goodCardSmall(item);
      cardContainer.append(card.render());
    });
    return cardContainer;
  };

  categoryArray = () => {
    return [...new Set(data.map((item) => <keyof IData>item.category))];
  };

  brandArray = () => {
    return [...new Set(data.map((item) => <keyof IData>item.brand))];
  };

  filterCategory = (goodsByCategory: IData[]) => {
    this.filteredObjectCategory = [...goodsByCategory];
    this.bindFiltres();
    // goodsByCategory.length === 0 ? this.filter(data) : this.filter(goodsByCategory);
  };
  filterBrand = (goodsByBrand: IData[]) => {
    this.filteredObjectBrand = [...goodsByBrand];
    this.bindFiltres();
    // goodsByBrand.length === 0 ? this.filter(data) : this.filter(goodsByBrand);
  };

  filter(items: IData[]) {
    (<HTMLDivElement>document.querySelector('.container-cards')).innerHTML = '';
    items.forEach((item) => {
      const card = new goodCardSmall(item);
      (<HTMLDivElement>document.querySelector('.container-cards')).append(card.render());
    });
  }

  bindFiltres() {
    if (this.filteredObjectCategory.length === 0 && this.filteredObjectBrand.length === 0) {
      console.log('render All DATA');
      this.filter(data);
    } else {
      // const res = data.filter((item) => { });
      // console.log(res);
      // this.filter(res);
    }
  }
}
