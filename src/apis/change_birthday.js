import Global from '../components/Global';

const change_birthday = (token, birthday) =>
  fetch(Global.link + 'user/changedateofbirth', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      dateofbirth: birthday,
    }),
  }).then((response) => response.json());

module.exports = {change_birthday};
