const historyElm = document.getElementById("history");
const orderSpinner = document.querySelector("#order-spinner > img");
let template = "";
let mixed;
const header = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
});
const getUserHistory = () => {
  const request = new Request(
    `https://mygbols.herokuapp.com/api/v1/users/${
      decoded.payload.user.userid
    }/orders`,
    {
      method: "GET",
      headers: header
    }
  );
  orderSpinner.style.display = "block";
  fetch(request)
    .then(res => res)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        mixed = data;
        mix(mixed.orders, menus);
        mixed = mixed.orders.reverse();
        mixed.forEach(order => {
          template += `
        <hr id="ruler">
        <span class="nav">
          <h4>Date <time class="num">${dateParser(
            Number(order.orderat)
          )}</time></h4>
          <h4>Status <time class="num">${order.status}</time></h4>
          <h4>Total Sum<span class="num"> ${calTotal(order.info)}</span></h4>
        </span>
        <div class="all-foods">
        `;
          order.info.forEach(item => {
            template += `
          <div class="food">
            <img src="${item.imageurl}">
            <div class="cover cover-content">
              <div class="name-price">
                <h4>${item.menutitle}</h4>
                <h4>#${item.price}</h4>
              </div>
              <p>${item.description}</p>
              <span class="name-price">
                <h4>Unit Total<time class="num">${item.quantity *
                  item.price}</time></h4>
                <h4>Quantity <span class="num"> ${item.quantity}</span></h4>
              </span>
            </div>
          </div>
          `;
          });
          template += `</div>`;
        });
      }
      historyElm.insertAdjacentHTML("afterend", template);
      orderSpinner.style.display = "none";
    })
    .catch(err => {
      throw err;
    });
};

window.addEventListener("load", getUserHistory, false);
