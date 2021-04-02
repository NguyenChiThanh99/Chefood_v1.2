import Global from '../components/Global';

const get_comment_chef = (token, idchef, page) =>
  fetch(Global.link + 'chef/getcommentchef', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      idchef: idchef,
      page: page,
    }),
  }).then((response) => response.json());

module.exports = {get_comment_chef};
