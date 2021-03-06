import Global from '../components/Global';

const download_district = (idProvince) =>
  fetch(Global.addressLink + 'download_district', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idProvince: idProvince,
    }),
  }).then((response) => response.json());

module.exports = {download_district};
