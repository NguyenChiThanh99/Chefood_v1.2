import Global from '../components/Global';

const download_province = (page) =>
  fetch(Global.addressLink + 'download_province/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());

module.exports = {download_province};
