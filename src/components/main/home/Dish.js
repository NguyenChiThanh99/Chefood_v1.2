/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-root-toast';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Global from '../../Global';
import Comment from './cardView/Comment';
import DishViewHorizontal from './cardView/DishViewHorizontal';
import DishViewRelated from './cardView/DishViewRelated';
import BadgeCart from './cardView/BadgeCart';
import view_dish from '../../../apis/view_dish';
import get_comment_dish from '../../../apis/get_comment_dish';
import get_other_dish_of_chef from '../../../apis/get_other_dish_of_chef';
import get_dish_by_id from '../../../apis/get_dish_by_id';
import get_all_dish from '../../../apis/get_all_dish';
import get_type_dish from '../../../apis/get_type_dish';
import add_saved_dish from '../../../apis/add_saved_dish';
import remove_saved_dish from '../../../apis/remove_saved_dish';
import {updateSavedDish, updateCart} from '../../../../actions';

import arrowBack from '../../../icons/arrow_back_ios-ffffff.png';
import saveIcon from '../../../icons/bookmark_border-82.png';
import saveIconS from '../../../icons/bookmark-fb5a23.png';
import minusDisable from '../../../icons/remove_circle_outline-e0.png';
import minus from '../../../icons/remove_circle_outline-fb5a23.png';
import plus from '../../../icons/add_circle_outline-fb5a23.png';
import prepareIcon from '../../../icons/TimeSquare.png';
import performIcon from '../../../icons/TimeCircle.png';
import arrow from '../../../icons/arrow_right-fb5a23.png';

var soluong = 1;
var type;

export default function Dish({navigation, route}) {
  const isFocused = useIsFocused();
  useEffect(() => {
    const ac = new window.AbortController();
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    checkSavedStatus(dish.dishofchef.iddishofchef);
    if (dish.chef !== undefined) {
      getOtherdishOfChef(dish.chef.number, 0);
    }
    viewDish(dish.dishofchef.iddishofchef);
    determineTypeOfDish(dish.dish.name, 0);

    if (isFocused) {
      if (route.params.id !== undefined) {
        getDishById(route.params.id);
      }
      if (route.params.fromChef === true) {
        getCommentDish();
        setMenu({ingredients: false, comments: true, images: false});
      }
    }
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
      ac.abort(); // Abort both fetches on unmount
      setSaveStatus(false);
      setQuantity(1);
      setMenu({
        ingredients: true,
        comments: false,
        images: false,
      });
      setDataComment([]);
      setLoadingComment(false);
      setDataOtherDish([]);
      setLoadingOtherDish(false);
      setPageOtherDish(0);
      setDataRelatedDish([]);
      setLoadingRelatedDish(false);
      setPageRelatedDish(0);
    };
  }, [isFocused]);

  const scrollRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const savedDish = useSelector((state) => state.savedDish);
  const [saveStatus, setSaveStatus] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [menu, setMenu] = useState({
    ingredients: true,
    comments: false,
    images: false,
  });
  const [dataComment, setDataComment] = useState([]);
  const [loadingComment, setLoadingComment] = useState(false);
  const [pageComment, setPageComment] = useState(0);
  const [dataOtherDish, setDataOtherDish] = useState([]);
  const [loadingOtherDish, setLoadingOtherDish] = useState(false);
  const [pageOtherDish, setPageOtherDish] = useState(0);
  const [dataRelatedDish, setDataRelatedDish] = useState([]);
  const [loadingRelatedDish, setLoadingRelatedDish] = useState(false);
  const [pageRelatedDish, setPageRelatedDish] = useState(0);
  const [dish, setDish] = useState(route.params.dish);

  const dataImgDish = [
    {
      id: 1,
      image:
        'https://image.thanhnien.vn/768/uploaded/minhnguyet/2019_12_01/nhanquan_wqmf.jpg',
    },
    {
      id: 2,
      image:
        'https://daotaobeptruong.vn/wp-content/uploads/2018/08/cach-lam-cha-ca-thu.jpg',
    },
    {
      id: 3,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZBF6ynHS_AEzJPntVlnbz9EyMzXAyxta9xg&usqp=CAU',
    },
    {
      id: 4,
      image: 'https://hutieunamvangmyhung.com/upload/sanpham/446-3482.gif',
    },
    {
      id: 5,
      image:
        'https://netspace.edu.vn/upload/images/2018/08/21/hu-tieu-nam-vang-02.jpg',
    },
    {
      id: 6,
      image:
        'https://cdn.tgdd.vn/2020/07/CookRecipe/GalleryStep/thanh-pham-491.jpg',
    },
    {
      id: 7,
      image: 'https://i.ytimg.com/vi/VuZoI4WRW9Q/maxresdefault.jpg',
    },
    {
      id: 8,
      image:
        'https://cdn.tgdd.vn/Files/2018/06/12/1094925/cach-nau-mon-hu-tieu-nam-vang-ngon-dung-dieu-nhu-ngo%C3%A0i-hang-da-an-l%C3%A0-ghien-8-760x367.jpg',
    },
  ];

  const checkSavedStatus = (id) => {
    var found = savedDish.find((item) => item.id_dish_of_chef === id);
    if (found === undefined) {
      setSaveStatus(false);
    } else {
      setSaveStatus(true);
    }
  };

  const saveHandle = () => {
    if (!saveStatus) {
      setSaveStatus(!saveStatus);
      add_saved_dish
        .add_saved_dish(user.token, dish.dishofchef.iddishofchef)
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
        updateSavedDish(
          savedDish.concat({
            _id: '',
            id_dish_of_chef: dish.dishofchef.iddishofchef,
          }),
        ),
      );
    } else {
      setSaveStatus(!saveStatus);
      remove_saved_dish
        .remove_saved_dish(user.token, dish.dishofchef.iddishofchef)
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
        updateSavedDish(
          savedDish.filter(
            (item) => item.id_dish_of_chef !== dish.dishofchef.iddishofchef,
          ),
        ),
      );
    }
  };

  const addToCart = () => {
    const newCart = {
      dish: dish,
      quantity: quantity,
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
      for (var i = 0; i < cart.length; i++) {
        if (
          cart[i].dish.dishofchef.iddishofchef === dish.dishofchef.iddishofchef
        ) {
          flag = true;
          cart[i].quantity += quantity;
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

  const viewDish = (id) => {
    view_dish
      .view_dish(user.token, id)
      .then((responseJson) => {})
      .catch((err) => {
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const getCommentDish = () => {
    setLoadingComment(true);
    get_comment_dish
      .get_comment_dish(user.token, dish.dishofchef.iddishofchef, pageComment)
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

  const getOtherdishOfChef = (id, page) => {
    setLoadingOtherDish(true);
    get_other_dish_of_chef
      .get_other_dish_of_chef(user.token, id, page)
      .then((responseJson) => {
        if (responseJson.length === 0) {
          setLoadingOtherDish(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataOtherDish(responseJson);
          } else {
            setDataOtherDish(dataOtherDish.concat(responseJson));
          }
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

  const getDishById = (id) => {
    get_dish_by_id
      .get_dish_by_id(user.token, id)
      .then((responseJson) => {
        setDish(responseJson);

        if (isFocused && route.params.id !== undefined) {
          checkSavedStatus(id);
          getOtherdishOfChef(responseJson.chef.number, 0);
          viewDish(id);
          determineTypeOfDish(responseJson.dish.name, 0);
        }
      })
      .catch((err) => {
        console.log(err);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const determineTypeOfDish = (name, page) => {
    var nameArr = name.toLowerCase().split(' ');
    var result = '';
    for (let i = 0; i < nameArr.length; i++) {
      switch (nameArr[i]) {
        case 'heo':
          result = ' heo';
          break;
        case 'lợn':
          result = ' heo';
          break;
        case 'chỉ':
          result = ' heo';
          break;
        case 'bò':
          result = ' bò';
          break;
        case 'gà':
          result = ' gà';
          break;
        case 'vịt':
          result = ' gà';
          break;
        case 'chim':
          result = ' gà';
          break;
        case 'trứng':
          result = ' gà';
          break;
        case 'cá':
          result = ' cá';
          break;
        case 'salad':
          result = ' salad';
          break;
        case 'gỏi':
          result = ' salad';
          break;
        case 'nộm':
          result = ' salad';
          break;
        case 'tôm':
          result = ' tôm';
          break;
        case 'xúc':
          result = ' xúc xích';
          break;
        case 'canh':
          result = ' canh';
          break;
        case 'lẩu':
          result = ' canh';
          break;
        case 'mỳ':
          result = ' mỳ';
          break;
        case 'mì':
          result = ' mỳ';
          break;
        case 'hủ':
          result = ' mỳ';
          break;
        case 'tiếu':
          result = ' mỳ';
          break;
        case 'phở':
          result = ' mỳ';
          break;
        case 'bún':
          result = ' mỳ';
          break;
        case 'hải':
          result = ' hải sản';
          break;
        case 'sản':
          result = ' hải sản';
          break;
        case 'mực':
          result = ' hải sản';
          break;
        case 'nghiêu':
          result = ' hải sản';
          break;
        case 'sò':
          result = ' hải sản';
          break;
        case 'sushi':
          result = ' sushi';
          break;
        case 'kem':
          result = ' kem';
          break;
        case 'cơm':
          result = ' cơm';
          break;
        case 'sandwich':
          result = ' sandwich';
          break;
        case 'bánh':
          result = ' bánh';
          break;
      }
      if (result !== '') {
        break;
      }
    }
    if (result === '') {
      type = 'all';
      getAllDish(page);
    } else {
      type = result;
      getTypeDish(result, page);
    }
  };

  const getAllDish = (page) => {
    setLoadingRelatedDish(true);
    get_all_dish
      .get_all_dish(user.token, page)
      .then((responseJson) => {
        if (responseJson.length === 0) {
          setLoadingRelatedDish(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: -20,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataRelatedDish(responseJson);
          } else {
            setDataRelatedDish(dataRelatedDish.concat(responseJson));
          }
          setPageRelatedDish(pageRelatedDish + 1);
          setLoadingRelatedDish(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingRelatedDish(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const getTypeDish = (text, page) => {
    setLoadingRelatedDish(true);
    get_type_dish
      .get_type_dish(user.token, text, page)
      .then((responseJson) => {
        if (responseJson.length === 0) {
          setLoadingRelatedDish(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: -20,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataRelatedDish(responseJson);
          } else {
            setDataRelatedDish(dataRelatedDish.concat(responseJson));
          }
          setPageRelatedDish(pageRelatedDish + 1);
          setLoadingRelatedDish(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingRelatedDish(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const goToDish = (id, otherChef, numberChef, name) => {
    soluong = 1;
    setSaveStatus(false);
    setQuantity(1);
    setMenu({
      ingredients: true,
      comments: false,
      images: false,
    });
    setDataComment([]);
    setLoadingComment(false);
    setPageComment(0);
    setDataOtherDish([]);
    setLoadingOtherDish(false);
    setPageOtherDish(0);
    setDataRelatedDish([]);
    setLoadingRelatedDish(false);
    setPageRelatedDish(0);

    if (otherChef === true) {
      getOtherdishOfChef(dish.chef.number, 0);
      determineTypeOfDish(name, 0);
    } else {
      getOtherdishOfChef(numberChef, 0);
      determineTypeOfDish(name, 0);
    }
    getDishById(id);
    viewDish(id);
    checkSavedStatus(id);
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const changeQuantity = (text) => {
    if (!isNaN(parseInt(text, 10))) {
      setQuantity(parseInt(text, 10));
      soluong = text;
    } else {
      setQuantity(text);
      soluong = text;
    }
  };

  const _keyboardDidHide = () => {
    if (isNaN(parseInt(soluong, 10)) || parseInt(soluong, 10) <= 1) {
      setQuantity(1);
      soluong = 1;
    }
  };

  const menuHandle = (loai) => {
    switch (loai) {
      case 0:
        setMenu({ingredients: true, comments: false, images: false});
        break;
      case 1:
        getCommentDish();
        setMenu({ingredients: false, comments: true, images: false});
        break;
      default:
        setMenu({ingredients: false, comments: false, images: true});
        break;
    }
  };

  const flatListItemSeparator = () => {
    return <View style={styles.line} />;
  };

  const Loading = (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} color="#fb5a23" size="small" />
    </View>
  );

  const ingredientsJSX = (
    <Text style={styles.ingredient}>{dish.dish.ingredients}</Text>
  );
  const commentsJSX = (
    <View>
      {dataComment.length !== 0 ? (
        <FlatList
          key={'#'}
          showsVerticalScrollIndicator={false}
          data={dataComment}
          ListFooterComponent={
            <View style={{backgroundColor: 'white'}}>
              <View style={styles.line} />
              {loadingComment ? (
                <View style={{paddingVertical: 4.5}}>{Loading}</View>
              ) : (
                <TouchableOpacity
                  onPress={() => getCommentDish()}
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
          ItemSeparatorComponent={flatListItemSeparator}
          renderItem={({item, index}) => {
            return (
              <View>
                <Comment comment={item} />
              </View>
            );
          }}
          keyExtractor={(item) => '#' + item.comment.comment}
        />
      ) : (
        <View style={{paddingVertical: 50}}>{Loading}</View>
      )}
    </View>
  );
  const imagesJSX = (
    <View>
      <FlatList
        key={'_'}
        style={styles.listImage}
        showsVerticalScrollIndicator={false}
        data={dataImgDish}
        numColumns={3}
        renderItem={({item, index}) => {
          return (
            <View>
              <Image style={styles.imageDish} source={{uri: item.image}} />
            </View>
          );
        }}
        keyExtractor={(item) => '_' + item.id.toString()}
      />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
        <View style={styles.cardView}>
          <Image style={styles.image} source={{uri: dish.dish.picture}} />

          <View style={styles.generalInfo}>
            <Text style={styles.name} numberOfLines={2}>
              {dish.dish.name}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CHEF', {id: dish.chef._id, fromDish: true})
              }>
              <Text style={styles.chef}>
                {dish.chef !== undefined ? dish.chef.name : ''}
              </Text>
            </TouchableOpacity>
            <Text style={styles.address} numberOfLines={1}>
              {dish.chef !== undefined ? dish.chef.address : ''}
            </Text>
            <TouchableOpacity
              style={styles.saveCont}
              onPress={() => saveHandle()}>
              <Image
                style={styles.saveImg}
                source={saveStatus ? saveIconS : saveIcon}
              />
              <Text style={saveStatus ? styles.saveTextS : styles.saveText}>
                Lưu
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timeCont}>
            <View style={styles.prepareCont}>
              <Image style={styles.prepareImg} source={prepareIcon} />
              <Text style={styles.prepareText}>{dish.dish.prepare}</Text>
            </View>
            <Text style={styles.numOrder}>
              {dish.dishofchef.orders} lần đặt nấu
            </Text>
          </View>
          <View style={styles.prepareCont}>
            <Image style={styles.prepareImg} source={performIcon} />
            <Text style={styles.prepareText}>{dish.dish.perform}</Text>
          </View>

          <View style={styles.priceCont}>
            <Text style={styles.price}>
              {Global.currencyFormat(dish.dishofchef.price)}đ
            </Text>
            <View style={styles.quantityCont}>
              <TouchableOpacity
                onPress={() => {
                  setQuantity(quantity - 1);
                  soluong = soluong - 1;
                }}
                disabled={quantity <= 1 ? true : false}>
                <Image
                  style={styles.quantityImg}
                  source={
                    quantity <= 1 || quantity === '' ? minusDisable : minus
                  }
                />
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                autoCompleteType="cc-number"
                keyboardType="decimal-pad"
                maxLength={2}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                onChangeText={(text) => changeQuantity(text)}
                value={quantity.toString()}
              />
              <TouchableOpacity
                onPress={() => {
                  setQuantity(quantity + 1);
                  soluong = soluong + 1;
                }}>
                <Image style={styles.quantityImg} source={plus} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              addToCart();
            }}>
            <LinearGradient
              style={styles.btn}
              colors={['#fb5a23', '#ffb038']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <View>
                <Text style={styles.btnText}>Thêm vào giỏ hàng</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.cardView}>
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => menuHandle(0)}>
              <Text
                style={menu.ingredients ? styles.menuTextS : styles.menuText}>
                Nguyên liệu
              </Text>
              <View
                style={menu.ingredients ? styles.menuLine : styles.menuNoLine}
              />
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
              <Text style={menu.images ? styles.menuTextS : styles.menuText}>
                Hình ảnh
              </Text>
              <View style={menu.images ? styles.menuLine : styles.menuNoLine} />
            </TouchableOpacity>
          </View>

          {menu.ingredients
            ? ingredientsJSX
            : menu.comments
            ? commentsJSX
            : imagesJSX}
        </View>

        {dataOtherDish.length !== 0 ? (
          <View style={styles.cardView}>
            <Text style={styles.cardViewTitle}>
              Các món ăn khác của đầu bếp
            </Text>
            <FlatList
              key={'*'}
              style={styles.cardViewList}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dataOtherDish}
              ListFooterComponent={
                loadingOtherDish ? (
                  <View style={styles.viewMoreCont}>{Loading}</View>
                ) : (
                  <TouchableOpacity
                    style={styles.viewMoreCont}
                    onPress={() =>
                      getOtherdishOfChef(dish.chef.number, pageOtherDish)
                    }>
                    <View style={styles.viewMoreImgCont}>
                      <Image style={styles.viewMoreImg} source={arrow} />
                    </View>
                    <Text style={styles.viewMoreText}>Xem thêm</Text>
                  </TouchableOpacity>
                )
              }
              renderItem={({item, index}) => {
                if (index === 0) {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        goToDish(item.iddishofchef, true, 0, item.name)
                      }
                      style={{marginLeft: 15, marginRight: 10}}>
                      <DishViewHorizontal dish={item} chef />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        goToDish(item.iddishofchef, true, 0, item.name)
                      }
                      style={{marginRight: 10}}>
                      <DishViewHorizontal dish={item} chef />
                    </TouchableOpacity>
                  );
                }
              }}
              keyExtractor={(item) => '*' + item.iddishofchef}
            />
          </View>
        ) : null}

        {dataRelatedDish.length !== 0 ? (
          <View style={styles.cardViewLast}>
            <Text style={styles.cardViewTitle}>Các món ăn liên quan</Text>
            <FlatList
              key={'/'}
              style={styles.cardViewList2Col}
              showsVerticalScrollIndicator={false}
              data={dataRelatedDish}
              numColumns={2}
              ListFooterComponent={
                <View style={{paddingBottom: 15}}>
                  <View style={styles.line} />
                  {loadingRelatedDish ? (
                    <View style={{paddingVertical: 4.5}}>{Loading}</View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        if (type === 'all') {
                          getAllDish(pageRelatedDish);
                        } else {
                          getTypeDish(type, pageRelatedDish);
                        }
                      }}
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
                if (index % 2 === 0) {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        goToDish(
                          item.dishofchef.iddishofchef,
                          false,
                          item.chef.number,
                          item.dish.name,
                        )
                      }
                      style={{marginRight: 15}}>
                      <DishViewRelated dish={item} />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        goToDish(
                          item.dishofchef.iddishofchef,
                          false,
                          item.chef.number,
                          item.dish.name,
                        )
                      }>
                      <DishViewRelated dish={item} />
                    </TouchableOpacity>
                  );
                }
              }}
              keyExtractor={(item) => '/' + item.dishofchef.iddishofchef}
            />
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.topBtn}>
        <TouchableOpacity
          style={styles.topBtnCont}
          onPress={() => navigation.goBack()}>
          <Image style={styles.topBtnImg} source={arrowBack} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topBtnCont}
          onPress={() => navigation.navigate('CART', {address: ''})}>
          <BadgeCart dish />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const {width, height, mainColor, backgroundColor, backButton} = Global;
const styles = StyleSheet.create({
  viewMoreTextVertical: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 35,
    paddingVertical: 6,
  },
  viewMoreImgCont: {
    borderRadius: width / 40 + 3.5,
    borderColor: mainColor,
    borderWidth: 1,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMoreImg: {
    width: width / 20,
    height: width / 20,
  },
  viewMoreText: {
    fontFamily: 'Roboto-Regular',
    marginTop: 5,
    color: mainColor,
    fontSize: width / 32,
  },
  viewMoreCont: {
    marginRight: 15,
    borderColor: '#828282',
    borderWidth: 0.25,
    borderRadius: 5,
    width: width / 3.8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardViewList2Col: {
    marginHorizontal: 15,
    marginBottom: -5,
  },
  cardViewList: {
    marginBottom: 15,
    marginTop: 5,
  },
  cardViewTitle: {
    fontFamily: 'Roboto-Light',
    color: '#000000',
    fontSize: width / 26,
    margin: 10,
  },
  listImage: {
    margin: 5,
  },
  imageDish: {
    width: width / 3 - 40 / 3,
    height: width / 5,
    margin: 5,
    borderRadius: 5,
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0,
    borderTopWidth: 0.5,
    marginHorizontal: 15,
  },
  ingredient: {
    fontFamily: 'Roboto-Regular',
    color: '#4f4f4f',
    fontSize: width / 30,
    marginLeft: width / 12,
    marginVertical: 10,
  },
  menu: {
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 1,
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  menuTextS: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 28,
    fontWeight: 'bold',
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
  btn: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 5,
  },
  btnText: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 30,
    color: 'white',
    marginVertical: 10,
  },
  priceCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 50,
  },
  price: {
    fontFamily: 'Roboto-Bold',
    fontSize: width / 19,
    color: '#fb5a23',
    marginRight: width / 8,
  },
  quantityCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityImg: {
    width: width / 16,
    height: width / 16,
  },
  quantityInput: {
    textAlign: 'center',
    marginHorizontal: width / 18,
    color: '#000',
    fontFamily: 'Roboto-Bold',
    fontSize: width / 28,
    padding: 0,
  },
  timeCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  prepareCont: {
    flexDirection: 'row',
    marginLeft: width / 12,
    alignItems: 'center',
  },
  prepareImg: {
    width: width / 16,
    height: width / 16,
  },
  prepareText: {
    fontFamily: 'Roboto-Light',
    color: '#333333',
    fontSize: width / 32,
  },
  numOrder: {
    fontFamily: 'Roboto-Medium',
    color: '#828282',
    fontSize: width / 34,
    marginRight: 15,
  },
  cardView: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  cardViewLast: {
    backgroundColor: '#fff',
  },
  generalInfo: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 1.5,
    marginHorizontal: 15,
    marginTop: -height / 20,
    marginBottom: 10,
    paddingHorizontal: width / 14,
    paddingVertical: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Roboto-Bold',
    fontSize: width / 22,
    color: '#000000',
    textAlign: 'center',
  },
  chef: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 30,
    color: '#828282',
    textAlign: 'center',
    marginTop: 2,
  },
  address: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 32,
    color: '#219653',
    textAlign: 'center',
    marginTop: 15,
  },
  saveCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  saveImg: {
    width: width / 18,
    height: width / 18,
  },
  saveTextS: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 28,
    color: '#fb5a23',
  },
  saveText: {
    fontFamily: 'Roboto-Medium',
    fontSize: width / 28,
    color: '#828282',
  },
  wrapper: {
    backgroundColor,
    flex: 1,
  },
  image: {
    width,
    height: height / 3.7,
  },
  topBtn: {
    width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBtnCont: {
    width: width / 12,
    height: width / 12,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  topBtnImg: {
    width: backButton,
    height: backButton,
  },
});
