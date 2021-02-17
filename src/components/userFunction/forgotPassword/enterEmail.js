import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function enterEmail({navigation}) {
  return (
    <View>
      <Text>Enter Email</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ENTER_SECRET_CODE');
        }}>
        <Text>Gửi email</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SIGN_IN');
        }}>
        <Text>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}
