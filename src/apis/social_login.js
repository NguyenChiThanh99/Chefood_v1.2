import Global from '../components/Global';

const social_login = (email, name, avatar) =>
  fetch(Global.link + 'user/sociallogin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      name: name,
      avatar: avatar,
    }),
  });

module.exports = {social_login};
