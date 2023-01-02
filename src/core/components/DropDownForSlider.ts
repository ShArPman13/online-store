export class dropDownForSlider {
  containerList = document.createElement('div');
  containerCaption = document.createElement('div');

  render(slider: HTMLDivElement, n: string) {
    const name = n.toLowerCase();
    this.containerCaption.className = `caption-container sliders_${name}`;
    this.containerList.className = `drop-down-container-sliders_${name}`;

    const titleList = document.createElement('span');
    titleList.className = `caption-container__text sliders_${name}`;

    titleList.innerText = n;

    const arrow = document.createElement('div');
    arrow.className = `caption-container__arrow sliders_${name}`;

    document.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLDivElement>e.target;
      if (target.classList.contains(`sliders_${name}`)) {
        arrow.classList.add('open');
        this.containerList.classList.add('open');
      } else if (!target.classList.contains(`sliders_${name}`) || target.classList.contains('li-container')) {
        arrow.classList.remove('open');
        this.containerList.classList.remove('open');
      }
    });

    const divider1 = document.createElement('div');
    divider1.className = 'divider';
    const divider2 = document.createElement('div');
    divider2.className = 'divider';

    this.containerList.append(divider1, slider, divider2);
    this.containerCaption.append(titleList, arrow, this.containerList);
    return this.containerCaption;
  }
}
