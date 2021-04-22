/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';

import Global from '../../Global';
import SigninSocial from '../cardView/SigninSocial';
import forgot_password_change from '../../../apis/forgot_password_change';

import background from '../../../images/background.png';
import passwordIcon from '../../../icons/lock-e0.png';

export default function ChangePassword({navigation, route}) {
  const [password, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');
  const [loading, setLoading] = useState(false);

  const changePassHandle = () => {
    setLoading(true);
    if (password.length === 0 || rePassword.length === 0) {
      setLoading(false);
      return Toast.show('Vui lòng nhập tất cả các thông tin', {
        position: 0,
        duration: 2500,
      });
    } else if (password.length < 8) {
      setLoading(false);
      return Toast.show('Mật khẩu cần ít nhất 8 ký tự', {
        position: 0,
        duration: 2500,
      });
    } else if (password !== rePassword) {
      setLoading(false);
      return Toast.show('Mật khẩu nhập lại không khớp', {
        position: 0,
        duration: 2500,
      });
    } else {
      forgot_password_change
        .forgot_password_change(password, route.params.header)
        .then((responseJson) => {
          setLoading(false);
          if (responseJson.message === 'Password has been changed!') {
            setPassword('');
            setRepassword('');
            navigation.navigate('SIGN_IN');
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
            position: -20,
            duration: 2500,
          });
        });
    }
  };

  const Loading = (
    <View style={styles.loading}>
      <ActivityIndicator animating={loading} color="white" size="small" />
    </View>
  );

  return (
    <ImageBackground source={background} style={styles.wrapper}>
      <View style={styles.wrapper2}>
        <View style={styles.cardview}>
          <Text style={styles.title}>Đổi mật khẩu</Text>

          <Text style={styles.subtitle}>
            Nhập mật khẩu mới cho tài khoản của bạn
          </Text>

          <View style={[styles.inputContainer, {marginBottom: height / 30}]}>
            <TextInput
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              placeholder="Mật khẩu"
              secureTextEntry={true}
              placeholderTextColor="#bdbdbd"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <Image style={styles.inputImg} source={passwordIcon} />
          </View>
          <View style={[styles.inputContainer, {marginBottom: height / 30}]}>
            <TextInput
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={true}
              placeholderTextColor="#bdbdbd"
              autoCapitalize="none"
              onChangeText={(text) => setRepassword(text)}
              value={rePassword}
            />
            <Image style={styles.inputImg} source={passwordIcon} />
          </View>

          <LinearGradient
            style={[styles.btn, {marginBottom: height / 30}]}
            colors={['#fb5a23', '#ffb038']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                Keyboard.dismiss();
                changePassHandle();
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.btnText}>Đồng ý</Text>
                {Loading}
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.bottomView}>
          <View style={styles.noAccCont}>
            <Text style={styles.noAccText}>Quay lại</Text>
            <TouchableOpacity
              style={styles.noAccBtn}
              onPress={() => {
                setPassword('');
                setRepassword('');
                navigation.navigate('SIGN_IN');
                Keyboard.dismiss();
              }}>
              <Text style={styles.register}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.noAccText, {marginVertical: 10}]}>
            Đăng nhập bằng
          </Text>
          <SigninSocial navigation={navigation} />
        </View>
      </View>
    </ImageBackground>
  );
}

const {height, width} = Global;
const styles = StyleSheet.create({
  bottomView: {
    marginTop: height / 5.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noAccText: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 28,
    color: 'white',
  },
  noAccBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 4,
    marginLeft: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  register: {
    fontFamily: 'Roboto-Bold',
    fontSize: width / 28,
    color: 'white',
    fontStyle: 'italic',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: width / 16,
    marginLeft: 10,
  },
  subtitle: {
    fontFamily: 'Roboto-Medium',
    color: 'white',
    fontSize: width / 28,
    width: width / 1.6,
    marginBottom: height / 40,
    textAlign: 'center',
  },
  wrapper: {
    flex: 1,
  },
  wrapper2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cardview: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    marginTop: height / 9,
    width: width / 1.2,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'Roboto-Black',
    fontWeight: 'bold',
    fontSize: width / 16,
    marginVertical: height / 30,
  },
  inputContainer: {
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.11,
    shadowRadius: 2.22,
    elevation: 4,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 16,
    paddingHorizontal: 10,
  },
  textInputStyle: {
    fontFamily: 'Roboto-Light',
    fontSize: width / 30,
    color: '#6e6e6e',
    width: width / 1.65,
  },
  inputImg: {
    width: width / 22,
    resizeMode: 'contain',
  },
  btn: {
    borderRadius: 5,
  },
  btnText: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 30,
    paddingVertical: 10,
    paddingLeft: width / 16,
    color: 'white',
    marginLeft: 11,
  },
});
