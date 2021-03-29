/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import {SwipeListView} from 'react-native-swipe-list-view';
import stripe from 'tipsi-stripe';
import Toast from 'react-native-root-toast';
import {useSelector} from 'react-redux';

import Global from '../../Global';
import CartItem from './cardView/CartItem';

import arrowBack from '../../../icons/arrow_back_ios-fb5a23.png';
import editIcon from '../../../icons/edit.png';
import atmIcon from '../../../icons/atm.png';
import moneyIcon from '../../../icons/money.png';
import expandMoreArrow from '../../../icons/expand_less.png';
import expandLessArrow from '../../../icons/expand_more.png';

stripe.setOptions({
  publishableKey: 'pk_test_nNsT1Tapm2K01DErmIgoCYka00Xl2AhJAY',
});

export default function Cart({navigation}) {
  const [total, setTotal] = useState(636000);
  const [numOrder, setNumOrder] = useState(0);
  const [method, setMethod] = useState('Tiền mặt');
  const [arrowIcon, setArrowIcon] = useState(expandMoreArrow);
  const [itemSelected, setItemSelected] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    numOrderHandel();
  }, []);

  const shipmentInfo = {
    name: user.userInfo.name,
    address: user.userInfo.address,
    phone: user.userInfo.phone,
  };
  const optionMethod = ['Tiền mặt', 'Thẻ'];
  const cartData = [
    {
      id: 1,
      dish: {
        id: 1,
        image:
          'https://image.xahoi.com.vn/news/2017/11/09/bun-rieu-cua-suon-sun-cach-lam-bun-rieu-suon-sun-12-1509075771-width650height488-xahoi.com.vn-w650-h488.jpg',
        name: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
        chef: 'Trần Bảo Toàn',
        address:
          '1400 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh',
        ingredients:
          '500 ml    Sữa tươi  \n500 ml    Nước sôi  \n240 ml    Kem whipping  \n20 gram    Trà đen  \n1 thanh    Quế  \n1 cái    Hoa hồi  \n1 quả    Bạch đậu khấu  \n10 quả    Bạch quả  \n3 thìa canh    Đường nâu  \n2 thìa canh    Đường trắng  \n1 thìa cà phê    Vani  \n2 thìa cà phê    Nhục đậu khấu  \n1/2 thìa cà phê    Bột gừng  \n2 thìa cà phê    Bột quế',
        price: 149000,
        prepare: ' Chuẩn bị: 10 phút',
        perform: ' Thực hiện: 30 phút',
        numOrder: '20',
      },
      quantity: 1,
    },
    {
      id: 2,
      dish: {
        id: 5,
        image:
          'https://image.xahoi.com.vn/news/2017/11/09/bun-rieu-cua-suon-sun-cach-lam-bun-rieu-suon-sun-12-1509075771-width650height488-xahoi.com.vn-w650-h488.jpg',
        name: 'Hủ tiếu nam vang chuẩn vị nhà làm ngon như nhà làm',
        chef: 'Nguyễn Chí Thanh',
        address:
          '1400 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh',
        ingredients:
          '500 ml    Sữa tươi  \n500 ml    Nước sôi  \n240 ml    Kem whipping  \n20 gram    Trà đen  \n1 thanh    Quế  \n1 cái    Hoa hồi  \n1 quả    Bạch đậu khấu  \n10 quả    Bạch quả  \n3 thìa canh    Đường nâu  \n2 thìa canh    Đường trắng  \n1 thìa cà phê    Vani  \n2 thìa cà phê    Nhục đậu khấu  \n1/2 thìa cà phê    Bột gừng  \n2 thìa cà phê    Bột quế',
        price: 200000,
        prepare: ' Chuẩn bị: 10 phút',
        perform: ' Thực hiện: 30 phút',
        numOrder: '20',
      },
      quantity: 1,
    },
    {
      id: 3,
      dish: {
        id: 4,
        image:
          'https://image.xahoi.com.vn/news/2017/11/09/bun-rieu-cua-suon-sun-cach-lam-bun-rieu-suon-sun-12-1509075771-width650height488-xahoi.com.vn-w650-h488.jpg',
        name: 'Tôm kho mắm',
        chef: 'Nguyễn Trí Hiền',
        address:
          '1400 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh',
        ingredients:
          '500 ml    Sữa tươi  \n500 ml    Nước sôi  \n240 ml    Kem whipping  \n20 gram    Trà đen  \n1 thanh    Quế  \n1 cái    Hoa hồi  \n1 quả    Bạch đậu khấu  \n10 quả    Bạch quả  \n3 thìa canh    Đường nâu  \n2 thìa canh    Đường trắng  \n1 thìa cà phê    Vani  \n2 thìa cà phê    Nhục đậu khấu  \n1/2 thìa cà phê    Bột gừng  \n2 thìa cà phê    Bột quế',
        price: 213000,
        prepare: ' Chuẩn bị: 10 phút',
        perform: ' Thực hiện: 30 phút',
        numOrder: '20',
      },
      quantity: 1,
    },
  ];

  const orderHandle = () => {
    if (method === 'Thẻ') {
      paymentByCard();
    }
  };

  const paymentByCard = () => {
    return stripe
      .paymentRequestWithCardForm()
      .then((stripeTokenInfo) => {
        return {
          //Gọi Api thanh toán online
        };
      })
      .then(() => {
        //Thanh toán thành công
        console.log('Payment succeeded!');
        navigation.navigate('ORDER_DETAIL');
      })
      .catch((error) => {
        Toast.show('Thanh toán thất bại:\n' + error, {
          position: -20,
          duration: 2500,
        });
        //Thanh toán thất bại
        console.log('Payment failed', {error});
      })
      .finally(() => {});
  };

  const renderItemSeparator = () => {
    return <View style={styles.line} />;
  };

  const renderItem = (data) => <CartItem cartItem={data.item} />;

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <LinearGradient
        style={styles.backBtn}
        colors={['#fb5a23', '#ffb038']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => setItemSelected({rowMap: rowMap, data: data.item})}>
          <Text style={styles.backText}>Xóa</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const deleteItem = () => {
    itemSelected.rowMap[itemSelected.data.id].closeRow();
    setItemSelected(null);
  };

  const numOrderHandel = () => {
    var temp = [];
    for (let i = 0; i < cartData.length; i++) {
      const found = temp.find((element) => element === cartData[i].dish.chef);
      if (found === undefined) {
        temp.push(cartData[i].dish.chef);
      }
    }
    setNumOrder(temp.length);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={arrowBack} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Giỏ hàng</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.cartView, {padding: 15}]}>
          <Text style={styles.shipmentText}>Giao hàng đến</Text>
          <View style={styles.shipmentCont}>
            <View style={styles.shipmentInfo}>
              <Text style={styles.address}>{shipmentInfo.address}</Text>
              <Text style={styles.personalInfo}>
                {shipmentInfo.name} | {shipmentInfo.phone}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('CHANGE_ADDRESS')}>
              <View style={styles.changeCont}>
                <Image style={styles.changeIcon} source={editIcon} />
                <Text style={styles.changeText}>Thay đổi</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cartView}>
          <Text style={styles.cardViewTitle}>Đơn hàng của bạn</Text>
          <SwipeListView
            contentContainerStyle={styles.listHotel}
            data={cartData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            ItemSeparatorComponent={renderItemSeparator}
            rightOpenValue={-width / 6}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.provisionalSums}>
            <View style={styles.proSumsLine}>
              <Text style={styles.proSumsText}>
                Tạm tính ({cartData.length} món)
              </Text>
              <Text style={[styles.proSumsText, {fontWeight: 'bold'}]}>
                {Global.currencyFormat(total)}đ
              </Text>
            </View>
            <Text style={styles.proSumsText}>
              Sẽ có {numOrder} đơn hàng do {numOrder} đầu bếp thực hiện
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomView}>
        <View style={styles.bottomItem}>
          <Text style={styles.bottomText}>Phương thức</Text>
          <View style={styles.dropdownBtn}>
            <Image
              style={styles.methodImg}
              source={method === 'Tiền mặt' ? moneyIcon : atmIcon}
            />
            <ModalDropdown
              style={styles.dropdownCont}
              dropdownStyle={styles.dropdownList}
              options={optionMethod}
              defaultValue={method}
              onDropdownWillShow={() => setArrowIcon(expandLessArrow)}
              onDropdownWillHide={() => setArrowIcon(expandMoreArrow)}
              onSelect={(index) => setMethod(optionMethod[index])}
              showsVerticalScrollIndicator={false}>
              <View style={styles.dropdownBtn}>
                <Text style={styles.dropdownText}>{method}</Text>
                <Image style={styles.arrowIcon} source={arrowIcon} />
              </View>
            </ModalDropdown>
          </View>
        </View>
        <View style={[styles.bottomItem, {marginTop: 15}]}>
          <Text style={styles.bottomText}>Thành tiền</Text>
          <Text style={styles.total}>
            {Global.currencyFormat(total.toString())}đ
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            orderHandle();
          }}>
          <LinearGradient
            style={styles.btn}
            colors={['#fb5a23', '#ffb038']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View>
              <Text style={styles.btnText}>Đặt hàng</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={itemSelected !== null ? true : false}>
        <View style={styles.modalCont}>
          <View style={styles.modal}>
            <Text style={styles.title}>Xóa món ăn</Text>
            <Text style={{marginTop: 14}}>
              <Text style={styles.content}>Bạn có chắc chắn muốn xóa món </Text>
              <Text style={[styles.content, {fontWeight: 'bold'}]}>
                {itemSelected !== null ? itemSelected.data.dish.name : ''}
              </Text>
              <Text style={styles.content}> khỏi giỏ hàng?</Text>
            </Text>
            <View style={styles.btnCont}>
              <TouchableOpacity
                onPress={() => {
                  itemSelected.rowMap[itemSelected.data.id].closeRow();
                  setItemSelected(null);
                }}>
                <Text style={styles.btnCancel}>HỦY</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem()}>
                <Text style={styles.btnAgree}>ĐỒNG Ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const {
  width,
  height,
  heightHeader,
  backButton,
  backgroundColor,
  mainColor,
} = Global;
const styles = StyleSheet.create({
  modalCont: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width / 1.28,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontFamily: 'Roboto-Black',
    color: '#000000',
    fontSize: width / 20,
  },
  content: {
    fontFamily: 'Roboto-Light',
    color: '#333333',
    fontSize: width / 27,
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
  },
  btnCancel: {
    fontFamily: 'Roboto-Medium',
    color: '#828282',
    fontSize: width / 28,
  },
  btnAgree: {
    fontFamily: 'Roboto-Medium',
    color: mainColor,
    fontSize: width / 28,
    marginLeft: 40,
  },
  provisionalSums: {
    padding: 15,
    borderColor: '#bdbdbd',
    borderTopWidth: 0.5,
  },
  proSumsLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  proSumsText: {
    fontFamily: 'Roboto-Regular',
    color: '#4f4f4f',
    fontSize: width / 31,
  },
  backBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: width / 6,
  },
  backText: {
    color: '#fff',
    textAlign: 'center',
  },
  rowBack: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cardViewTitle: {
    fontFamily: 'Roboto-Light',
    color: '#000000',
    fontSize: width / 26,
    margin: 10,
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0.25,
  },
  methodImg: {
    width: width / 11,
    height: width / 19,
    resizeMode: 'contain',
    marginRight: 10,
  },
  arrowIcon: {
    width: width / 18,
    height: width / 18,
  },
  dropdownCont: {
    width: width / 4.5,
    flexDirection: 'row',
  },
  dropdownBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownText: {
    width: width / 6.7,
    marginRight: 10,
    color: '#333333',
    fontFamily: 'Roboto-Regular',
    fontSize: width / 30,
  },
  dropdownList: {
    height: 75,
  },
  bottomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomText: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 30,
  },
  total: {
    fontFamily: 'Roboto-Medium',
    color: mainColor,
    fontSize: width / 28,
  },
  bottomView: {
    backgroundColor: 'white',
    padding: 15,
  },
  btn: {
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 29,
    color: 'white',
    marginVertical: 10,
  },
  shipmentText: {
    fontFamily: 'Roboto-Medium',
    color: '#828282',
    fontSize: width / 29,
    marginBottom: 2,
  },
  shipmentCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shipmentInfo: {
    width: width / 1.35,
  },
  personalInfo: {
    fontFamily: 'Roboto-Bold',
    color: '#4f4f4f',
    fontSize: width / 30,
    marginTop: 5,
  },
  changeCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  changeIcon: {
    width: width / 30,
    height: width / 30,
    marginRight: 3,
  },
  changeText: {
    fontFamily: 'Roboto-Medium',
    color: '#2f80ed',
    fontSize: width / 36,
  },
  address: {
    fontFamily: 'Roboto-Medium',
    color: '#219653',
    fontSize: width / 26,
  },
  cartView: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  wrapper: {
    backgroundColor,
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    height: heightHeader,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 10,
  },
  backIcon: {
    width: backButton,
    height: backButton,
  },
  headerText: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 24,
    marginLeft: 10,
  },
});
