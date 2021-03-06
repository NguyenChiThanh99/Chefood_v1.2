/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import CalendarPicker from 'react-native-calendar-picker';

import Global from '../../../Global';

import arrowBack from '../../../../icons/arrow_back_ios-fb5a23.png';
import emailIcon from '../../../../icons/mail-fb5a23.png';
import userIcon from '../../../../icons/person-fb5a23.png';
import phoneIcon from '../../../../icons/phone-fb5a23.png';
import expandMoreArrow from '../../../../icons/expand_less-fb5a23.png';
import expandLessArrow from '../../../../icons/expand_more-fb5a23.png';

export default function ChangeInfoDetail({route, navigation}) {
  const {type, data} = route.params;

  const [value, setValue] = useState(data);
  const [arrowIcon, setArrowIcon] = useState(expandMoreArrow);
  const [calendarStatus, setCalendarStatus] = useState(false);

  const optionMethod = ['Nam', 'Nữ'];
  const today = new Date();

  const checkType = () => {
    switch (type) {
      case 'name':
        return 'tên';

      case 'email':
        return 'email';

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
  const editEmail = (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInputStyle}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        onChangeText={(text) => setValue(text)}
        value={value}
        autoCompleteType="email"
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#bdbdbd"
      />
      <Image style={styles.inputImg} source={emailIcon} />
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
        <TouchableOpacity>
          <Text style={styles.saveBtn}>Lưu</Text>
        </TouchableOpacity>
      </View>

      {type === 'name'
        ? editName
        : type === 'email'
        ? editEmail
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
  fontFamily,
  backButton,
  heightHeader,
  height,
} = Global;
const styles = StyleSheet.create({
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
    fontFamily,
    fontSize: width / 30,
  },
  dropdownText: {
    width: width / 4,
    marginRight: 10,
    color: '#000000',
    fontFamily,
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
    fontFamily: fontFamily,
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
  cardView: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
});
