import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import Global from '../../../Global';

import starBorder from '../../../../icons/star_border-f2c94c.png';
import starIcon from '../../../../icons/star-f2c94c.png';
import addressIcon from '../../../../icons/place-82.png';
import phoneIcon from '../../../../icons/phone-82.png';
import arrowIcon from '../../../../icons/arrow_right-82.png';

export default function ChefView(props) {
  const {image, star, name, address, phone} = props.chef;

  const _1star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starBorder} />
      <Image style={styles.star} source={starBorder} />
      <Image style={styles.star} source={starBorder} />
      <Image style={styles.star} source={starBorder} />
    </View>
  );

  const _2star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starBorder} />
      <Image style={styles.star} source={starBorder} />
      <Image style={styles.star} source={starBorder} />
    </View>
  );

  const _3star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starBorder} />
      <Image style={styles.star} source={starBorder} />
    </View>
  );

  const _4star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starBorder} />
    </View>
  );

  const _5star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.avatarCont}>
        <Image style={styles.avatar} source={{uri: image}} />
        {star === 1
          ? _1star
          : star === 2
          ? _2star
          : star === 3
          ? _3star
          : star === 4
          ? _4star
          : _5star}
      </View>
      <View style={styles.infoCont}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.infoRow}>
          <Image style={styles.infoIcon} source={addressIcon} />
          <Text style={styles.infoText}>{address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Image style={styles.infoIcon} source={phoneIcon} />
          <Text style={styles.infoText}>{phone}</Text>
        </View>
      </View>
      <View style={styles.arrowCont}>
        <Image style={styles.arrow} source={arrowIcon} />
      </View>
    </View>
  );
}

const {width, fontFamily} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: width / 6.5,
    height: width / 6.5,
    borderRadius: width / 13,
  },
  infoCont: {
    width: width / 1.5,
  },
  name: {
    fontFamily,
    color: '#333333',
    fontSize: width / 30,
    marginBottom: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 3,
  },
  infoIcon: {
    width: width / 25,
    height: width / 25,
  },
  infoText: {
    fontFamily,
    color: '#828282',
    fontSize: width / 36,
    marginLeft: 3,
  },
  arrowCont: {},
  arrow: {
    width: width / 24,
    height: width / 24,
  },
  starCont: {
    flexDirection: 'row',
    marginTop: 4,
  },
  star: {
    width: width / 34,
    height: width / 34,
  },
});
