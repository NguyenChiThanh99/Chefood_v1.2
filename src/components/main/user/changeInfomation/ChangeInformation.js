/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Global from '../../../Global';
import change_avatar from '../../../../apis/change_avatar';
import change_cover from '../../../../apis/change_cover';
import {updateUser} from '../../../../../actions';

import arrowBack from '../../../../icons/arrow_back_ios-fb5a23.png';
import camera from '../../../../icons/photo_camera.png';
import arrowRight from '../../../../icons/arrow_right-82.png';

export default function ChangeInformation({navigation}) {
  const user = useSelector((state) => state.user);
  const {
    avatar,
    name,
    email,
    phone,
    cover_photo,
    sex,
    date_of_birth,
    address,
  } = user.userInfo;
  const dispatch = useDispatch();
  const [modal, setModal] = useState({status: false, type: 0});
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingCover, setLoadingCover] = useState(false);

  const selectPhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.uri;
        const type = response.type;
        const name = response.fileName;
        const source = {
          uri,
          type,
          name,
        };
        setModal({status: false, type: 0});
        cloudinaryUpload(source);
      }
    });
  };

  const selectLibrary = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.uri;
        const type = response.type;
        const name = response.fileName;
        const source = {
          uri,
          type,
          name,
        };
        setModal({status: false, type: 0});
        cloudinaryUpload(source);
      }
    });
  };

  const cloudinaryUpload = (photo) => {
    if (modal.type === 0) {
      setLoadingAvatar(true);
    } else {
      setLoadingCover(true);
    }
    const dulieu = new FormData();
    dulieu.append('file', photo);
    if (modal.type === 0) {
      dulieu.append('upload_preset', 'avatar');
    } else {
      dulieu.append('upload_preset', 'cover_photo');
    }
    dulieu.append('cloud_name', 'dep0t5tcf');

    fetch('https://api.cloudinary.com/v1_1/dep0t5tcf/upload', {
      method: 'POST',
      body: dulieu,
    })
      .then((res) => res.json())
      .then((res) => {
        if (modal.type === 0) {
          change_avatar
            .change_avatar(user.token, res.secure_url)
            .then((responseJson) => {
              dispatch(
                updateUser({
                  ...user,
                  userInfo: {...user.userInfo, avatar: res.secure_url},
                }),
              );
              storeData({
                ...user,
                userInfo: {...user.userInfo, avatar: res.secure_url},
              });
              setLoadingAvatar(false);
            })
            .catch((err) => {
              console.log(err);
              setLoadingAvatar(false);
              return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
                position: 0,
                duration: 2500,
              });
            });
        } else {
          change_cover
            .change_cover(user.token, res.secure_url)
            .then((responseJson) => {
              dispatch(
                updateUser({
                  ...user,
                  userInfo: {...user.userInfo, cover_photo: res.secure_url},
                }),
              );
              storeData({
                ...user,
                userInfo: {...user.userInfo, cover_photo: res.secure_url},
              });
              setLoadingCover(false);
            })
            .catch((err) => {
              console.log(err);
              setLoadingCover(false);
              return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
                position: 0,
                duration: 2500,
              });
            });
        }
      })
      .catch((err) => {
        setLoadingAvatar(false);
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@user', jsonValue);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  const LoadingAvatar = (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} color="white" size="small" />
    </View>
  );
  const LoadingCover = (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} color="white" size="small" />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={arrowBack} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sửa thông tin</Text>
      </View>

      <ImageBackground style={styles.cover} source={{uri: cover_photo}}>
        <ImageBackground
          imageStyle={{
            borderRadius: width / 7.4,
            borderColor: '#ffffff',
            borderWidth: 2,
          }}
          style={styles.avatar}
          source={{uri: avatar}}>
          <TouchableOpacity
            style={styles.cameraCont}
            onPress={() => {
              loadingAvatar ? null : setModal({status: true, type: 0});
            }}>
            {loadingAvatar ? (
              LoadingAvatar
            ) : (
              <Image style={styles.camera} source={camera} />
            )}
          </TouchableOpacity>
        </ImageBackground>
        <TouchableOpacity
          style={[styles.cameraCont, styles.cameraCover]}
          onPress={() => {
            loadingCover ? null : setModal({status: true, type: 1});
          }}>
          {loadingCover ? (
            LoadingCover
          ) : (
            <Image style={styles.camera} source={camera} />
          )}
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
        <View style={styles.line} />

        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Email</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.rowContent}>{email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardView}>
        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Giới tính</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CHANGE_INFO_DETAIL', {
                type: 'gender',
                data: sex,
              })
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={
                sex === 'Thiết lập ngay'
                  ? styles.rowContentDefault
                  : styles.rowContent
              }>
              {sex}
            </Text>
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
                data: date_of_birth,
              })
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={
                date_of_birth === 'Thiết lập ngay'
                  ? styles.rowContentDefault
                  : styles.rowContent
              }>
              {date_of_birth}
            </Text>
            <Image style={styles.arrow} source={arrowRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        <View style={styles.rowCont}>
          <Text style={styles.rowText}>Địa chỉ</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CHANGE_ADDRESS', {fromCart: false})
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={
                address === 'Thiết lập ngay'
                  ? [
                      styles.rowContentDefault,
                      {width: width / 1.4, textAlign: 'right'},
                    ]
                  : [
                      styles.rowContent,
                      {width: width / 1.4, textAlign: 'right'},
                    ]
              }>
              {address}
            </Text>
            <Image style={styles.arrow} source={arrowRight} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardView}>
        <TouchableOpacity
          style={styles.rowCont}
          onPress={() => navigation.navigate('CHANGE_PASSWORD')}>
          <Text style={styles.rowText}>Đổi mật khẩu</Text>
          <Image style={styles.arrow} source={arrowRight} />
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={modal.status}>
        <View style={styles.modalCont}>
          <View style={styles.modal}>
            <Text style={styles.title}>Nhập hình ảnh từ...</Text>
            <View style={styles.btnCont}>
              <TouchableOpacity onPress={() => selectPhoto()}>
                <Text style={styles.btn}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectLibrary()}>
                <Text style={[styles.btn, {marginLeft: 25}]}>Thư viện ảnh</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setModal({status: false, type: 0})}>
              <Text style={styles.btnCancel}>HUỶ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const {
  width,
  backgroundColor,
  mainColor,
  backButton,
  heightHeader,
  height,
} = Global;
const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    fontFamily: 'Roboto-Bold',
    color: '#000000',
    fontSize: width / 20,
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  btn: {
    fontFamily: 'Roboto-Regular',
    color: mainColor,
    fontSize: width / 30,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  btnCancel: {
    marginRight: 10,
    fontFamily: 'Roboto-Medium',
    color: '#828282',
    fontSize: width / 28,
    textAlign: 'right',
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0,
    borderTopWidth: 0.5,
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
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 30,
  },
  cardView: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  rowContent: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 30,
    width: width / 1.45,
    textAlign: 'right',
  },
  rowContentDefault: {
    fontFamily: 'Roboto-Regular',
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
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 24,
    marginLeft: 10,
  },
});
