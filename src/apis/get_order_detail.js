import Global from '../components/Global';

const get_order_detail = (token, id_order) =>
  fetch(Global.link + 'order/getorderdetail', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      id_order: id_order,
    }),
  }).then((response) => response.json());

module.exports = {get_order_detail};
