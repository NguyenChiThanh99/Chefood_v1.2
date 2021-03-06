import Global from '../components/Global';

const download_ward = (idDistrict) =>
  fetch(Global.addressLink + 'download_ward', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idDistrict: idDistrict,
    }),
  }).then((response) => response.json());

module.exports = {download_ward};
