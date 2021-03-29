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
    deliveryStatus: 'Đang xác nhận',
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

  const total = (dish) => {
    var sum = 0;
    for (let i = 0; i < dish.length; i++) {
      sum += dish[i].price * dish[i].quantity;
    }
    return sum;
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
        {data.deliveryStatus === 'Đang xác nhận' ||
        data.deliveryStatus === 'Đang chuẩn bị' ||
        data.deliveryStatus === 'Đang giao hàng' ? (
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
        ) : null}

        {data.deliveryStatus === 'Đang xác nhận' ||
        data.deliveryStatus === 'Đang chuẩn bị' ||
        data.deliveryStatus === 'Đang giao hàng' ? (
          <View style={styles.orderTitleCont}>
            <Text style={styles.orderTitle}>{data.dish[0].name}</Text>
            <Text style={styles.orderTime}>{data.timeOrder}</Text>
          </View>
        ) : null}

        {data.deliveryStatus === 'Đã hủy' ||
        data.deliveryStatus === 'Đã giao' ? (
          <View
            style={
              data.deliveryStatus === 'Đã hủy'
                ? styles.canceledView
                : styles.completedView
            }>
            {data.deliveryStatus === 'Đã hủy' ? (
              <Text style={styles.cancelStatus}>ĐÃ HỦY</Text>
            ) : null}
            <Text style={styles.orderTitleCancel}>{data.dish[0].name}</Text>
            <Text style={styles.orderTimeCancel}>{data.timeOrder}</Text>
          </View>
        ) : null}

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

          <View style={styles.row2}>
            <Text style={styles.tempCalText}>
              Tạm tính ({data.dish.length} món)
            </Text>
            <Text style={styles.tempCalPrice}>
              {Global.currencyFormat(total(data.dish))}đ
            </Text>
          </View>
          <View style={styles.lineList} />

          <View style={[styles.row3, {marginTop: 31}]}>
            <Text style={styles.methodTitle}>Phương thức</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.methodImg}
                source={data.method === 'Tiền mặt' ? moneyIcon : cardIcon}
              />
              <Text style={styles.method}>{data.method}</Text>
            </View>
          </View>
          <View style={[styles.row3, {marginTop: 12}]}>
            <Text style={styles.methodTitle}>Thành tiền</Text>
            <Text style={styles.total}>
              {Global.currencyFormat(total(data.dish))}đ
            </Text>
          </View>

          <View style={styles.userInfo}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={styles.userInfoTitle}>Mã đơn hàng</Text>
                <Text style={styles.userInfoTitle}>Tên</Text>
                <Text style={styles.userInfoTitle}>Số điện thoại</Text>
                <Text style={styles.userInfoTitle}>Địa chỉ</Text>
              </View>
              <View style={{marginLeft: 32}}>
                <Text style={styles.userInfoText}>{data.id}</Text>
                <Text style={styles.userInfoText}>{data.user.name}</Text>
                <Text style={styles.userInfoText}>{data.user.phone}</Text>
                <Text style={styles.userInfoText}>{data.user.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {data.deliveryStatus === 'Đã hủy' ? (
        <View style={styles.bottomBtn}>
          <TouchableOpacity onPress={() => {}}>
            <LinearGradient
              style={styles.btn}
              colors={['#fb5a23', '#ffb038']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <View>
                <Text style={styles.btnText}>Đặt lại</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : null}

      {data.deliveryStatus === 'Đã giao' ? (
        <View style={styles.bottomBtn2} onPress={() => {}}>
          <TouchableOpacity
            style={styles.btnReview}
            onPress={() => navigation.navigate('REVIEW')}>
            <Text style={styles.btnReviewText}>Đánh giá</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <LinearGradient
              style={styles.btnAgain}
              colors={['#fb5a23', '#ffb038']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <View>
                <Text style={styles.btnText}>Đặt lại</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : null}

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
  mainColor,
  height,
  backgroundColor,
  heightHeader,
  backButton,
} = Global;
const styles = StyleSheet.create({
  bottomBtn: {
    backgroundColor: 'white',
    height: height / 11.5,
    justifyContent: 'center',
    padding: 10,
  },
  bottomBtn2: {
    backgroundColor: 'white',
    height: height / 11.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  btnReview: {
    borderRadius: 5,
    borderColor: '#828282',
    borderWidth: 1,
    width: width / 2 - 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAgain: {
    borderRadius: 5,
    width: width / 2 - 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnReviewText: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 30,
    color: '#828282',
    marginVertical: 10,
  },
  btnText: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 30,
    color: 'white',
    marginVertical: 10,
  },
  canceledView: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 5,
  },
  completedView: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: height / 6.7,
  },
  cancelStatus: {
    fontFamily: 'Roboto-Bold',
    color: '#ffffff',
    fontSize: width / 34,
    backgroundColor: '#bdbdbd',
    borderRadius: 2,
    paddingHorizontal: 18,
    paddingVertical: 3,
    marginBottom: 7,
    marginTop: 7,
  },
  orderTitleCancel: {
    fontFamily: 'Roboto-Bold',
    color: '#000000',
    fontSize: width / 21,
    width: width / 1.5,
    textAlign: 'center',
  },
  orderTimeCancel: {
    fontFamily: 'Roboto-Regular',
    color: '#4f4f4f',
    fontSize: width / 30,
    marginTop: 10,
  },
  userInfo: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: height / 15,
    marginBottom: 14,
  },
  userInfoTitle: {
    fontFamily: 'Roboto-Bold',
    color: '#4f4f4f',
    fontSize: width / 35,
    marginBottom: 7,
  },
  userInfoText: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 35,
    width: width / 1.5,
    marginBottom: 7,
  },
  total: {
    fontFamily: 'Roboto-Medium',
    color: mainColor,
    fontSize: width / 28,
  },
  method: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 30,
  },
  methodImg: {
    width: width / 9,
    height: height / 38,
    resizeMode: 'contain',
    marginRight: 8,
  },
  methodTitle: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 30,
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  tempCalText: {
    fontFamily: 'Roboto-Regular',
    color: '#4f4f4f',
    fontSize: width / 35,
  },
  tempCalPrice: {
    fontFamily: 'Roboto-Regular',
    color: '#4f4f4f',
    fontSize: width / 30,
  },
  row2: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  quantity: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 30,
    marginRight: 10,
  },
  name: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 30,
  },
  orderDetailCont: {
    backgroundColor: 'white',
    width,
  },
  chef: {
    marginLeft: 10,
    fontFamily: 'Roboto-Bold',
    color: '#333333',
    fontSize: width / 28,
    marginTop: 2,
    marginBottom: 2,
  },
  lineList: {
    borderColor: '#bdbdbd',
    borderWidth: 0,
    borderTopWidth: 0.5,
    marginHorizontal: 15,
  },
  orderTitleCont: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: width / 5,
    paddingVertical: 20,
  },
  orderTitle: {
    fontFamily: 'Roboto-Bold',
    color: '#333333',
    fontSize: width / 26.5,
    textAlign: 'center',
  },
  orderTime: {
    fontFamily: 'Roboto-Regular',
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
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 34,
    textAlign: 'center',
    width: width / 6,
    marginTop: 5,
  },
  statusTextActive: {
    fontFamily: 'Roboto-Bold',
    fontSize: width / 34,
    textAlign: 'center',
    width: width / 6,
    marginTop: 5,
    color: mainColor,
  },
  deliveryBottomView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    color: '#000000',
    fontSize: width / 19.2,
  },
  description: {
    fontFamily: 'Roboto-Regular',
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
    fontFamily: 'Roboto-Medium',
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
