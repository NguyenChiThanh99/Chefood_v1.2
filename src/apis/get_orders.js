import Global from '../components/Global';

const get_orders = (token, page) =>
  fetch(Global.link + 'order/getorders', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      page: page,
    }),
  }).then((response) => response.json());

module.exports = {get_orders};
