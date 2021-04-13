/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

import Global from '../../../Global';
import {updateAddressStatus, updateUser} from '../../../../../actions';
import change_address from '../../../../apis/change_address';

import arrowBack from '../../../../icons/arrow_back_ios-fb5a23.png';
import arrowRight from '../../../../icons/arrow_right-82.png';

export default function ChangeAddress({navigation, route}) {
  useEffect(() => {
    // cleanup function
    return () => {
      dispatch(
        updateAddressStatus({
          province: null,
          district: null,
          ward: null,
          detail: '',
        }),
      );
    };
  }, []);
  const dispatch = useDispatch();
  const addressStatus = useSelector((state) => state.addressStatus);
  const [addressDetail, setAddressDetail] = useState(addressStatus.detail);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const setAddressDetailHandle = (text) => {
    setAddressDetail(text);
    dispatch(
      updateAddressStatus({
        ...addressStatus,
        detail: text,
      }),
    );
  };

  const navigationHandle = (type) => {
    if (type === 'district') {
      if (addressStatus.province !== null) {
        navigation.navigate('DISTRICT');
      } else {
        Toast.show('Vui lòng chọn Tỉnh/Thành phố', {
          position: 0,
          duration: 2000,
        });
      }
    } else {
      if (addressStatus.district !== null && addressStatus.province !== null) {
        navigation.navigate('WARD');
      } else {
        Toast.show('Vui lòng chọn Tỉnh/Thành phố và Quận/Huyện', {
          position: 0,
          duration: 2000,
        });
      }
    }
  };

  const saveAddress = () => {
    setLoading(true);
    Keyboard.dismiss();
    if (
      addressStatus.province === null ||
      addressStatus.district === null ||
      addressStatus.ward === null ||
      addressStatus.detail === ''
    ) {
      setLoading(false);
      Toast.show('Vui lòng nhập tất cả các thông tin', {
        position: 0,
        duration: 2000,
      });
    } else if (
      addressStatus.province.id !== addressStatus.ward._province_id ||
      addressStatus.district.id !== addressStatus.ward._district_id
    ) {
      setLoading(false);
      Toast.show('Vui lòng kiểm tra lại các thông tin', {
        position: 0,
        duration: 2000,
      });
    } else {
      var address = Global.addressFormat(addressStatus);
      if (route.params.fromCart) {
        navigation.navigate('CART', {address});
      } else {
        change_address
          .change_address(user.token, address)
          .then((responseJson) => {
            dispatch(
              updateUser({
                ...user,
                userInfo: {...user.userInfo, address: address},
              }),
            );
            storeData({
              ...user,
              userInfo: {...user.userInfo, address: address},
            });
            navigation.goBack();
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
              position: 0,
              duration: 2500,
            });
          });
      }
    }
  };

  const storeData = async (data_storage) => {
    try {
      const jsonValue = JSON.stringify(data_storage);
      await AsyncStorage.setItem('@user', jsonValue);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  const Loading = (
    <View style={styles.loading}>
      <ActivityIndicator animating={loading} color="#fb5a23" size="small" />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} source={arrowBack} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Địa chỉ</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {Loading}
          <TouchableOpacity onPress={() => saveAddress()}>
            <Text style={styles.saveBtn}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardView}>
        <Text style={styles.title}>Địa chỉ nhận hàng</Text>
        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Tỉnh/Thành phố</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('PROVINCE')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={
                addressStatus.province === null
                  ? styles.rowContentDefault
                  : styles.rowText
              }>
              {addressStatus.province === null
                ? 'Vui lòng chọn'
                : addressStatus.province._name}
            </Text>
            <Image style={styles.arrow} source={arrowRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Quận/Huyện</Text>
          <TouchableOpacity
            onPress={() => navigationHandle('district')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={
                addressStatus.district === null
                  ? styles.rowContentDefault
                  : styles.rowText
              }>
              {addressStatus.district === null
                ? 'Vui lòng chọn'
                : addressStatus.district._name}
            </Text>
            <Image style={styles.arrow} source={arrowRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Phường/Xã/Thị trấn</Text>
          <TouchableOpacity
            onPress={() => navigationHandle('ward')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={
                addressStatus.ward === null
                  ? styles.rowContentDefault
                  : styles.rowText
              }>
              {addressStatus.ward === null
                ? 'Vui lòng chọn'
                : addressStatus.ward._name}
            </Text>
            <Image style={styles.arrow} source={arrowRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        <View style={{margin: 10}}>
          <Text style={styles.rowText}>Địa chỉ cụ thể</Text>
          <Text style={styles.rowTextDes}>
            Số nhà, tên tòa nhà, tên đường, tên khu vực
          </Text>
          <TextInput
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            placeholder="Vui lòng nhập địa chỉ"
            placeholderTextColor="#bdbdbd"
            autoCapitalize="none"
            onChangeText={(text) => setAddressDetailHandle(text)}
            value={addressDetail}
          />
        </View>
      </View>
    </View>
  );
}

const {width, backgroundColor, heightHeader, backButton, mainColor} = Global;
const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  textInputStyle: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 30,
    padding: 0,
    marginTop: 2,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    color: '#333333',
    fontSize: width / 28,
    margin: 10,
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0,
    borderTopWidth: 0.5,
    marginHorizontal: 10,
  },
  arrow: {
    width: width / 26,
    height: width / 26,
    marginLeft: 10,
    marginTop: 2,
  },
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  rowText: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 30,
  },
  rowTextDes: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 42,
  },
  rowContentDefault: {
    fontFamily: 'Roboto-Regular',
    color: '#bdbdbd',
    fontSize: width / 30,
  },
  cardView: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  wrapper: {
    backgroundColor,
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    height: heightHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  backIcon: {
    width: backButton,
    height: backButton,
  },
  headerText: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 24,
    marginLeft: 10,
  },
  saveBtn: {
    fontFamily: 'Roboto-Regular',
    color: mainColor,
    fontSize: width / 26,
  },
});
