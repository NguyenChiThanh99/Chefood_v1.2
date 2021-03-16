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
      <TouchableOpacity onPress={() => navigation.jumpTo('Trang chủ')}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>
      <View style={styles.searchCont}>
        <TextInput
          style={styles.textInputStyle}
          underlineColorAndroid="transparent"
          placeholder="Tìm kiếm"
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
      <TouchableOpacity onPress={() => navigation.navigate('CART')}>
        <BadgeCart />
      </TouchableOpacity>
    </View>
  );
}

const {width, fontFamily, mainColor, heightHeader} = Global;
const styles = StyleSheet.create({
  searchImg: {
    width: width / 16,
    height: width / 16,
  },
  textInputStyle: {
    color: '#6e6e6e',
    fontFamily,
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
  },
});
