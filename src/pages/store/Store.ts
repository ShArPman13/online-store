import { Page } from '../../core/templates/page';
import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { goodCardSmall } from '../../core/components/goodCardSmall';
import { DropDawnSearchByCategory } from '../../core/components/DropDawnSearchByCategory';
import { getFilteredItems } from '../../core/utilities/getFilteredItems';
import { params } from '../../core/utilities/queryParams';
import { DualSlider } from '../../core/components/DualSlider';

const data: IData[] = dataJSON.products;

export class Store extends Page {
  static textObject = {
    mainTitle: 'Store Page for Online-Store!',
    noResultText: 'There are no products according the request',
    classPrefixForCategory: '_category',
    classPrefixForBrand: '_brand',
  };

  dropDawnSearchByCategory: DropDawnSearchByCategory;
  dropDawnSearchByBrand: DropDawnSearchByCategory;

  dualSliderPrice: DualSlider;

  categoriesChecked: string[] = [];
  brandsChecked: string[] = [];

  searchContainer = document.createElement('div');
  cardContainer = document.createElement('div');

  constructor(id: string) {
    super(id);
    this.container.className = 'main-container';

    this.dropDawnSearchByCategory = new DropDawnSearchByCategory(
      this.categoryArray(),
      Store.textObject.classPrefixForCategory
    );
    this.dropDawnSearchByBrand = new DropDawnSearchByCategory(this.brandArray(), Store.textObject.classPrefixForBrand);

    this.dualSliderPrice = new DualSlider();
  }

  render() {
    this.searchContainer.className = 'searchContainer';

    const divider = document.createElement('div');
    divider.className = 'divider';

    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filterContainer';

    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'sliderContainer';

    filtersContainer.append(
      this.dropDawnSearchByCategory.renderDropDownListWithCaption('Category'),
      this.dropDawnSearchByBrand.renderDropDownListWithCaption('Brands')
    );

    sliderContainer.append(this.dualSliderPrice.render());

    this.searchContainer.append(filtersContainer, divider, sliderContainer);

    this.container.append(this.searchContainer, this.getItemCards());

    return this.container;
  }

  getItemCards = () => {
    this.cardContainer.className = 'container-cards';
    if (params.toString()) {
      this.applyAllFilters();
    } else {
      data.forEach((item) => {
        const card = new goodCardSmall(item);
        this.cardContainer.append(card.render());
      });
    }
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

  getItemsToRenderAfterFiltres() {
    if (this.categoriesChecked.length === 0 && this.brandsChecked.length === 0) {
      this.filter(data);
    } else {
      const arrayCategoryAndBrand = [this.categoriesChecked, this.brandsChecked];
      const resData = getFilteredItems(arrayCategoryAndBrand, data);
      this.filter(resData);
    }
  }

  applyAllFilters() {
    const actualise = () => {
      this.categoriesChecked = params.getAll('category');
      this.brandsChecked = params.getAll('brand');

      const brands = this.brandArrayActualByCategory(this.categoriesChecked);
      this.dropDawnSearchByBrand.clearList();
      this.dropDawnSearchByBrand.dropDownList(brands);

      const category = this.categoryArrayActualByBrand(this.brandsChecked);
      this.dropDawnSearchByCategory.clearList();
      this.dropDawnSearchByCategory.dropDownList(category);

      this.getItemsToRenderAfterFiltres();
    };
    actualise();
    window.addEventListener('hashchange', actualise);
  }
}
