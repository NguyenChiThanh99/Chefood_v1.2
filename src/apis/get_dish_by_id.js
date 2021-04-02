import Global from '../components/Global';

const get_dish_by_id = (token, iddishofchef) =>
  fetch(Global.link + 'dish/getdishofchefbyid', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      iddishofchef: iddishofchef,
    }),
  }).then((response) => response.json());

module.exports = {get_dish_by_id};
