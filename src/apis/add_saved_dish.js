import Global from '../components/Global';

const add_saved_dish = (token, iddishofchef) =>
  fetch(Global.link + 'user/addsaveddish', {
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

module.exports = {add_saved_dish};
