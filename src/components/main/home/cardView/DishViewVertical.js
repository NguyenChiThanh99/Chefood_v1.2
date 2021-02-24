import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import Global from '../../../Global';

export default function DishViewVertical(props) {
  const {image, name, chef, price} = props.dish;
  return (
    <View style={styles.wrapper}>
      <Image style={styles.image} source={{uri: image}} />
      <View>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.chef}>{chef}</Text>
        <Text style={styles.price}>{Global.currencyFormat(price)}đ</Text>
      </View>
    </View>
  );
}

const {width, fontFamily, backgroundColor} = Global;
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: width / 5.5,
    height: width / 5.5,
    borderRadius: 2,
    marginRight: 12,
  },
  name: {
    fontFamily,
    color: '#333333',
    fontSize: width / 30,
    fontWeight: 'bold',
    marginBottom: 3,
    width: width / 1.35,
  },
  chef: {
    fontFamily,
    color: '#4f4f4f',
    fontSize: width / 34,
  },
  price: {
    fontFamily,
    color: backgroundColor,
    fontSize: width / 34,
  },
});
