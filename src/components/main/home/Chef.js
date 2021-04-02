/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import {useSelector, useDispatch} from 'react-redux';

import Global from '../../Global';
import RatingStar from './cardView/RatingStar';
import DishViewVertical from './cardView/DishViewVertical';
import CommentDish from './cardView/CommentDish';
import get_chef_by_id from '../../../apis/get_chef_by_id';
import add_following_chef from '../../../apis/add_following_chef';
import remove_following_chef from '../../../apis/remove_following_chef';
import get_comment_chef from '../../../apis/get_comment_chef';
import {updateSavedChef} from '../../../../actions';

import arrowBack from '../../../icons/arrow_back_ios-fb5a23.png';
import locationIcon from '../../../icons/place-gradient.png';
import billIcon from '../../../icons/description-gradient.png';
import emailIcon from '../../../icons/mail-gradient.png';
import phoneIcon from '../../../icons/phone-gradient.png';

export default function Chef({navigation, route}) {
  useEffect(() => {
    loadChef();
    if (route.params.fromDish === true) {
      checkFollowStatus(route.params.id);
    } else {
      checkFollowStatus(route.params.chef._id);
    }
    getCommentChef();
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const savedChef = useSelector((state) => state.savedChef);
  const [pageComment, setPageComment] = useState(0);
  const [dataComment, setDataComment] = useState([]);
  const [loadingComment, setLoadingComment] = useState(false);
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
  const [follower, setFollower] = useState(45);
  const [order, setOrder] = useState(98);
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

  const dataDish = [
    {
      dish: {
        _id: '5fd639e74c30750ea086f462',
        number: 49,
        name: 'Trứng hấp bí ngô hấp dẫn đón Halloween',
        picture:
          'http://gl.amthuc365.vn/thumbnails/850/590//uploads/i/Vao-bep-che-bien-mon-trung-bi-ngo-hap-dan-don-Halloween.jpg?v=4.1',
        prepare: ' Chuẩn bị: 5 phút',
        perform: ' Thực hiện: 15 phút',
        ingredients:
          '\t6 quả \tTrứng  \r\n\t3 thìa canh \tMù tạt dijon  \r\n\t60 gram \tMayonnaise  \r\n\t1 thìa cà phê \tỚt cựa gà  \r\n \tMuối  \r\n \tHạt tiêu  \r\n \tHành lá  ',
        price: 167337,
      },
      chef: {
        _id: '5fe871eb3316fb1f20a6fcbf',
        number: 5,
        name: 'Võ Thị Xuân Phương',
        email: 'phuongvtx@gmail.com',
        password: 'ea2b3507e2100b7080d01eaa189f0922',
        phone: '0977666035',
        address:
          '20/28/44 Hồ Đắc Di, Tây Thạnh, Tân Phú, Thành phố Hồ Chí Minh',
        latitude: 10.8068999,
        longitude: 106.6331267,
        avatar: 'Thiết lập ngay',
        cover_photo: 'Thiết lập ngay',
        introduce: 'Thiết lập ngay',
        sex: 'Thiết lập ngay',
        social_network: 'Thiết lập ngay',
        date_of_birth: 'Thiết lập ngay',
        level: 3,
      },
      dishofchef: {
        iddishofchef: '15fd65413524abd351c39da01',
        price: 170040,
      },
    },
    {
      dish: {
        _id: '5fd639e74c30750ea086f462',
        number: 49,
        name: 'Trứng hấp bí ngô hấp dẫn đón Halloween',
        picture:
          'http://gl.amthuc365.vn/thumbnails/850/590//uploads/i/Vao-bep-che-bien-mon-trung-bi-ngo-hap-dan-don-Halloween.jpg?v=4.1',
        prepare: ' Chuẩn bị: 5 phút',
        perform: ' Thực hiện: 15 phút',
        ingredients:
          '\t6 quả \tTrứng  \r\n\t3 thìa canh \tMù tạt dijon  \r\n\t60 gram \tMayonnaise  \r\n\t1 thìa cà phê \tỚt cựa gà  \r\n \tMuối  \r\n \tHạt tiêu  \r\n \tHành lá  ',
        price: 167337,
      },
      chef: {
        _id: '5fe871eb3316fb1f20a6fcbf',
        number: 5,
        name: 'Võ Thị Xuân Phương',
        email: 'phuongvtx@gmail.com',
        password: 'ea2b3507e2100b7080d01eaa189f0922',
        phone: '0977666035',
        address:
          '20/28/44 Hồ Đắc Di, Tây Thạnh, Tân Phú, Thành phố Hồ Chí Minh',
        latitude: 10.8068999,
        longitude: 106.6331267,
        avatar: 'Thiết lập ngay',
        cover_photo: 'Thiết lập ngay',
        introduce: 'Thiết lập ngay',
        sex: 'Thiết lập ngay',
        social_network: 'Thiết lập ngay',
        date_of_birth: 'Thiết lập ngay',
        level: 3,
      },
      dishofchef: {
        iddishofchef: '25fd65413524abd351c39da01',
        price: 170040,
      },
    },
    {
      dish: {
        _id: '5fd639e74c30750ea086f462',
        number: 49,
        name: 'Trứng hấp bí ngô hấp dẫn đón Halloween',
        picture:
          'http://gl.amthuc365.vn/thumbnails/850/590//uploads/i/Vao-bep-che-bien-mon-trung-bi-ngo-hap-dan-don-Halloween.jpg?v=4.1',
        prepare: ' Chuẩn bị: 5 phút',
        perform: ' Thực hiện: 15 phút',
        ingredients:
          '\t6 quả \tTrứng  \r\n\t3 thìa canh \tMù tạt dijon  \r\n\t60 gram \tMayonnaise  \r\n\t1 thìa cà phê \tỚt cựa gà  \r\n \tMuối  \r\n \tHạt tiêu  \r\n \tHành lá  ',
        price: 167337,
      },
      chef: {
        _id: '5fe871eb3316fb1f20a6fcbf',
        number: 5,
        name: 'Võ Thị Xuân Phương',
        email: 'phuongvtx@gmail.com',
        password: 'ea2b3507e2100b7080d01eaa189f0922',
        phone: '0977666035',
        address:
          '20/28/44 Hồ Đắc Di, Tây Thạnh, Tân Phú, Thành phố Hồ Chí Minh',
        latitude: 10.8068999,
        longitude: 106.6331267,
        avatar: 'Thiết lập ngay',
        cover_photo: 'Thiết lập ngay',
        introduce: 'Thiết lập ngay',
        sex: 'Thiết lập ngay',
        social_network: 'Thiết lập ngay',
        date_of_birth: 'Thiết lập ngay',
        level: 3,
      },
      dishofchef: {
        iddishofchef: '35fd65413524abd351c39da01',
        price: 170040,
      },
    },
    {
      dish: {
        _id: '5fd639e74c30750ea086f462',
        number: 49,
        name: 'Trứng hấp bí ngô hấp dẫn đón Halloween',
        picture:
          'http://gl.amthuc365.vn/thumbnails/850/590//uploads/i/Vao-bep-che-bien-mon-trung-bi-ngo-hap-dan-don-Halloween.jpg?v=4.1',
        prepare: ' Chuẩn bị: 5 phút',
        perform: ' Thực hiện: 15 phút',
        ingredients:
          '\t6 quả \tTrứng  \r\n\t3 thìa canh \tMù tạt dijon  \r\n\t60 gram \tMayonnaise  \r\n\t1 thìa cà phê \tỚt cựa gà  \r\n \tMuối  \r\n \tHạt tiêu  \r\n \tHành lá  ',
        price: 167337,
      },
      chef: {
        _id: '5fe871eb3316fb1f20a6fcbf',
        number: 5,
        name: 'Võ Thị Xuân Phương',
        email: 'phuongvtx@gmail.com',
        password: 'ea2b3507e2100b7080d01eaa189f0922',
        phone: '0977666035',
        address:
          '20/28/44 Hồ Đắc Di, Tây Thạnh, Tân Phú, Thành phố Hồ Chí Minh',
        latitude: 10.8068999,
        longitude: 106.6331267,
        avatar: 'Thiết lập ngay',
        cover_photo: 'Thiết lập ngay',
        introduce: 'Thiết lập ngay',
        sex: 'Thiết lập ngay',
        social_network: 'Thiết lập ngay',
        date_of_birth: 'Thiết lập ngay',
        level: 3,
      },
      dishofchef: {
        iddishofchef: '45fd65413524abd351c39da01',
        price: 170040,
      },
    },
  ];

  const dataHotDish = [
    {
      dish: {
        _id: '5fd639e74c30750ea086f462',
        number: 49,
        name: 'Trứng hấp bí ngô hấp dẫn đón Halloween',
        picture:
          'http://gl.amthuc365.vn/thumbnails/850/590//uploads/i/Vao-bep-che-bien-mon-trung-bi-ngo-hap-dan-don-Halloween.jpg?v=4.1',
        prepare: ' Chuẩn bị: 5 phút',
        perform: ' Thực hiện: 15 phút',
        ingredients:
          '\t6 quả \tTrứng  \r\n\t3 thìa canh \tMù tạt dijon  \r\n\t60 gram \tMayonnaise  \r\n\t1 thìa cà phê \tỚt cựa gà  \r\n \tMuối  \r\n \tHạt tiêu  \r\n \tHành lá  ',
        price: 167337,
      },
      chef: {
        _id: '5fe871eb3316fb1f20a6fcbf',
        number: 5,
        name: 'Võ Thị Xuân Phương',
        email: 'phuongvtx@gmail.com',
        password: 'ea2b3507e2100b7080d01eaa189f0922',
        phone: '0977666035',
        address:
          '20/28/44 Hồ Đắc Di, Tây Thạnh, Tân Phú, Thành phố Hồ Chí Minh',
        latitude: 10.8068999,
        longitude: 106.6331267,
        avatar: 'Thiết lập ngay',
        cover_photo: 'Thiết lập ngay',
        introduce: 'Thiết lập ngay',
        sex: 'Thiết lập ngay',
        social_network: 'Thiết lập ngay',
        date_of_birth: 'Thiết lập ngay',
        level: 3,
      },
      dishofchef: {
        iddishofchef: '35fd65413524abd351c39da01',
        price: 170040,
      },
    },
    {
      dish: {
        _id: '5fd639e74c30750ea086f462',
        number: 49,
        name: 'Trứng hấp bí ngô hấp dẫn đón Halloween',
        picture:
          'http://gl.amthuc365.vn/thumbnails/850/590//uploads/i/Vao-bep-che-bien-mon-trung-bi-ngo-hap-dan-don-Halloween.jpg?v=4.1',
        prepare: ' Chuẩn bị: 5 phút',
        perform: ' Thực hiện: 15 phút',
        ingredients:
          '\t6 quả \tTrứng  \r\n\t3 thìa canh \tMù tạt dijon  \r\n\t60 gram \tMayonnaise  \r\n\t1 thìa cà phê \tỚt cựa gà  \r\n \tMuối  \r\n \tHạt tiêu  \r\n \tHành lá  ',
        price: 167337,
      },
      chef: {
        _id: '5fe871eb3316fb1f20a6fcbf',
        number: 5,
        name: 'Võ Thị Xuân Phương',
        email: 'phuongvtx@gmail.com',
        password: 'ea2b3507e2100b7080d01eaa189f0922',
        phone: '0977666035',
        address:
          '20/28/44 Hồ Đắc Di, Tây Thạnh, Tân Phú, Thành phố Hồ Chí Minh',
        latitude: 10.8068999,
        longitude: 106.6331267,
        avatar: 'Thiết lập ngay',
        cover_photo: 'Thiết lập ngay',
        introduce: 'Thiết lập ngay',
        sex: 'Thiết lập ngay',
        social_network: 'Thiết lập ngay',
        date_of_birth: 'Thiết lập ngay',
        level: 3,
      },
      dishofchef: {
        iddishofchef: '25fd65413524abd351c39da01',
        price: 170040,
      },
    },
    {
      dish: {
        _id: '5fd639e74c30750ea086f462',
        number: 49,
        name: 'Trứng hấp bí ngô hấp dẫn đón Halloween',
        picture:
          'http://gl.amthuc365.vn/thumbnails/850/590//uploads/i/Vao-bep-che-bien-mon-trung-bi-ngo-hap-dan-don-Halloween.jpg?v=4.1',
        prepare: ' Chuẩn bị: 5 phút',
        perform: ' Thực hiện: 15 phút',
        ingredients:
          '\t6 quả \tTrứng  \r\n\t3 thìa canh \tMù tạt dijon  \r\n\t60 gram \tMayonnaise  \r\n\t1 thìa cà phê \tỚt cựa gà  \r\n \tMuối  \r\n \tHạt tiêu  \r\n \tHành lá  ',
        price: 167337,
      },
      chef: {
        _id: '5fe871eb3316fb1f20a6fcbf',
        number: 5,
        name: 'Võ Thị Xuân Phương',
        email: 'phuongvtx@gmail.com',
        password: 'ea2b3507e2100b7080d01eaa189f0922',
        phone: '0977666035',
        address:
          '20/28/44 Hồ Đắc Di, Tây Thạnh, Tân Phú, Thành phố Hồ Chí Minh',
        latitude: 10.8068999,
        longitude: 106.6331267,
        avatar: 'Thiết lập ngay',
        cover_photo: 'Thiết lập ngay',
        introduce: 'Thiết lập ngay',
        sex: 'Thiết lập ngay',
        social_network: 'Thiết lập ngay',
        date_of_birth: 'Thiết lập ngay',
        level: 3,
      },
      dishofchef: {
        iddishofchef: '15fd65413524abd351c39da01',
        price: 170040,
      },
    },
  ];

  const flatListItemSeparatorDish = () => {
    return <View style={styles.line} />;
  };

  const getCommentChef = () => {
    var id;
    if (route.params.fromDish !== undefined) {
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
      <View style={styles.cardView}>
        <Text style={styles.cardViewTitle}>
          Món ăn nổi bật ({dataHotDish.length})
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataHotDish}
          ItemSeparatorComponent={flatListItemSeparatorDish}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('DISH', {dish: item})}>
                <DishViewVertical dish={item} chef />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.dishofchef.iddishofchef}
        />
      </View>
      <View style={styles.cardViewLast}>
        <Text style={styles.cardViewTitle}>
          Danh sách món ăn ({dataDish.length})
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataDish}
          ItemSeparatorComponent={flatListItemSeparatorDish}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('DISH', {dish: item})}>
                <DishViewVertical dish={item} chef />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.dishofchef.iddishofchef}
        />
      </View>
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
        <ImageBackground
          style={styles.cover}
          source={
            cover_photo === 'Thiết lập ngay'
              ? {
                  uri:
                    'https://res.cloudinary.com/chefood/image/upload/v1614660312/cover_photo/cover_photo_tmgnhx.png',
                }
              : {uri: cover_photo}
          }>
          <Image
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
          <View style={styles.rating}>
            <View style={styles.star}>
              <RatingStar star={Math.round(level)} />
            </View>
            <Text style={styles.ratingText}>{Math.round(level * 10) / 10}</Text>
          </View>
        </ImageBackground>

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
                Món ăn ({dataDish.length + dataHotDish.length})
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
