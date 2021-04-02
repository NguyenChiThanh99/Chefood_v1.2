import Global from '../components/Global';

const remove_following_chef = (token, idchef) =>
  fetch(Global.link + 'user/removefollowingchef', {
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

module.exports = {remove_following_chef};
