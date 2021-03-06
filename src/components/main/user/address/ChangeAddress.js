/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-root-toast';

import Global from '../../../Global';
import {updateAddressStatus, updateUser} from '../../../../../actions';

import arrowBack from '../../../../icons/arrow_back_ios-fb5a23.png';
import arrowRight from '../../../../icons/arrow_right-82.png';

export default function ChangeAddress({navigation}) {
  const dispatch = useDispatch();
  const addressStatus = useSelector((state) => state.addressStatus);
  const [addressDetail, setAddressDetail] = useState(addressStatus.detail);
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
    if (
      addressStatus.province === null ||
      addressStatus.district === null ||
      addressStatus.ward === null ||
      addressStatus.detail === ''
    ) {
      Toast.show('Vui lòng nhập tất cả các thông tin', {
        position: 0,
        duration: 2000,
      });
    } else if (
      addressStatus.province.id !== addressStatus.ward._province_id ||
      addressStatus.district.id !== addressStatus.ward._district_id
    ) {
      Toast.show('Vui lòng kiểm tra lại các thông tin', {
        position: 0,
        duration: 2000,
      });
    } else {
      dispatch(
        updateUser({...user, address: Global.addressFormat(addressStatus)}),
      );
      navigation.goBack();
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} source={arrowBack} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Địa chỉ</Text>
        </View>
        <TouchableOpacity onPress={() => saveAddress()}>
          <Text style={styles.saveBtn}>Lưu</Text>
        </TouchableOpacity>
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

const {
  width,
  backgroundColor,
  heightHeader,
  backButton,
  fontFamily,
  mainColor,
} = Global;
const styles = StyleSheet.create({
  textInputStyle: {
    fontFamily,
    color: '#333333',
    fontSize: width / 30,
    padding: 0,
    marginTop: 2,
  },
  title: {
    fontFamily,
    color: '#333333',
    fontSize: width / 28,
    fontWeight: 'bold',
    margin: 10,
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0.25,
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
    fontFamily,
    color: '#333333',
    fontSize: width / 30,
  },
  rowTextDes: {
    fontFamily,
    color: '#333333',
    fontSize: width / 42,
  },
  rowContentDefault: {
    fontFamily,
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
    fontFamily,
    color: '#333333',
    fontSize: width / 24,
    marginLeft: 10,
  },
  saveBtn: {
    fontFamily,
    color: mainColor,
    fontSize: width / 26,
  },
});
