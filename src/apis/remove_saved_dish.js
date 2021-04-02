import Global from '../components/Global';

const remove_saved_dish = (token, iddishofchef) =>
  fetch(Global.link + 'user/removesaveddish', {
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

module.exports = {remove_saved_dish};
