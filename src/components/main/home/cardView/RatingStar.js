import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import Global from '../../../Global';

import starBorder from '../../../../icons/star_border-f2c94c.png';
import starIcon from '../../../../icons/star-f2c94c.png';
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

  const _0star = (
    <View style={styles.starCont}>
      <Image style={styles.star} source={noStar} />
      <Image style={styles.star} source={noStar} />
      <Image style={styles.star} source={noStar} />
      <Image style={styles.star} source={noStar} />
      <Image style={styles.star} source={noStar} />
    </View>
  );

  return (
    <View>
      {star === 1
        ? _1star
        : star === 2
        ? _2star
        : star === 3
        ? _3star
        : star === 4
        ? _4star
        : star === 5
        ? _5star
        : _0star}
    </View>
  );
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
