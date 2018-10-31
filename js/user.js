const loginForm = document.forms["login"];
const signUpForm = document.forms["sign-up"];
const loginSpinner = document.querySelector("#login-spinner > img");
const signupSpinner = document.querySelector("#signup-spinner > img");
const signOutBtn = document.getElementById("sign-out");
const loginMessage = document.querySelector("#login-spinner-message");
const signupMessage = document.querySelector("#signup-spinner-message");
const allFoods = document.querySelector(".all-foods");
const homePageSpinner = document.querySelector("#homepage-spinner > img");
const theCart = document.querySelector(".cart");
let myOrders = [];
let template = "";

if (
  localStorage.getItem("token") &&
  localStorage.getItem(decoded.payload.user.username)
) {
  myOrders = JSON.parse(localStorage.getItem(decoded.payload.user.username));
}
const header = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json"
});

const signUp = event => {
  event.preventDefault();
  const details = {
    username: signUpForm.username.value,
    password: signUpForm.password.value,
    email: signUpForm.email.value,
    phone: signUpForm.phone.value,
    address: signUpForm.address.value
  };
  const confirmPassword = signUpForm.confirmPassword.value;
  const result = validate(details.password, confirmPassword);

  const request = new Request(
    "https://mygbols.herokuapp.com/api/v1/auth/signup",
    {
      method: "POST",
      mode: "cors",
      headers: header,
      body: JSON.stringify(details)
    }
  );
  signupSpinner.style.display = "block";
  if (result) {
    fetch(request)
      .then(res => res)
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          changeState(state, "none");
          changeState(signoutState, "inline");
          signupSpinner.style.display = "none";
          signupMessage.innerHTML = `<h4 class = "spinner">${
            data.message
          }</h4>`;
          if (!localStorage.token) {
            localStorage.setItem("token", data.token);
          }
          signUpForm.reset();
          location.assign("./index.html");
        } else {
          signupSpinner.style.display = "none";
          signupMessage.innerHTML = `<h4 class="spinner">${data.message}</h4>`;
        }
      })
      .catch(err => {
        throw err;
      });
  } else {
    signupSpinner.style.display = "none";
    signupMessage.innerHTML = `<h4 class="spinner">The provided passwords do not match</h4>`;
  }
};

const login = event => {
  event.preventDefault();
  const details = {
    username: loginForm.username.value,
    password: loginForm.password.value
  };
  const request = new Request(
    "https://mygbols.herokuapp.com/api/v1/auth/login",
    {
      method: "POST",
      mode: "cors",
      headers: header,
      body: JSON.stringify(details)
    }
  );
  loginSpinner.style.display = "block";
  fetch(request)
    .then(res => res)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (!data.token) {
        loginSpinner.style.display = "none";
        loginMessage.innerHTML = `<h4 class="spinner">${data.message}</h4>`;
      } else {
        changeState(signoutState, "inline");
        changeState(state, "none");
        loginSpinner.style.display = "none";
        loginMessage.innerHTML = `<h4 class="spinner">${data.message}</h4>`;
        if (!localStorage.token) {
          localStorage.setItem("token", data.token);
        }
        loginForm.reset();
        location.assign("./index.html");
      }
    })
    .catch(err => {
      loginSpinner.style.display = "none";
      throw err;
    });
};

const signOut = event => {
  event.preventDefault();
  if (localStorage.token) {
    localStorage.removeItem("token");
  }
  adminPage.style.display = "none";
  changeState(state, "inline");
  changeState(signoutState, "none");
};

const getAllMenus = () => {
  const request = new Request("https://mygbols.herokuapp.com/api/v1/menu", {
    method: "GET",
    headers: header
  });
  homePageSpinner.style.display = "block";
  fetch(request)
    .then(res => res)
    .then(response => response.json())
    .then(data => {
      data.menus.forEach(menu => {
        template += `
              <div class="food">
                <img src="${menu.imageurl}" alt="rice and chicken">
                <div class="cover cover-content">
                  <div class="name-price">
                    <h4>${menu.menutitle}</h4>
                    <h4>#${menu.price}</h4>
                  </div>
                  <p>${menu.description}</p>
                  <div class="quantity-section">
                    <span class="quantity">
                      Quantity:
                    </span>
                    <input type="number" name="quantity" min="1" value="1">
                  </div>
                  <button id="${
                    menu.menuid
                  }" class="add-to-cart">ADD TO CART</button>
                </div>
              </div>
    `;
      });
      localStorage.setItem("menus", JSON.stringify(data.menus));
      if (
        localStorage.getItem("token") &&
        decoded.payload.user.role == "user"
      ) {
        if (localStorage.getItem(decoded.payload.user.username))
          theCart.dataset.badge = JSON.parse(
            localStorage.getItem(decoded.payload.user.username)
          ).length;
      }
      allFoods.innerHTML = template;
      homePageSpinner.style.display = "none";
      document
        .querySelectorAll(".add-to-cart")
        .forEach(btn => btn.addEventListener("click", AddToCart));
    })
    .catch(err => {
      homePageSpinner.style.display = "none";
      throw err;
    });
};

const AddToCart = event => {
  let bool = true;
  const order = {
    quantity: Number(
      event.target.previousElementSibling.lastElementChild.value
    ),
    menuid: Number(event.target.id)
  };
  if (myOrders.length > 0) {
    myOrders.forEach(anOrder => {
      if (anOrder.menuid == order.menuid) {
        anOrder.quantity = order.quantity;
        bool = false;
      }
    });
    if (bool) myOrders.unshift(order);
  } else myOrders.unshift(order);

  if (localStorage.getItem("token")) {
    localStorage.setItem(
      decoded.payload.user.username,
      JSON.stringify(myOrders)
    );
    theCart.dataset.badge = JSON.parse(
      localStorage.getItem(decoded.payload.user.username)
    ).length;
  } else {
    alert("you have to login to add items to your cart!");
  }
};

signOutBtn.addEventListener("click", signOut, false);
loginForm.addEventListener("submit", login, false);
signUpForm.addEventListener("submit", signUp, false);
window.addEventListener("load", getAllMenus, false);
