import Global from '../components/Global';

const get_all_saved_dish = (token, page) =>
  fetch(Global.link + 'dish/getsaveddish', {
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

module.exports = {get_all_saved_dish};
