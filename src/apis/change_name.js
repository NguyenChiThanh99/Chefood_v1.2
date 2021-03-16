import Global from '../components/Global';

const change_name = (token, name) =>
  fetch(Global.link + 'user/changename', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      name: name,
    }),
  }).then((response) => response.json());

module.exports = {change_name};
