const adminLoginForm = document.forms["adminLogin"];
const addMenu = document.forms["meal"];
const loginSpinner = document.querySelector("#admin-login-spinner > img");
const loginMessage = document.querySelector("#admin-login-message");
const signOutBtn = document.getElementById("sign-out");
const mealSpinner = document.querySelector("#meal-spinner > img");
const mealMessage = document.querySelector("#meal-spinner-message");
const imageLink = document.querySelector("#imageLink");
const unariPass = "vsdtppyp";
const cloudDinaryUrl = "https://api.cloudinary.com/v1_1/daj3mflah/image/upload";
const currentPage = location.href;
let link;

const mealHeader = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

const signOut = event => {
  event.preventDefault();
  if (localStorage.token) {
    localStorage.removeItem("token");
  }
  adminPage.style.display = "none";
  changeState(state, "inline");
  changeState(signoutState, "none");
};
const addAMenu = event => {
  event.preventDefault();
  const meal = {
    menutitle: addMenu.meal.value,
    imageurl: link,
    description: addMenu.description.value,
    price: addMenu.price.value
  };
  const request = new Request("https://mygbols.herokuapp.com/api/v1/menu", {
    method: "POST",
    mode: "cors",
    headers: mealHeader,
    body: JSON.stringify(meal)
  });
  mealSpinner.style.display = "block";
  fetch(request)
    .then(res => res)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (!data.success) {
        mealSpinner.style.display = "none";
        mealMessage.innerHTML = `<h4 class="spinner">${data.message}</h4>`;
      } else {
        mealSpinner.style.display = "none";
        mealMessage.innerHTML = `<h4 class="spinner">${data.message}</h4>`;
        location.assign(currentPage);
        addMenu.reset();
      }
    })
    .catch(err => {
      mealSpinner.style.display = "none";
      throw err;
    });
};

const upload = event => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unariPass);
  axios({
    url: cloudDinaryUrl,
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    },
    data: formData
  }).then(res => {
    link = res.data.secure_url;
    document.querySelector("#image").src = link;
  });
};

imageLink.addEventListener("change", upload, false);
addMenu.addEventListener("submit", addAMenu, false);
signOutBtn.addEventListener("click", signOut, false);
