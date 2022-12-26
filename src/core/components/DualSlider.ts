import noUiSlider, { target } from 'nouislider';
import { params } from '../utilities/queryParams';

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

    this.slider.noUiSlider?.on('end', this.updateByEvent);
    this.slider.noUiSlider?.on('change', this.updateByEvent);
  }

  updateByEvent = (values: (string | number)[]) => {
    const str0 = String(values[0]);
    const str1 = String(values[1]);

    const firstNum = str0.includes('$') ? str0.slice(0, str0.length - 1) : str0;
    const lastNum = str1.includes('$') ? str1.slice(0, str1.length - 1) : str1;
    const stringForParams = firstNum + '|' + lastNum;

    params.set(this.condition, stringForParams);
    window.location.hash = params.toString() ? `/store?${params.toString()}` : `/store`;
  };

  updateValues(min: number, max: number) {
    this.slider.noUiSlider?.set([min, max]);
  }
}
