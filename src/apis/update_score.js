import Global from '../components/Global';

const update_score = (token, num_dishofchef, status) =>
  fetch(Global.link + 'user/updatescore', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      num_dishofchef: num_dishofchef,
      status: status,
    }),
  }).then((response) => response.json());

module.exports = {update_score};
