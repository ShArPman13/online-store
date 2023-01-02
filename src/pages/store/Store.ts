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
import { howManyItemsBySearch } from '../../core/utilities/howManyItemsBySearch';
import { dropDownForSlider } from '../../core/components/DropDownForSlider';

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

  brands: string[];
  category: string[];

  searchData: IData[] = [];

  dropDownForSliderPrice: dropDownForSlider;
  dropDownForSliderStock: dropDownForSlider;

  constructor(id: string) {
    super(id);
    this.container.className = 'main-container';

    this.dropDawnSearchByCategory = new DropDawnSearch(this.categoryArray(), 'category');
    this.dropDawnSearchByBrand = new DropDawnSearch(this.brandArray(), 'brand');

    this.dualSliderPrice = new Slider(this.sliderPrice);
    this.dualSliderStock = new Slider(this.sliderStock);

    this.sortList = new Sort();
    this.search = new Search();

    this.brands = this.brandArrayActualByCategory(getQuery().category);
    this.category = this.categoryArrayActualByBrand(getQuery().brand);

    this.dropDownForSliderPrice = new dropDownForSlider();
    this.dropDownForSliderStock = new dropDownForSlider();
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
      window.location.hash = `/store?`;
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
    if (params.getAll('view')[0]) {
      viewBTN.className = `${params.getAll('view')[0]} view-btn`;
    } else {
      viewBTN.className = 'view-btn';
    }

    viewBTN.addEventListener('click', () => {
      if (!getQuery().view.join()) {
        params.append('view', 'view');
        setTimeout(() => {
          this.cardContainer.classList.add('view');
          viewBTN.classList.add('view');
        }, 0);
      } else if (getQuery().view.join() === 'view') {
        setTimeout(() => {
          viewBTN.classList.remove('view');
          // viewBTN.classList.add('view1');
          this.cardContainer.classList.remove('view');
          // this.cardContainer.classList.remove('view1');
        }, 0);
        params.delete('view');
        // params.append('view', 'view1');
      }
      //  else {
      //   setTimeout(() => {
      //     viewBTN.classList.remove('view1');
      //     this.cardContainer.classList.remove('view');
      //   }, 0);
      //   params.delete('view');
      // }

      window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store?`;
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

    const goodsB = this.getActualBrands(this.searchData);
    const goodsC = this.getActualCategories(this.searchData);

    filtersContainer.append(
      this.dropDawnSearchByCategory.render('Category', this.category, goodsC),
      this.dropDawnSearchByBrand.render('Brands', this.brands, goodsB),
      this.dropDownForSliderPrice.render(this.sliderPrice, 'Price'),
      this.dropDownForSliderStock.render(this.sliderStock, 'Stock'),
      this.search.render()
    );

    sortContainer.append(this.sortList.render(), containerBTN);

    this.dualSliderPrice.createSlider(getMinMax(data, 'price'), 'price');
    this.dualSliderStock.createSlider(getMinMax(data, 'stock'), 'stock');

    this.searchContainer.append(filtersContainer, sortContainer);

    this.container.append(this.searchContainer, this.getItemCards());

    return this.container;
  }

  getItemCards = () => {
    this.cardContainer.className = getQuery().view.join()
      ? `container-cards ${getQuery().view.join()}`
      : 'container-cards';
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
    return [...new Set(sorting(data).map((item) => <keyof IData>item.category))];
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

  getActualBrands(data: IData[]) {
    const items: number[] = [];
    this.brands.forEach((brand) => {
      items.push(howManyItemsBySearch(data, brand, getQuery().category, 'brand'));
    });
    return items;
  }
  getActualCategories(data: IData[]) {
    const items: number[] = [];
    this.category.forEach((categ) => {
      items.push(howManyItemsBySearch(data, categ, getQuery().brand, 'category'));
    });
    return items;
  }

  filter(items: IData[]) {
    this.cardContainer.innerHTML = '';
    const amount = document.createElement('div');
    amount.className = 'amount';
    amount.innerText = `Found: ${this.searchData.length}`;

    if (items.length === 0) {
      const noResults = document.createElement('span');
      noResults.className = 'no-result';
      noResults.innerText = Store.textObject.noResultText;
      this.cardContainer.classList.add('no-result');
      this.cardContainer.append(noResults);
    } else {
      this.cardContainer.append(amount);
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
    this.searchData = searching(sortData);
    this.filter(this.searchData);
  }

  applyAllFilters() {
    const actualise = () => {
      getQuery();

      this.getItemsToRenderAfterFiltres();

      this.brands = this.brandArrayActualByCategory(getQuery().category);
      this.category = this.categoryArrayActualByBrand(getQuery().brand);

      const goodsB = this.getActualBrands(this.searchData);
      const goodsC = this.getActualCategories(this.searchData);

      this.dropDawnSearchByBrand.clearList();
      this.dropDawnSearchByBrand.render('Brands', this.brands, goodsB);

      this.dropDawnSearchByCategory.clearList();
      this.dropDawnSearchByCategory.render('Category', this.category, goodsC);
    };
    window.addEventListener('hashchange', actualise);
  }
}
