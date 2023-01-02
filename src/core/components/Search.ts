import { getQuery, params } from '../utilities/queryParams';

export class Search {
  container = document.createElement('div');
  containerList = document.createElement('div');
  containerCaption = document.createElement('div');

  text = ['Title', 'Description', 'Price', 'Discount', 'Rating', 'Stock', 'Brand', 'Category'];

  render() {
    this.container.className = 'search-container';
    this.containerCaption.className = `caption-container searching`;
    this.containerList.className = 'drop-down-container dd-trigger searching';

    const arrow = document.createElement('div');
    arrow.className = `caption-container__arrow searching`;

    const titleList = document.createElement('span');
    titleList.className = `caption-container__text searching`;
    titleList.innerText = getQuery().searchBy.join() || 'Category';
    if (titleList.innerText !== 'Category') {
      arrow.style.display = 'none';
      this.containerCaption.classList.add('filtered');
    }

    document.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLDivElement>e.target;

      if (target.classList.contains(`searching`)) {
        arrow.classList.add('open');
        this.containerList.classList.add('open');
      } else if (!target.classList.contains('dd-trigger')) {
        this.containerList.classList.remove('open');
        arrow.classList.remove('open');
      }
    });

    const list = document.createElement('ul');
    list.className = 'drop-down__select dd-trigger searching';

    for (const key of this.text) {
      const elementOfList = document.createElement('li');
      elementOfList.className = 'li-container search';
      elementOfList.innerText = key;
      elementOfList.addEventListener('click', () => {
        this.containerList.classList.remove('open');
        arrow.classList.remove('open');
        titleList.innerText = key;
        this.containerCaption.classList.add('filtered');
        params.delete('searchby');
        params.append('searchby', key);
        window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
      });
      list.append(elementOfList);
    }

    const inputText = document.createElement('input');
    inputText.className = 'search-input';
    inputText.type = 'text';
    inputText.placeholder = getQuery().search.join() || 'Searching by...';

    inputText.addEventListener('input', () => {
      params.delete('search');
      params.append('search', inputText.value);
      window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
    });
    this.containerList.append(list);
    this.containerCaption.append(titleList, arrow, this.containerList);
    this.container.append(inputText, this.containerCaption);

    return this.container;
  }
}
