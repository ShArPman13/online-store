import { Page } from '../../core/templates/page';
import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { goodCardSmall } from '../../core/components/goodCardSmall';
import { DropDawnSearch } from '../../core/components/DropDawnSearchByCategory';
import { getFilteredItems } from '../../core/utilities/getFilteredItems';
import { params } from '../../core/utilities/queryParams';
import Slider from '../../core/components/DualSlider';
import { getMinMax } from '../../core/utilities/getMinMax';
import { getFilteredPriceItems } from '../../core/utilities/getFilteredPriceAndStockItems';
import { getFilteredStockItems } from '../../core/utilities/getFilteredStockItems';

const data: IData[] = dataJSON.products;

export class Store extends Page {
  static textObject = {
    mainTitle: 'Store Page for Online-Store!',
    noResultText: 'There are no products according the request',
    classPrefixForCategory: '_category',
    classPrefixForBrand: '_brand',
  };

  dropDawnSearchByCategory: DropDawnSearch;
  dropDawnSearchByBrand: DropDawnSearch;

  dualSliderPrice: Slider;
  dualSliderStock: Slider;

  priceMin = Number(params.getAll('price').join('|').split('|')[0]);
  priceMax = Number(params.getAll('price').join('|').split('|')[1]);
  stockMin = Number(params.getAll('stock').join('|').split('|')[0]);
  stockMax = Number(params.getAll('stock').join('|').split('|')[1]);

  sliderPrice = document.createElement('div');
  sliderStock = document.createElement('div');

  searchContainer = document.createElement('div');
  cardContainer = document.createElement('div');

  categoriesChecked: string[] = [];
  brandsChecked: string[] = [];

  constructor(id: string) {
    super(id);
    this.container.className = 'main-container';

    this.dropDawnSearchByCategory = new DropDawnSearch(this.categoryArray(), Store.textObject.classPrefixForCategory);
    this.dropDawnSearchByBrand = new DropDawnSearch(this.brandArray(), Store.textObject.classPrefixForBrand);

    this.dualSliderPrice = new Slider(this.sliderPrice);
    this.dualSliderStock = new Slider(this.sliderStock);
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

    this.dualSliderPrice.createSlider(getMinMax(data, 'price'), 'price');
    this.dualSliderStock.createSlider(getMinMax(data, 'stock'), 'stock');

    this.dualSliderPrice.updateValues(this.priceMin, this.priceMax);
    this.dualSliderStock.updateValues(this.stockMin, this.stockMax);

    sliderContainer.append(this.sliderPrice, this.sliderStock);

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

  getItemsToRenderAfterFiltres(priceMin: number, priceMax: number, stockMin: number, stockMax: number) {
    const arrayCategoryAndBrand = [this.categoriesChecked, this.brandsChecked];

    const dataAfterBrandCategoryFilter = getFilteredItems(arrayCategoryAndBrand, data);
    const dataAfterPriceFilter = getFilteredPriceItems(dataAfterBrandCategoryFilter, priceMin, priceMax);
    const dataAfterStockFilter = getFilteredStockItems(dataAfterPriceFilter, stockMin, stockMax);

    this.filter(dataAfterStockFilter);
  }

  applyAllFilters() {
    const actualise = () => {
      // console.log('actul', params.toString());
      this.categoriesChecked = params.getAll('category');
      this.brandsChecked = params.getAll('brand');

      const brands = this.brandArrayActualByCategory(this.categoriesChecked);
      this.dropDawnSearchByBrand.clearList();
      this.dropDawnSearchByBrand.renderDropDownListWithCaption('Brands', brands);

      const category = this.categoryArrayActualByBrand(this.brandsChecked);
      this.dropDawnSearchByCategory.clearList();
      this.dropDawnSearchByCategory.renderDropDownListWithCaption('Category', category);

      this.priceMin = Number(params.getAll('price').join('|').split('|')[0]);
      this.priceMax = Number(params.getAll('price').join('|').split('|')[1]);
      this.stockMin = Number(params.getAll('stock').join('|').split('|')[0]);
      this.stockMax = Number(params.getAll('stock').join('|').split('|')[1]);

      this.getItemsToRenderAfterFiltres(this.priceMin, this.priceMax, this.stockMin, this.stockMax);
    };
    window.addEventListener('hashchange', actualise);
  }
}
