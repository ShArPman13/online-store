export default function addPricePromo() {
  const listPrice = document.querySelectorAll('.basket__price-container__price');
  const listPromoCode = document.querySelectorAll('.list__item__promo-value');
  let amount = 0;
  for (let i = 0; i < listPromoCode.length; i++) {
    amount += +listPromoCode[i].innerHTML.replace(/[\D]+/g, '');
  }
  const total = document.querySelectorAll('.prices-container__total-prices')[0];
  if (total !== undefined) {
    if (listPromoCode.length === 0) {
      const itemParent = total.parentElement;
      if (itemParent !== null) {
        itemParent.innerHTML = '';
        itemParent.append(total);
        total.classList.remove('basket__price-old');
      }
    } else {
      addNewPrice(total, amount);
      total.classList.add('basket__price-old');
    }

    for (let i = 0; i < listPrice.length; i++) {
      const item = listPrice[i];
      const itemParent = item.parentElement;
      if (listPromoCode.length === 0) {
        if (itemParent !== null) {
          itemParent.innerHTML = '';
          itemParent.append(item);
          item.classList.remove('basket__price-old');
          continue;
        }
      }
      item.classList.add('basket__price-old');
      addNewPrice(listPrice[i], amount);
    }
  }
}

function addNewPrice(total: Element, amount: number) {
  const newPrice = document.createElement('div');
  const current = +total.innerHTML?.replace(/[\D]+/g, '') * (1 - amount / 100);
  newPrice.innerHTML = `${Math.floor(current * 100) / 100}$`;
  const itemParent = total.parentElement;
  if (itemParent !== null) {
    itemParent.innerHTML = '';
    itemParent.append(total, newPrice);
  }
}
