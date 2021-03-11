/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';

import Global from '../../../Global';

import arrowBack from '../../../../icons/arrow_back_ios-fb5a23.png';
import camera from '../../../../icons/photo_camera.png';
import arrowRight from '../../../../icons/arrow_right-82.png';
import {add} from 'react-native-reanimated';

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
  const [imageURL, setImageURL] = useState('');
  const [imageSource, setImageSource] = useState('');

  const selectPhotoTapped = () => {
    // console.log('object');
    // const options = {
    //   title: 'Select Photo',
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'Chefood',
    //   },
    // };
    // ImagePicker.showImagePicker(options, (response) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else {
    //     const uri = response.uri;
    //     const type = response.type;
    //     const name = response.fileName;
    //     const source = {
    //       uri,
    //       type,
    //       name,
    //     };
    //     setImageURL(uri);
    //     setImageSource(source);
    //   }
    // });
  };

  const cloudinaryUpload = (photo) => {
    const dulieu = new FormData();
    dulieu.append('file', photo);
    dulieu.append('upload_preset', 'hotelbooking');
    dulieu.append('cloud_name', 'dep0t5tcf');

    fetch('https://api.cloudinary.com/v1_1/dep0t5tcf/upload', {
      method: 'POST',
      body: dulieu,
    })
      .then((res) => res.json())
      .then((res) => {
        //Update photo
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            onPress={selectPhotoTapped}>
            <Image style={styles.camera} source={camera} />
          </TouchableOpacity>
        </ImageBackground>
        <TouchableOpacity
          style={[styles.cameraCont, styles.cameraCover]}
          onPress={selectPhotoTapped}>
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
            onPress={() => navigation.navigate('CHANGE_ADDRESS')}
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
