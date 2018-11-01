const orderDetails = document.getElementById("order-details");
const myOrder = JSON.parse(localStorage.getItem("anOrder"));

let template = "";
const together = combine(menus, myOrder.order.info);

template += `
        <hr id="ruler">
        <span class="nav">
          <h4>Date <time class="num">${dateParser(
            Number(myOrder.order.orderat)
          )}</time></h4>
          <h4>Status <time class="status ${myOrder.order.status}">${
  myOrder.order.status
}</time></h4>
          <h4>Total Sum<span class="num"> ${calTotal(together)}</span></h4>
        </span>
        <div class="all-foods">
        `;
together.forEach(item => {
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

orderDetails.insertAdjacentHTML("afterend", template);
