import Global from '../components/Global';

const submit_order = (token, address, idchef, payment, totalmoney, dishes) =>
  fetch(Global.link + 'order/submitorder', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      address: address,
      idchef: idchef,
      payment: payment,
      totalmoney: totalmoney,
      dishes: dishes,
    }),
  }).then((response) => response.json());

module.exports = {submit_order};
