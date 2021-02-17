import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function enterSecretCode({navigation}) {
  return (
    <View>
      <Text>Enter Secret Code</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SIGN_IN');
        }}>
        <Text>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}
