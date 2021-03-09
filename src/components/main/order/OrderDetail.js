/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from '../../Global';

import closeIcon from '../../../icons/close.png';
import moneyIcon from '../../../icons/money.png';
import cardIcon from '../../../icons/atm.png';
import chefImage from '../../../images/cook.png';
import deliveryImage from '../../../images/ship.png';

export default function OrderDetail({navigation}) {
  const data = {
    id: '1547865946145787',
    deliveryStatus: 'Đang giao hàng',
    timeOrder: '13:06 26/10/2020',
    method: 'Tiền mặt',
    chef: 'Hoàng Phương Yến',
    user: {
      name: 'Lê Quốc Việt',
      phone: '0834999373',
      address: '35/39 Bế Văn Cấm, Tân Kiểng, Quận 7, Thành phố Hồ Chí Minh',
    },
    dish: [
      {
        id: 1,
        name: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
        quantity: 1,
        price: 110000,
      },
      {
        id: 5,
        name: 'Mỳ quảng tôm thịt nướng thịt gà chính gốc miền Trung',
        quantity: 2,
        price: 190000,
      },
    ],
  };

  const checkDelivery = (status) => {
    switch (status) {
      case 'Đang xác nhận':
        return {
          description: 'Đơn hàng đang chờ xác nhận',
          title: 'Đang chờ đầu bếp',
        };
      case 'Đang chuẩn bị':
        return {
          description: 'Đầu bếp đã xác nhận',
          title: 'Đang chuẩn bị đơn hàng',
        };
      default:
        return {
          description: 'Shipper đã lấy hàng',
          title: 'Đơn hàng đang đến bạn',
        };
    }
  };

  const confirmJSX = (
    <TouchableOpacity style={styles.cancelBtn}>
      <Text style={styles.cancelText}>Hủy đơn hàng</Text>
    </TouchableOpacity>
  );
  const prepareJSX = <Image style={styles.chefImage} source={chefImage} />;
  const deliveryJSX = (
    <Image style={styles.deliveryImage} source={deliveryImage} />
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.deliveryStatus}>
          <View style={styles.deliveryTopView}>
            <Text style={styles.description}>
              {checkDelivery(data.deliveryStatus).description}
            </Text>
            <Text style={styles.title}>
              {checkDelivery(data.deliveryStatus).title}
            </Text>

            {data.deliveryStatus === 'Đang giao hàng'
              ? deliveryJSX
              : data.deliveryStatus === 'Đang xác nhận'
              ? confirmJSX
              : prepareJSX}
          </View>

          <View>
            <LinearGradient
              style={styles.line}
              colors={['#fb5a23', '#ffb038']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />

            <View style={styles.deliveryBottomView}>
              <Text
                style={
                  data.deliveryStatus === 'Đang xác nhận'
                    ? styles.statusTextActive
                    : styles.statusText
                }>
                Đang xác nhận
              </Text>
              <Text
                style={
                  data.deliveryStatus === 'Đang chuẩn bị'
                    ? styles.statusTextActive
                    : styles.statusText
                }>
                Đang chuẩn bị
              </Text>
              <Text
                style={
                  data.deliveryStatus === 'Đang giao hàng'
                    ? styles.statusTextActive
                    : styles.statusText
                }>
                Đang giao hàng
              </Text>
              <Text style={styles.statusText}>Đã giao hàng</Text>
            </View>
          </View>
        </View>

        <View style={styles.orderTitleCont}>
          <Text style={styles.orderTitle}>{data.dish[0].name}</Text>
          <Text style={styles.orderTime}>{data.timeOrder}</Text>
        </View>

        <View style={styles.orderDetailCont}>
          <Text style={styles.chef}>{data.chef}</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.dish}
            renderItem={({item, index}) => {
              return (
                <View>
                  <TouchableOpacity style={styles.row}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.quantity}>{item.quantity}x</Text>
                      <Text
                        style={[styles.name, {width: width / 1.5}]}
                        numberOfLines={1}>
                        {item.name}
                      </Text>
                    </View>
                    <Text style={styles.name}>
                      {Global.currencyFormat(item.price)}đ
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.lineList} />
                </View>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}>
          <Image source={closeIcon} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const {
  width,
  fontFamily,
  mainColor,
  height,
  backgroundColor,
  heightHeader,
  backButton,
} = Global;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  quantity: {
    fontFamily,
    color: '#828282',
    fontSize: width / 30,
    marginRight: 10,
  },
  name: {
    fontFamily,
    color: '#333333',
    fontSize: width / 30,
  },
  orderDetailCont: {
    backgroundColor: 'white',
    width,
  },
  chef: {
    marginLeft: 10,
    fontFamily,
    color: '#333333',
    fontSize: width / 28,
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 2,
  },
  lineList: {
    borderColor: '#bdbdbd',
    borderWidth: 0.25,
    marginHorizontal: 15,
  },
  orderTitleCont: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: width / 5,
    paddingVertical: 20,
  },
  orderTitle: {
    fontFamily,
    color: '#333333',
    fontSize: width / 26.5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orderTime: {
    fontFamily,
    color: '#4f4f4f',
    fontSize: width / 30,
    textAlign: 'center',
    marginTop: 8,
  },
  deliveryImage: {
    width: width / 2,
    height: height / 9,
    resizeMode: 'contain',
    marginTop: height / 15.5,
  },
  chefImage: {
    width: width / 2,
    height: height / 7.7,
    resizeMode: 'contain',
    marginTop: height / 23,
  },
  line: {
    height: 1,
    width,
  },
  statusText: {
    fontFamily,
    color: '#828282',
    fontSize: width / 34,
    textAlign: 'center',
    width: width / 6,
    marginTop: 5,
  },
  statusTextActive: {
    fontFamily,
    fontSize: width / 34,
    textAlign: 'center',
    width: width / 6,
    marginTop: 5,
    color: mainColor,
    fontWeight: 'bold',
  },
  deliveryBottomView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily,
    color: '#000000',
    fontSize: width / 19.2,
    fontWeight: 'bold',
  },
  description: {
    fontFamily,
    color: '#828282',
    fontSize: width / 30,
    marginBottom: 2,
  },
  deliveryTopView: {
    alignItems: 'center',
    padding: 10,
  },
  deliveryStatus: {
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'space-between',
    height: height / 2.6,
  },
  cancelBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: width / 11,
    borderColor: '#828282',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: height / 34,
  },
  cancelText: {
    fontFamily,
    color: '#828282',
    fontSize: width / 30,
  },
  scroll: {
    marginTop: heightHeader,
  },
  wrapper: {
    backgroundColor,
    flex: 1,
  },
  backIcon: {
    width: backButton,
    height: backButton,
  },
  header: {
    height: heightHeader,
    width,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
  },
});
