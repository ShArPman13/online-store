import noUiSlider, { target } from 'nouislider';
import { params } from '../utilities/queryParams';

export class DualSlider {
  rangeContainer = document.createElement('div');

  render() {
    this.rangeContainer.className = 'range_container';

    const slidersControl = document.createElement('div');
    slidersControl.className = 'sliders_control';

    const fromSlider = document.createElement('input');
    const toSlider = document.createElement('input');
    fromSlider.id = 'fromSlider';
    toSlider.id = 'toSlider';
    fromSlider.type = 'range';
    toSlider.type = 'range';

    slidersControl.append(fromSlider, toSlider);

    const formControl = document.createElement('div');
    formControl.className = 'form_control';

    const formControlContainerMin = document.createElement('div');
    formControlContainerMin.className = 'form_control_container';

    const formControlMinText = document.createElement('div');
    formControlMinText.className = 'form_control_container__time';
    formControlMinText.id = 'fromInput';
    formControlMinText.innerText = 'Min';
    const formControlMinInput = document.createElement('input');
    formControlMinInput.className = 'form_control_container__time__input';
    formControlMinInput.type = 'number';

    formControlContainerMin.append(formControlMinText, formControlMinInput);

    const formControlContainerMax = document.createElement('div');
    formControlContainerMax.className = 'form_control_container';

    const formControlMaxText = document.createElement('div');
    formControlMaxText.className = 'form_control_container__time';
    formControlMaxText.id = 'toInput';
    formControlMaxText.innerText = 'Max';
    const formControlMaxInput = document.createElement('input');
    formControlMaxInput.className = 'form_control_container__time__input';
    formControlMaxInput.type = 'number';

    formControlContainerMax.append(formControlMaxText, formControlMaxInput);
    formControl.append(formControlContainerMin, formControlContainerMax);

    this.rangeContainer.append(slidersControl, formControl);

    return this.rangeContainer;
  }
}

export default class Slider {
  constructor(public slider: target) {
    this.slider = slider;
    this.start = [];
  }
  start: number[];
  condition = '';

  createSlider(values: number[], condition: string) {
    this.start = [...values];
    this.condition = condition;

    noUiSlider.create(this.slider, {
      start: [values[0], values[1]],
      connect: true,
      step: 1,
      tooltips: [true, true],
      range: {
        min: values[0],
        max: values[1],
      },
      format: {
        to: function (value) {
          return `${parseInt(value.toString())}${condition === 'price' ? '$' : ''}`;
        },
        from: function (value) {
          return parseInt(value);
        },
      },
    });

    this.slider.noUiSlider?.on('update', (values) => {
      const str0 = String(values[0]);
      const str1 = String(values[1]);

      const firstNum = str0.includes('$') ? str0.slice(0, str0.length - 1) : str0;
      const lastNum = str1.includes('$') ? str1.slice(0, str1.length - 1) : str1;
      const stringForParams = firstNum + '|' + lastNum;

      params.set(condition, stringForParams);
      window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
    });
  }
  updateValues(min: number, max: number) {
    console.log(min, max);
    this.slider.noUiSlider?.set([min, max]);
  }
}
