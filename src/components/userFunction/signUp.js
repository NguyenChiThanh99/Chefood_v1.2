import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function signUp({navigation}) {
  return (
    <View>
      <Text>Sign Up</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SIGN_IN');
        }}>
        <Text>Đăng ký</Text>
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
