const state = document.querySelectorAll(".state");
const signoutState = document.querySelectorAll(".signout-state");
const userDetails = document.getElementById("display-name");
const navUserDetails = document.getElementById("nav-display-name");

const changeState = (elements, value) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = value;
  }
};

if (localStorage.getItem("token")) {
  changeState(signoutState, "inline");
  changeState(state, "none");
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  userDetails.innerHTML = `<span><span>👤</span> ${
    decoded.payload.user.username
  }</span>`;
  navUserDetails.innerHTML = `<span><span>👤</span> ${
    decoded.payload.user.username
  }</span>`;

  function jwtDecode(t) {
    let token = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split(".")[0]));
    token.payload = JSON.parse(window.atob(t.split(".")[1]));
    return token;
  }
}

const validate = (password, confirmPassword) => {
  if (password !== confirmPassword) return false;
  return true;
};
