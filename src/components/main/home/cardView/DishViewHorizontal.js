import React from 'react';
import {StyleSheet, View, ImageBackground, Image, Text} from 'react-native';

import Global from '../../../Global';

import newIcon from '../../../../images/label_new.png';

export default function DishViewHorizontal(props) {
  const {image, name, chef, price} = props.dish;
  return (
    <View style={styles.wrapper}>
      <ImageBackground style={styles.image} source={{uri: image}}>
        {props.flag === true ? (
          <Image source={newIcon} style={styles.new} />
        ) : null}
      </ImageBackground>
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.chef} numberOfLines={1}>
        {chef}
      </Text>
      <Text style={styles.price}>{Global.currencyFormat(price)}đ</Text>
    </View>
  );
}

const {height, width, backgroundColor, fontFamily} = Global;
const styles = StyleSheet.create({
  new: {
    width: width / 12,
    height: height / 34,
    resizeMode: 'contain',
    marginTop: 4,
    marginRight: 5,
  },
  wrapper: {
    borderColor: '#828282',
    borderWidth: 0.25,
    borderRadius: 5,
    width: width / 3.8,
  },
  image: {
    width: width / 3.8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: width / 3.8,
    alignItems: 'flex-end',
  },
  name: {
    fontFamily,
    fontWeight: 'bold',
    color: '#333333',
    fontSize: width / 32,
    marginHorizontal: 5,
    marginTop: 3,
    height: height / 19,
  },
  chef: {
    fontFamily,
    color: '#828282',
    fontSize: width / 38,
    marginHorizontal: 5,
  },
  price: {
    fontFamily,
    color: backgroundColor,
    fontSize: width / 34,
    marginHorizontal: 5,
    marginBottom: 5,
  },
});
