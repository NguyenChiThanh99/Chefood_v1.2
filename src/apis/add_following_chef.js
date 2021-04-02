import Global from '../components/Global';

const add_following_chef = (token, idchef) =>
  fetch(Global.link + 'user/addfollowingchef', {
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

module.exports = {add_following_chef};
