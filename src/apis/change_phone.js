import Global from '../components/Global';

const change_phone = (token, phone) =>
  fetch(Global.link + 'user/changephone', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      phone: phone,
    }),
  }).then((response) => response.json());

module.exports = {change_phone};
