import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

import Global from '../../../Global';

import addIcon from '../../../../icons/add_circle-fb5a23.png';
import prepareIcon from '../../../../icons/TimeSquare.png';
import performIcon from '../../../../icons/TimeCircle.png';

export default function DishViewVertical(props) {
  const {image, name, chef, price, prepare, perform} = props.dish;

  const addToCart = () => {};

  const chefJSX = <Text style={styles.chef}>{chef}</Text>;
  const timeJSX = (
    <View style={styles.timeCont}>
      <View style={styles.timeItem}>
        <Image style={styles.timeImg} source={prepareIcon} />
        <Text style={styles.timeText}>
          {prepare.slice(10, prepare.lastIndexOf(' '))} phút
        </Text>
      </View>
      <View style={styles.timeItem}>
        <Image style={styles.timeImg} source={performIcon} />
        <Text style={styles.timeText}>
          {perform.slice(11, perform.lastIndexOf(' '))} phút
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperInfo}>
        <Image style={styles.image} source={{uri: image}} />
        <View>
          <Text
            style={props.chef === true ? styles.nameChef : styles.name}
            numberOfLines={2}>
            {name}
          </Text>
          {props.chef === true ? timeJSX : chefJSX}
          <Text style={styles.price}>{Global.currencyFormat(price)}đ</Text>
        </View>
      </View>
      {props.chef === true ? (
        <TouchableOpacity onPress={() => addToCart()} style={styles.addBtn}>
          <Image source={addIcon} style={styles.addIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const {width, height, mainColor} = Global;
const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  timeImg: {
    width: width / 25,
    height: width / 25,
  },
  timeText: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 35,
  },
  addBtn: {
    height: height / 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: width / 16,
    height: width / 16,
    marginLeft: 5,
  },
  wrapper: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapperInfo: {
    flexDirection: 'row',
  },
  image: {
    width: width / 5.5,
    height: width / 5.5,
    borderRadius: 2,
    marginRight: 12,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 30,
    fontWeight: 'bold',
    marginBottom: 3,
    width: width / 1.35,
  },
  nameChef: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 30,
    marginBottom: 3,
    width: width / 1.5,
  },
  chef: {
    fontFamily: 'Roboto-Light',
    color: '#4f4f4f',
    fontSize: width / 34,
  },
  price: {
    fontFamily: 'Roboto-Regular',
    color: mainColor,
    fontSize: width / 34,
  },
});
