import { getQuery, params } from '../utilities/queryParams';

export class dropDownForSlider {
  containerList = document.createElement('div');
  containerCaption = document.createElement('div');
  arrow = document.createElement('div');

  render(slider: HTMLDivElement, n: string) {
    const name = n.toLowerCase();
    this.containerCaption.className = `caption-container sliders_${name}`;
    this.containerList.className = `drop-down-container-sliders_${name}`;

    const titleList = document.createElement('span');
    titleList.className = `caption-container__text sliders_${name}`;

    titleList.innerText = n;

    this.arrow = document.createElement('div');
    this.arrow.className = `caption-container__arrow sliders_${name}`;

    document.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLDivElement>e.target;
      if (target.classList.contains(`sliders_${name}`)) {
        this.arrow.classList.add('open');
        this.containerList.classList.add('open');
      } else if (!target.classList.contains(`sliders_${name}`) || target.classList.contains('li-container')) {
        this.arrow.classList.remove('open');
        this.containerList.classList.remove('open');
      }
    });

    const divider1 = document.createElement('div');
    divider1.className = 'divider';
    const divider2 = document.createElement('div');
    divider2.className = 'divider';

    this.containerList.append(divider1, slider, divider2);
    this.containerCaption.append(titleList, this.arrow, this.containerList);
    return this.containerCaption;
  }

  getFilteredPrice() {
    if (getQuery().priceMIN !== 0 || getQuery().priceMAX !== 1749) {
      this.containerCaption.classList.add('filtered');
      this.arrow.classList.add('filtered');
    } else {
      this.containerCaption.classList.remove('filtered');
    }

    this.arrow.addEventListener('click', () => {
      if (this.arrow.classList.contains('filtered')) {
        this.arrow.classList.remove('filtered');
        this.containerCaption.classList.remove('filtered');

        params.delete('price');
        window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
      }
    });
  }
  getFilteredStock() {
    if (getQuery().stockMIN !== 2 || getQuery().stockMAX !== 150) {
      this.containerCaption.classList.add('filtered');
      this.arrow.classList.add('filtered');
    } else {
      this.containerCaption.classList.remove('filtered');
    }

    this.arrow.addEventListener('click', () => {
      if (this.arrow.classList.contains('filtered')) {
        this.arrow.classList.remove('filtered');
        this.containerCaption.classList.remove('filtered');

        params.delete('stock');
        window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
      }
    });
  }
}
