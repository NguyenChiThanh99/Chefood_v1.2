import React from 'react';
import {View, Text} from 'react-native';

export default function Search({navigation, route}) {
  return (
    <View>
      <Text>Search</Text>
      <Text>{route.params.search}</Text>
    </View>
  );
}
