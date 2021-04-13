/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Global from '../../../Global';
import get_order_detail from '../../../../apis/get_order_detail';
import {updateCart} from '../../../../../actions';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-root-toast';

import arrowRight from '../../../../icons/arrow_right-82.png';
import deliveryIcon from '../../../../icons/assistant_navigation.png';
import prepareIcon from '../../../../icons/watch_later.png';
import confirmIcon from '../../../../icons/pending.png';
import cancelIcon from '../../../../icons/error.png';
import completeIcon from '../../../../icons/check_circle.png';

export default function Order(props) {
  const {
    id_order,
    status,
    date,
    total_money,
    payment,
    order_name,
    so_mon_con_lai,
    checkcomment,
  } = props.order;

  useEffect(() => {
    getOrdersDetail();
  }, []);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [dataDetail, setDataDetail] = useState([]);

  const checkDelivery = (trangThai) => {
    switch (trangThai) {
      case 'Đang giao hàng':
        return {image: deliveryIcon, color: '#f2994a'};
      case 'Đang chuẩn bị':
        return {image: prepareIcon, color: '#f2994a'};
      case 'Đang xác nhận':
        return {image: confirmIcon, color: '#f2994a'};
      case 'Đã hủy':
        return {image: cancelIcon, color: '#eb5757'};
      default:
        return {image: completeIcon, color: '#219653'};
    }
  };

  const getOrdersDetail = () => {
    get_order_detail
      .get_order_detail(user.token, id_order)
      .then((responseJson) => {
        setDataDetail(responseJson);
      })
      .catch((err) => {
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const orderAgain = () => {
    for (let i = 0; i < dataDetail.dishes.length; i++) {
      const newCart = {
        dish: {
          dish: {
            name: dataDetail.dishes[i].dish_name,
            picture: dataDetail.dishes[i].image,
          },
          chef: {
            _id: dataDetail.chef.idchef,
            name: dataDetail.chef.chef_name,
          },
          dishofchef: {
            iddishofchef: dataDetail.dishes[i].iddishofchef,
            price: dataDetail.dishes[i].price,
          },
        },
        quantity: dataDetail.dishes[i].amount,
      };
      var flag = false;
      if (cart.length === 0) {
        dispatch(updateCart([newCart]));
        storeData([newCart]);
        Toast.show('Đã thêm món ăn vào giỏ hàng', {
          position: 0,
          duration: 2000,
        });
      } else {
        for (var j = 0; j < cart.length; j++) {
          if (
            cart[j].dish.dishofchef.iddishofchef ===
            dataDetail.dishes[i].iddishofchef
          ) {
            flag = true;
            cart[j].quantity += dataDetail.dishes[i].amount;
            dispatch(updateCart(cart));
            storeData(cart);
            Toast.show('Đã tăng số lượng món ăn trong giỏ hàng', {
              position: 0,
              duration: 2000,
            });
            break;
          }
        }
        if (flag === false) {
          cart.push(newCart);
          dispatch(updateCart(cart));
          storeData(cart);
          Toast.show('Đã thêm món ăn vào giỏ hàng', {
            position: 0,
            duration: 2000,
          });
        }
      }
    }
    props.navigation.navigate('CART', {address: ''});
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

  const cancelJSX = (
    <TouchableOpacity style={styles.cancelCont} onPress={() => orderAgain()}>
      <Text style={styles.buttonCancel}>Đặt lại</Text>
    </TouchableOpacity>
  );
  const completeJSX = (
    <View style={styles.cancelCont}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('REVIEW', {
            chef: null,
            dish: null,
            orderInfo: props.order,
          });
        }}>
        <Text style={[styles.buttonComplete, styles.reviewBtn]}>Đánh giá</Text>
      </TouchableOpacity>
      <View
        style={{
          borderColor: '#e0e0e0',
          borderWidth: 0,
          paddingVertical: 10,
          borderLeftWidth: 0.5,
        }}
      />
      <TouchableOpacity onPress={() => orderAgain()}>
        <Text style={[styles.buttonComplete, styles.againBtn]}>Đặt lại</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.topView}>
        <View style={styles.leftView}>
          <Text style={styles.title} numberOfLines={1}>
            {order_name}
          </Text>
          {so_mon_con_lai > 0 ? (
            <Text style={styles.other}>và {so_mon_con_lai} món ăn khác</Text>
          ) : null}

          <View style={styles.deliveryCont}>
            <Image
              style={styles.deliveryImg}
              source={checkDelivery(status).image}
            />
            <Text
              style={[
                styles.deliveryStatus,
                {color: checkDelivery(status).color},
              ]}>
              {status}
            </Text>
            <Text style={styles.deliveryTime}>
              • {Global.longTimeFormat(date)}
            </Text>
          </View>

          <Text style={styles.total}>
            {Global.currencyFormat(total_money)}đ ({payment})
          </Text>
        </View>

        <Image style={styles.arrowIcon} source={arrowRight} />
      </View>
      {status === 'Đã hủy'
        ? cancelJSX
        : status === 'Đã giao' && checkcomment === 0
        ? completeJSX
        : status === 'Đã giao' && checkcomment === 1
        ? cancelJSX
        : null}
    </View>
  );
}

const {width, mainColor} = Global;
const styles = StyleSheet.create({
  cancelCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderTopColor: '#e0e0e0',
    borderWidth: 0.5,
  },
  buttonCancel: {
    marginVertical: 10,
    fontFamily: 'Roboto-Bold',
    color: mainColor,
    fontSize: width / 33,
  },
  buttonComplete: {
    paddingVertical: 10,
    fontSize: width / 33,
    width: width / 2 - 0.25,
    textAlign: 'center',
  },
  againBtn: {
    color: mainColor,
    fontFamily: 'Roboto-Bold',
  },
  reviewBtn: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
  },
  wrapper: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  topView: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftView: {
    width: width - 40 - width / 26,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 28,
    fontWeight: 'bold',
  },
  other: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 31,
  },
  deliveryCont: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryImg: {
    width: width / 23,
    height: width / 23,
  },
  deliveryStatus: {
    fontFamily: 'Roboto-Regular',
    fontSize: width / 31,
    marginHorizontal: 5,
  },
  deliveryTime: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 31,
  },
  total: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 31,
    marginTop: 12,
  },
  arrowIcon: {
    width: width / 26,
    height: width / 26,
  },
});
