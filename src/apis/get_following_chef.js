import Global from '../components/Global';

const get_following_chef = (token) =>
  fetch(Global.link + 'user/getfollowingchef', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  }).then((response) => response.json());

module.exports = {get_following_chef};
