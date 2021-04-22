/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import Global from '../Global';
import SigninSocial from './cardView/SigninSocial';
import sign_in from '../../../src/apis/sign_in';
import {updateUser} from '../../../actions';

import background from '../../images/background.png';
import emailIcon from '../../icons/mail-e0.png';
import passwordIcon from '../../icons/lock-e0.png';

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    loadFirstScreen();
  }, []);

  const loadFirstScreen = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      if (jsonValue === 'null' || jsonValue === null) {
        setLoading(false);
        dispatch(updateUser(null));
        SplashScreen.hide();
      } else {
        dispatch(updateUser(JSON.parse(jsonValue)));
        setLoading(false);
        navigation.navigate('MAIN', {asyncStorage: true});
      }
    } catch (e) {
      setLoading(false);
      console.log('Error: ' + e);
    }
  };

  const signInHandle = () => {
    setLoading(true);
    if (email.length === 0 || password.length === 0) {
      setLoading(false);
      return Toast.show('Vui lòng nhập tất cả các thông tin', {
        position: 0,
        duration: 2500,
      });
    } else {
      sign_in
        .sign_in(email, password)
        .then((response) => {
          var token = response.headers.get('Auth-Token');
          response.json().then((responseJson) => {
            setLoading(false);
            if (responseJson.message === 'Invalid password!') {
              return Toast.show('Mật khẩu không đúng', {
                position: 0,
                duration: 2500,
              });
            } else if (responseJson.message === 'Email is not found!') {
              return Toast.show('Email không tồn tại trong hệ thống', {
                position: 0,
                duration: 2500,
              });
            } else if (
              responseJson.message ===
              'Email has been used in the social network account!'
            ) {
              return Toast.show(
                'Email đã được đăng ký bằng tài khoản mạng xã hội',
                {
                  position: 0,
                  duration: 2500,
                },
              );
            } else {
              dispatch(updateUser({token, userInfo: responseJson}));
              storeData({token, userInfo: responseJson});
              setEmail('');
              setPassword('');
              navigation.navigate('MAIN', {asyncStorage: false});
            }
          });
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

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@user', jsonValue);
    } catch (e) {
      console.log('Error: ' + e);
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
          <Text style={styles.title}>Đăng nhập</Text>

          <View style={[styles.inputContainer, {marginBottom: 18}]}>
            <TextInput
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#bdbdbd"
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <Image style={styles.inputImg} source={emailIcon} />
          </View>

          <View style={styles.inputContainer}>
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

          <TouchableOpacity
            onPress={() => {
              if (!loading) {
                setEmail('');
                setPassword('');
                Keyboard.dismiss();
                navigation.navigate('ENTER_EMAIL');
              }
            }}>
            <Text style={styles.forgotpass}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <LinearGradient
            style={[styles.btn, {marginBottom: height / 30}]}
            colors={['#fb5a23', '#ffb038']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (!loading) {
                  Keyboard.dismiss();
                  signInHandle();
                }
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.btnText}>Đăng nhập</Text>
                {Loading}
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.bottomView}>
          <View style={styles.noAccCont}>
            <Text style={styles.noAccText}>Chưa có tài khoản?</Text>
            <TouchableOpacity
              style={styles.noAccBtn}
              onPress={() => {
                if (!loading) {
                  setEmail('');
                  setPassword('');
                  navigation.navigate('SIGN_UP');
                  Keyboard.dismiss();
                }
              }}>
              <Text style={styles.register}>Đăng ký ngay</Text>
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
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: width / 16 - 10,
    marginLeft: 10,
  },
  bottomView: {
    marginTop: height / 4.2,
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
    width: width / 18,
    resizeMode: 'contain',
  },
  forgotpass: {
    fontFamily: 'Roboto-Black',
    color: 'white',
    fontSize: width / 32,
    marginTop: 8,
    marginBottom: height / 25,
    textAlign: 'right',
    width: width / 1.42,
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
    marginLeft: 20,
  },
});
