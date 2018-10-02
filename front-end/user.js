const loginForm = document.forms["login"];
const signUpForm = document.forms["sign-up"];
const loginSpinner = document.querySelector("#login-spinner > img");
const signupSpinner = document.querySelector("#signup-spinner > img");
const sign_out = document.getElementById("sign-out");
const loginMessage = document.querySelector("#login-spinner");
const signupMessage = document.querySelector("#signup-spinner");
const userDetails = document.getElementById("display-name");

const header = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json"
});

const login = event => {
  event.preventDefault();
  const details = {
    username: loginForm.username.value,
    password: loginForm.password.value
  };
  console.log(details);
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
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (!data.token) {
        console.log(data);
        loginSpinner.style.display = "none";
        loginMessage.innerHTML = `<h4>${data.message}</h4>`;
      } else {
        console.log(data);
        changeState(signoutState, "inline");
        changeState(state, "none");
        loginSpinner.style.display = "none";
        loginMessage.innerHTML = `<h4>${data.message}</h4>`;
        userDetails.innerHTML = `<span>Hi ${data.details.username}</span>`;
        if (!localStorage.token) {
          localStorage.setItem("token", data.token);
        }
        location.assign("./");
      }
    })
    .catch(err => {
      loginSpinner.style.display = "none";
      throw err;
    });
    loginForm.reset();
};

loginForm.addEventListener("submit", login, false);


