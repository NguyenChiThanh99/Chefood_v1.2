import Global from '../components/Global';

const get_hot_chef = (token, page) =>
  fetch(Global.link + 'chef/gethotchef', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      page: page,
    }),
  }).then((response) => response.json());

module.exports = {get_hot_chef};
