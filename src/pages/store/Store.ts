import { Page } from '../../core/templates/page';
import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { goodCardSmall } from '../../core/components/goodCardSmall';
import { DropDawnSearchByCategory } from '../../core/components/DropDawnSearchByCategory';
import { getFilteredItems } from '../../core/utilities/getFilteredItems';

const data: IData[] = dataJSON.products;

export class Store extends Page {
  static textObject = {
    mainTitle: 'Store Page for Online-Store!',
    noResultText: 'There are no products according the request',
    classPrefixForCategory: '_category',
    classPrefixForBrand: '_brand',
  };

  filteredArrayCategory: string[] = [];
  filteredArrayBrand: string[] = [];

  dropDawnSearchByCategory: DropDawnSearchByCategory;
  dropDawnSearchByBrand: DropDawnSearchByCategory;

  constructor(id: string) {
    super(id);
    this.container.className = 'main-container';
    this.filteredArrayCategory;
    this.filteredArrayBrand;

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

  filterCategory = (goodsByCategory: string[]) => {
    this.filteredArrayCategory = [...goodsByCategory];
    this.bindCategoryAndBrandsFiltres();
  };
  filterBrand = (goodsByBrand: string[]) => {
    this.filteredArrayBrand = [...goodsByBrand];
    this.bindCategoryAndBrandsFiltres();
  };

  filter(items: IData[]) {
    const containerCards = <HTMLDivElement>document.querySelector('.container-cards');
    containerCards.innerHTML = '';

    if (items.length === 0) {
      const noResults = document.createElement('span');
      noResults.className = 'no-result';
      noResults.innerText = Store.textObject.noResultText;
      containerCards.classList.add('no-result');
      containerCards.append(noResults);
    } else {
      items.forEach((item) => {
        const card = new goodCardSmall(item);
        containerCards.classList.remove('no-result');
        containerCards.append(card.render());
      });
    }
  }

  bindCategoryAndBrandsFiltres() {
    if (this.filteredArrayCategory.length === 0 && this.filteredArrayBrand.length === 0) {
      this.filter(data);
    } else {
      const arrayCategoryAndBrand = [this.filteredArrayCategory, this.filteredArrayBrand];
      const resData = getFilteredItems(arrayCategoryAndBrand, data);
      this.filter(resData);
    }
  }
}
