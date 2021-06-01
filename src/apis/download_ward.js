import Global from '../components/Global';

const download_ward = (token, idDistrict) =>
  fetch(Global.link + 'address/download_ward', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      idDistrict: idDistrict,
    }),
  }).then((response) => response.json());

module.exports = {download_ward};
