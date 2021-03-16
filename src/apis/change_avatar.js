import Global from '../components/Global';

const change_avatar = (token, avatar) =>
  fetch(Global.link + 'user/changeavatar', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((response) => response.json());

module.exports = {change_avatar};
