const calTotal = arr => {
  return arr.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);
};
const combine = (menus, orders) => {
  let arr = [];
  orders.forEach(order => {
    let item = menus.find(menu => menu.menuid == order.menuid);
    arr.push({ ...item, quantity: order.quantity });
  });
  return arr;
};

const mix = (orders, menus) => {
  orders.forEach(order => {
    order.info.forEach((info, index) => {
      let item = menus.find(menu => menu.menuid == info.menuid);
      if (item) info = { ...info, ...item };
      order.info.splice(index, 1, info);
    });
  });
};

const dateParser = theDate => {
  let year, month, day;
  theDate = new Date(theDate);
  year = theDate.getFullYear();
  month = theDate.getMonth() + 1;
  day = theDate.getDate();
  return `${day}-${month}-${year}`;
};


