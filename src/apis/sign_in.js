import Global from '../components/Global';

const sign_in = (email, password) =>
  fetch(Global.link + 'user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

module.exports = {sign_in};
