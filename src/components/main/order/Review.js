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
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AirbnbRating} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-root-toast';
import {useSelector} from 'react-redux';
import {Image as ImageLazy} from 'react-native-elements';

import Global from '../../Global';
import check_comment from '../../../apis/check_comment';
import submit_comment from '../../../apis/submit_comment';
import get_order_detail from '../../../apis/get_order_detail';
import update_score from '../../../apis/update_score';
import update_level from '../../../apis/update_level';

import closeIcon from '../../../icons/close.png';
import cameraIcon from '../../../icons/photo_camera-bd.png';
import imageHolder from '../../../icons/imageHolder.png';

export default function Review({navigation, route}) {
  useEffect(() => {
    initReview(orderDetail.dishes);
    if (route.params.chef === null) {
      getOrdersDetail();
    }
  }, []);
  const initReview = (dishes) => {
    var arrTemp = [];
    for (let i = 0; i < dishes.length; i++) {
      arrTemp.push({rating: 0, comment: '', image: ''});
    }
    setReview(arrTemp);
  };

  const user = useSelector((state) => state.user);
  const [review, setReview] = useState([]);
  const [modal, setModal] = useState({status: false, index: 0});
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState({
    chef: {
      level_chef: route.params.chef !== null ? route.params.chef.level_chef : 0,
      num_chef: route.params.chef !== null ? route.params.chef.num_chef : 0,
      avatar:
        route.params.chef !== null
          ? route.params.chef.avatar
          : 'Thiết lập ngay',
      chef_name: route.params.chef !== null ? route.params.chef.chef_name : '',
    },
    dishes: route.params.chef !== null ? route.params.dish : [],
  });
  const orderInfo = route.params.orderInfo;

  const getOrdersDetail = () => {
    get_order_detail
      .get_order_detail(user.token, route.params.orderInfo.id_order)
      .then((responseJson) => {
        setOrderDetail(responseJson);
        initReview(responseJson.dishes);
      })
      .catch((err) => {
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
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
        commentImage(source);
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
        commentImage(source);
      }
    });
  };

  const updateScore = (numDishOfChef, status) => {
    update_score
      .update_score(user.token, numDishOfChef, status)
      .then((responseJson) => {
        console.log('Update score for dish of chef: ', numDishOfChef);
        if (responseJson.message !== 'Update score successfully!') {
          return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
            position: 0,
            duration: 2500,
          });
        }
      })
      .catch((err) => {
        console.log('Update score: ', err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const updateLevel = (numChef, levelChef, star) => {
    update_level
      .update_level(user.token, numChef, levelChef, star)
      .then((responseJson) => {
        console.log('Update level for chef: ', numChef);
        if (responseJson.message !== 'Update level successfully!') {
          return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
            position: 0,
            duration: 2500,
          });
        }
      })
      .catch((err) => {
        console.log('Update level: ', err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const submitComment = () => {
    setLoading(true);
    for (let i = 0; i < review.length; i++) {
      if (review[i].rating === 0) {
        setLoading(false);
        return Toast.show('Vui lòng đánh giá sao cho món ăn', {
          position: -20,
          duration: 2500,
        });
      } else if (review[i].comment === '') {
        setLoading(false);
        return Toast.show('Vui lòng chia sẻ đánh giá về món ăn', {
          position: -20,
          duration: 2500,
        });
      }
    }

    var count = 0;
    for (let i = 0; i < review.length; i++) {
      if (review[i].image !== '') {
        //Upload image
        const dulieu = new FormData();
        dulieu.append('file', review[i].image);
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
          .then((responseJson1) => {
            check_comment
              .check_comment(review[i].comment)
              .then((responseJson2) => {
                submit_comment
                  .submit_comment(
                    user.token,
                    orderDetail.dishes[i].iddishofchef,
                    orderInfo.id_order,
                    review[i].comment,
                    review[i].rating,
                    responseJson1.secure_url,
                    responseJson2.predict,
                  )
                  .then((responseJson3) => {
                    setLoading(false);
                    if (responseJson3.message === 'Add successfully!') {
                      count += 1;
                      console.log(
                        'Submit comment successfully for dishofchef: ',
                        responseJson3.num_dishofchef,
                      );
                      updateScore(
                        responseJson3.num_dishofchef,
                        responseJson2.predict,
                      );
                      updateLevel(
                        orderDetail.chef.num_chef,
                        orderDetail.chef.level_chef,
                        review[i].rating,
                      );
                    }
                    if (count === review.length) {
                      if (route.params.chef !== null) {
                        navigation.navigate('ORDER_DETAIL', {
                          order: {...orderInfo, checkcomment: 1},
                        });
                      } else {
                        navigation.goBack();
                      }
                    }
                  })
                  .catch((err) => {
                    console.log('Lỗi tải đánh giá lên node: ' + err);
                    setLoading(false);
                    return Toast.show(
                      'Lỗi! Vui lòng kiểm tra kết nối internet',
                      {
                        position: 0,
                        duration: 2500,
                      },
                    );
                  });
              })
              .catch((err) => {
                console.log('Lỗi xác định trạng thái bình luận: ' + err);
                setLoading(false);
                return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
                  position: 0,
                  duration: 2500,
                });
              });
          })
          .catch((err) => {
            console.log('Lỗi upload ảnh: ' + err);
            setLoading(false);
            return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
              position: 0,
              duration: 2500,
            });
          });
      } else {
        check_comment
          .check_comment(review[i].comment)
          .then((responseJson1) => {
            submit_comment
              .submit_comment(
                user.token,
                orderDetail.dishes[i].iddishofchef,
                orderInfo.id_order,
                review[i].comment,
                review[i].rating,
                null,
                responseJson1.predict,
              )
              .then((responseJson2) => {
                setLoading(false);
                if (responseJson2.message === 'Add successfully!') {
                  count += 1;
                  console.log(
                    'Submit comment successfully for dishofchef: ',
                    responseJson2.num_dishofchef,
                  );
                  updateScore(
                    responseJson2.num_dishofchef,
                    responseJson1.predict,
                  );
                  updateLevel(
                    orderDetail.chef.num_chef,
                    orderDetail.chef.level_chef,
                    review[i].rating,
                  );
                }
                if (count === review.length) {
                  if (route.params.chef !== null) {
                    navigation.navigate('ORDER_DETAIL', {
                      order: {...orderInfo, checkcomment: 1},
                    });
                  } else {
                    navigation.goBack();
                  }
                }
              })
              .catch((err) => {
                console.log('Lỗi tải đánh giá lên node: ' + err);
                setLoading(false);
                return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
                  position: 0,
                  duration: 2500,
                });
              });
          })
          .catch((err) => {
            console.log('Lỗi xác định trạng thái bình luận: ' + err);
            setLoading(false);
            return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
              position: 0,
              duration: 2500,
            });
          });
      }
    }
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
  const commentImage = (source) => {
    var arrTemp = [...review];
    arrTemp[modal.index].image = source;
    setReview(arrTemp);
  };

  const renderHeaderList = () => (
    <View style={styles.chefInfo}>
      <ImageLazy
        PlaceholderContent={
          <Image style={styles.chefImg} source={imageHolder} />
        }
        style={styles.chefImg}
        source={
          orderDetail.chef.avatar === 'Thiết lập ngay'
            ? {
                uri:
                  'https://res.cloudinary.com/chefood/image/upload/v1614660200/avatar/avt_h3mm3z.png',
              }
            : {uri: orderDetail.chef.avatar}
        }
      />
      <Text style={styles.chefName}>{orderDetail.chef.chef_name}</Text>
    </View>
  );
  const renderItem = ({item, index}) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.dish_name}</Text>
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
        isDisabled={loading}
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
        editable={!loading}
        onChangeText={(text) => commentCompleted(text, index)}
      />
      {review[index].image === '' ? (
        <TouchableOpacity
          style={styles.itemImgSelect}
          onPress={() => {
            if (!loading) {
              setModal({status: true, index: index});
            }
          }}>
          <Image style={styles.cameraImg} source={cameraIcon} />
          <Text style={styles.cameraText}>Ảnh</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            if (!loading) {
              setModal({status: true, index: index});
            }
          }}>
          <Image
            style={styles.itemImg}
            source={{uri: review[index].image.uri}}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const Loading = (
    <View style={styles.loading}>
      <ActivityIndicator animating={loading} color="#fff" size="small" />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {review.length !== 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orderDetail.dishes}
          ListHeaderComponent={renderHeaderList}
          renderItem={renderItem}
          keyExtractor={(item) => item.iddishofchef}
        />
      ) : null}

      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            if (!loading) {
              submitComment();
            }
          }}>
          <LinearGradient
            style={styles.btn}
            colors={['#fb5a23', '#ffb038']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.btnText}>Gửi</Text>
              {Loading}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (!loading) {
              navigation.goBack();
            }
          }}>
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
  backButton,
} = Global;
const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRating: {
    fontFamily: 'Roboto-Regular',
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
    fontFamily: 'Roboto-Regular',
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
    backgroundColor: '#f5f5f5',
    textAlignVertical: 'top',
    height: 90,
    marginTop: 14,
    padding: 6,
    color: '#4f4f4f',
    fontSize: width / 30,
  },
  itemTitle: {
    fontFamily: 'Roboto-Bold',
    color: '#4f4f4f',
    fontSize: width / 31,
  },
  itemStar: {
    marginTop: height / 34,
  },
  itemName: {
    fontFamily: 'Roboto-Bold',
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
  btnModal: {
    fontFamily: 'Roboto-Light',
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
    fontFamily: 'Roboto-Medium',
    fontSize: width / 30,
    color: 'white',
    marginVertical: 10,
    marginLeft: 35,
    marginRight: 15,
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
    fontFamily: 'Roboto-Bold',
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
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 24,
    marginLeft: 10,
  },
});
