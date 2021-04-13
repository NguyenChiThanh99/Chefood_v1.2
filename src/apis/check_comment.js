import Global from '../components/Global';

const check_comment = (comment) =>
  fetch(Global.commentLink + 'predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      comment: comment,
    }),
  }).then((response) => response.json());

module.exports = {check_comment};
