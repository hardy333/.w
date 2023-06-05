const cartNumber = document.getElementById("cart-number");
const iconEyeArr = document.querySelectorAll(".icon-eye");
const iconCartArr = document.querySelectorAll(".icon-cart");
const cartElems = document.querySelectorAll(".featureSec .featureCol");

let cartItemsNumber =
  JSON.parse(window.localStorage.getItem("cart-items-number")) || 0;
let cartItems = JSON.parse(window.localStorage.getItem("cart-items")) || [];

cartItems.forEach((elem) => {
  console.log();
  cartElems[elem.index].querySelector(".icon-cart").classList.add("selected");
});

cartNumber.innerText = cartItemsNumber;

iconCartArr.forEach((iconCart) => {
  iconCart.addEventListener("click", (e) => {
    const cartElem = e.currentTarget.closest(".featureCol");
    console.log(cartElems);

    let img = cartElem.querySelector(".img-fluid").src;
    let name = cartElem.querySelector(".title a").textContent;
    let price = cartElem.querySelector(".price").textContent;
    price = parseFloat(price);
    let index = Array.from(cartElems).findIndex((elem) => elem == cartElem);
    console.log(index);

    const cartItem = {
      price,
      name,
      img,
      index,
      q: 1,
    };

    if (e.currentTarget.classList.contains("selected")) {
      e.currentTarget.classList.remove("selected");
      cartItemsNumber--;
      removeItem(cartItem);
    } else {
      e.currentTarget.classList.add("selected");
      cartItemsNumber++;
      addItem(cartItem);
    }

    cartNumber.innerText = cartItemsNumber;
    updateLocalStorage();
  });
});

function removeItem(cartItem) {
  cartItems = cartItems.filter((c) => c.img !== cartItem.img);
}

function addItem(cartItem) {
  cartItems.push(cartItem);
}

function updateLocalStorage() {
  window.localStorage.setItem("cart-items", JSON.stringify(cartItems));
  window.localStorage.setItem("cart-items-number", cartItemsNumber);
}
