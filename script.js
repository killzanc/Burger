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

// console.log(btnPlusOrMinus);


btnPlusOrMinus.forEach((btn, key) => {
  const parent = btn.closest('.main__product');
  const parentId = parent.getAttribute('id');
  const outAmount = parent.querySelector('.main__product-num');
  const outPrice = parent.querySelector('.main__product-price span');
  const outKcall = parent.querySelector('.main__product-kcall span');
  const checkItems = parent.querySelectorAll('.main__product-checkbox');
  
  checkItems.forEach((check) => {
    check.addEventListener('click' , function(){
      const dataExtra = check.getAttribute('data-extra');
      products[parentId][dataExtra] = check.checked;

      if(products[parentId][dataExtra] === true){
        products[parentId].price += extraProducts[dataExtra].price / 2;
        products[parentId].kcall += extraProducts[dataExtra].price / 2;
      }else{
        products[parentId].price -= extraProducts[dataExtra].price / 2;
        products[parentId].kcall -= extraProducts[dataExtra].price / 2;       
      }
      console.log(products);
      outPrice.innerHTML = products[parentId].Summ();
      outKcall.innerHTML = products[parentId].Kcall();
    })
  })

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