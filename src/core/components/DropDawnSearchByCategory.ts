import dataJSON from '../../assets/data/data.json';
import { IData } from '../../types/dataJSON';
import { getFilteredItems } from '../utilities/getFilteredItems';

export class DropDawnSearchByCategory {
  container = document.createElement('div');
  categories;
  data: IData[] = dataJSON.products;
  classPrefix;
  private inputCheckedSet: Set<string> = new Set();
  private inputCheckedArray: string[] = [];
  filteredObject: IData[] | null;
  callBack: (arg0: string[]) => void;

  constructor(categories: (keyof IData)[], classPrefix: string, filterCallBack: (arg0: string[]) => void) {
    this.categories = categories;
    this.classPrefix = classPrefix;
    this.filteredObject = getFilteredItems(null, this.data);
    this.callBack = filterCallBack;
  }

  dropDownList() {
    this.container.className = 'drop-down-container dd-trigger';
    this.container.innerHTML = '';

    const select = document.createElement('ul');
    select.className = 'drop-down__select dd-trigger';

    this.categories.forEach((category) => {
      const option = document.createElement('li');
      option.className = 'li-container dd-trigger';
      const input = document.createElement('input');
      input.className = 'drop-down__input dd-trigger';
      input.type = 'checkbox';
      input.id = category;
      input.addEventListener('change', () => {
        if (input.checked === true) {
          this.inputCheckedSet.add(input.id);
          this.inputCheckedArray = [...this.inputCheckedSet];
          this.callBack(this.inputCheckedArray);
        } else {
          this.inputCheckedSet.delete(input.id);
          this.inputCheckedArray = [...this.inputCheckedSet];
          this.callBack(this.inputCheckedArray);
        }
      });

      const inputLabel = document.createElement('label');
      inputLabel.className = 'drop-down__input-label dd-trigger';
      inputLabel.innerText = category;
      inputLabel.setAttribute('for', input.id);

      const itemsInCategory = document.createElement('span');
      itemsInCategory.className = 'drop-down__items dd-trigger';
      itemsInCategory.innerText = String(this.itemsInCategory(category, this.classPrefix.slice(1)));

      option.append(input, inputLabel, itemsInCategory);
      select.append(option);
    });

    this.container.append(select);

    return this.container;
  }

  renderDropDownListWithCaption(category: string) {
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
    caption.innerText = category;

    const arrow = document.createElement('div');
    arrow.className = `caption-container__arrow dd-trigger-2${this.classPrefix}`;

    container.append(caption, arrow, this.dropDownList());
    return container;
  }

  itemsInCategory = (cat: keyof IData, condition: string) => {
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
}
