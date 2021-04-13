import Global from '../components/Global';

const get_follower_order_chef = (token, idchef) =>
  fetch(Global.link + 'chef/getfollowersandorders', {
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

module.exports = {get_follower_order_chef};
