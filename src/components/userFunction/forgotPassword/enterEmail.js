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
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from '../../Global';

import background from '../../../images/background.png';
import emailIcon from '../../../icons/mail-e0.png';
import facebook from '../../../images/facebook.png';
import google from '../../../images/google.png';

export default function EnterEmail({navigation}) {
  const [email, setEmail] = useState('');

  const enterEmailHandle = () => {
    navigation.navigate('ENTER_SECRET_CODE', {from: 1});
  };
  return (
    <ImageBackground source={background} style={styles.wrapper}>
      <View style={styles.wrapper2}>
        <View style={styles.cardview}>
          <Text style={styles.title}>Quên mật khẩu</Text>

          <Text style={styles.subtitle}>
            Nhập Email đã đăng ký để nhận mật khẩu mới
          </Text>

          <View style={[styles.inputContainer, {marginBottom: height / 30}]}>
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

          <LinearGradient
            style={[styles.btn, {marginBottom: height / 30}]}
            colors={['#fb5a23', '#ffb038']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                Keyboard.dismiss();
                enterEmailHandle();
              }}>
              <Text style={styles.btnText}>Gửi</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.bottomView}>
          <View style={styles.noAccCont}>
            <Text style={styles.noAccText}>Quay lại</Text>
            <TouchableOpacity
              style={styles.noAccBtn}
              onPress={() => {
                setEmail('');
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
  subtitle: {
    fontFamily,
    color: 'white',
    fontSize: width / 28,
    width: width / 1.6,
    marginBottom: height / 40,
    textAlign: 'center',
  },
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
    width: width / 1.65,
  },
  inputImg: {
    width: width / 18,
    resizeMode: 'contain',
  },
  btn: {
    borderRadius: 5,
  },
  btnText: {
    fontFamily,
    fontSize: width / 30,
    paddingVertical: 10,
    paddingHorizontal: width / 10,
    color: 'white',
  },
});
