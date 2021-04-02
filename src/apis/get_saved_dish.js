import Global from '../components/Global';

const get_saved_dish = (token) =>
  fetch(Global.link + 'user/getsaveddish', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  }).then((response) => response.json());

module.exports = {get_saved_dish};
