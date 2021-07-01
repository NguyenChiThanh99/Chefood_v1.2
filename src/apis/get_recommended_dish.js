import Global from '../components/Global';

const get_recommended_dish = (token, idUser, page) =>
  fetch(Global.link + 'dish/getrecombyiduser', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      idUser: idUser,
      page: page,
    }),
  }).then((response) => response.json());

module.exports = {get_recommended_dish};
