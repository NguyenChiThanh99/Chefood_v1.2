/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, BackHandler, StyleSheet, FlatList} from 'react-native';
import Toast from 'react-native-root-toast';

import Global from '../../Global';
import MainHeader from '../home/cardView/MainHeader';
import NotificationItem from './cardView/NotificationItem';

var countExit = 0;

export default function Notification({navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
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
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const data = [
    {
      id: 1,
      chef: {
        avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
        name: 'Trần Thanh Đức',
      },
      delivery: {
        status: 'Đang giao hàng',
        time: '09:45 10/07/2020',
      },
      dish: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      total: 231000,
    },
    {
      id: 2,
      chef: {
        avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
        name: 'Trần Thanh Đức',
      },
      delivery: {
        status: 'Đang chuẩn bị',
        time: '09:45 10/07/2020',
      },
      dish: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      total: 231000,
    },
    {
      id: 3,
      chef: {
        avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
        name: 'Trần Thanh Đức',
      },
      delivery: {
        status: 'Đang xác nhận',
        time: '09:45 10/07/2020',
      },
      dish: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      total: 231000,
    },
    {
      id: 4,
      chef: {
        avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
        name: 'Trần Thanh Đức',
      },
      delivery: {
        status: 'Đã huỷ',
        time: '09:45 10/07/2020',
      },
      dish: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      total: 231000,
    },
    {
      id: 5,
      chef: {
        avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
        name: 'Trần Thanh Đức',
      },
      delivery: {
        status: 'Đã giao',
        time: '09:45 10/07/2020',
      },
      dish: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      total: 231000,
    },
    {
      id: 6,
      chef: {
        avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
        name: 'Trần Thanh Đức',
      },
      delivery: {
        status: 'Đang giao hàng',
        time: '09:45 10/07/2020',
      },
      dish: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      total: 231000,
    },
    {
      id: 7,
      chef: {
        avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
        name: 'Trần Thanh Đức',
      },
      delivery: {
        status: 'Đang xác nhận',
        time: '09:45 10/07/2020',
      },
      dish: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      total: 231000,
    },
    {
      id: 8,
      chef: {
        avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
        name: 'Trần Thanh Đức',
      },
      delivery: {
        status: 'Đang chuẩn bị',
        time: '09:45 10/07/2020',
      },
      dish: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      total: 231000,
    },
  ];

  const flatListItemSeparator = () => {
    return <View style={styles.line} />;
  };

  return (
    <View style={styles.wrapper}>
      <MainHeader navigation={navigation} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        ItemSeparatorComponent={flatListItemSeparator}
        renderItem={({item, index}) => {
          if (index === 0) {
            return (
              <View style={{marginTop: 10}}>
                <NotificationItem item={item} />
              </View>
            );
          } else if (index === data.length - 1) {
            return (
              <View style={{marginBottom: 10}}>
                <NotificationItem item={item} />
              </View>
            );
          } else {
            return (
              <View>
                <NotificationItem item={item} />
              </View>
            );
          }
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const {backgroundColor} = Global;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor,
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0,
    borderTopWidth: 0.5,
  },
});
