const state = document.querySelectorAll(".state");
const signoutState = document.querySelectorAll(".signout-state");

if (localStorage.getItem("token")) {
  changeState(signoutState, "inline");
  changeState(state, "none");
}
