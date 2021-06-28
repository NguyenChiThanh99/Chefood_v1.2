import Global from '../components/Global';

const check_comment = (comment) =>
  fetch(Global.commentLink + 'predict', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comment: comment,
    }),
  }).then((response) => response.json());

module.exports = {check_comment};
