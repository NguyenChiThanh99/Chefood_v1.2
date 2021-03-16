import Global from '../components/Global';

const change_address = (token, address) =>
  fetch(Global.link + 'user/changeaddress', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      address: address,
    }),
  }).then((response) => response.json());

module.exports = {change_address};
