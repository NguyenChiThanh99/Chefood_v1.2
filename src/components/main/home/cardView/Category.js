/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from '../../../Global';

export default function Category(props) {
  const {name, image, nickname} = props.category;
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        style={styles.image}
        colors={
          props.status[nickname]
            ? ['rgba(251,90,35,1)', 'rgba(255,176,56,0)']
            : ['rgba(240,240,240,1)', 'rgba(255,255,255,0)']
        }
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <Image style={styles.image2} source={image} />
      </LinearGradient>
      <Text
        style={[
          styles.name,
          props.status[nickname] ? {fontWeight: 'bold'} : null,
        ]}>
        {name}
      </Text>
    </View>
  );
}

const {width, fontFamily} = Global;
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    marginRight: 0,
  },
  image: {
    width: width / 9,
    height: width / 9,
    borderRadius: width / 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image2: {
    width: width / 12,
    height: width / 12,
  },
  name: {
    fontFamily,
    color: '#333333',
    fontSize: width / 34,
    marginTop: 7,
  },
});
