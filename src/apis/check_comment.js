import Global from '../components/Global';
import RNFetchBlob from 'react-native-fetch-blob';

// const check_comment = (comment) =>
//   fetch(Global.commentLink + 'predict', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       comment: comment,
//     }),
//   }).then((response) => response.json());

const check_comment = (comment) =>
  RNFetchBlob.config({
    trusty: true,
    timeout: 5000,
  })
    .fetch(
      'POST',
      Global.commentLink + 'predict',
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        comment: comment,
      }),
    )
    .then((response) => response.json());
module.exports = {check_comment};
