import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Global from '../../../Global';
import BadgeCart from './BadgeCart';

import logo from '../../../../images/Logo2.png';
import searchIcon from '../../../../icons/Search.png';
import backIcon from '../../../../icons/arrow_back_ios-fb5a23.png';

export default function MainHeader(props) {
  const {navigation} = props;
  const [search, setSearch] = useState('');

  const searchHandle = () => {
    if (search !== '') {
      navigation.navigate('SEARCH', {search: search});
      setSearch('');
    }
  };

  return (
    <View style={styles.header}>
      {props.fromUser ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.searchImg} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.jumpTo('Trang chủ')}>
          <Image style={styles.logo} source={logo} />
        </TouchableOpacity>
      )}
      <View style={styles.searchCont}>
        <TextInput
          style={styles.textInputStyle}
          underlineColorAndroid="transparent"
          // placeholder="Tìm kiếm"
          placeholderTextColor="#bdbdbd"
          autoCapitalize="none"
          onChangeText={(text) => setSearch(text)}
          value={search}
          onSubmitEditing={(event) => {
            searchHandle();
          }}
        />
        <TouchableOpacity onPress={() => searchHandle()}>
          <Image style={styles.searchImg} source={searchIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('CART', {address: ''})}>
        <BadgeCart />
      </TouchableOpacity>
    </View>
  );
}

const {width, mainColor, heightHeader, backButton} = Global;
const styles = StyleSheet.create({
  searchImg: {
    width: backButton,
    height: backButton,
  },
  textInputStyle: {
    color: '#6e6e6e',
    fontFamily: 'Roboto-Light',
    width: width / 1.6,
    borderBottomColor: mainColor,
    borderBottomWidth: 1,
    height: width / 16,
    padding: 0,
    marginRight: 5,
  },
  searchCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width / 11,
    height: width / 11,
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: heightHeader,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
