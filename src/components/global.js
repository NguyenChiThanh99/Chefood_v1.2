import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

module.exports = {
  backgroundColor: '#FB5A23',
  width: width,
  height: height,
  heightHeader: height / 14,
  fontFamily: 'Roboto',
  currencyFormat: (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  },
  validateEmail: (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  },
  //link: 'http://192.168.43.39:8080/hotelbooking/',
};
