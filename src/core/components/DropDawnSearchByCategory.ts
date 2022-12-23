import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { getFilteredItems } from '../utilities/getFilteredItems';
import { params } from '../utilities/queryParams';

export class DropDawnSearchByCategory {
  container = document.createElement('div');
  categories;
  data: IData[] = dataJSON.products;
  classPrefix;
  checkboxes: HTMLInputElement[] = [];

  private inputCheckedSet: Set<string> = new Set();
  private inputCheckedArray: string[] = [];
  filteredObject: IData[] | null;

  constructor(categories: (keyof IData)[], classPrefix: string) {
    this.categories = categories;
    this.classPrefix = classPrefix;
    this.filteredObject = getFilteredItems(null, this.data);
  }

  dropDownList(listFields?: string[]) {
    this.checkboxes.length = 0;
    if (!listFields || listFields.length === 0) {
      listFields = [...this.categories];
    }
    this.container.className = 'drop-down-container dd-trigger';
    this.container.innerHTML = '';
    const select = document.createElement('ul');
    select.className = 'drop-down__select dd-trigger';

    listFields.length === 0 ? this.categories : listFields;

    listFields.forEach((field) => {
      const option = document.createElement('li');
      option.className = 'li-container dd-trigger';
      const input = document.createElement('input');
      input.className = 'drop-down__input dd-trigger';
      input.type = 'checkbox';
      input.id = field;

      input.checked = params.getAll(this.classPrefix.slice(1)).includes(input.id) ? true : false;

      const inputLabel = document.createElement('label');
      inputLabel.className = 'drop-down__input-label dd-trigger';
      inputLabel.innerText = field;
      inputLabel.setAttribute('for', input.id);

      const itemsInCategory = document.createElement('span');
      itemsInCategory.className = 'drop-down__items dd-trigger';

      itemsInCategory.innerText = String(this.itemsInCategory(field, this.classPrefix.slice(1)));

      option.append(input, inputLabel, itemsInCategory);
      this.checkboxes.push(input);
      select.append(option);
    });

    const applyButton = document.createElement('button');
    applyButton.className = 'button-apply';
    applyButton.innerText = 'Apply';
    this.container.append(select, applyButton);

    const apply = () => {
      params.delete(this.classPrefix.slice(1));
      this.checkboxes.forEach((checkbox) => {
        if (checkbox.checked === true) {
          this.inputCheckedSet.add(checkbox.id);
          this.inputCheckedArray = [...this.inputCheckedSet.add(checkbox.id)];
          params.append(this.classPrefix.slice(1), checkbox.id);
        }
      });
      window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
    };

    applyButton.addEventListener('click', apply);

    return this.container;
  }

  renderDropDownListWithCaption(name: string) {
    const container = document.createElement('div');
    container.className = `caption-container dd-trigger-2${this.classPrefix}`;

    document.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLDivElement>e.target;
      if (target.classList.contains(`dd-trigger-2${this.classPrefix}`)) {
        arrow.classList.toggle('open');
        this.container.classList.toggle('open');
      } else if (!target.classList.contains('dd-trigger')) {
        arrow.classList.remove('open');
        this.container.classList.remove('open');
      }
    });

    const caption = document.createElement('span');
    caption.className = `caption-container__text dd-trigger-2${this.classPrefix}`;
    caption.innerText = name;

    const arrow = document.createElement('div');
    arrow.className = `caption-container__arrow dd-trigger-2${this.classPrefix}`;

    container.append(caption, arrow, this.dropDownList());
    return container;
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
    this.container.innerHTML = '';
  }
}
