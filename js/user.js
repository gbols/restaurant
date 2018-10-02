const signUpForm = document.forms["sign-up"];
const signupSpinner = document.querySelector("#signup-spinner > img");
const sign_out = document.getElementById("sign-out");
const signupMessage = document.querySelector("#signup-spinner");
const userDetails = document.getElementById("display-name");

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
          userDetails.innerHTML = `<span>Hi ${data.details.username}</span>`;
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

signUpForm.addEventListener("submit", signUp, false);
