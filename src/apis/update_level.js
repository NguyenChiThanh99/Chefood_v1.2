import Global from '../components/Global';

const update_level = (token, num_chef, level_chef, star) =>
  fetch(Global.link + 'user/updatelevel', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      num_chef: num_chef,
      level_chef: level_chef,
      star: star,
    }),
  }).then((response) => response.json());

module.exports = {update_level};
