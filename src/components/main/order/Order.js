/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  BackHandler,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-root-toast';

import Global from '../../Global';
import MainHeader from '../home/cardView/MainHeader';
import OrderItem from './cardView/OrderItem';

var countExit = 0;

export default function Order({navigation, route}) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route.params === undefined) {
          if (countExit === 0) {
            countExit += 1;
            Toast.show('Chạm lần nữa để thoát', {
              position: 0,
              duration: 2000,
            });
          } else {
            BackHandler.exitApp();
          }

          const timer = setTimeout(() => {
            countExit = 0;
          }, 2000);
          return () => clearTimeout(timer);
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const dataOrder = [
    {
      id: 1,
      delivery: {status: 'Đang giao hàng', time: '13:06 26/10/2020'},
      total: 594100,
      method: 'Tiền mặt',
      dish: [
        'Mỳ Quảng tôm thịt nướng thịt gà trứng cút',
        'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
        'Cá ba sa chiên xừ sốt chua ngọt',
        'Mỳ vịt tiềm nấm đông cô, đậu hũ, táo',
      ],
    },
    {
      id: 2,
      delivery: {status: 'Đang chuẩn bị', time: '13:06 26/10/2020'},
      total: 129000,
      method: 'Tiền mặt',
      dish: [
        'Mỳ Quảng tôm thịt nướng thịt gà trứng cút',
        'Mỳ vịt tiềm nấm đông cô, đậu hũ, táo',
      ],
    },
    {
      id: 3,
      delivery: {status: 'Đang xác nhận', time: '13:06 26/10/2020'},
      total: 134000,
      method: 'Tiền mặt',
      dish: ['Thịt heo ba rọi kho dưa cải chua tỏi ớt'],
    },
    {
      id: 4,
      delivery: {status: 'Đã hủy', time: '13:06 26/10/2020'},
      total: 213400,
      method: 'Tiền mặt',
      dish: [
        'Mỳ Quảng tôm thịt nướng thịt gà trứng cút',
        'Cá ba sa chiên xừ sốt chua ngọt',
        'Mỳ vịt tiềm nấm đông cô, đậu hũ, táo',
      ],
    },
    {
      id: 5,
      delivery: {status: 'Đã giao', time: '13:06 26/10/2020'},
      total: 402000,
      method: 'Thẻ',
      dish: [
        'Mỳ Quảng tôm thịt nướng thịt gà trứng cút',
        'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
        'Cá ba sa chiên xừ sốt chua ngọt',
        'Mỳ vịt tiềm nấm đông cô, đậu hũ, táo',
      ],
    },
    {
      id: 6,
      delivery: {status: 'Đã giao', time: '13:06 26/10/2020'},
      total: 594100,
      method: 'Tiền mặt',
      dish: [
        'Cá ba sa chiên xừ sốt chua ngọt',
        'Mỳ Quảng tôm thịt nướng thịt gà trứng cút',
        'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      ],
    },
    {
      id: 7,
      delivery: {status: 'Đã hủy', time: '13:06 26/10/2020'},
      total: 159000,
      method: 'Thẻ',
      dish: ['Mỳ vịt tiềm nấm đông cô, đậu hũ, táo'],
    },
    {
      id: 8,
      delivery: {status: 'Đã giao', time: '13:06 26/10/2020'},
      total: 594100,
      method: 'Tiền mặt',
      dish: [
        'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
        'Mỳ Quảng tôm thịt nướng thịt gà trứng cút',
      ],
    },
  ];

  return (
    <View style={styles.wrapper}>
      <MainHeader navigation={navigation} />

      <FlatList
        style={styles.listStyle}
        showsVerticalScrollIndicator={false}
        data={dataOrder}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ORDER_DETAIL', {order: item.id})
              }>
              <OrderItem order={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const {backgroundColor} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor,
    flex: 1,
  },
  listStyle: {
    marginBottom: 10,
  },
});
