import Global from '../components/Global';

const get_hot_dish_chef = (token, idchef) =>
  fetch(Global.link + 'chef/get4hotdishesofchef', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      idchef: idchef,
    }),
  }).then((response) => response.json());

module.exports = {get_hot_dish_chef};
