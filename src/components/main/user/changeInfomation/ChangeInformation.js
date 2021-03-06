/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';

import Global from '../../../Global';

import arrowBack from '../../../../icons/arrow_back_ios-fb5a23.png';
import camera from '../../../../icons/photo_camera.png';
import arrowRight from '../../../../icons/arrow_right-82.png';

export default function ChangeInformation({navigation}) {
  const user = useSelector((state) => state.user);
  const {avatar, name, email, phone, cover, gender, birthday, address} = user;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={arrowBack} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sửa thông tin</Text>
      </View>

      <ImageBackground style={styles.cover} source={{uri: cover}}>
        <ImageBackground
          imageStyle={{
            borderRadius: width / 7.4,
            borderColor: '#ffffff',
            borderWidth: 2,
          }}
          style={styles.avatar}
          source={{uri: avatar}}>
          <TouchableOpacity style={styles.cameraCont}>
            <Image style={styles.camera} source={camera} />
          </TouchableOpacity>
        </ImageBackground>
        <TouchableOpacity style={[styles.cameraCont, styles.cameraCover]}>
          <Image style={styles.camera} source={camera} />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.cardView}>
        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Họ và tên</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CHANGE_INFO_DETAIL', {
                type: 'name',
                data: name,
              })
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.rowContent}>{name}</Text>
            <Image style={styles.arrow} source={arrowRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Email</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CHANGE_INFO_DETAIL', {
                type: 'email',
                data: email,
              })
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.rowContent}>{email}</Text>
            <Image style={styles.arrow} source={arrowRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Số điện thoại</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CHANGE_INFO_DETAIL', {
                type: 'phone',
                data: phone,
              })
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.rowContent, {width: width / 3}]}>{phone}</Text>
            <Image style={styles.arrow} source={arrowRight} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardView}>
        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Giới tính</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CHANGE_INFO_DETAIL', {
                type: 'gender',
                data: gender,
              })
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.rowContentDefault}>{gender}</Text>
            <Image style={styles.arrow} source={arrowRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Ngày sinh</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CHANGE_INFO_DETAIL', {
                type: 'birthday',
                data: birthday,
              })
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.rowContent, {width: width / 3}]}>
              {birthday}
            </Text>
            <Image style={styles.arrow} source={arrowRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Địa chỉ</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CHANGE_ADDRESS')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.rowContent}>{address}</Text>
            <Image style={styles.arrow} source={arrowRight} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardView}>
        <TouchableOpacity style={styles.rowCont}>
          <Text style={styles.rowText}>Đổi mật khẩu</Text>
          <Image style={styles.arrow} source={arrowRight} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const {
  width,
  backgroundColor,
  mainColor,
  fontFamily,
  backButton,
  heightHeader,
  height,
} = Global;
const styles = StyleSheet.create({
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0.25,
    marginHorizontal: 10,
  },
  arrow: {
    width: width / 26,
    height: width / 26,
    marginLeft: 10,
    marginTop: 2,
  },
  rowCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  rowText: {
    fontFamily,
    color: '#333333',
    fontSize: width / 30,
  },
  cardView: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  rowContent: {
    fontFamily,
    color: '#828282',
    fontSize: width / 30,
    width: width / 1.45,
    textAlign: 'right',
  },
  rowContentDefault: {
    fontFamily,
    color: mainColor,
    fontSize: width / 30,
  },
  cover: {
    width,
    height: height / 3.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: width / 3.7,
    height: width / 3.7,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cameraCont: {
    borderRadius: width / 44 + 8,
    width: width / 22 + 16,
    padding: 8,
    backgroundColor: '#e0e0e0',
  },
  camera: {
    width: width / 22,
    height: width / 22,
  },
  cameraCover: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  wrapper: {
    flex: 1,
    backgroundColor,
  },
  header: {
    backgroundColor: 'white',
    height: heightHeader,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  backIcon: {
    width: backButton,
    height: backButton,
  },
  headerText: {
    fontFamily,
    color: '#333333',
    fontSize: width / 24,
    marginLeft: 10,
  },
});
