/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import Global from '../../../Global';

export default function DishViewRelated(props) {
  const {image, name, chef, price} = props.dish;
  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={{uri: image}} />
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.chef}>{chef}</Text>
      <Text style={styles.price}>{Global.currencyFormat(price)}đ</Text>
    </View>
  );
}

const {height, width, mainColor} = Global;
const styles = StyleSheet.create({
  wrapper: {
    width: width / 2 - 45 / 2,
    marginBottom: 15,
    borderColor: '#828282',
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderRadius: 5,
  },
  image: {
    width: width / 2 - 45 / 2,
    height: width / 2 - 45 / 2,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  name: {
    marginTop: 5,
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 30,
    height: 40,
    marginHorizontal: 5,
  },
  chef: {
    marginTop: 2,
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 34,
    marginHorizontal: 5,
  },
  price: {
    margin: 5,
    fontFamily: 'Roboto-Regular',
    color: mainColor,
    fontSize: width / 30,
  },
});
