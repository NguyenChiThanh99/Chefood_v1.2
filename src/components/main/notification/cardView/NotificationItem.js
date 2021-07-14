/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Image as ImageLazy} from 'react-native-elements';

import Global from '../../../Global';
import imageHolder from '../../../../icons/imageHolder.png';

export default function NotificationItem(props) {
  const {chef, delivery, dish, total} = props.item;

  const shippingJSX = (
    <View style={{width: width - 30 - width / 13.5}}>
      <Text style={styles.title}>Đơn hàng đang được vận chuyển</Text>
      <Text style={styles.description}>
        Shipper đang vận chuyển đơn hàng{' '}
        <Text style={{fontFamily: 'Roboto-Bold'}}>{dish}</Text> giá{' '}
        <Text style={styles.price}>{Global.currencyFormat(total)}đ</Text> đến
        địa chỉ của bạn
      </Text>
    </View>
  );

  const prepareJSX = (
    <View style={{width: width - 30 - width / 13.5}}>
      <Text style={styles.title}>Đơn hàng đã được xác nhận</Text>
      <Text style={styles.description}>
        Đơn hàng đã được đầu bếp{' '}
        <Text style={{fontFamily: 'Roboto-Bold'}}>{chef.name}</Text> xác nhận và
        đang được chuẩn bị
      </Text>
    </View>
  );

  const confirmJSX = (
    <View style={{width: width - 30 - width / 13.5}}>
      <Text style={styles.title}>Đơn hàng đang chờ xác nhận</Text>
      <Text style={styles.description}>
        Đơn hàng <Text style={{fontFamily: 'Roboto-Bold'}}>{dish}</Text> giá{' '}
        <Text style={styles.price}>{Global.currencyFormat(total)}đ</Text> đang
        chờ đầu bếp <Text style={{fontFamily: 'Roboto-Bold'}}>{chef.name}</Text>{' '}
        xác nhận
      </Text>
    </View>
  );

  const cancelJSX = (
    <View style={{width: width - 30 - width / 13.5}}>
      <Text style={styles.title}>Đơn hàng đã huỷ thành công</Text>
      <Text style={styles.description}>
        Bạn đã huỷ thành công đơn hàng{' '}
        <Text style={{fontFamily: 'Roboto-Bold'}}>{dish}</Text> của đầu bếp{' '}
        <Text style={{fontFamily: 'Roboto-Bold'}}>{chef.name}</Text>
      </Text>
    </View>
  );

  const successJSX = (
    <View style={{width: width - 30 - width / 13.5}}>
      <Text style={styles.title}>Đơn hàng đã được giao thành công</Text>
      <Text style={styles.description}>
        Đơn hàng <Text style={{fontFamily: 'Roboto-Bold'}}>{dish}</Text> của đầu
        bếp <Text style={{fontFamily: 'Roboto-Bold'}}>{chef.name}</Text> đã được
        giao thành công
      </Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <ImageLazy
        PlaceholderContent={
          <Image style={styles.imageHolder} source={imageHolder} />
        }
        style={styles.avatar}
        source={{uri: chef.avatar}}
      />
      <View>
        {delivery.status === 'Đang giao hàng'
          ? shippingJSX
          : delivery.status === 'Đang chuẩn bị'
          ? prepareJSX
          : delivery.status === 'Đang xác nhận'
          ? confirmJSX
          : delivery.status === 'Đã huỷ'
          ? cancelJSX
          : successJSX}
        <Text style={styles.time}>{delivery.time}</Text>
      </View>
    </View>
  );
}

const {width, mainColor} = Global;
const styles = StyleSheet.create({
  price: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: width / 32.5,
    color: mainColor,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: width / 28.5,
    color: '#333333',
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: width / 32.5,
    color: '#4f4f4f',
    marginVertical: 8,
  },
  avatar: {
    width: width / 13.5,
    height: width / 13.5,
    borderRadius: width / 27,
    marginRight: 10,
  },
  imageHolder: {
    width: width / 13.5,
    height: width / 13.5,
    borderRadius: width / 27,
  },
  time: {
    fontFamily: 'Roboto-Regular',
    fontSize: width / 36,
    color: '#828282',
  },
  wrapper: {
    backgroundColor: 'white',
    padding: 10,
    paddingBottom: 15,
    flexDirection: 'row',
  },
});
