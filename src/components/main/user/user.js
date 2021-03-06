/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {useSelector} from 'react-redux';

import Global from '../../Global';
import MainHeader from '../home/cardView/MainHeader';

import arrowRight from '../../../icons/arrow_right-82.png';
import phoneIcon from '../../../icons/phone-82.png';
import emailIcon from '../../../icons/mail-82.png';
import historyIcon from '../../../icons/history-gradient.png';
import bookmarkIcon from '../../../icons/bookmark-gradient.png';
import chefIcon from '../../../icons/person_add_alt-gradient.png';
import settingIcon from '../../../icons/settings-gradient.png';
import logoutIcon from '../../../icons/logout-gradient.png';

var countExit = 0;

export default function User({navigation}) {
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

  const [modal, setModal] = useState(false);
  const user = useSelector((state) => state.user);

  const logoutHandle = () => {
    setModal(false);
    BackHandler.exitApp();
  };

  return (
    <View style={styles.wrapper}>
      <MainHeader navigation={navigation} />

      <TouchableOpacity
        style={[styles.userCont, styles.cardView]}
        onPress={() => navigation.navigate('CHANGE_INFORMATION')}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={styles.avatar} source={{uri: user.avatar}} />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <View style={[styles.infoRow, {marginBottom: 3}]}>
              <Image style={styles.infoRowImg} source={emailIcon} />
              <Text style={styles.infoRowText}>{user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Image style={styles.infoRowImg} source={phoneIcon} />
              <Text style={styles.infoRowText}>{user.phone}</Text>
            </View>
          </View>
        </View>
        <Image style={styles.arrow} source={arrowRight} />
      </TouchableOpacity>

      <View style={styles.cardView}>
        <TouchableOpacity
          style={styles.rowCont}
          onPress={() => navigation.navigate('ORDER', {fromUser: true})}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.rowImg} source={historyIcon} />
            <Text style={styles.rowText}>Lịch sử giao dịch</Text>
          </View>
          <Image style={styles.arrow} source={arrowRight} />
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity
          style={styles.rowCont}
          onPress={() => navigation.navigate('SAVED_DISH')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.rowImg} source={bookmarkIcon} />
            <Text style={styles.rowText}>Món ăn đã lưu</Text>
          </View>
          <Image style={styles.arrow} source={arrowRight} />
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity
          style={styles.rowCont}
          onPress={() => navigation.navigate('SAVED_CHEF')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={[styles.rowImg, {marginLeft: 3}]} source={chefIcon} />
            <Text style={[styles.rowText, {marginLeft: -3}]}>
              Đầu bếp đã lưu
            </Text>
          </View>
          <Image style={styles.arrow} source={arrowRight} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardView}>
        <TouchableOpacity
          style={styles.rowCont}
          onPress={() => navigation.navigate('SETTING')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.rowImg} source={settingIcon} />
            <Text style={styles.rowText}>Cài đặt</Text>
          </View>
          <Image style={styles.arrow} source={arrowRight} />
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity
          style={styles.rowCont}
          onPress={() => {
            setModal(true);
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.rowImg} source={logoutIcon} />
            <Text style={styles.rowText}>Đăng xuất</Text>
          </View>
          <Image style={styles.arrow} source={arrowRight} />
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={modal}>
        <View style={styles.modalCont}>
          <View style={styles.modal}>
            <Text style={styles.title}>Đăng xuất</Text>
            <Text style={styles.content}>
              Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
            </Text>
            <View style={styles.btnCont}>
              <TouchableOpacity onPress={() => setModal(false)}>
                <Text style={styles.btnCancel}>HỦY</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logoutHandle()}>
                <Text style={styles.btnAgree}>ĐỒNG Ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const {width, fontFamily, backgroundColor, mainColor} = Global;
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
    fontFamily,
    color: '#000000',
    fontSize: width / 20,
    fontWeight: 'bold',
  },
  content: {
    fontFamily,
    color: '#333333',
    fontSize: width / 27,
    marginTop: 12,
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
  },
  btnCancel: {
    fontFamily,
    color: '#828282',
    fontSize: width / 28,
  },
  btnAgree: {
    fontFamily,
    color: mainColor,
    fontSize: width / 28,
    marginLeft: 40,
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0.25,
    marginHorizontal: 10,
  },
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    marginRight: 15,
  },
  rowImg: {
    width: width / 15,
    height: width / 15,
    marginRight: 10,
  },
  rowText: {
    fontFamily,
    color: '#333333',
    fontSize: width / 30,
  },
  userCont: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: width / 6,
    height: width / 6,
    borderRadius: width / 12,
    marginRight: 15,
  },
  name: {
    fontFamily,
    color: '#333333',
    fontSize: width / 28.5,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRowImg: {
    width: width / 23,
    height: width / 23,
    marginRight: 5,
  },
  infoRowText: {
    fontFamily,
    color: '#4f4f4f',
    fontSize: width / 33,
  },
  arrow: {
    width: width / 26,
    height: width / 26,
  },
  wrapper: {
    backgroundColor,
    flex: 1,
  },
  cardView: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
});
