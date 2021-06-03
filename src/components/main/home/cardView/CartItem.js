/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image as ImageLazy} from 'react-native-elements';

import Global from '../../../Global';
import {updateCart} from '../../../../../actions';

import minusDisable from '../../../../icons/remove_circle_outline-e0.png';
import minus from '../../../../icons/remove_circle_outline-fb5a23.png';
import plus from '../../../../icons/add_circle_outline-fb5a23.png';
import imageHolder from '../../../../icons/imageHolder.png';

var soluong = 1;

export default function CartItem(props) {
  const {name, picture} = props.cartItem.dish.dish;

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(props.cartItem.quantity);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const changeQuantity = (text) => {
    if (!isNaN(parseInt(text, 10))) {
      updateQuantity(parseInt(text, 10));
      setQuantity(parseInt(text, 10));
      soluong = text;
    } else {
      setQuantity(text);
      soluong = text;
    }
  };

  const _keyboardDidHide = () => {
    if (isNaN(parseInt(soluong, 10)) || parseInt(soluong, 10) <= 1) {
      setQuantity(1);
      soluong = 1;
      updateQuantity(1);
    }
  };

  const touchQuantity = (type) => {
    if (type === 0) {
      updateQuantity(quantity - 1);
      setQuantity(quantity - 1);
      soluong = soluong - 1;
    } else {
      updateQuantity(quantity + 1);
      setQuantity(quantity + 1);
      soluong = soluong + 1;
    }
  };

  const updateQuantity = (sl) => {
    var i = cart.indexOf(props.cartItem);
    cart[i].quantity = sl;
    dispatch(updateCart(cart));
    storeData(cart);
  };

  const storeData = async (value) => {
    var key = '@cart' + '_' + user.userInfo._id;
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={{flexDirection: 'row'}}>
        <ImageLazy
          PlaceholderContent={
            <Image style={styles.imageHolder} source={imageHolder} />
          }
          source={{uri: picture}}
          style={styles.image}
        />
        <View style={styles.infoCont}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.chef}>{props.cartItem.dish.chef.name}</Text>

          <View style={styles.quantityCont}>
            <TouchableOpacity
              onPress={() => {
                touchQuantity(0);
              }}
              disabled={quantity <= 1 ? true : false}>
              <Image
                style={styles.quantityImg}
                source={quantity <= 1 || quantity === '' ? minusDisable : minus}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              autoCompleteType="cc-number"
              keyboardType="decimal-pad"
              maxLength={2}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={(text) => changeQuantity(text)}
              value={quantity.toString()}
            />
            <TouchableOpacity
              onPress={() => {
                touchQuantity(1);
              }}>
              <Image style={styles.quantityImg} source={plus} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={styles.price}>
        {Global.currencyFormat(props.cartItem.dish.dishofchef.price)}đ
      </Text>
    </View>
  );
}

const {width} = Global;
const styles = StyleSheet.create({
  quantityCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityImg: {
    width: width / 16,
    height: width / 16,
  },
  quantityInput: {
    textAlign: 'center',
    marginHorizontal: width / 18,
    color: '#000',
    fontFamily: 'Roboto-Bold',
    fontSize: width / 28,
    padding: 0,
  },
  image: {
    width: width / 9,
    height: width / 9,
    borderRadius: 2,
    marginRight: 10,
  },
  imageHolder: {
    width: width / 9,
    height: width / 9,
    borderRadius: 2,
  },
  infoCont: {
    width: width / 1.65,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 28,
  },
  chef: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 33,
    marginTop: 5,
  },
  price: {
    fontFamily: 'Roboto-Regular',
    color: '#4f4f4f',
    fontSize: width / 31,
  },
  wrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
