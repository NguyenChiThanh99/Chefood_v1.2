import Global from '../components/Global';

const get_chef_by_id = (token, idchef) =>
  fetch(Global.link + 'chef/getchefbyid', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      idchef: idchef,
    }),
  }).then((response) => response.json());

module.exports = {get_chef_by_id};
