import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Image as ImageLazy} from 'react-native-elements';

import Global from '../../../Global';
import imageHolder from '../../../../icons/imageHolder.png';

export default function DishViewRelated(props) {
  const {picture, name} = props.dish.dish;
  return (
    <View style={styles.wrapper}>
      <ImageLazy
        style={styles.image}
        source={{uri: picture}}
        PlaceholderContent={<Image style={styles.image} source={imageHolder} />}
      />
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.chef}>{props.dish.chef.name}</Text>
      <Text style={styles.price}>
        {Global.currencyFormat(props.dish.dishofchef.price)}đ
      </Text>
    </View>
  );
}

const {width, mainColor} = Global;
const styles = StyleSheet.create({
  wrapper: {
    width: width / 2 - 45 / 2,
    marginBottom: 15,
    borderColor: '#828282',
    borderWidth: 0.25,
    borderRadius: 5,
  },
  image: {
    width: width / 2 - 45 / 2 - 0.75,
    height: width / 2 - 45 / 2 - 0.75,
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
