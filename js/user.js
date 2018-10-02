const loginForm = document.forms["login"];
const signUpForm = document.forms["sign-up"];
const loginSpinner = document.querySelector("#login-spinner > img");
const signupSpinner = document.querySelector("#signup-spinner > img");
const sign_out = document.getElementById("sign-out");
const loginMessage = document.querySelector("#login-spinner-message");
const signupMessage = document.querySelector("#signup-spinner-message");

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

loginForm.addEventListener("submit", login);
signUpForm.addEventListener("submit", signUp, false);
