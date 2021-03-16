import Global from '../components/Global';

const change_gender = (token, gender) =>
  fetch(Global.link + 'user/changesex', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      sex: gender,
    }),
  }).then((response) => response.json());

module.exports = {change_gender};
