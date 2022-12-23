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

  filterContainer = document.createElement('div');
  cardContainer = document.createElement('div');

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
    this.filterContainer.className = 'filterContainer';

    this.filterContainer.append(
      this.dropDawnSearchByCategory.renderDropDownListWithCaption('Category'),
      this.dropDawnSearchByBrand.renderDropDownListWithCaption('Brands')
    );
    this.container.append(this.filterContainer, this.getItemCards());
    return this.container;
  }

  getItemCards = () => {
    this.cardContainer.className = 'container-cards';

    data.forEach((item) => {
      const card = new goodCardSmall(item);
      this.cardContainer.append(card.render());
    });
    return this.cardContainer;
  };

  categoryArray = () => {
    return [...new Set(data.map((item) => <keyof IData>item.category))];
  };

  brandArray = () => {
    return [...new Set(data.map((item) => <keyof IData>item.brand))];
  };

  brandArrayActualByCategory = (categories: string[]) => {
    const res: string[] = [];
    data.map((item) => {
      categories.forEach((element) => {
        if (item.category === element) {
          res.push(item.brand);
        }
      });
    });
    return [...new Set(res)];
  };
  categoryArrayActualByBrand = (brands: string[]) => {
    const res: string[] = [];
    data.map((item) => {
      brands.forEach((element) => {
        if (item.brand === element) {
          res.push(item.category);
        }
      });
    });
    return [...new Set(res)];
  };

  filterCategory = (goodsByCategory: string[]) => {
    this.filteredArrayCategory = [...goodsByCategory];
    this.actualiseBrandDropDown();
    this.bindCategoryAndBrandsFiltres();
  };
  filterBrand = (goodsByBrand: string[]) => {
    this.filteredArrayBrand = [...goodsByBrand];
    // this.actualiseCategoryDropDown();
    this.bindCategoryAndBrandsFiltres();
  };

  filter(items: IData[]) {
    this.cardContainer.innerHTML = '';

    if (items.length === 0) {
      const noResults = document.createElement('span');
      noResults.className = 'no-result';
      noResults.innerText = Store.textObject.noResultText;
      this.cardContainer.classList.add('no-result');
      this.cardContainer.append(noResults);
    } else {
      items.forEach((item) => {
        const card = new goodCardSmall(item);
        this.cardContainer.classList.remove('no-result');
        this.cardContainer.append(card.render());
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

  actualiseBrandDropDown() {
    const brands = this.brandArrayActualByCategory(this.filteredArrayCategory);
    this.dropDawnSearchByBrand.clearList();
    this.dropDawnSearchByBrand.dropDownList(brands);
  }
  // actualiseCategoryDropDown() {
  //   const category = this.categoryArrayActualByBrand(this.filteredArrayBrand);
  //   this.dropDawnSearchByCategory.clearList();
  //   this.dropDawnSearchByCategory.dropDownList(category);
  // }
}
