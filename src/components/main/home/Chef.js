/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import {useSelector, useDispatch} from 'react-redux';
import {Image as ImageLazy} from 'react-native-elements';

import Global from '../../Global';
import RatingStar from './cardView/RatingStar';
import DishViewVertical from './cardView/DishViewVertical';
import CommentDish from './cardView/CommentDish';
import get_chef_by_id from '../../../apis/get_chef_by_id';
import add_following_chef from '../../../apis/add_following_chef';
import remove_following_chef from '../../../apis/remove_following_chef';
import get_comment_chef from '../../../apis/get_comment_chef';
import get_follower_order_chef from '../../../apis/get_follower_order_chef';
import get_hot_dish_chef from '../../../apis/get_hot_dish_chef';
import get_other_dish_chef from '../../../apis/get_other_dish_chef';
import {updateSavedChef} from '../../../../actions';

import arrowBack from '../../../icons/arrow_back_ios-fb5a23.png';
import locationIcon from '../../../icons/place-gradient.png';
import billIcon from '../../../icons/description-gradient.png';
import emailIcon from '../../../icons/mail-gradient.png';
import phoneIcon from '../../../icons/phone-gradient.png';
import imageHolder from '../../../icons/imageHolder.png';
import imageHolder2 from '../../../icons/imageHolder2.png';

export default function Chef({navigation, route}) {
  useEffect(() => {
    loadChef();
    if (route.params.fromDish === true) {
      checkFollowStatus(route.params.id);
    } else {
      checkFollowStatus(route.params.chef._id);
    }
    getHotDish();
    getOtherDish();
    getFollowerAndOrder();
    getCommentChef();
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const savedChef = useSelector((state) => state.savedChef);
  const [pageComment, setPageComment] = useState(0);
  const [dataComment, setDataComment] = useState([]);
  const [loadingComment, setLoadingComment] = useState(false);
  const [pageOtherDish, setPageOtherDish] = useState(0);
  const [dataOtherDish, setDataOtherDish] = useState([]);
  const [loadingOtherDish, setLoadingOtherDish] = useState(false);
  const [dataHotDish, setDataHotDish] = useState([]);
  const [numberDish, setNumberDish] = useState(0);
  const [chef, setChef] = useState({
    image: '',
    email: '',
    cover: '',
    star: '',
    name: '',
    address: '',
    phone: '',
  });
  const [follow, setFollow] = useState(false);
  const [follower, setFollower] = useState(0);
  const [order, setOrder] = useState(0);
  const [menu, setMenu] = useState({
    dishes: true,
    comments: false,
    informations: false,
  });
  const {avatar, email, cover_photo, level, name, address, phone, _id} = chef;

  const loadChef = () => {
    if (route.params.fromDish === true) {
      get_chef_by_id
        .get_chef_by_id(user.token, route.params.id)
        .then((responseJson) => {
          if (responseJson.message !== 'Cannot find!') {
            setChef(responseJson);
          } else {
            return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
              position: 0,
              duration: 2500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
            position: 0,
            duration: 2500,
          });
        });
    } else {
      setChef(route.params.chef);
    }
  };

  const flatListItemSeparatorDish = () => {
    return <View style={styles.line} />;
  };

  const getCommentChef = () => {
    var id;
    if (route.params.fromDish === true) {
      id = route.params.id;
    } else {
      id = route.params.chef._id;
    }
    setLoadingComment(true);
    get_comment_chef
      .get_comment_chef(user.token, id, pageComment)
      .then((responseJson) => {
        if (responseJson.length === 0) {
          setLoadingComment(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: -20,
            duration: 2500,
          });
        } else {
          setDataComment(dataComment.concat(responseJson));
          setPageComment(pageComment + 1);
          setLoadingComment(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingComment(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const getOtherDish = () => {
    var id;
    if (route.params.fromDish === true) {
      id = route.params.id;
    } else {
      id = route.params.chef._id;
    }
    setLoadingOtherDish(true);
    get_other_dish_chef
      .get_other_dish_chef(user.token, id, pageOtherDish)
      .then((responseJson) => {
        if (responseJson.dishes.length === 0) {
          setLoadingOtherDish(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: -20,
            duration: 2500,
          });
        } else {
          setNumberDish(responseJson.soluong);
          setDataOtherDish(dataOtherDish.concat(responseJson.dishes));
          setPageOtherDish(pageOtherDish + 1);
          setLoadingOtherDish(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingOtherDish(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const getHotDish = () => {
    var id;
    if (route.params.fromDish === true) {
      id = route.params.id;
    } else {
      id = route.params.chef._id;
    }
    get_hot_dish_chef
      .get_hot_dish_chef(user.token, id)
      .then((responseJson) => {
        setDataHotDish(responseJson);
      })
      .catch((err) => {
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const getFollowerAndOrder = () => {
    var id;
    if (route.params.fromDish === true) {
      id = route.params.id;
    } else {
      id = route.params.chef._id;
    }
    get_follower_order_chef
      .get_follower_order_chef(user.token, id)
      .then((responseJson) => {
        setFollower(responseJson.followers);
        setOrder(responseJson.orders);
      })
      .catch((err) => {
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const checkFollowStatus = (id) => {
    var found = savedChef.find((item) => item.id_chef === id);
    if (found === undefined) {
      setFollow(false);
    } else {
      setFollow(true);
    }
  };

  const followHandle = () => {
    if (!follow) {
      setFollow(!follow);
      setFollower(follower + 1);
      add_following_chef
        .add_following_chef(user.token, _id)
        .then((responseJson) => {
          if (responseJson.message !== 'Add successfully!') {
            return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
              position: 0,
              duration: 2500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
            position: 0,
            duration: 2500,
          });
        });

      dispatch(
        updateSavedChef(
          savedChef.concat({
            _id: '',
            id_chef: _id,
          }),
        ),
      );
    } else {
      setFollow(!follow);
      setFollower(follower - 1);
      remove_following_chef
        .remove_following_chef(user.token, _id)
        .then((responseJson) => {
          if (responseJson.message !== 'Deleted successfully!') {
            return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
              position: 0,
              duration: 2500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
            position: 0,
            duration: 2500,
          });
        });

      dispatch(
        updateSavedChef(savedChef.filter((item) => item.id_chef !== _id)),
      );
    }
  };

  const menuHandle = (type) => {
    switch (type) {
      case 0:
        setMenu({
          dishes: true,
          comments: false,
          informations: false,
        });
        break;
      case 1:
        setMenu({
          dishes: false,
          comments: true,
          informations: false,
        });
        break;
      default:
        setMenu({
          dishes: false,
          comments: false,
          informations: true,
        });
        break;
    }
  };

  const flatListItemSeparatorComment = () => {
    return <View style={styles.emptyBox} />;
  };

  const followBtnS = (
    <TouchableOpacity
      onPress={() => {
        followHandle();
      }}>
      <LinearGradient
        style={styles.btnS}
        colors={['#fb5a23', '#ffb038']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View>
          <Text style={styles.btnTextS}>Theo dõi</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
  const followBtn = (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        followHandle();
      }}>
      <Text style={styles.btnText}>Đang theo dõi</Text>
    </TouchableOpacity>
  );
  const dishesJSX = (
    <View>
      {dataHotDish.length !== 0 ? (
        <View style={styles.cardView}>
          <Text style={styles.cardViewTitle}>Món ăn nổi bật (4)</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataHotDish}
            ItemSeparatorComponent={flatListItemSeparatorDish}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DISH', {
                      dish: item,
                      id: item.dishofchef.id_dish_chef,
                    })
                  }>
                  <DishViewVertical dish={item} chef />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.dishofchef.id_dish_chef}
          />
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            backgroundColor: 'white',
          }}>
          <ActivityIndicator animating={true} color="#fb5a23" size="small" />
        </View>
      )}

      {dataOtherDish.length !== 0 ? (
        <View style={styles.cardViewLast}>
          <Text style={styles.cardViewTitle}>
            Danh sách món ăn ({numberDish})
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataOtherDish}
            ListFooterComponent={
              <View style={{backgroundColor: 'white'}}>
                <View style={styles.line} />
                {loadingOtherDish ? (
                  <View style={{paddingVertical: 4.5}}>{Loading}</View>
                ) : (
                  <TouchableOpacity
                    onPress={() => getOtherDish()}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.viewMoreTextVertical}>Xem thêm</Text>
                  </TouchableOpacity>
                )}
              </View>
            }
            ItemSeparatorComponent={flatListItemSeparatorDish}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DISH', {
                      dish: item,
                      id: item.dishofchef.id_dish_chef,
                    })
                  }>
                  <DishViewVertical dish={item} chef />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.dishofchef.id_dish_chef}
          />
        </View>
      ) : null}
    </View>
  );
  const commentsJSX = () => {
    if (dataComment.length === 0 && loadingComment) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            backgroundColor: 'white',
          }}>
          {Loading}
        </View>
      );
    } else if (dataComment.length === 0) {
      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', height: 100}}>
          <Text style={styles.noComment}>Đầu bếp chưa có bình luận nào</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataComment}
          ItemSeparatorComponent={flatListItemSeparatorComment}
          ListFooterComponent={
            <View style={{marginTop: 10, backgroundColor: 'white'}}>
              {loadingComment ? (
                <View style={{paddingVertical: 4.5}}>{Loading}</View>
              ) : (
                <TouchableOpacity
                  onPress={() => getCommentChef()}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.viewMoreTextVertical}>Xem thêm</Text>
                </TouchableOpacity>
              )}
            </View>
          }
          renderItem={({item, index}) => {
            return (
              <View>
                <CommentDish navigation={navigation} commentDish={item} />
              </View>
            );
          }}
          keyExtractor={(item) => item.iddishofchef}
        />
      );
    }
  };
  const informationsJSX = (
    <View style={styles.cardView}>
      <View style={styles.infoItem}>
        <Image style={styles.infoImage} source={locationIcon} />
        <Text style={styles.infoText}>{address}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.infoItem}>
        <Image style={styles.infoImage} source={billIcon} />
        <Text style={styles.infoText}>Đã thực hiện {order} đơn hàng</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.infoItem}>
        <Image style={styles.infoImage} source={emailIcon} />
        <Text style={styles.infoText}>{email}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.infoItem}>
        <Image style={styles.infoImage} source={phoneIcon} />
        <Text style={styles.infoText}>{phone}</Text>
      </View>
    </View>
  );

  const Loading = (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} color="#fb5a23" size="small" />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={arrowBack} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đầu bếp</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FULL_IMAGE', {
              image:
                cover_photo === 'Thiết lập ngay'
                  ? 'https://res.cloudinary.com/chefood/image/upload/v1614660312/cover_photo/cover_photo_tmgnhx.png'
                  : cover_photo,
            })
          }>
          <ImageLazy
            PlaceholderContent={
              <Image style={styles.cover} source={imageHolder2} />
            }
            style={styles.cover}
            source={
              cover_photo === 'Thiết lập ngay'
                ? {
                    uri:
                      'https://res.cloudinary.com/chefood/image/upload/v1614660312/cover_photo/cover_photo_tmgnhx.png',
                  }
                : {uri: cover_photo}
            }>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FULL_IMAGE', {
                  image:
                    avatar === 'Thiết lập ngay'
                      ? 'https://res.cloudinary.com/chefood/image/upload/v1614660200/avatar/avt_h3mm3z.png'
                      : avatar,
                })
              }>
              <ImageLazy
                PlaceholderContent={
                  <Image style={styles.imageHolder} source={imageHolder} />
                }
                style={styles.avatar}
                source={
                  avatar === 'Thiết lập ngay'
                    ? {
                        uri:
                          'https://res.cloudinary.com/chefood/image/upload/v1614660200/avatar/avt_h3mm3z.png',
                      }
                    : {uri: avatar}
                }
              />
            </TouchableOpacity>
            <View style={styles.rating}>
              <View style={styles.star}>
                <RatingStar star={Math.round(level * 10) / 10} />
              </View>
              <Text style={styles.ratingText}>
                {Math.round(level * 10) / 10}
              </Text>
            </View>
          </ImageLazy>
        </TouchableOpacity>

        <View style={styles.cardView}>
          <View style={styles.nameCont}>
            <Text style={styles.name}>{name}</Text>
            {follow ? followBtn : followBtnS}
          </View>
          <Text style={styles.follow}>{follower} người theo dõi</Text>
        </View>

        <View>
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => menuHandle(0)}>
              <Text style={menu.dishes ? styles.menuTextS : styles.menuText}>
                Món ăn ({numberDish + 4})
              </Text>
              <View style={menu.dishes ? styles.menuLine : styles.menuNoLine} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => menuHandle(1)}>
              <Text style={menu.comments ? styles.menuTextS : styles.menuText}>
                Bình luận
              </Text>
              <View
                style={menu.comments ? styles.menuLine : styles.menuNoLine}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => menuHandle(2)}>
              <Text
                style={menu.informations ? styles.menuTextS : styles.menuText}>
                Thông tin
              </Text>
              <View
                style={menu.informations ? styles.menuLine : styles.menuNoLine}
              />
            </TouchableOpacity>
          </View>

          {menu.dishes
            ? dishesJSX
            : menu.comments
            ? commentsJSX()
            : informationsJSX}
        </View>
      </ScrollView>
    </View>
  );
}

const {width, heightHeader, backButton, height, backgroundColor} = Global;
const styles = StyleSheet.create({
  viewMoreTextVertical: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 34,
    paddingVertical: 6,
  },
  noComment: {
    fontFamily: 'Roboto-Regular',
    fontSize: width / 30,
    color: '#828282',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  infoImage: {
    width: width / 16,
    height: width / 16,
  },
  infoText: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 30,
    marginLeft: 10,
    width: width - width / 16 - 30,
  },
  cardViewTitle: {
    fontFamily: 'Roboto-Light',
    color: '#000000',
    fontSize: width / 26,
    margin: 10,
    marginBottom: 5,
  },
  emptyBox: {
    height: 10,
    width,
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0,
    borderTopWidth: 0.5,
  },
  menu: {
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: '#rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 1.5,
    marginBottom: 2,
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  menuTextS: {
    fontFamily: 'Roboto-Bold',
    color: '#333333',
    fontSize: width / 28,
  },
  menuText: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 28,
  },
  menuLine: {
    borderColor: '#fb5a23',
    borderWidth: 1,
    width: width / 18,
    marginTop: 10,
  },
  menuNoLine: {
    width: width / 18,
    marginTop: 10,
  },
  cardView: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  cardViewLast: {
    backgroundColor: '#fff',
  },
  nameCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    marginBottom: 0,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    color: '#000000',
    fontSize: width / 24,
  },
  follow: {
    marginLeft: 15,
    marginBottom: 20,
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 31,
    marginTop: -2,
  },
  btnS: {
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#ffffff',
    borderColor: '#828282',
    borderWidth: 1,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextS: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 30,
    color: 'white',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  btnText: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 30,
    color: '#828282',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  cover: {
    width,
    height: height / 3.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: width / 3.7,
    height: width / 3.7,
    borderRadius: width / 7.4,
    borderColor: '#ffffff',
    borderWidth: 2,
    marginTop: height / 27,
  },
  imageHolder: {
    width: width / 3.7,
    height: width / 3.7,
    borderRadius: width / 7.4,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  rating: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 3,
    paddingHorizontal: 5,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    paddingBottom: 3.5,
  },
  ratingText: {
    fontFamily: 'Roboto-Bold',
    color: 'white',
    fontSize: width / 36,
    marginLeft: 4,
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
