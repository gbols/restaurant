const state = document.querySelectorAll(".state");
const signoutState = document.querySelectorAll(".signout-state");
const userDetails = document.getElementById("display-name");
const navUserDetails = document.getElementById("nav-display-name");
const adminPage = document.querySelector(".role");
const menus = JSON.parse(localStorage.getItem("menus"));
const allFoodItems = document.querySelector(".food-items");
const cart = document.querySelector(".cart");
let decoded;

/**
 * sets the display property to none or block
 * @param  {NodeList} elements
 * @param  {string} value
 */
const changeState = (elements, value) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = value;
  }
};

/**
 * checks if a user is logged and update app state accordingly
 */
if (localStorage.getItem("token")) {
  changeState(signoutState, "inline");
  changeState(state, "none");
  const token = localStorage.getItem("token");
  decoded = jwtDecode(token);
  if (decoded.payload.user.role === "admin") {
    adminPage.style.display = "inline";
    allFoodItems.style.display = "none";
    cart.style.display = "none";
  }
  userDetails.innerHTML = `<span><span>👤</span> ${
    decoded.payload.user.username
  }</span>`;

  // navUserDetails.innerHTML = `<span><span>👤</span> ${
  //   decoded.payload.user.username
  // }</span>`;
}

function jwtDecode(t) {
  let token = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split(".")[0]));
  token.payload = JSON.parse(window.atob(t.split(".")[1]));
  return token;
}

/**
 * validate!
 * @param  {string} password
 * @param  {string} confirmPassword
 * @returns {boolean}
 */
const validate = (password, confirmPassword) => {
  if (password !== confirmPassword) return false;
  return true;
};
