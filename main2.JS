const products = {
  plainBurger: {
    name: 'Гамбургер простой',
    price: 10000,
    kcall: 1000,
    amount: 0,
    Summ: function () { return this.amount * this.price },
    Kcall: function () { return this.amount * this.kcall },
  },
  freshBurger: {
    name: 'Гамбургер FRESH',
    price: 20500,
    kcall: 1500,
    amount: 0,
    Summ: function () { return this.amount * this.price },
    Kcall: function () { return this.amount * this.kcall },
  },
  freshCombo: {
    name: 'FRESH COMBO',
    price: 31900,
    kcall: 2000,
    amount: 0,
    Summ: function () { return this.amount * this.price },
    Kcall: function () { return this.amount * this.kcall },
  }
}

const extraProducts = {
  doubleMayonnaise: {
    name: 'Двойной майонез',
    price: 500,
    kcall: 300,
  },
  lettuce: {
    name: 'Салатный лист',
    price: 300,
    kcall: 20,
  },
  cheese: {
    name: 'Сыр',
    price: 800,
    kcall: 250,
  },
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
const checkItems = document.querySelectorAll('.main__product-checkbox');

btnPlusOrMinus.forEach((btn, key) => {
  const parent = btn.closest('.main__product');
  const parentId = parent.getAttribute('id');
  const outAmount = parent.querySelector('.main__product-num');
  const outPrice = parent.querySelector('.main__product-price span');
  const outKcall = parent.querySelector('.main__product-kcall span');
  btn.addEventListener('click', function () {
    const symbol = btn.getAttribute('data-symbol');

    if (symbol == '+' && products[parentId].amount < 100) {
      products[parentId].amount++
    } else if (symbol == '-' && products[parentId].amount > 0) {
      products[parentId].amount--
    }
    outAmount.innerHTML = products[parentId].amount;
    outPrice.innerHTML = products[parentId].Summ();
    outKcall.innerHTML = products[parentId].Kcall();

  })
})

checkItems.forEach((check) => {
  const parent = check.closest('.main__product');
  const parentId = parent.getAttribute('id');
  const outPrice = parent.querySelector('.main__product-price span');
  const outKcall = parent.querySelector('.main__product-kcall span');

  check.addEventListener('click', function () {
    const dataExtra = check.getAttribute('data-extra');
    products[parentId][dataExtra] = check.checked;

    if (products[parentId][dataExtra] === true) {
      products[parentId].price += extraProducts[dataExtra].price;
      products[parentId].kcall += extraProducts[dataExtra].price;
    } else {
      products[parentId].price -= extraProducts[dataExtra].price;
      products[parentId].kcall -= extraProducts[dataExtra].price;
    }
    outPrice.innerHTML = products[parentId].Summ();
    outKcall.innerHTML = products[parentId].Kcall();
  })
})





















//  //////////
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const receiptOut = document.querySelector('.receipt__window-out');
const receiptBtn = document.querySelector('.receipt__window-btn');
const addCart = document.querySelector('.addCart');

let arrProducts = [];
let totalName = '';
let totalPrice = '';
let totalKcall = '';

addCart.addEventListener('click', function(){
  for(const key in products){
    const pObj = products[key]
    if(pObj.amount > 0){
      arrProducts.push(pObj);
      pObj.name += ` = ${pObj.amount}`;
      for(const info in pObj){
        if(pObj[info] === true){
          pObj.name += `\n ${extraProducts[info].name}`
        }
      }
      pObj.name += `\nстоимость: ${pObj.Summ()} \nКаллорийность: ${pObj.Kcall()}`; 
    }
  }
    arrProducts.forEach(obj => {
      totalName += `\n ${obj.name} \n`;
      totalPrice += obj.Summ();
      totalKcall += obj.Kcall();
    })

    receiptOut.innerHTML = `Вы заказали: \n${totalName} \n Общая стоимость с доставкой: ${totalPrice + 9000} \n(цена доставки 9к) \n общая каллорийность: ${totalKcall}`;

  receipt.style.display = 'flex';
  setTimeout(() => {
    receipt.style.opacity = '1';
  }, 100);
  setTimeout(() => {
    receiptWindow.style.top = '20%';
  }, 300);
})
receiptBtn.addEventListener('click' , function(){
   location.reload();
})