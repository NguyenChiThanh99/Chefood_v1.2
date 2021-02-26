import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Badge} from 'react-native-elements';
// import {useSelector} from 'react-redux';

import Global from '../../../Global';

import cartIcon from '../../../../icons/Buy.png';
import cartIconWhite from '../../../../icons/Buy-ffffff.png';

export default function BadgeCart(props) {
  // const cartLength = useSelector((state) => state.cart.length);
  return (
    <View style={styles.cartCont}>
      <Image
        source={props.dish === true ? cartIconWhite : cartIcon}
        style={styles.cartIcon}
      />
      <Badge
        value={0}
        containerStyle={styles.containerStyle}
        badgeStyle={
          props.dish === true ? styles.badgeStyleWhite : styles.badgeStyle
        }
      />
    </View>
  );
}

const {height, mainColor, backButton} = Global;
const styles = StyleSheet.create({
  cartCont: {
    marginRight: 4,
  },
  cartIcon: {
    width: backButton,
    resizeMode: 'contain',
  },
  containerStyle: {
    position: 'absolute',
    top: height / 3.1,
    right: -8,
  },
  badgeStyle: {
    backgroundColor: mainColor,
    borderWidth: 1,
  },
  badgeStyleWhite: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
  },
});
