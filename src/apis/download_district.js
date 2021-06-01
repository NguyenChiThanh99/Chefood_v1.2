import Global from '../components/Global';

const download_district = (token, idProvince) =>
  fetch(Global.link + 'address/download_district', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      idProvince: idProvince,
    }),
  }).then((response) => response.json());

module.exports = {download_district};
