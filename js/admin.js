const adminLoginForm = document.forms["adminLogin"];
const loginSpinner = document.querySelector("#admin-login-spinner > img");
const loginMessage = document.querySelector("#admin-login-message");
const currentPage = location.href;
const header = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json"
});

const adminLogin = event => {
  event.preventDefault();
  const details = {
    username: adminLoginForm.username.value,
    password: adminLoginForm.password.value
  };
  const request = new Request(
    "https://mygbols.herokuapp.com/api/v1/auth/adminlogin",
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
        if (!localStorage.adminToken) {
          localStorage.setItem("adminToken", data.token);
        }
        location.assign(currentPage);
        adminLoginForm.reset();
      }
    })
    .catch(err => {
      loginSpinner.style.display = "none";
      throw err;
    });
};

adminLoginForm.addEventListener("submit", adminLogin, false);
