import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Image as ImageLazy} from 'react-native-elements';

import Global from '../../../Global';

import hotIcon from '../../../../images/label_hot.png';
import prepareIcon from '../../../../icons/TimeSquare.png';
import performIcon from '../../../../icons/TimeCircle.png';
import imageHolder from '../../../../icons/imageHolder.png';

export default function DishViewHorizontal(props) {
  var picture, name, prepare, perform, price;
  if (props.chef === true) {
    picture = props.dish.picture;
    name = props.dish.name;
    prepare = props.dish.prepare;
    perform = props.dish.perform;
    price = props.dish.price;
  } else {
    picture = props.dish.dish.picture;
    name = props.dish.dish.name;
    prepare = props.dish.dish.prepare;
    perform = props.dish.dish.perform;
    price = props.dish.dishofchef.price;
  }
  return (
    <View style={styles.wrapper}>
      <ImageLazy
        PlaceholderContent={
          <Image style={styles.imageHolder} source={imageHolder} />
        }
        style={styles.image}
        source={{uri: picture}}>
        {props.flag === true ? (
          <Image source={hotIcon} style={styles.new} />
        ) : null}
      </ImageLazy>
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
          {props.dish.chef.name}
        </Text>
      )}
      <Text style={styles.price}>{Global.currencyFormat(price)}đ</Text>
    </View>
  );
}

const {height, width, mainColor} = Global;
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
    fontFamily: 'Roboto-Light',
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
    width: width / 3.8 - 1,
    height: width / 3.8 - 1,
    alignItems: 'flex-end',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  imageHolder: {
    width: width / 3.8 - 1,
    height: width / 3.8 - 1,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 32,
    marginHorizontal: 5,
    marginTop: 3,
    height: 38,
  },
  chef: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 38,
    marginHorizontal: 5,
  },
  price: {
    fontFamily: 'Roboto-Regular',
    color: mainColor,
    fontSize: width / 34,
    marginHorizontal: 5,
    marginBottom: 5,
  },
});
