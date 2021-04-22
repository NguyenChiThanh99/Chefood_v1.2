import Global from '../components/Global';

const other_chef_by_time = (token, page, number_dish, lat, long) =>
  fetch(Global.link + 'dish/getotherchefbytime', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      page: page,
      number_dish: number_dish,
      lat: lat,
      long: long,
    }),
  }).then((response) => response.json());

module.exports = {other_chef_by_time};
