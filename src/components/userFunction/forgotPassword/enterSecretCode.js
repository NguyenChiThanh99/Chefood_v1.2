import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from '../../Global';

import background from '../../../images/background.png';
import keyboardIcon from '../../../icons/keypad-e0.png';

export default function EnterSecretCode({navigation, route}) {
  const [secretCode, setSecretCode] = useState('');
  const from = route.params.from;

  const verifyEmailHandle = () => {
    navigation.navigate('SIGN_IN');
  };
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
              <Text style={styles.btnText}>
                {from === 0 ? 'Kích hoạt tài khoản' : 'Xác thực email'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ImageBackground>
  );
}

const {height, width, fontFamily} = Global;
const styles = StyleSheet.create({
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
    paddingHorizontal: width / 16,
    color: 'white',
  },
});
