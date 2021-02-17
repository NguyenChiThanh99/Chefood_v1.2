import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
// import SvgUri from 'react-native-svg-uri';

export default function signIn({navigation}) {
  return (
    <View>
      <Text>Sign In</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ENTER_EMAIL');
        }}>
        <Text>Quên mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MAIN');
        }}>
        <Text>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SIGN_UP');
        }}>
        <Text>Đăng ký</Text>
      </TouchableOpacity>

      {/* <SvgUri
        width="200"
        height="200"
        source={{
          uri:
            'https://res.cloudinary.com/dep0t5tcf/image/upload/v1613496933/chefood/cake1_rbwz10.svg',
        }}
      /> */}
    </View>
  );
}
