import Global from '../components/Global';

const hot_dish = (token, page) =>
  fetch(Global.link + 'dish/gethotdish', {
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

module.exports = {hot_dish};
