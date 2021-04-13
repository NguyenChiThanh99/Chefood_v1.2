import Global from '../components/Global';

const get_name_viewed_dish = (token, page) =>
  fetch(Global.link + 'dish/getnamevieweddish', {
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

module.exports = {get_name_viewed_dish};
