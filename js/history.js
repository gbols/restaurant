const tableHeader = document.querySelector(".table-header");
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
        mixed = mixed.orders.sort((a, b) => b.orderid - a.orderid);
        mixed.forEach((order, index) => {
          template += `
        <li class="table-row">
        <div class="col history col-1">${index + 1}</div>
          <div class="col history col-1">${order.orderid}</div>
              <div class="history col col-1">
              ${dateParser(Number(order.orderat))}
                </div>
              <div class="num history col col-2">${calTotal(order.info)}</div>
              <div class="${order.status} status col col-2">${
            order.status
          }</div>
            </li>
        `;
        });
      }
      tableHeader.insertAdjacentHTML("afterend", template);
      orderSpinner.style.display = "none";
    })
    .catch(err => {
      throw err;
    });
};

window.addEventListener("load", getUserHistory, false);
