import Global from '../components/Global';

const sign_up = (name, email, password, phone) =>
  fetch(Global.link + 'user/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      phone: phone,
    }),
  }).then((response) => response.json());

module.exports = {sign_up};
