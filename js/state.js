const state = document.querySelectorAll(".state");
const signoutState = document.querySelectorAll(".signout-state");

const changeState = (elements, value) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = value;
  }
};

if (localStorage.getItem("token")) {
  changeState(signoutState, "inline");
  changeState(state, "none");
}

const validate = (password, confirmPassword) => {
if (password !== confirmPassword) return false;
return true;
}