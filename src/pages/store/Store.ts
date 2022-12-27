import { Page } from '../../core/templates/page';
import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { goodCardSmall } from '../../core/components/goodCardSmall';
import { DropDawnSearch } from '../../core/components/DropDawnSearchByCategory';
import { getFilteredItems } from '../../core/utilities/getFilteredItems';
import { delAllQuery, getQuery, params } from '../../core/utilities/queryParams';
import Slider from '../../core/components/DualSlider';
import { getMinMax } from '../../core/utilities/getMinMax';
import { getFilteredPriceItems } from '../../core/utilities/getFilteredPriceAndStockItems';
import { getFilteredStockItems } from '../../core/utilities/getFilteredStockItems';
import { Sort } from '../../core/components/Sort';
import { sorting } from '../../core/utilities/sorting';
import { Search } from '../../core/components/Search';
import { searching } from '../../core/utilities/searching';

const data: IData[] = dataJSON.products;

export class Store extends Page {
  static textObject = {
    mainTitle: 'Store Page for Online-Store!',
    noResultText: 'There are no products according the request',
  };

  dropDawnSearchByCategory: DropDawnSearch;
  dropDawnSearchByBrand: DropDawnSearch;

  dualSliderPrice: Slider;
  dualSliderStock: Slider;

  sortList: Sort;
  search: Search;

  sliderPrice = document.createElement('div');
  sliderStock = document.createElement('div');

  searchContainer = document.createElement('div');
  cardContainer = document.createElement('div');

  categoriesChecked: string[] = [];
  brandsChecked: string[] = [];

  constructor(id: string) {
    super(id);
    this.container.className = 'main-container';

    this.dropDawnSearchByCategory = new DropDawnSearch(this.categoryArray(), 'category');
    this.dropDawnSearchByBrand = new DropDawnSearch(this.brandArray(), 'brand');

    this.dualSliderPrice = new Slider(this.sliderPrice);
    this.dualSliderStock = new Slider(this.sliderStock);

    this.sortList = new Sort();
    this.search = new Search();
  }

  render() {
    this.searchContainer.className = 'searchContainer';

    const divider = document.createElement('div');
    divider.className = 'divider';

    const clearBTN = document.createElement('button');
    clearBTN.className = 'clear-btn';
    clearBTN.innerText = 'CLEAR';
    clearBTN.addEventListener('click', () => {
      delAllQuery();
      window.location.hash = `/store`;
    });

    const copyBTN = document.createElement('button');
    copyBTN.className = 'clear-btn';
    copyBTN.innerText = 'COPY';
    copyBTN.addEventListener('click', () => {
      navigator.clipboard.writeText(document.location.href);
      copyBTN.innerText = 'DONE';
      setTimeout(() => {
        copyBTN.innerText = 'COPY';
      }, 1000);
    });

    const viewBTN = document.createElement('button');
    viewBTN.className = 'clear-btn';
    viewBTN.innerText = 'VIEW';
    viewBTN.addEventListener('click', () => {
      if (getQuery().view.join() === 'view') {
        params.delete('view');
        this.cardContainer.classList.remove('view');
      } else {
        params.append('view', 'view');
        setTimeout(() => {
          this.cardContainer.classList.add('view');
        }, 50);
      }
      window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
    });

    const containerBTN = document.createElement('div');
    containerBTN.className = 'containerBTN';
    containerBTN.append(viewBTN, copyBTN, clearBTN);

    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filterContainer';

    const sortContainer = document.createElement('div');
    sortContainer.className = 'sortContainer';

    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'sliderContainer';

    const brands = this.brandArrayActualByCategory(getQuery().category);
    const category = this.categoryArrayActualByBrand(getQuery().brand);

    filtersContainer.append(
      this.dropDawnSearchByCategory.render('Category', category),
      this.dropDawnSearchByBrand.render('Brands', brands),
      this.search.render()
    );

    sortContainer.append(this.sortList.render(), containerBTN);

    this.dualSliderPrice.createSlider(getMinMax(data, 'price'), 'price');
    this.dualSliderStock.createSlider(getMinMax(data, 'stock'), 'stock');

    // this.dualSliderPrice.updateValues(getQuery().priceMIN, getQuery().priceMAX);
    // this.dualSliderStock.updateValues(getQuery().stockMIN, getQuery().stockMAX);

    sliderContainer.append(this.sliderPrice, this.sliderStock);

    this.searchContainer.append(filtersContainer, sortContainer, divider, sliderContainer);

    this.container.append(this.searchContainer, this.getItemCards());

    return this.container;
  }

  getItemCards = () => {
    this.cardContainer.className = 'container-cards';
    if (params.toString()) {
      this.getItemsToRenderAfterFiltres();
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
    this.dualSliderPrice.updateValues(getMinMax(items, 'price')[0], getMinMax(items, 'price')[1]);
    this.dualSliderStock.updateValues(getMinMax(items, 'stock')[0], getMinMax(items, 'stock')[1]);
  }

  getItemsToRenderAfterFiltres() {
    const dataAfterBrCatFilter = getFilteredItems([getQuery().category, getQuery().brand], data);
    const dataAfterPriceFilter = getFilteredPriceItems(dataAfterBrCatFilter, getQuery().priceMIN, getQuery().priceMAX);
    const dataAfterStockFilter = getFilteredStockItems(dataAfterPriceFilter, getQuery().stockMIN, getQuery().stockMAX);
    const sortData = sorting(dataAfterStockFilter);
    const searchData = searching(sortData);
    this.filter(searchData);
  }

  applyAllFilters() {
    const actualise = () => {
      getQuery();
      const brands = this.brandArrayActualByCategory(getQuery().category);
      this.dropDawnSearchByBrand.clearList();
      this.dropDawnSearchByBrand.render('Brands', brands);
      const category = this.categoryArrayActualByBrand(getQuery().brand);
      this.dropDawnSearchByCategory.clearList();
      this.dropDawnSearchByCategory.render('Category', category);

      this.getItemsToRenderAfterFiltres();
    };
    window.addEventListener('hashchange', actualise);
  }
}
