import Global from '../components/Global';

const get_recommended_dish = (token, dishes) =>
  fetch(Global.link + 'dish/getrecommendeddish', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      dishes: dishes,
    }),
  }).then((response) => response.json());

module.exports = {get_recommended_dish};
