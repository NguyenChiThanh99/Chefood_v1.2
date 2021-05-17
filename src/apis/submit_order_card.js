import Global from '../components/Global';

const submit_order_card = (
  token,
  address,
  idchef,
  payment,
  totalmoney,
  dishes,
  stripeToken,
) =>
  fetch(Global.link + 'order/submitordercard', {
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
      stripeToken: stripeToken,
    }),
  }).then((response) => response.json());

module.exports = {submit_order_card};
