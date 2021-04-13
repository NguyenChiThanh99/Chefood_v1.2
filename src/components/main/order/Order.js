/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  BackHandler,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {useSelector} from 'react-redux';

import Global from '../../Global';
import MainHeader from '../home/cardView/MainHeader';
import OrderItem from './cardView/OrderItem';
import get_orders from '../../../apis/get_orders';

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

      var interval = setInterval(() => {
        getOrders(0, true);
      }, 3000);
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        clearInterval(interval);
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  useEffect(() => {
    getOrders(0, false);
  }, []);

  const user = useSelector((state) => state.user);
  const [dataOrders, setDataOrders] = useState([]);
  const [pageOrders, setPageOrders] = useState(0);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const getOrders = (page, backgound) => {
    if (!backgound) {
      setLoadingOrder(true);
    }
    get_orders
      .get_orders(user.token, page)
      .then((responseJson) => {
        if (!backgound) {
          setLoadingOrder(false);
        }
        if (responseJson.length === 0 && page !== 0) {
          return Toast.show('Đã tải đến cuối danh sách', {
            position: -20,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataOrders(responseJson);
            setPageOrders(1);
          } else {
            setDataOrders(dataOrders.concat(responseJson));
            setPageOrders(pageOrders + 1);
          }
        }
      })
      .catch((err) => {
        if (!backgound) {
          setLoadingOrder(false);
        }
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const Loading = (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} color="#fb5a23" size="small" />
    </View>
  );

  const bodyJSX = () => {
    if (dataOrders.length === 0 && loadingOrder) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height / 1.2,
          }}>
          {Loading}
        </View>
      );
    } else if (dataOrders.length === 0) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height / 1.2,
          }}>
          <Text style={styles.noComment}>Bạn chưa có đơn đặt hàng nào</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          style={styles.listStyle}
          showsVerticalScrollIndicator={false}
          data={dataOrders}
          ListFooterComponent={
            <View style={{marginTop: 10, backgroundColor: 'white'}}>
              {loadingOrder ? (
                <View style={{paddingVertical: 4.5}}>{Loading}</View>
              ) : (
                <TouchableOpacity
                  onPress={() => getOrders(pageOrders, false)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.viewMoreTextVertical}>Xem thêm</Text>
                </TouchableOpacity>
              )}
            </View>
          }
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ORDER_DETAIL', {order: item})
                }>
                <OrderItem order={item} navigation={navigation} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id_order}
        />
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <MainHeader
        navigation={navigation}
        fromUser={route.params !== undefined ? true : false}
      />

      {bodyJSX()}
    </View>
  );
}

const {backgroundColor, height, width} = Global;
const styles = StyleSheet.create({
  viewMoreTextVertical: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 34,
    paddingVertical: 6,
  },
  noComment: {
    fontFamily: 'Roboto-Regular',
    fontSize: width / 30,
    color: '#828282',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor,
    flex: 1,
  },
  listStyle: {
    marginBottom: 10,
  },
});
