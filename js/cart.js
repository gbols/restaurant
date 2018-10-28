const allFoods = document.querySelector(".all-foods");
const orderSpinner = document.querySelector("#order-spinner > img");
const OrderSpinnerMsg = document.querySelector("#order-spinner-message");
const menus = JSON.parse(localStorage.getItem("menus"));
let orderBtn = document.getElementById("order");
let emptyMsg = document.getElementById("empty");
let orders, totalHTML, cartArray, total;
let template = "";

if (localStorage.getItem(decoded.payload.user.username)) {
  orders = JSON.parse(localStorage.getItem(decoded.payload.user.username));
}
const combine = (menus, orders) => {
  let arr = [];
  orders.forEach(order => {
    let item = menus.find(menu => menu.menuid == order.menuid);
    arr.push({ ...item, quantity: order.quantity });
  });
  return arr;
};
if (orders) {
  cartArray = combine(menus, orders);
}
const removeFromCart = event => {
  template = "";
  event.target.parentElement.parentElement.parentElement.nextElementSibling.remove();
  const index = event.target.id;
  orders.splice(index, 1);
  localStorage.setItem(decoded.payload.user.username, JSON.stringify(orders));
  cartArray.splice(index, 1);
  loadCartItems(cartArray);
  if (!orders[0]) {
    emptyMsg.style.display = "block";
    orderBtn.style.display = "none";
  }
};
const loadCartItems = cartItems => {
  if (cartItems) {
    cartItems.forEach((item, index) => {
      template += `
      <div class="food">
    <img src="${item.imageurl}">
    <div class="cover cover-content">
    <div class="name-price">
    <h4>${item.menutitle}</h4>
    <h4>#${item.price}</h4>
    </div>
    <p>${item.description}</p>
    <span class="name-price">
    <h4>Unit Sum<time class="num">${item.quantity * item.price}</time></h4>
    <h4>Quantity <span class="num"> ${item.quantity}</span></h4>
    </span>
    <button id= ${index} class="remove-from-cart">REMOVE</button>
    </div>
    </div>
    `;
    });

     total = cartArray.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0
      );

    }
  allFoods.innerHTML = template;
  if (total) {
    emptyMsg.style.display = "none";
    totalHTML = `<h4> Total Sum<time class="num">${total}</time></h4>`;
    allFoods.insertAdjacentHTML("afterend", totalHTML);
  } else {
    orderBtn.style.display = "none";
  }

  document
    .querySelectorAll(".remove-from-cart")
    .forEach(item => item.addEventListener("click", removeFromCart));
};

const placeOrder = () => {
  const order = {
    myOrders: JSON.parse(localStorage.getItem(decoded.payload.user.username))
  };
  const header = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  });
  const request = new Request("https://mygbols.herokuapp.com/api/v1/orders", {
    method: "POST",
    mode: "cors",
    headers: header,
    body: JSON.stringify(order)
  });
  orderSpinner.style.display = "block";
  fetch(request)
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        orderSpinner.style.display = "none";
        OrderSpinnerMsg.innerHTML = `<h4 class="spinner">${data.message}</h4>`;
      } else {
        orderSpinner.style.display = "none";
        OrderSpinnerMsg.innerHTML = `<h4 class="spinner">${data.message}</h4>`;
        localStorage.removeItem(decoded.payload.user.username);
        location.assign("./index.html");
      }
    })
    .catch(err => {
      orderSpinner.style.display = "none";
      throw err;
    });
};
orderBtn.addEventListener("click", placeOrder, false);
window.addEventListener("load", loadCartItems(cartArray), false);
