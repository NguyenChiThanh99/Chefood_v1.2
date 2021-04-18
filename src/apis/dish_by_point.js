import Global from '../components/Global';

const dish_by_point = (token, page, text) =>
  fetch(Global.link + 'search/dishesbypoint', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      page: page,
      text: text,
    }),
  }).then((response) => response.json());

module.exports = {dish_by_point};
