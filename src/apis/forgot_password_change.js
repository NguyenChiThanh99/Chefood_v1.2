import Global from '../components/Global';

const forgot_password_change = (password, token) =>
  fetch(Global.link + 'user/forgotpasschange', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify({
      password: password,
    }),
  }).then((response) => response.json());

module.exports = {forgot_password_change};
