import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Image as ImageLazy} from 'react-native-elements';

import Global from '../../../Global';

import prepareIcon from '../../../../icons/TimeSquare.png';
import performIcon from '../../../../icons/TimeCircle.png';
import imageHolder from '../../../../icons/imageHolder.png';

export default function DishViewVertical(props) {
  const {picture, name, prepare, perform} = props.dish.dish;

  const chefJSX = (
    <Text style={styles.chef}>
      {props.chef === true ? '' : props.dish.chef.name}
    </Text>
  );
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
        <ImageLazy
          style={styles.image}
          source={{uri: picture}}
          PlaceholderContent={
            <Image style={styles.imageHolder} source={imageHolder} />
          }
        />
        <View>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          {props.chef === true ? timeJSX : chefJSX}
          <Text style={styles.price}>
            {Global.currencyFormat(props.dish.dishofchef.price)}đ
          </Text>
        </View>
      </View>
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
  imageHolder: {
    width: width / 5.5,
    height: width / 5.5,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 30,
    marginBottom: 3,
    width: width / 1.35,
  },
  chef: {
    fontFamily: 'Roboto-Light',
    color: '#4f4f4f',
    fontSize: width / 34,
  },
  price: {
    fontFamily: 'Montserrat-SemiBold',
    color: mainColor,
    fontSize: width / 31,
  },
});
