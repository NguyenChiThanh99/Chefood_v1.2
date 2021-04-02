import Global from '../components/Global';

const get_type_dish = (token, text, page) =>
  fetch(Global.link + 'dish/gettypedish', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      text: text,
      page: page,
    }),
  }).then((response) => response.json());

module.exports = {get_type_dish};
