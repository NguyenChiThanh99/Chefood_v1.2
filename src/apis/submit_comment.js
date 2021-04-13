import Global from '../components/Global';

const submit_comment = (
  token,
  iddishofchef,
  id_order,
  comment,
  star,
  image,
  status,
) =>
  fetch(Global.link + 'user/submitcommentdish', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({
      iddishofchef: iddishofchef,
      id_order: id_order,
      comment: comment,
      star: star,
      image: image,
      status: status,
    }),
  }).then((response) => response.json());

module.exports = {submit_comment};
