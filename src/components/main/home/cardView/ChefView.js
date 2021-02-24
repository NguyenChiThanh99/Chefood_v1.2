import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import Global from '../../../Global';
import RatingStar from './RatingStar';

import addressIcon from '../../../../icons/place-82.png';
import phoneIcon from '../../../../icons/phone-82.png';
import arrowIcon from '../../../../icons/arrow_right-82.png';

export default function ChefView(props) {
  const {image, star, name, address, phone} = props.chef;

  return (
    <View style={styles.wrapper}>
      <View style={styles.avatarCont}>
        <Image style={styles.avatar} source={{uri: image}} />
        <RatingStar star={star} />
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
      <View>
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
