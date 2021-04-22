/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../../../actions';

import Global from '../../Global';
import social_login from '../../../apis/social_login';
import facebook from '../../../images/facebook.png';
import google from '../../../images/google.png';

export default function SigninSocial(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    configureGoogleSign();
  }, []);

  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId:
        '148915325976-v7n9hktfklbn49sfgf5ianikvfnuknel.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }

  async function googleSignin() {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      signInHandle(user.user.email, user.user.name, user.user.photo);
    } catch (err) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        console.log('Process Cancelled');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        console.log('Process in progress');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        console.log('Play services are not available');
      } else {
        // some other error
        console.log('Something else went wrong... ', err.toString());
      }
    }
  }

  const facebookSignin = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      (login) => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name, email, picture.type(large)',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          signInHandle(user.email, user.name, user.picture.data.url);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const signInHandle = (email, name, avatar) => {
    social_login
      .social_login(email, name, avatar)
      .then((response) => {
        var token = response.headers.get('Auth-Token');
        response.json().then((responseJson) => {
          if (responseJson.message === 'Email has been used!') {
            return Toast.show(
              'Email đã được sử dụng để đăng ký tài khoản Chefood',
              {
                position: 0,
                duration: 2500,
              },
            );
          } else {
            dispatch(updateUser({token, userInfo: responseJson}));
            storeData({token, userInfo: responseJson});
            props.navigation.navigate('MAIN', {asyncStorage: false});
          }
        });
      })
      .catch((err) => {
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@user', jsonValue);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  return (
    <View style={styles.otherMethodCont}>
      <TouchableOpacity onPress={() => facebookSignin()}>
        <Image
          style={[styles.otherMethodImg, {marginRight: 5}]}
          source={facebook}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => googleSignin()}>
        <Image
          style={[styles.otherMethodImg, {marginLeft: 5}]}
          source={google}
        />
      </TouchableOpacity>
    </View>
  );
}

const {width} = Global;
const styles = StyleSheet.create({
  otherMethodCont: {
    flexDirection: 'row',
  },
  otherMethodImg: {
    width: width / 9,
    height: width / 9,
  },
});
