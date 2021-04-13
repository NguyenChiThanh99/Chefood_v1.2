/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Global from '../../Global';
import get_order_detail from '../../../apis/get_order_detail';
import {updateCart} from '../../../../actions';

import closeIcon from '../../../icons/close.png';
import moneyIcon from '../../../icons/money.png';
import cardIcon from '../../../icons/atm.png';
import chefImage from '../../../images/cook.png';
import deliveryImage from '../../../images/ship.png';

export default function OrderDetail({navigation, route}) {
  useEffect(() => {
    getOrdersDetail();
  }, []);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [dataDetail, setDataDetail] = useState([]);
  const {
    order_name,
    id_order,
    status,
    date,
    total_money,
    payment,
    checkcomment,
  } = route.params.order;

  const data = {
    id: id_order,
    deliveryStatus: status,
    timeOrder: Global.longTimeFormat(date),
    method: payment,
    chef: dataDetail.length !== 0 ? dataDetail.chef.chef_name : '',
    user:
      dataDetail.length !== 0
        ? dataDetail.user
        : {
            address: '',
            phone: '',
            user_name: '',
          },
    dish: dataDetail.length !== 0 ? dataDetail.dishes : [],
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

  const checkDelivery = (statusDelivery) => {
    switch (statusDelivery) {
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
    navigation.navigate('CART', {address: ''});
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

  const confirmJSX = (
    <TouchableOpacity style={styles.cancelBtn}>
      <Text style={styles.cancelText}>Hủy đơn hàng</Text>
    </TouchableOpacity>
  );
  const prepareJSX = <Image style={styles.chefImage} source={chefImage} />;
  const deliveryJSX = (
    <Image style={styles.deliveryImage} source={deliveryImage} />
  );

  const Loading = (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} color="#fb5a23" size="small" />
    </View>
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
            <Text style={styles.orderTitle}>{order_name}</Text>
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
            <Text style={styles.orderTitleCancel}>{order_name}</Text>
            <Text style={styles.orderTimeCancel}>{data.timeOrder}</Text>
          </View>
        ) : null}

        <View style={styles.orderDetailCont}>
          {dataDetail.length !== 0 ? (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CHEF', {
                    id: dataDetail.chef.idchef,
                    fromDish: true,
                  })
                }>
                <Text style={styles.chef}>{data.chef}</Text>
              </TouchableOpacity>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data.dish}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <TouchableOpacity
                        style={styles.row}
                        onPress={() => {
                          navigation.navigate('DISH', {
                            dish: {
                              dish: {
                                ingredients: '',
                                name: '',
                                prepare: '',
                                perform: '',
                                picture:
                                  'https://res.cloudinary.com/chefood/image/upload/v1614660312/cover_photo/cover_photo_tmgnhx.png',
                              },
                              dishofchef: {
                                order: 0,
                                price: 0,
                                iddishofchef: item.iddishofchef,
                              },
                            },
                            id: item.iddishofchef,
                          });
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.quantity}>{item.amount}x</Text>
                          <Text
                            style={[styles.name, {width: width / 1.5}]}
                            numberOfLines={1}>
                            {item.dish_name}
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
                keyExtractor={(item) => item.iddishofchef}
              />
            </View>
          ) : (
            <View>{Loading}</View>
          )}

          <View style={styles.row2}>
            <Text style={styles.tempCalText}>
              Tạm tính ({data.dish.length} món)
            </Text>
            <Text style={styles.tempCalPrice}>
              {Global.currencyFormat(total_money)}đ
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
              {Global.currencyFormat(total_money)}đ
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
                <Text style={styles.userInfoText}>{data.user.user_name}</Text>
                <Text style={styles.userInfoText}>{data.user.phone}</Text>
                <Text style={styles.userInfoText}>{data.user.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {data.deliveryStatus === 'Đã hủy' || checkcomment === 1 ? (
        <View style={styles.bottomBtn}>
          <TouchableOpacity onPress={() => orderAgain()}>
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

      {data.deliveryStatus === 'Đã giao' && checkcomment === 0 ? (
        <View style={styles.bottomBtn2} onPress={() => {}}>
          <TouchableOpacity
            style={styles.btnReview}
            onPress={() => {
              if (dataDetail.length !== 0) {
                navigation.navigate('REVIEW', {
                  chef: dataDetail.chef,
                  dish: data.dish,
                  orderInfo: route.params.order,
                });
              }
            }}>
            <Text style={styles.btnReviewText}>Đánh giá</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => orderAgain()}>
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
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
