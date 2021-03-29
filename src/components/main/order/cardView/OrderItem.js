/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Global from '../../../Global';

import arrowRight from '../../../../icons/arrow_right-82.png';
import deliveryIcon from '../../../../icons/assistant_navigation.png';
import prepareIcon from '../../../../icons/watch_later.png';
import confirmIcon from '../../../../icons/pending.png';
import cancelIcon from '../../../../icons/error.png';
import completeIcon from '../../../../icons/check_circle.png';

export default function Order(props) {
  const {delivery, total, method, dish} = props.order;

  const checkDelivery = (status) => {
    switch (status) {
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

  const cancelJSX = (
    <TouchableOpacity style={styles.cancelCont}>
      <Text style={styles.buttonCancel}>Đặt lại</Text>
    </TouchableOpacity>
  );
  const completeJSX = (
    <View style={styles.cancelCont}>
      <TouchableOpacity>
        <Text style={[styles.buttonComplete, styles.reviewBtn]}>Đánh giá</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={[styles.buttonComplete, styles.againBtn]}>Đặt lại</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.topView}>
        <View style={styles.leftView}>
          <Text style={styles.title} numberOfLines={1}>
            {dish[0]}
          </Text>
          {dish.length > 1 ? (
            <Text style={styles.other}>và {dish.length - 1} món ăn khác</Text>
          ) : null}

          <View style={styles.deliveryCont}>
            <Image
              style={styles.deliveryImg}
              source={checkDelivery(delivery.status).image}
            />
            <Text
              style={[
                styles.deliveryStatus,
                {color: checkDelivery(delivery.status).color},
              ]}>
              {delivery.status}
            </Text>
            <Text style={styles.deliveryTime}>• {delivery.time}</Text>
          </View>

          <Text style={styles.total}>
            {Global.currencyFormat(total)}đ ({method})
          </Text>
        </View>

        <Image style={styles.arrowIcon} source={arrowRight} />
      </View>
      {delivery.status === 'Đã hủy'
        ? cancelJSX
        : delivery.status === 'Đã giao'
        ? completeJSX
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
    fontFamily: 'Roboto-Regular',
    color: mainColor,
    fontSize: width / 33,
  },
  buttonComplete: {
    paddingVertical: 10,
    fontSize: width / 33,
    width: width / 2,
    textAlign: 'center',
  },
  againBtn: {
    color: mainColor,
    fontFamily: 'Roboto-Bold',
  },
  reviewBtn: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    borderRightColor: '#e0e0e0',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderWidth: 0.5,
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
