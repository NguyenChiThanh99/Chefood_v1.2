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
import {useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';

import Global from '../../../Global';
import change_password from '../../../../apis/change_password';

import arrowBack from '../../../../icons/arrow_back_ios-fb5a23.png';

export default function ChangePassword({navigation}) {
  const user = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [renewPassword, setReNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const changePassword = () => {
    setLoading(true);
    Keyboard.dismiss();
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      renewPassword.length === 0
    ) {
      setLoading(false);
      return Toast.show('Vui lòng nhập tất cả các thông tin', {
        position: 0,
        duration: 2500,
      });
    } else if (
      oldPassword.length < 8 ||
      newPassword.length < 8 ||
      renewPassword.length < 8
    ) {
      setLoading(false);
      return Toast.show('Mật khẩu cần ít nhất 8 ký tự', {
        position: 0,
        duration: 2500,
      });
    } else if (newPassword !== renewPassword) {
      setLoading(false);
      return Toast.show('Mật khẩu nhập lại không đúng', {
        position: 0,
        duration: 2500,
      });
    } else {
      change_password
        .change_password(user.token, oldPassword, newPassword)
        .then((responseJson) => {
          setLoading(false);
          if (responseJson.message === 'Invalid password!') {
            return Toast.show('Mật khẩu hiện tại không đúng', {
              position: 0,
              duration: 2500,
            });
          } else {
            setOldPassword('');
            setNewPassword('');
            setReNewPassword('');
            navigation.goBack();
          }
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
          <Text style={styles.headerText}>Đổi mật khẩu</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {Loading}
          <TouchableOpacity onPress={() => changePassword()}>
            <Text style={styles.saveBtn}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>Mật khẩu hiện tại</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInputStyle}
          underlineColorAndroid="transparent"
          placeholderTextColor="#bdbdbd"
          autoCapitalize="none"
          onChangeText={(text) => setOldPassword(text)}
          value={oldPassword}
          secureTextEntry={true}
        />
      </View>

      <Text style={styles.title}>Mật khẩu mới</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInputStyle}
          underlineColorAndroid="transparent"
          placeholderTextColor="#bdbdbd"
          autoCapitalize="none"
          onChangeText={(text) => setNewPassword(text)}
          value={newPassword}
          secureTextEntry={true}
        />
      </View>

      <Text style={styles.title}>Xác nhận mật khẩu mới</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInputStyle}
          underlineColorAndroid="transparent"
          placeholderTextColor="#bdbdbd"
          autoCapitalize="none"
          onChangeText={(text) => setReNewPassword(text)}
          value={renewPassword}
          secureTextEntry={true}
        />
      </View>
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
  title: {
    fontFamily,
    color: '#828282',
    fontSize: width / 35,
    marginLeft: 20,
    marginTop: 15,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: height / 16,
    marginTop: 5,
    paddingLeft: 20,
  },
  textInputStyle: {
    fontFamily: fontFamily,
    fontSize: width / 30,
    color: '#000000',
    width: width - 40,
    height: width / 16,
    padding: 0,
    paddingBottom: 5,
    marginBottom: -3,
    borderBottomColor: mainColor,
    borderBottomWidth: 1,
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
    marginLeft: 20,
  },
});
