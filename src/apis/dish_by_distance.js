import Global from '../components/Global';

const dish_by_distance = (token, page, text, lat, long) =>
  fetch(Global.link + 'search/dishesbydistance', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      page: page,
      text: text,
      lat: lat,
      long: long,
    }),
  }).then((response) => response.json());

module.exports = {dish_by_distance};
