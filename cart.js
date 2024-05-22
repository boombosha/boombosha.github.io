// Считываем все элементы корзины:
const cardAddArr = Array.from(document.querySelectorAll(".btn"));
const cartNum = document.querySelector("#cart_num");
const cart = document.querySelector("#cart");

// Считываем все элементы попапа:
const popup = document.querySelector(".popup");
const popupClose = document.querySelector("#popup_close");
const body = document.body;
const popupContainer = document.querySelector("#popup_container");
const popupProductList = document.querySelector("#popup_product_list");
const popupCost = document.querySelector("#popup_cost");
// const popupDiscount = document.querySelector("#popup_discount");
// const popupCostDiscount = document.querySelector("#popup_cost_discount");

// Кнопки открытия и закрытия корзины
cart.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("popup--open");
    body.classList.add("lock");
    popupContainerFill();
  });
  
  popupClose.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("popup--open");
    body.classList.remove("lock");
  });
  
  
  // Класс для товара
  class Product {
    imageSrc;
    name;
    price;
    constructor(card) {
      this.imageSrc = card.querySelector(".card-img").src;
      this.name = card.querySelector(".card-title").innerText;
      this.price = card.querySelector(".card-price-value").innerText;
    }
  }
  
  // Класс для описания корзины покупок
  
  class Cart {
    products;
    constructor() {
      this.products = [];
    }
    get count() {
      return this.products.length;
    }
    addProduct(product) {
      this.products.push(product);
    }
    removeProduct(index) {
      this.products.splice(index, 1);
    }
    get cost() {
      const prices = this.products.map((product) => {
        // return toNum(product.price);
        return Number(product.price);
      });
      const sum = prices.reduce((acc, num) => {
        return acc + num;
      }, 0);
      return sum;
    }
  }
  
  // Создаем объект корзины и сохраняем его в localStorage
  const myCart = new Cart();
  
  if (localStorage.getItem("cart") == null) {
    localStorage.setItem("cart", JSON.stringify(myCart));
  }
  
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  myCart.products = savedCart.products;
  cartNum.textContent = myCart.count;
  
  
  // Добавляем товар в корзину
  myCart.products = cardAddArr.forEach((cardAdd) => {
    cardAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const card = e.target.closest(".card");
      const product = new Product(card);
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      myCart.products = savedCart.products;
      myCart.addProduct(product);
      localStorage.setItem("cart", JSON.stringify(myCart));
      cartNum.textContent = myCart.count;
      console.log('cartadd');
    });
  });
  
  
  // Заполнение корзины
  
  function popupContainerFill() {
    popupProductList.innerHTML = null;
    console.log('popuptest');
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    const productsHTML = myCart.products.map((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("popup__product");
  
      const productWrap1 = document.createElement("div");
      productWrap1.classList.add("popup__product-wrap");
      const productWrap2 = document.createElement("div");
      productWrap2.classList.add("popup__product-wrap");
  
      const productImage = document.createElement("img");
      productImage.classList.add("popup__product-image");
      productImage.setAttribute("src", product.imageSrc);
  
      const productTitle = document.createElement("h2");
      productTitle.classList.add("popup__product-title");
      productTitle.innerHTML = product.name;
  
      const productPrice = document.createElement("div");
      productPrice.classList.add("popup__product-price");
      // productPrice.innerHTML = toNum(product.price);
      productPrice.innerHTML = Number(product.price) + ' ₽';
  
      const productDelete = document.createElement("button");
      productDelete.classList.add("popup__product-delete");
      productDelete.innerHTML = "✖";
  
      productDelete.addEventListener("click", () => {
        myCart.removeProduct(product);
        localStorage.setItem("cart", JSON.stringify(myCart));
        popupContainerFill();
      });
  
      productWrap1.appendChild(productImage);
      productWrap1.appendChild(productTitle);
      productWrap2.appendChild(productPrice);
      productWrap2.appendChild(productDelete);
      productItem.appendChild(productWrap1);
      productItem.appendChild(productWrap2);
  
      return productItem;
    });
  
    productsHTML.forEach((productHTML) => {
      popupProductList.appendChild(productHTML);
    });
  
    popupCost.value = myCart.cost + '₽';
  
  }