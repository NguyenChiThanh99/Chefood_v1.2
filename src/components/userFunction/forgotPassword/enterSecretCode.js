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
import sign_up from '../../../apis/sign_up';

import background from '../../../images/background.png';
import keyboardIcon from '../../../icons/keypad-e0.png';
import facebook from '../../../images/facebook.png';
import google from '../../../images/google.png';

export default function EnterSecretCode({navigation, route}) {
  const [secretCode, setSecretCode] = useState('');
  const [loading, setLoading] = useState(false);
  const from = route.params.from;

  const verifyEmailHandle = () => {
    setLoading(true);
    if (from === 0) {
      if (secretCode === route.params.code.toString()) {
        sign_up
          .sign_up(
            route.params.info.name,
            route.params.info.email,
            route.params.info.password,
            route.params.info.phone,
          )
          .then((responseJson) => {
            setLoading(false);
            if (responseJson.message === 'Register successfully!') {
              setSecretCode('');
              navigation.navigate('SIGN_IN');
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
      } else {
        setLoading(false);
        return Toast.show('Mã kích hoạt không đúng', {
          position: 0,
          duration: 2500,
        });
      }
    } else {
      if (secretCode === route.params.code.toString()) {
        setLoading(false);
        setSecretCode('');
        navigation.navigate('CHANGE_PASSWORD', {header: route.params.header});
      } else {
        setLoading(false);
        return Toast.show('Mã xác thực không đúng', {
          position: 0,
          duration: 2500,
        });
      }
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
          <Text style={styles.title}>Xác thực Email</Text>

          <Text style={styles.subtitle}>
            {from === 0
              ? 'Nhập mã kích hoạt đã được gửi đến email của bạn'
              : 'Nhập mã xác thực đã được gửi đến email của bạn'}
          </Text>

          <View style={[styles.inputContainer, {marginBottom: height / 30}]}>
            <TextInput
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCompleteType="cc-number"
              keyboardType="numeric"
              onChangeText={(text) => setSecretCode(text)}
              value={secretCode}
              maxLength={6}
            />
            <Image style={styles.inputImg} source={keyboardIcon} />
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
                verifyEmailHandle();
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.btnText}>
                  {from === 0 ? 'Kích hoạt tài khoản' : 'Xác thực email'}
                </Text>
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
                setSecretCode('');
                navigation.navigate('SIGN_IN');
                Keyboard.dismiss();
              }}>
              <Text style={styles.register}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.noAccText, {marginVertical: 10}]}>
            Đăng nhập bằng
          </Text>
          <View style={styles.otherMethodCont}>
            <TouchableOpacity>
              <Image
                style={[styles.otherMethodImg, {marginRight: 5}]}
                source={facebook}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={[styles.otherMethodImg, {marginLeft: 5}]}
                source={google}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const {height, width, fontFamily} = Global;
const styles = StyleSheet.create({
  bottomView: {
    marginTop: height / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noAccText: {
    fontFamily,
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
    fontFamily,
    fontSize: width / 28,
    color: 'white',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  otherMethodCont: {
    flexDirection: 'row',
  },
  otherMethodImg: {
    width: width / 9,
    height: width / 9,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: width / 16 - 18,
    marginLeft: 10,
  },
  subtitle: {
    fontFamily,
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
    fontFamily: fontFamily,
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
    fontFamily: fontFamily,
    fontSize: width / 30,
    color: '#6e6e6e',
    width: width / 2.8,
    letterSpacing: 12,
  },
  inputImg: {
    width: width / 22,
    resizeMode: 'contain',
  },
  btn: {
    borderRadius: 5,
  },
  btnText: {
    fontFamily,
    fontSize: width / 30,
    paddingVertical: 10,
    paddingLeft: width / 16,
    color: 'white',
    marginLeft: 11,
  },
});
