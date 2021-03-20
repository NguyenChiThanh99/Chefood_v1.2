/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AirbnbRating} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-root-toast';

import Global from '../../Global';

import closeIcon from '../../../icons/close.png';
import cameraIcon from '../../../icons/photo_camera-bd.png';

export default function Review({navigation}) {
  useEffect(() => {
    initReview();
  }, []);
  const initReview = () => {
    var arrTemp = [];
    for (let i = 0; i < data.dish.length; i++) {
      arrTemp.push({rating: 0, comment: '', image: ''});
    }
    setReview(arrTemp);
  };

  const [review, setReview] = useState([]);
  const [modal, setModal] = useState({status: false, index: 0});

  const data = {
    chef: {
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
    },
    dish: [
      {
        id: 1,
        name: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      },
      {
        id: 2,
        name: 'Mỳ Quảng tôm thịt nướng thịt gà trứng cút',
      },
    ],
  };

  const checkRating = (index) => {
    switch (review[index].rating) {
      case 1:
        return 'Tệ';
      case 2:
        return 'Không ngon';
      case 3:
        return 'Bình thường ';
      case 4:
        return 'Tốt';
      default:
        return 'Tuyệt vời';
    }
  };

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
        setModal({status: false, index: 0});
        commentImage(uri);
        // cloudinaryUpload(source);
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
        setModal({status: false, index: 0});
        commentImage(uri);
        // cloudinaryUpload(source);
      }
    });
  };
  const cloudinaryUpload = (photo) => {
    const dulieu = new FormData();
    dulieu.append('file', photo);
    if (modal.type === 0) {
      dulieu.append('upload_preset', 'avatar');
    } else {
      dulieu.append('upload_preset', 'review');
    }
    dulieu.append('cloud_name', 'dep0t5tcf');

    fetch('https://api.cloudinary.com/v1_1/dep0t5tcf/upload', {
      method: 'POST',
      body: dulieu,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.secure_url);
      })
      .catch((err) => {
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const ratingCompleted = (rate, index) => {
    var arrTemp = [...review];
    arrTemp[index].rating = rate;
    setReview(arrTemp);
  };
  const commentCompleted = (text, index) => {
    var arrTemp = [...review];
    arrTemp[index].comment = text;
    setReview(arrTemp);
  };
  const commentImage = (image) => {
    var arrTemp = [...review];
    arrTemp[modal.index].image = image;
    setReview(arrTemp);
  };

  const renderHeaderList = () => (
    <View style={styles.chefInfo}>
      <Image style={styles.chefImg} source={{uri: data.chef.image}} />
      <Text style={styles.chefName}>{data.chef.name}</Text>
    </View>
  );
  const renderItem = ({item, index}) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <AirbnbRating
        starContainerStyle={
          review[index].rating === 0
            ? [styles.itemStar, {marginBottom: height / 34}]
            : styles.itemStar
        }
        count={5}
        defaultRating={review[index].rating}
        selectedColor={'#F2C94C'}
        reviewColor={'#E0E0E0'}
        size={22}
        showRating={false}
        onFinishRating={(rate) => ratingCompleted(rate, index)}
      />
      {review[index].rating === 0 ? null : (
        <Text style={styles.itemRating}>{checkRating(index)}</Text>
      )}
      <Text style={styles.itemTitle}>Chia sẻ đánh giá của bạn</Text>
      <TextInput
        style={styles.itemInput}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => commentCompleted(text, index)}
      />
      {review[index].image === '' ? (
        <TouchableOpacity
          style={styles.itemImgSelect}
          onPress={() => setModal({status: true, index: index})}>
          <Image style={styles.cameraImg} source={cameraIcon} />
          <Text style={styles.cameraText}>Ảnh</Text>
        </TouchableOpacity>
      ) : (
        <Image style={styles.itemImg} source={{uri: review[index].image}} />
      )}
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {review.length !== 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.dish}
          ListHeaderComponent={renderHeaderList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : null}

      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            console.log(review);
          }}>
          <LinearGradient
            style={styles.btn}
            colors={['#fb5a23', '#ffb038']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View>
              <Text style={styles.btnText}>Gửi</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={closeIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Đánh giá</Text>
      </View>

      <Modal animationType="fade" transparent={true} visible={modal.status}>
        <View style={styles.modalCont}>
          <View style={styles.modal}>
            <Text style={styles.titleModal}>Nhập hình ảnh từ...</Text>
            <View style={styles.btnCont}>
              <TouchableOpacity onPress={() => selectPhoto()}>
                <Text style={styles.btnModal}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectLibrary()}>
                <Text style={[styles.btnModal, {marginLeft: 25}]}>
                  Thư viện ảnh
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => setModal({status: false, index: 0})}>
              <Text style={styles.btnCancel}>HUỶ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const {
  backgroundColor,
  mainColor,
  heightHeader,
  width,
  height,
  fontFamily,
  backButton,
} = Global;
const styles = StyleSheet.create({
  itemRating: {
    fontFamily,
    fontSize: width / 30,
    color: '#828282',
    textAlign: 'center',
    marginBottom: height / 34,
    marginTop: 4,
  },
  cameraImg: {
    width: width / 13,
    height: width / 13,
  },
  cameraText: {
    fontFamily,
    color: '#bdbdbd',
    fontSize: width / 30,
  },
  itemImgSelect: {
    width: width / 6.4,
    height: width / 6.4,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width / 16,
  },
  itemImg: {
    width: width / 6.4,
    height: width / 6.4,
    marginTop: width / 16,
  },
  itemInput: {
    backgroundColor: '#ededed',
    textAlignVertical: 'top',
    maxHeight: height / 8,
    marginTop: 14,
    color: '#4f4f4f',
    fontSize: width / 30,
  },
  itemTitle: {
    fontFamily,
    color: '#4f4f4f',
    fontSize: width / 31,
    fontWeight: 'bold',
  },
  itemStar: {
    marginTop: height / 34,
  },
  itemName: {
    fontFamily,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    fontSize: width / 22,
    paddingHorizontal: width / 8,
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
  titleModal: {
    fontFamily,
    color: '#000000',
    fontSize: width / 20,
    fontWeight: 'bold',
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  btnModal: {
    fontFamily,
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
    fontFamily,
    color: '#828282',
    fontSize: width / 28,
    textAlign: 'right',
  },

  item: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 15,
  },
  bottomView: {
    width,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  btnText: {
    fontFamily,
    fontSize: width / 30,
    color: 'white',
    marginVertical: 10,
  },
  btn: {
    width: width - 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chefInfo: {
    backgroundColor: 'white',
    width,
    height: height / 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightHeader,
    marginBottom: 10,
  },
  chefImg: {
    width: width / 6.5,
    height: width / 6.5,
    borderRadius: width / 13,
  },
  chefName: {
    color: mainColor,
    fontFamily,
    fontWeight: 'bold',
    fontSize: width / 27,
    marginTop: 5,
  },
  wrapper: {
    backgroundColor,
    flex: 1,
  },
  header: {
    height: heightHeader,
    width,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    position: 'absolute',
  },
  backIcon: {
    width: backButton,
    height: backButton,
  },
  title: {
    fontFamily,
    color: '#333333',
    fontSize: width / 24,
    marginLeft: 10,
  },
});