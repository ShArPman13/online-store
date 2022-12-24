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
