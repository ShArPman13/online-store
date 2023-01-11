import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { getFilteredItems } from '../utilities/getFilteredItems';
import { getQuery, params } from '../utilities/queryParams';

export class DropDawnSearch {
  containerList = document.createElement('div');
  containerCaption = document.createElement('div');
  categories;
  data: IData[] = dataJSON.products;
  classPrefix;
  checkboxes: HTMLInputElement[] = [];
  pref: string;

  private inputCheckedSet: Set<string> = new Set();
  private inputCheckedArray: string[] = [];
  filteredObject: IData[] | null;

  constructor(categories: (keyof IData)[], classPrefix: 'category' | 'brand') {
    this.categories = categories;
    this.classPrefix = classPrefix;
    this.filteredObject = getFilteredItems(null, this.data);
    this.pref = classPrefix;
  }

  render(name: string, listFields?: string[], items?: number[]) {
    this.containerCaption.className = `caption-container dd-trigger-2${this.classPrefix}`;
    this.containerList.className = 'drop-down-container dd-trigger';

    const titleList = document.createElement('span');
    titleList.className = `caption-container__text dd-trigger-2${this.classPrefix}`;
    titleList.innerText = name;

    const arrow = document.createElement('div');
    arrow.className = `caption-container__arrow dd-trigger-2${this.classPrefix}`;

    document.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLDivElement>e.target;
      if (target.classList.contains(`dd-trigger-2${this.classPrefix}`)) {
        arrow.classList.add('open');
        this.containerList.classList.add('open');
      } else if (!target.classList.contains('dd-trigger')) {
        arrow.classList.remove('open');
        this.containerList.classList.remove('open');
      }
    });

    if (getQuery()[this.classPrefix].length !== 0) {
      this.containerCaption.classList.add('filtered');
      arrow.classList.add('filtered');
      titleList.innerText = String(name + '    ' + getQuery()[this.classPrefix].length);
    } else {
      this.containerCaption.classList.remove('filtered');
      arrow.classList.remove('filtered');
    }

    arrow.addEventListener('click', () => {
      if (arrow.classList.contains('filtered')) {
        params.delete(this.classPrefix);
        window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
      }
    });

    this.checkboxes.length = 0;
    if (!listFields || listFields.length === 0) {
      listFields = [...this.categories];
    }
    this.containerList.innerHTML = '';

    const list = document.createElement('ul');
    list.className = 'drop-down__select dd-trigger';
    listFields.forEach((field, i) => {
      const elementOfList = document.createElement('li');
      elementOfList.className = 'li-container dd-trigger';

      const input = document.createElement('input');
      input.className = 'drop-down__input dd-trigger';
      input.type = 'checkbox';
      input.id = field;

      input.checked = getQuery()[this.classPrefix].includes(input.id) ? true : false;

      const inputLabel = document.createElement('label');
      inputLabel.className = 'drop-down__input-label dd-trigger';
      inputLabel.innerText = field;
      inputLabel.setAttribute('for', input.id);

      const itemsInCategory = document.createElement('span');
      itemsInCategory.className = 'drop-down__items dd-trigger';

      if (items && items.length !== 0) {
        itemsInCategory.innerText = `${items[i]}`;
        if (items[i] === 0) {
          inputLabel.style.opacity = '0.3';
          input.disabled = true;
        }
      } else {
        itemsInCategory.innerText = String(this.itemsInCategory(field, this.classPrefix));
      }

      elementOfList.append(input, inputLabel, itemsInCategory);
      this.checkboxes.push(input);
      list.append(elementOfList);
    });

    const applyButton = document.createElement('button');
    applyButton.className = 'button-apply';
    applyButton.innerText = 'Apply';

    this.containerList.append(list, applyButton);

    const apply = () => {
      params.delete(this.classPrefix);
      this.checkboxes.forEach((checkbox) => {
        if (checkbox.checked === true) {
          this.inputCheckedSet.add(checkbox.id);
          this.inputCheckedArray = [...this.inputCheckedSet.add(checkbox.id)];
          params.append(this.classPrefix, checkbox.id);
        }
      });
      window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
    };

    applyButton.addEventListener('click', apply);

    this.containerCaption.append(titleList, arrow, this.containerList);

    return this.containerCaption;
  }

  itemsInCategory = (cat: keyof IData | string, condition: string) => {
    let res = 0;
    switch (condition) {
      case 'category':
        this.data.forEach((item) => {
          if (item.category === cat) {
            res += 1;
          }
        });
        return res;

      case 'brand':
        this.data.forEach((item) => {
          if (item.brand === cat) {
            res += 1;
          }
        });
        return res;
    }
  };

  clearList() {
    this.containerList.innerHTML = '';
    this.containerCaption.innerHTML = '';
  }
}
