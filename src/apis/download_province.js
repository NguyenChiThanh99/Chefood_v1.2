import Global from '../components/Global';

const download_province = (token) =>
  fetch(Global.link + 'address/download_province', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  }).then((response) => response.json());

module.exports = {download_province};
