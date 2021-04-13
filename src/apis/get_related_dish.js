import Global from '../components/Global';

const get_related_dish = (dish) =>
  fetch(Global.relatedDishLink + 'getrelateddish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      dish: dish,
    }),
  }).then((response) => response.json());

module.exports = {get_related_dish};
