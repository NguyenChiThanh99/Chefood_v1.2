import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

module.exports = {
  mainColor: '#FB5A23',
  backgroundColor: '#F2F2F2',
  width: width,
  height: height,
  heightHeader: height / 14,
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
  longTimeFormat: (time) => {
    var date = new Date(time);
    return (
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2) +
      ' ' +
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
  commentLink: 'https://nguyenchithanh.pythonanywhere.com/',
  link: 'https://chefood-backend.herokuapp.com/',

  chatLink: 'https://chefood-chat.herokuapp.com/',
};
