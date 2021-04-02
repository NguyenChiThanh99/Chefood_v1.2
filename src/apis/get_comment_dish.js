import Global from '../components/Global';

const get_comment_dish = (token, iddishofchef) =>
  fetch(Global.link + 'dish/getcommentdish', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      iddishofchef: iddishofchef,
    }),
  }).then((response) => response.json());

module.exports = {get_comment_dish};
