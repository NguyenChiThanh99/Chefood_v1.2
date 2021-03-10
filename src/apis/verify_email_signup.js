import Global from '../components/Global';

const verify_email_signup = (email) =>
  fetch(Global.link + 'user/emailauthentication', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then((response) => response.json());

module.exports = {verify_email_signup};
