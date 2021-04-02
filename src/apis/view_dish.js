import Global from '../components/Global';

const view_dish = (token, iddishofchef) =>
  fetch(Global.link + 'user/submitviewdish', {
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

module.exports = {view_dish};
