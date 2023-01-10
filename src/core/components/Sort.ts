import { getQuery, params } from '../utilities/queryParams';

export class Sort {
  containerList = document.createElement('div');
  containerCaption = document.createElement('div');
  titleList = document.createElement('span');

  text = {
    PriceAS: 'Price ascending',
    PriceDES: 'Price descending',
    ratingAS: 'Rating ascending',
    ratingDES: 'Rating descending',
  };

  render() {
    this.containerCaption.className = `caption-container dd-trigger-2 sorting`;
    this.containerList.className = 'drop-down-container dd-trigger sorting';

    this.titleList.className = `caption-container__text dd-trigger-2 sorting`;
    this.titleList.innerText = getQuery().sort.length !== 0 ? `${getQuery().sort.join()}` : 'Sort';

    const arrow = document.createElement('div');
    arrow.className = `caption-container__arrow dd-trigger-2`;

    document.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLDivElement>e.target;
      if (target.classList.contains(`dd-trigger-2`)) {
        arrow.classList.add('open');
        this.containerList.classList.add('open');
      } else if (!target.classList.contains('dd-trigger') || target.classList.contains('li-container')) {
        arrow.classList.remove('open');
        this.containerList.classList.remove('open');
      }
    });

    const list = document.createElement('ul');
    list.className = 'drop-down__select dd-trigger sorting';

    const radio: HTMLInputElement[] = [];

    for (const key in this.text) {
      const elementOfList = document.createElement('li');
      elementOfList.className = 'li-container dd-trigger sorting';

      const inputRadio = document.createElement('input');
      inputRadio.className = 'custom-radio';
      inputRadio.type = 'radio';
      inputRadio.id = key;

      const label = document.createElement('label');
      label.className = 'drop-down__input-label';
      label.setAttribute('for', elementOfList.id);
      label.innerText = key;

      elementOfList.append(inputRadio, label);
      radio.push(inputRadio);

      elementOfList.addEventListener('click', () => {
        radio.forEach((item) => (item.checked = false));
        (<HTMLInputElement>elementOfList.firstChild).checked = true;
        params.delete('sort');
        params.append('sort', key);
        this.titleList.innerText = key;
        this.containerCaption.classList.add('filtered');
        window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
      });
      list.append(elementOfList);
    }
    this.containerList.append(list);
    this.containerCaption.append(this.titleList, arrow, this.containerList);
    return this.containerCaption;
  }

  refreshTitle() {
    if (!getQuery().sort.join()) {
      this.titleList.innerText = 'Sort';
      this.containerCaption.classList.remove('filtered');
    }
  }
}
