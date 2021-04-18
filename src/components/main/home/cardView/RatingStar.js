import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import Global from '../../../Global';

import starBorder from '../../../../icons/star_border-f2c94c.png';
import starIcon from '../../../../icons/star-f2c94c.png';
import starHalf from '../../../../icons/star_half-f2c94c.png';
import noStar from '../../../../icons/star-82.png';

export default function Category(props) {
  const {star} = props;
  const _1star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starBorder} />
      <Image style={styles.star} source={starBorder} />
      <Image style={styles.star} source={starBorder} />
      <Image style={styles.star} source={starBorder} />
    </View>
  );

  const _15star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starHalf} />
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

  const _25star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starHalf} />
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

  const _35star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starHalf} />
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

  const _45star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starIcon} />
      <Image style={styles.star} source={starHalf} />
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

  const _0star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={noStar} />
      <Image style={styles.star} source={noStar} />
      <Image style={styles.star} source={noStar} />
      <Image style={styles.star} source={noStar} />
      <Image style={styles.star} source={noStar} />
    </View>
  );

  if (star >= 1.0 && star <= 1.3) {
    return _1star;
  } else if (star >= 1.4 && star <= 1.6) {
    return _15star;
  } else if (star >= 1.7 && star <= 2.3) {
    return _2star;
  } else if (star >= 2.4 && star <= 2.6) {
    return _25star;
  } else if (star >= 2.7 && star <= 3.3) {
    return _3star;
  } else if (star >= 3.4 && star <= 3.6) {
    return _35star;
  } else if (star >= 3.7 && star <= 4.3) {
    return _4star;
  } else if (star >= 4.4 && star <= 4.6) {
    return _45star;
  } else if (star >= 4.7 && star <= 5.0) {
    return _5star;
  } else {
    return _0star;
  }
}

const {width} = Global;
const styles = StyleSheet.create({
  starCont: {
    flexDirection: 'row',
    marginTop: 4,
  },
  star: {
    width: width / 34,
    height: width / 34,
  },
});
