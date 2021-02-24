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

const {height, width, backgroundColor, fontFamily} = Global;
const styles = StyleSheet.create({
  wrapper: {
    width: width / 2 - 45 / 2,
    marginBottom: 15,
    borderColor: '#828282',
    borderWidth: 0.25,
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
    fontFamily,
    color: '#333333',
    fontWeight: 'bold',
    fontSize: width / 30,
    height: height / 18.2,
    marginHorizontal: 5,
  },
  chef: {
    marginTop: 3,
    fontFamily,
    color: '#828282',
    fontSize: width / 34,
    marginHorizontal: 5,
  },
  price: {
    margin: 5,
    fontFamily,
    color: backgroundColor,
    fontSize: width / 30,
  },
});
