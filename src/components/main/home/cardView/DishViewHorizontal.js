/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, ImageBackground, Image, Text} from 'react-native';

import Global from '../../../Global';

import newIcon from '../../../../images/label_new.png';
import prepareIcon from '../../../../icons/TimeSquare.png';
import performIcon from '../../../../icons/TimeCircle.png';

export default function DishViewHorizontal(props) {
  const {image, name, chef, price, prepare, perform} = props.dish;
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        style={styles.image}
        imageStyle={{borderTopLeftRadius: 7, borderTopRightRadius: 7}}
        source={{uri: image}}>
        {props.flag === true ? (
          <Image source={newIcon} style={styles.new} />
        ) : null}
      </ImageBackground>
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      {props.chef === true ? (
        <View style={styles.timeCont}>
          <View style={styles.timeItem}>
            <Image style={styles.timeImage} source={prepareIcon} />
            <Text style={styles.timeText}>
              {prepare.slice(10, prepare.lastIndexOf(' '))}ph
            </Text>
          </View>
          <View style={styles.timeItem}>
            <Image style={styles.timeImage} source={performIcon} />
            <Text style={styles.timeText}>
              {perform.slice(11, perform.lastIndexOf(' '))}ph
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.chef} numberOfLines={1}>
          {chef}
        </Text>
      )}
      <Text style={styles.price}>{Global.currencyFormat(price)}đ</Text>
    </View>
  );
}

const {height, width, mainColor, fontFamily} = Global;
const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row',
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeImage: {
    width: width / 28,
    height: width / 28,
  },
  timeText: {
    fontFamily,
    color: '#333333',
    fontSize: width / 40,
  },
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
    color: mainColor,
    fontSize: width / 34,
    marginHorizontal: 5,
    marginBottom: 5,
  },
});
