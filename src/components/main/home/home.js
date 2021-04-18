/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  LogBox,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {SliderBox} from 'react-native-image-slider-box';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import Global from '../../Global';
import MainHeader from './cardView/MainHeader';
import DishViewHorizontal from './cardView/DishViewHorizontal';
import DishViewVertical from './cardView/DishViewVertical';
import ChefView from './cardView/ChefView';
import Category from './cardView/Category';
import hot_dish from '../../../apis/hot_dish';
import get_viewed_dish from '../../../apis/get_viewed_dish';
import get_all_dish from '../../../apis/get_all_dish';
import get_type_dish from '../../../apis/get_type_dish';
import get_saved_dish from '../../../apis/get_saved_dish';
import get_following_chef from '../../../apis/get_following_chef';
import get_name_viewed_dish from '../../../apis/get_name_viewed_dish';
import get_related_dish from '../../../apis/get_related_dish';
import get_recommended_dish from '../../../apis/get_recommended_dish';
import get_today_dish from '../../../apis/get_today_dish';
import get_hot_chef from '../../../apis/get_hot_chef';
import {updateSavedDish, updateSavedChef} from '../../../../actions';

import barbecue from '../../../images/word/barbecue.png';
import donut from '../../../images/word/donut.png';
import chicken from '../../../images/word/fried-chicken.png';
import ramen from '../../../images/word/ramen.png';
import salad from '../../../images/word/salad.png';
import soup from '../../../images/word/soup.png';
import steak from '../../../images/word/steak.png';
import tempura from '../../../images/word/tempura.png';

import plate from '../../../images/category/plate.png';
import pork from '../../../images/category/pork.png';
import steakCategory from '../../../images/category/steak.png';
import roastChicken from '../../../images/category/roast-chicken.png';
import fish from '../../../images/category/fish.png';
import saladCategory from '../../../images/category/salad.png';
import shrimp from '../../../images/category/shrimp.png';
import sausage from '../../../images/category/sausage.png';
import soupCategory from '../../../images/category/soup.png';
import spaghetti from '../../../images/category/spaghetti.png';
import squid from '../../../images/category/squid.png';
import sushi from '../../../images/category/sushi.png';
import iceCream from '../../../images/category/ice-cream.png';
import rice from '../../../images/category/rice.png';
import sandwich from '../../../images/category/sandwich.png';
import cake from '../../../images/category/cake.png';

import arrow from '../../../icons/arrow_right-fb5a23.png';

var countExit = 0;
var firstLoad = false;

export default function Home({navigation}) {
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

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!firstLoad) {
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      loadHotDish();
      getTodayDish();
      getAllDish(true);
      getHotChef();
      getSavedDish();
      getFollowingChef();
      firstLoad = true;
    }
    if (isFocused) {
      getRecommendation(0);
      getViewedDish(0);
    }
  }, [isFocused]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [pageHotDish, setPageHotDish] = useState(0);
  const [dataHotDish, setDataHotDish] = useState([]);
  const [loadingHotDish, setLoadingHotDish] = useState(false);
  const [pageHotChef, setPageHotChef] = useState(0);
  const [dataHotChef, setDataHotChef] = useState([]);
  const [loadingHotChef, setLoadingHotChef] = useState(false);
  const [pageTodayDish, setPageTodayDish] = useState(0);
  const [dataTodayDish, setDataTodayDish] = useState([]);
  const [loadingTodayDish, setLoadingTodayDish] = useState(false);
  const [pageRecommendation, setPageRecommendation] = useState(0);
  const [dataRecommendation, setDataRecommendation] = useState([]);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [pageViewedDish, setPageViewedDish] = useState(0);
  const [dataViewedDish, setDataViewedDish] = useState([]);
  const [loadingViewedDish, setLoadingViewedDish] = useState(false);
  const [pageDishCategory, setPageDishCategory] = useState(0);
  const [dataDishCategory, setDataDishCategory] = useState([]);
  const [loadingDishCategory, setLoadingDishCategory] = useState(false);
  const [loadingCategoryFirst, setLoadingCategoryFirst] = useState(false);
  const [category, setCategory] = useState({
    all: true,
    pork: false,
    steakCategory: false,
    roastChicken: false,
    fish: false,
    saladCategory: false,
    shrimp: false,
    sausage: false,
    soupCategory: false,
    spaghetti: false,
    squid: false,
    sushi: false,
    iceCream: false,
    rice: false,
    sandwich: false,
    cake: false,
  });

  const imagesSlider = [
    'https://i.pinimg.com/originals/05/8e/71/058e7126b52f8e13dbfc0ef2c3c3cef9.jpg',
    'https://i.pinimg.com/originals/3f/8e/48/3f8e48a0b20f4dc0671a8e5e8dd861a4.jpg',
    'https://branding360.vn/wp-content/uploads/2019/09/Food_05-e1568694831723.jpg',
    'https://traungonquan.vn/wp-content/uploads/2018/12/trau-ngon-co-banner-web.jpg',
  ];

  const dataCategory = [
    {id: 0, name: 'Tất cả', nickname: 'all', image: plate},
    {id: 1, name: 'Món heo', nickname: 'pork', image: pork},
    {id: 2, name: 'Món bò', nickname: 'steakCategory', image: steakCategory},
    {id: 3, name: 'Món gà', nickname: 'roastChicken', image: roastChicken},
    {id: 4, name: 'Món cá', nickname: 'fish', image: fish},
    {id: 5, name: 'Salad', nickname: 'saladCategory', image: saladCategory},
    {id: 6, name: 'Món tôm', nickname: 'shrimp', image: shrimp},
    {id: 7, name: 'Xúc xích', nickname: 'sausage', image: sausage},
    {id: 8, name: 'Món canh', nickname: 'soupCategory', image: soupCategory},
    {id: 9, name: 'Mỳ', nickname: 'spaghetti', image: spaghetti},
    {id: 10, name: 'Hải sản', nickname: 'squid', image: squid},
    {id: 11, name: 'Sushi', nickname: 'sushi', image: sushi},
    {id: 12, name: 'Kem', nickname: 'iceCream', image: iceCream},
    {id: 13, name: 'Cơm', nickname: 'rice', image: rice},
    {id: 14, name: 'Sandwich', nickname: 'sandwich', image: sandwich},
    {id: 15, name: 'Bánh ngọt', nickname: 'cake', image: cake},
  ];

  const loadHotDish = () => {
    setLoadingHotDish(true);
    hot_dish
      .hot_dish(user.token, pageHotDish)
      .then((responseJson) => {
        if (responseJson.length === 0) {
          setLoadingHotDish(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          setDataHotDish(dataHotDish.concat(responseJson));
          setPageHotDish(pageHotDish + 1);
          setLoadingHotDish(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingHotDish(false);
        // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
        //   position: 0,
        //   duration: 2500,
        // });
      });
  };

  const getTodayDish = () => {
    setLoadingTodayDish(true);
    get_today_dish
      .get_today_dish(user.token, pageTodayDish)
      .then((responseJson) => {
        if (responseJson.length === 0 && pageTodayDish !== 0) {
          setLoadingTodayDish(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          setDataTodayDish(dataTodayDish.concat(responseJson));
          setPageTodayDish(pageTodayDish + 1);
          setLoadingTodayDish(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingTodayDish(false);
        // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
        //   position: 0,
        //   duration: 2500,
        // });
      });
  };

  const getHotChef = () => {
    setLoadingHotChef(true);
    get_hot_chef
      .get_hot_chef(user.token, pageHotChef)
      .then((responseJson) => {
        if (responseJson.length === 0 && pageHotChef !== 0) {
          setLoadingHotChef(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          setDataHotChef(dataHotChef.concat(responseJson));
          setPageHotChef(pageHotChef + 1);
          setLoadingHotChef(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingHotChef(false);
        // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
        //   position: 0,
        //   duration: 2500,
        // });
      });
  };

  const getViewedDish = (page) => {
    setLoadingViewedDish(true);
    get_viewed_dish
      .get_viewed_dish(user.token, page)
      .then((responseJson) => {
        if (page !== 0 && responseJson.length === 0) {
          setLoadingViewedDish(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataViewedDish(responseJson);
            setPageViewedDish(1);
          } else {
            var dishArr = [...dataViewedDish];
            for (let i = 0; i < responseJson.length; i++) {
              var found = dataViewedDish.find(
                (dish) =>
                  dish.dishofchef.iddishofchef ===
                  responseJson[i].dishofchef.iddishofchef,
              );
              if (found === undefined) {
                dishArr.push(responseJson[i]);
              }
            }
            setDataViewedDish(dishArr);
            setPageViewedDish(pageViewedDish + 1);
          }
          setLoadingViewedDish(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingViewedDish(false);
        // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
        //   position: 0,
        //   duration: 2500,
        // });
      });
  };

  const getSavedDish = () => {
    get_saved_dish
      .get_saved_dish(user.token)
      .then((responseJson) => {
        dispatch(updateSavedDish(responseJson));
      })
      .catch((err) => {
        console.log(err);
        // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
        //   position: 0,
        //   duration: 2500,
        // });
      });
  };

  const getRecommendation = (page) => {
    setLoadingRecommendation(true);
    get_name_viewed_dish
      .get_name_viewed_dish(user.token, page)
      .then((responseJson1) => {
        if (responseJson1.message === 'No more viewed dish!' && page !== 0) {
          setLoadingRecommendation(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          get_related_dish
            .get_related_dish(responseJson1.dish_name)
            .then((responseJson2) => {
              get_recommended_dish
                .get_recommended_dish(
                  user.token,
                  checkDataRecommendation(responseJson2),
                )
                .then((responseJson3) => {
                  setLoadingRecommendation(false);

                  if (page === 0) {
                    setDataRecommendation(responseJson3);
                    setPageRecommendation(1);
                  } else {
                    setDataRecommendation(
                      dataRecommendation.concat(responseJson3),
                    );
                    setPageRecommendation(page + 1);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  setLoadingRecommendation(false);
                  // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
                  //   position: 0,
                  //   duration: 2500,
                  // });
                });
            })
            .catch((err) => {
              console.log(err);
              setLoadingRecommendation(false);
              // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
              //   position: 0,
              //   duration: 2500,
              // });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingRecommendation(false);
        // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
        //   position: 0,
        //   duration: 2500,
        // });
      });
  };

  const checkDataRecommendation = (res) => {
    var output = [];
    for (let i = 0; i < res.length; i++) {
      var number = 0;
      for (let j = 0; j < dataRecommendation.length; j++) {
        if (res[i] === dataRecommendation[j].dish.name) {
          number += 1;
        }
      }
      output.push({
        dish_name: res[i],
        number: number,
      });
    }
    return output;
  };

  const getFollowingChef = () => {
    get_following_chef
      .get_following_chef(user.token)
      .then((responseJson) => {
        dispatch(updateSavedChef(responseJson));
      })
      .catch((err) => {
        console.log(err);
        // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
        //   position: 0,
        //   duration: 2500,
        // });
      });
  };

  const getAllDish = (first) => {
    if (first) {
      setLoadingCategoryFirst(true);
      get_all_dish
        .get_all_dish(user.token, 0)
        .then((responseJson) => {
          if (responseJson.length === 0) {
            setLoadingCategoryFirst(false);
            setDataDishCategory([]);
            return Toast.show('Đã tải đến cuối danh sách', {
              position: 0,
              duration: 2500,
            });
          } else {
            setDataDishCategory(responseJson);
            setPageDishCategory(pageDishCategory + 1);
            setLoadingCategoryFirst(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoadingCategoryFirst(false);
          // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          //   position: 0,
          //   duration: 2500,
          // });
        });
    } else {
      setLoadingDishCategory(true);
      get_all_dish
        .get_all_dish(user.token, pageDishCategory)
        .then((responseJson) => {
          if (responseJson.length === 0) {
            setLoadingDishCategory(false);
            return Toast.show('Đã tải đến cuối danh sách', {
              position: 0,
              duration: 2500,
            });
          } else {
            setDataDishCategory(dataDishCategory.concat(responseJson));
            setPageDishCategory(pageDishCategory + 1);
            setLoadingDishCategory(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoadingDishCategory(false);
          // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          //   position: 0,
          //   duration: 2500,
          // });
        });
    }
  };

  const getTypeDish = (first, text) => {
    if (first) {
      setLoadingCategoryFirst(true);
      get_type_dish
        .get_type_dish(user.token, text, 0)
        .then((responseJson) => {
          if (responseJson.length === 0) {
            setLoadingCategoryFirst(false);
            setDataDishCategory([]);
            return Toast.show('Đã tải đến cuối danh sách', {
              position: 0,
              duration: 2500,
            });
          } else {
            setDataDishCategory(responseJson);
            setPageDishCategory(pageDishCategory + 1);
            setLoadingCategoryFirst(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoadingCategoryFirst(false);
          // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          //   position: 0,
          //   duration: 2500,
          // });
        });
    } else {
      setLoadingDishCategory(true);
      get_type_dish
        .get_type_dish(user.token, text, pageDishCategory)
        .then((responseJson) => {
          if (responseJson.length === 0) {
            setLoadingDishCategory(false);
            return Toast.show('Đã tải đến cuối danh sách', {
              position: 0,
              duration: 2500,
            });
          } else {
            setDataDishCategory(dataDishCategory.concat(responseJson));
            setPageDishCategory(pageDishCategory + 1);
            setLoadingDishCategory(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoadingDishCategory(false);
          // return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          //   position: 0,
          //   duration: 2500,
          // });
        });
    }
  };

  const flatListItemSeparator = () => {
    return <View style={styles.line} />;
  };

  const viewDishCategoreMore = () => {
    if (category.all) {
      getAllDish(false);
    } else if (category.pork) {
      getTypeDish(false, ' heo');
    } else if (category.steakCategory) {
      getTypeDish(false, ' bò');
    } else if (category.roastChicken) {
      getTypeDish(false, ' gà');
    } else if (category.fish) {
      getTypeDish(false, ' cá');
    } else if (category.saladCategory) {
      getTypeDish(false, ' salad');
    } else if (category.shrimp) {
      getTypeDish(false, ' tôm');
    } else if (category.sausage) {
      getTypeDish(false, ' xúc xích');
    } else if (category.soupCategory) {
      getTypeDish(false, ' canh');
    } else if (category.spaghetti) {
      getTypeDish(false, ' mỳ');
    } else if (category.squid) {
      getTypeDish(false, ' hải sản');
    } else if (category.sushi) {
      getTypeDish(false, ' sushi');
    } else if (category.iceCream) {
      getTypeDish(false, ' kem');
    } else if (category.rice) {
      getTypeDish(false, ' cơm');
    } else if (category.sandwich) {
      getTypeDish(false, ' sandwich');
    } else {
      getTypeDish(false, ' bánh');
    }
  };

  const categoryHandle = (id) => {
    switch (id) {
      case 0:
        getAllDish(true);
        setCategory({
          all: true,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 1:
        getTypeDish(true, ' heo');
        setCategory({
          all: false,
          pork: true,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 2:
        getTypeDish(true, ' bò');
        setCategory({
          all: false,
          pork: false,
          steakCategory: true,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 3:
        getTypeDish(true, ' gà');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: true,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 4:
        getTypeDish(true, ' cá');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: true,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 5:
        getTypeDish(true, ' salad');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: true,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 6:
        getTypeDish(true, ' tôm');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: true,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 7:
        getTypeDish(true, ' xúc xích');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: true,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 8:
        getTypeDish(true, ' canh');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: true,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 9:
        getTypeDish(true, ' mỳ');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: true,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 10:
        getTypeDish(true, ' hải sản');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: true,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 11:
        getTypeDish(true, ' sushi');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: true,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 12:
        getTypeDish(true, ' kem');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: true,
          rice: false,
          sandwich: false,
          cake: false,
        });
        break;
      case 13:
        getTypeDish(true, ' cơm');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: true,
          sandwich: false,
          cake: false,
        });
        break;
      case 14:
        getTypeDish(true, ' sandwich');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: true,
          cake: false,
        });
        break;
      case 15:
        getTypeDish(true, ' bánh');
        setCategory({
          all: false,
          pork: false,
          steakCategory: false,
          roastChicken: false,
          fish: false,
          saladCategory: false,
          shrimp: false,
          sausage: false,
          soupCategory: false,
          spaghetti: false,
          squid: false,
          sushi: false,
          iceCream: false,
          rice: false,
          sandwich: false,
          cake: true,
        });
        break;
    }
  };

  const Loading = (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} color="#fb5a23" size="small" />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <MainHeader navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SliderBox
          images={imagesSlider}
          sliderBoxHeight={Global.height / 5.5}
          dotColor={Global.mainColor}
          inactiveDotColor="#f2f2f2"
          autoplay
          circleLoop
          imageLoadingColor={Global.mainColor}
          ImageComponentStyle={styles.slider}
        />

        <View style={styles.wordMenuCont}>
          <View style={styles.wordMenuRow}>
            <TouchableOpacity
              style={styles.wordMenuItem}
              onPress={() => navigation.navigate('SEARCH', {search: 'Bò hầm'})}>
              <Image style={styles.wordMenuImg} source={steak} />
              <Text style={styles.wordMenuText}>Bò hầm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wordMenuItem}
              onPress={() =>
                navigation.navigate('SEARCH', {search: 'Gà chiên'})
              }>
              <Image style={styles.wordMenuImg} source={chicken} />
              <Text style={styles.wordMenuText}>Gà chiên</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wordMenuItem}
              onPress={() =>
                navigation.navigate('SEARCH', {search: 'Thịt nướng'})
              }>
              <Image style={styles.wordMenuImg} source={barbecue} />
              <Text style={styles.wordMenuText}>Thịt nướng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wordMenuItem}
              onPress={() =>
                navigation.navigate('SEARCH', {search: 'Bánh ngọt'})
              }>
              <Image style={styles.wordMenuImg} source={donut} />
              <Text style={styles.wordMenuText}>Bánh ngọt</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.wordMenuRow}>
            <TouchableOpacity
              style={styles.wordMenuItem}
              onPress={() =>
                navigation.navigate('SEARCH', {search: 'Tôm chiên'})
              }>
              <Image style={styles.wordMenuImg} source={tempura} />
              <Text style={styles.wordMenuText}>Tôm chiên</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wordMenuItem}
              onPress={() => navigation.navigate('SEARCH', {search: 'Mỳ'})}>
              <Image style={styles.wordMenuImg} source={ramen} />
              <Text style={styles.wordMenuText}>Mỳ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wordMenuItem}
              onPress={() => navigation.navigate('SEARCH', {search: 'Salad'})}>
              <Image style={styles.wordMenuImg} source={salad} />
              <Text style={styles.wordMenuText}>Salad</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wordMenuItem}
              onPress={() =>
                navigation.navigate('SEARCH', {search: 'Canh súp'})
              }>
              <Image style={styles.wordMenuImg} source={soup} />
              <Text style={styles.wordMenuText}>Canh súp</Text>
            </TouchableOpacity>
          </View>
        </View>

        {dataRecommendation.length !== 0 ? (
          <View style={styles.cardView}>
            <Text style={styles.cardViewTitle}>Món ăn đề xuất cho bạn</Text>
            <FlatList
              style={styles.cardViewList}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dataRecommendation}
              ListFooterComponent={
                loadingRecommendation ? (
                  <View style={styles.viewMoreCont}>{Loading}</View>
                ) : (
                  <TouchableOpacity
                    style={styles.viewMoreCont}
                    onPress={() => getRecommendation(pageRecommendation)}>
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
                      onPress={() => navigation.navigate('DISH', {dish: item})}
                      style={{marginLeft: 15, marginRight: 10}}>
                      <DishViewHorizontal dish={item} />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('DISH', {dish: item})}
                      style={{marginRight: 10}}>
                      <DishViewHorizontal dish={item} />
                    </TouchableOpacity>
                  );
                }
              }}
              keyExtractor={(item) => item.dishofchef.iddishofchef}
            />
          </View>
        ) : null}

        {dataHotDish.length !== 0 ? (
          <View style={styles.cardView}>
            <Text style={styles.cardViewTitle}>Món ăn nổi bật</Text>
            <View>
              <FlatList
                style={styles.cardViewList}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dataHotDish}
                ListFooterComponent={
                  loadingHotDish ? (
                    <View style={styles.viewMoreCont}>{Loading}</View>
                  ) : (
                    <TouchableOpacity
                      style={styles.viewMoreCont}
                      onPress={() => loadHotDish()}>
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
                          navigation.navigate('DISH', {dish: item})
                        }
                        style={{marginLeft: 15, marginRight: 10}}>
                        <DishViewHorizontal dish={item} flag />
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('DISH', {dish: item})
                        }
                        style={{marginRight: 10}}>
                        <DishViewHorizontal dish={item} flag />
                      </TouchableOpacity>
                    );
                  }
                }}
                keyExtractor={(item) => item.dishofchef.iddishofchef}
              />
            </View>
          </View>
        ) : null}

        {dataTodayDish.length !== 0 ? (
          <View style={styles.cardView}>
            <Text style={styles.cardViewTitle}>Gợi ý các món ăn hôm nay</Text>
            <FlatList
              style={styles.cardViewList}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dataTodayDish}
              ListFooterComponent={
                loadingTodayDish ? (
                  <View style={styles.viewMoreCont}>{Loading}</View>
                ) : (
                  <TouchableOpacity
                    style={styles.viewMoreCont}
                    onPress={() => getTodayDish()}>
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
                      onPress={() => navigation.navigate('DISH', {dish: item})}
                      style={{marginLeft: 15, marginRight: 10}}>
                      <DishViewHorizontal dish={item} />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('DISH', {dish: item})}
                      style={{marginRight: 10}}>
                      <DishViewHorizontal dish={item} />
                    </TouchableOpacity>
                  );
                }
              }}
              keyExtractor={(item) => item.dishofchef.iddishofchef}
            />
          </View>
        ) : null}

        {dataViewedDish.length !== 0 ? (
          <View style={styles.cardView}>
            <Text style={styles.cardViewTitle}>Món ăn đã xem</Text>
            <FlatList
              style={styles.cardViewList}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={dataViewedDish}
              ListFooterComponent={
                loadingViewedDish ? (
                  <View style={styles.viewMoreCont}>{Loading}</View>
                ) : (
                  <TouchableOpacity
                    style={styles.viewMoreCont}
                    onPress={() => getViewedDish(pageViewedDish)}>
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
                      onPress={() => navigation.navigate('DISH', {dish: item})}
                      style={{marginLeft: 15, marginRight: 10}}>
                      <DishViewHorizontal dish={item} />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('DISH', {dish: item})}
                      style={{marginRight: 10}}>
                      <DishViewHorizontal dish={item} />
                    </TouchableOpacity>
                  );
                }
              }}
              keyExtractor={(item) => item.dishofchef.iddishofchef}
            />
          </View>
        ) : null}

        <View style={styles.cardView}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={dataCategory}
            renderItem={({item, index}) => {
              if (index !== dataCategory.length - 1) {
                return (
                  <TouchableOpacity onPress={() => categoryHandle(item.id)}>
                    <Category category={item} status={category} />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => categoryHandle(item.id)}
                    style={{marginRight: 15}}>
                    <Category category={item} status={category} />
                  </TouchableOpacity>
                );
              }
            }}
            keyExtractor={(item) => item.id.toString()}
          />

          {!loadingCategoryFirst ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={dataDishCategory}
              ListFooterComponent={
                <View>
                  <View style={styles.line} />
                  {loadingDishCategory ? (
                    <View style={{paddingVertical: 4.5}}>{Loading}</View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => viewDishCategoreMore()}
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
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DISH', {dish: item})}>
                    <DishViewVertical dish={item} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.dishofchef.iddishofchef}
            />
          ) : (
            <View
              style={{
                width,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {Loading}
            </View>
          )}
        </View>

        {dataHotChef.length !== 0 ? (
          <View style={styles.cardViewLast}>
            <Text style={styles.cardViewTitle}>Đầu bếp nổi bật</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={dataHotChef}
              ItemSeparatorComponent={flatListItemSeparator}
              ListFooterComponent={
                <View>
                  <View style={styles.line} />
                  {loadingHotChef ? (
                    <View style={{paddingVertical: 4.5}}>{Loading}</View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => getHotChef()}
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
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CHEF', {chef: item, fromDish: false})
                    }>
                    <ChefView chef={item} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item._id}
            />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const {width, backgroundColor, mainColor} = Global;
const styles = StyleSheet.create({
  viewMoreTextVertical: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 35,
    paddingVertical: 6,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
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
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0,
    borderTopWidth: 0.5,
  },
  cardView: {
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 1.5,
    marginBottom: 10,
  },
  cardViewLast: {
    backgroundColor: 'white',
  },
  cardViewTitle: {
    fontFamily: 'Roboto-Light',
    color: '#000000',
    fontSize: width / 26,
    margin: 10,
  },
  cardViewList: {
    marginBottom: 15,
    marginTop: 5,
  },
  wordMenuCont: {
    paddingVertical: 10,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 1.5,
  },
  wordMenuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  wordMenuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 4.8,
  },
  wordMenuImg: {
    width: width / 11,
    height: width / 11,
  },
  wordMenuText: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 34,
    marginTop: 3,
  },
  slider: {
    borderRadius: 5,
    width: width - 30,
    marginTop: 15,
    backgroundColor: 'transparent',
  },
  wrapper: {
    backgroundColor,
    flex: 1,
  },
});
