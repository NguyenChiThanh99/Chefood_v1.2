import Global from '../components/Global';

const verify_email_forgot_pass = (email) =>
  fetch(Global.link + 'user/emailauthenticationpass', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  });

module.exports = {verify_email_forgot_pass};
