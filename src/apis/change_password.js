import Global from '../components/Global';

const change_password = (token, password, newpassword) =>
  fetch(Global.link + 'user/changepassword', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      password: password,
      newpassword: newpassword,
    }),
  }).then((response) => response.json());

module.exports = {change_password};
