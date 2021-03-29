/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import CalendarPicker from 'react-native-calendar-picker';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

import Global from '../../../Global';
import change_name from '../../../../apis/change_name';
import change_gender from '../../../../apis/change_gender';
import change_birthday from '../../../../apis/change_birthday';
import change_phone from '../../../../apis/change_phone';
import {updateUser} from '../../../../../actions';

import arrowBack from '../../../../icons/arrow_back_ios-fb5a23.png';
import userIcon from '../../../../icons/person-fb5a23.png';
import phoneIcon from '../../../../icons/phone-fb5a23.png';
import expandMoreArrow from '../../../../icons/expand_less-fb5a23.png';
import expandLessArrow from '../../../../icons/expand_more-fb5a23.png';

export default function ChangeInfoDetail({route, navigation}) {
  const {type, data} = route.params;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [value, setValue] = useState(data);
  const [arrowIcon, setArrowIcon] = useState(expandMoreArrow);
  const [calendarStatus, setCalendarStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const optionMethod = ['Nam', 'Nữ'];
  const today = new Date();

  const checkType = () => {
    switch (type) {
      case 'name':
        return 'họ và tên';

      case 'phone':
        return 'số điện thoại';

      case 'gender':
        return 'giới tính';

      default:
        return 'ngày sinh';
    }
  };

  const onDateChange = (date) => {
    setCalendarStatus(true);
    setValue(Global.shortTimeFormat(date));
  };

  const changeInfo = () => {
    setLoading(true);
    Keyboard.dismiss();
    if (type === 'birthday' && !calendarStatus) {
      setLoading(false);
      return Toast.show('Bạn chưa chọn ngày sinh', {
        position: 0,
        duration: 2500,
      });
    }

    if (value === data) {
      setLoading(false);
      return Toast.show('Dữ liệu không có sự thay đổi, vui lòng kiểm tra lại', {
        position: 0,
        duration: 2500,
      });
    } else {
      if (type === 'name') {
        if (value.length === 0) {
          setLoading(false);
          return Toast.show('Vui lòng nhập Họ và tên', {
            position: 0,
            duration: 2500,
          });
        } else {
          change_name
            .change_name(user.token, value)
            .then((responseJson) => {
              dispatch(
                updateUser({
                  ...user,
                  userInfo: {...user.userInfo, name: value},
                }),
              );
              storeData({
                ...user,
                userInfo: {...user.userInfo, name: value},
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
      } else if (type === 'phone') {
        if (value.length === 0) {
          setLoading(false);
          return Toast.show('Vui lòng nhập Số điện thoại', {
            position: 0,
            duration: 2500,
          });
        } else if (value.length !== 10) {
          setLoading(false);
          return Toast.show('Số điện thoại cần có 10 chữ số', {
            position: 0,
            duration: 2500,
          });
        } else {
          change_phone
            .change_phone(user.token, value)
            .then((responseJson) => {
              dispatch(
                updateUser({
                  ...user,
                  userInfo: {...user.userInfo, phone: value},
                }),
              );
              storeData({
                ...user,
                userInfo: {...user.userInfo, phone: value},
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
      } else if (type === 'gender') {
        if (value === 'Thiết lập ngay') {
          setLoading(false);
          return Toast.show('Vui lòng chọn Giới tính', {
            position: 0,
            duration: 2500,
          });
        } else {
          change_gender
            .change_gender(user.token, value)
            .then((responseJson) => {
              dispatch(
                updateUser({
                  ...user,
                  userInfo: {...user.userInfo, sex: value},
                }),
              );
              storeData({
                ...user,
                userInfo: {...user.userInfo, sex: value},
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
      } else {
        change_birthday
          .change_birthday(user.token, value)
          .then((responseJson) => {
            dispatch(
              updateUser({
                ...user,
                userInfo: {...user.userInfo, date_of_birth: value},
              }),
            );
            storeData({
              ...user,
              userInfo: {...user.userInfo, date_of_birth: value},
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

  const editName = (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInputStyle}
        underlineColorAndroid="transparent"
        placeholder="Họ và tên"
        placeholderTextColor="#bdbdbd"
        autoCapitalize="none"
        onChangeText={(text) => setValue(text)}
        value={value}
        autoCompleteType="name"
      />
      <Image style={styles.inputImg} source={userIcon} />
    </View>
  );
  const editPhone = (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInputStyle}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        onChangeText={(text) => setValue(text)}
        value={value}
        autoCompleteType="tel"
        keyboardType="phone-pad"
        maxLength={10}
        placeholder="Số điện thoại"
        placeholderTextColor="#bdbdbd"
      />
      <Image style={styles.inputImg} source={phoneIcon} />
    </View>
  );
  const editGender = (
    <View style={styles.cardView}>
      <ModalDropdown
        dropdownStyle={styles.dropdownList}
        options={optionMethod}
        defaultValue={value}
        onDropdownWillShow={() => setArrowIcon(expandLessArrow)}
        onDropdownWillHide={() => setArrowIcon(expandMoreArrow)}
        onSelect={(index) => setValue(optionMethod[index])}
        showsVerticalScrollIndicator={false}>
        <View style={styles.dropdownBtn}>
          <Text style={styles.dropdownText}>{value}</Text>
          <Image style={styles.arrowIcon} source={arrowIcon} />
        </View>
      </ModalDropdown>
    </View>
  );
  const editBirthday = (
    <View>
      <View style={styles.cardView}>
        <Text style={styles.birthdayText}>
          Đã chọn ngày: {!calendarStatus ? '' : value}
        </Text>
      </View>

      <View style={{backgroundColor: '#fff'}}>
        <CalendarPicker
          startFromMonday={true}
          maxDate={today}
          todayBackgroundColor="#219653"
          selectedDayColor="#FB5A23"
          selectedDayTextColor="#FFFFFF"
          onDateChange={onDateChange}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backIcon} source={arrowBack} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Sửa {checkType()}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {Loading}
          <TouchableOpacity onPress={() => changeInfo()}>
            <Text style={styles.saveBtn}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>

      {type === 'name'
        ? editName
        : type === 'phone'
        ? editPhone
        : type === 'gender'
        ? editGender
        : editBirthday}
    </View>
  );
}

const {
  width,
  backgroundColor,
  mainColor,
  backButton,
  heightHeader,
  height,
} = Global;
const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    width: width / 18,
    height: width / 18,
  },
  dropdownBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  birthdayText: {
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: width / 30,
  },
  dropdownText: {
    width: width / 4,
    marginRight: 10,
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: width / 30,
    borderBottomColor: mainColor,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  dropdownList: {
    height: height / 9.7,
    width: width / 4 + 10 + width / 18,
  },
  inputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 16,
    marginTop: 10,
  },
  textInputStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: width / 30,
    color: '#000000',
    width: width - 50 - width / 18,
    height: width / 16,
    padding: 0,
    paddingBottom: 5,
    borderBottomColor: mainColor,
    borderBottomWidth: 1,
  },
  inputImg: {
    width: width / 18,
    height: width / 18,
    resizeMode: 'contain',
    marginTop: 6,
    marginLeft: 10,
  },
  wrapper: {
    flex: 1,
    backgroundColor,
  },
  header: {
    backgroundColor: 'white',
    height: heightHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
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
    marginLeft: 20,
  },
  cardView: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
});
