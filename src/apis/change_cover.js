import Global from '../components/Global';

const change_cover = (token, cover) =>
  fetch(Global.link + 'user/changecoverphoto', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      coverphoto: cover,
    }),
  }).then((response) => response.json());

module.exports = {change_cover};
