import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

module.exports = {
  mainColor: '#FB5A23',
  backgroundColor: '#F2F2F2',
  width: width,
  height: height,
  heightHeader: height / 14,
  fontFamily: 'Roboto',
  backButton: width / 16,
  shortTimeFormat: (time) => {
    var date = new Date(time);
    return (
      ('0' + date.getDate()).slice(-2) +
      '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      date.getFullYear()
    );
  },
  currencyFormat: (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  },
  addressFormat: (address) => {
    return (
      address.detail +
      ', ' +
      address.ward._prefix +
      ' ' +
      address.ward._name +
      ', ' +
      address.district._prefix +
      ' ' +
      address.district._name +
      ', ' +
      address.province._name
    );
  },
  validateEmail: (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  },
  addressLink: 'https://my-chefood-app.herokuapp.com/',
  link: 'https://chefood-mongo.herokuapp.com/',
};
