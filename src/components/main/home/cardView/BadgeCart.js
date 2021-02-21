import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Badge} from 'react-native-elements';
// import {useSelector} from 'react-redux';

import Global from '../../../Global';

import cartIcon from '../../../../icons/Buy.png';

export default function BadgeCart() {
  // const cartLength = useSelector((state) => state.cart.length);
  return (
    <View style={styles.cartCont}>
      <Image source={cartIcon} style={styles.cartIcon} />
      <Badge
        value={0}
        containerStyle={styles.containerStyle}
        badgeStyle={styles.badgeStyle}
      />
    </View>
  );
}

const {height, width, backgroundColor} = Global;
const styles = StyleSheet.create({
  cartCont: {
    marginRight: 4,
  },
  cartIcon: {
    width: width / 16,
    resizeMode: 'contain',
  },
  containerStyle: {
    position: 'absolute',
    top: height / 3.1,
    right: -8,
  },
  badgeStyle: {
    backgroundColor,
    borderWidth: 1,
  },
});
