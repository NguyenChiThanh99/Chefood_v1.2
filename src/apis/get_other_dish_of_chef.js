import Global from '../components/Global';

const get_other_dish_of_chef = (token, numberchef, page) =>
  fetch(Global.link + 'dish/getotherdishofchef', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      numberchef: numberchef,
      page: page,
    }),
  }).then((response) => response.json());

module.exports = {get_other_dish_of_chef};
