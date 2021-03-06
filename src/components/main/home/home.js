/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  LogBox,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {SliderBox} from 'react-native-image-slider-box';

import Global from '../../Global';
import MainHeader from './cardView/MainHeader';
import DishViewHorizontal from './cardView/DishViewHorizontal';
import DishViewVertical from './cardView/DishViewVertical';
import ChefView from './cardView/ChefView';
import Category from './cardView/Category';

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

var countExit = 0;

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

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

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

  const dataDish = [
    {
      id: 1,
      image:
        'https://image.xahoi.com.vn/news/2017/11/09/bun-rieu-cua-suon-sun-cach-lam-bun-rieu-suon-sun-12-1509075771-width650height488-xahoi.com.vn-w650-h488.jpg',
      name: 'Hủ tiếu nam vang chuẩn vị nhà làm ngon như nhà làm',
      chef: 'Trần Bảo Toàn',
      address:
        '1400 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh',
      ingredients:
        '500 ml    Sữa tươi  \n500 ml    Nước sôi  \n240 ml    Kem whipping  \n20 gram    Trà đen  \n1 thanh    Quế  \n1 cái    Hoa hồi  \n1 quả    Bạch đậu khấu  \n10 quả    Bạch quả  \n3 thìa canh    Đường nâu  \n2 thìa canh    Đường trắng  \n1 thìa cà phê    Vani  \n2 thìa cà phê    Nhục đậu khấu  \n1/2 thìa cà phê    Bột gừng  \n2 thìa cà phê    Bột quế',
      price: 231000,
      prepare: ' Chuẩn bị: 10 phút',
      perform: ' Thực hiện: 30 phút',
      numOrder: '20',
    },
    {
      id: 2,
      image:
        'https://image.xahoi.com.vn/news/2017/11/09/bun-rieu-cua-suon-sun-cach-lam-bun-rieu-suon-sun-12-1509075771-width650height488-xahoi.com.vn-w650-h488.jpg',
      name: 'Hủ tiếu nam vang',
      chef: 'Trần Bảo Toàn',
      address:
        '1400 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh',
      ingredients:
        '500 ml    Sữa tươi  \n500 ml    Nước sôi  \n240 ml    Kem whipping  \n20 gram    Trà đen  \n1 thanh    Quế  \n1 cái    Hoa hồi  \n1 quả    Bạch đậu khấu  \n10 quả    Bạch quả  \n3 thìa canh    Đường nâu  \n2 thìa canh    Đường trắng  \n1 thìa cà phê    Vani  \n2 thìa cà phê    Nhục đậu khấu  \n1/2 thìa cà phê    Bột gừng  \n2 thìa cà phê    Bột quế',
      price: 231000,
      prepare: ' Chuẩn bị: 10 phút',
      perform: ' Thực hiện: 30 phút',
      numOrder: '514',
    },
    {
      id: 3,
      image:
        'https://image.xahoi.com.vn/news/2017/11/09/bun-rieu-cua-suon-sun-cach-lam-bun-rieu-suon-sun-12-1509075771-width650height488-xahoi.com.vn-w650-h488.jpg',
      name: 'Hủ tiếu nam vang',
      chef: 'Trần Bảo Toàn',
      address:
        '1400 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh',
      ingredients:
        '500 ml    Sữa tươi  \n500 ml    Nước sôi  \n240 ml    Kem whipping  \n20 gram    Trà đen  \n1 thanh    Quế  \n1 cái    Hoa hồi  \n1 quả    Bạch đậu khấu  \n10 quả    Bạch quả  \n3 thìa canh    Đường nâu  \n2 thìa canh    Đường trắng  \n1 thìa cà phê    Vani  \n2 thìa cà phê    Nhục đậu khấu  \n1/2 thìa cà phê    Bột gừng  \n2 thìa cà phê    Bột quế',
      price: 231000,
      prepare: ' Chuẩn bị: 10 phút',
      perform: ' Thực hiện: 30 phút',
      numOrder: '855',
    },
    {
      id: 4,
      image:
        'https://image.xahoi.com.vn/news/2017/11/09/bun-rieu-cua-suon-sun-cach-lam-bun-rieu-suon-sun-12-1509075771-width650height488-xahoi.com.vn-w650-h488.jpg',
      name: 'Hủ tiếu nam vang',
      chef: 'Trần Bảo Toàn',
      address:
        '1400 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh',
      ingredients:
        '500 ml    Sữa tươi  \n500 ml    Nước sôi  \n240 ml    Kem whipping  \n20 gram    Trà đen  \n1 thanh    Quế  \n1 cái    Hoa hồi  \n1 quả    Bạch đậu khấu  \n10 quả    Bạch quả  \n3 thìa canh    Đường nâu  \n2 thìa canh    Đường trắng  \n1 thìa cà phê    Vani  \n2 thìa cà phê    Nhục đậu khấu  \n1/2 thìa cà phê    Bột gừng  \n2 thìa cà phê    Bột quế',
      price: 231000,
      prepare: ' Chuẩn bị: 10 phút',
      perform: ' Thực hiện: 30 phút',
      numOrder: '55',
    },
    {
      id: 5,
      image:
        'https://image.xahoi.com.vn/news/2017/11/09/bun-rieu-cua-suon-sun-cach-lam-bun-rieu-suon-sun-12-1509075771-width650height488-xahoi.com.vn-w650-h488.jpg',
      name: 'Hủ tiếu nam vang',
      chef: 'Trần Bảo Toàn',
      address:
        '1400 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh',
      ingredients:
        '500 ml    Sữa tươi  \n500 ml    Nước sôi  \n240 ml    Kem whipping  \n20 gram    Trà đen  \n1 thanh    Quế  \n1 cái    Hoa hồi  \n1 quả    Bạch đậu khấu  \n10 quả    Bạch quả  \n3 thìa canh    Đường nâu  \n2 thìa canh    Đường trắng  \n1 thìa cà phê    Vani  \n2 thìa cà phê    Nhục đậu khấu  \n1/2 thìa cà phê    Bột gừng  \n2 thìa cà phê    Bột quế',
      price: 231000,
      prepare: ' Chuẩn bị: 10 phút',
      perform: ' Thực hiện: 30 phút',
      numOrder: '28',
    },
    {
      id: 6,
      image:
        'https://image.xahoi.com.vn/news/2017/11/09/bun-rieu-cua-suon-sun-cach-lam-bun-rieu-suon-sun-12-1509075771-width650height488-xahoi.com.vn-w650-h488.jpg',
      name: 'Hủ tiếu nam vang',
      chef: 'Trần Bảo Toàn',
      address:
        '1400 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh',
      ingredients:
        '500 ml    Sữa tươi  \n500 ml    Nước sôi  \n240 ml    Kem whipping  \n20 gram    Trà đen  \n1 thanh    Quế  \n1 cái    Hoa hồi  \n1 quả    Bạch đậu khấu  \n10 quả    Bạch quả  \n3 thìa canh    Đường nâu  \n2 thìa canh    Đường trắng  \n1 thìa cà phê    Vani  \n2 thìa cà phê    Nhục đậu khấu  \n1/2 thìa cà phê    Bột gừng  \n2 thìa cà phê    Bột quế',
      price: 231000,
      prepare: ' Chuẩn bị: 10 phút',
      perform: ' Thực hiện: 30 phút',
      numOrder: '20',
    },
    {
      id: 7,
      image:
        'https://image.xahoi.com.vn/news/2017/11/09/bun-rieu-cua-suon-sun-cach-lam-bun-rieu-suon-sun-12-1509075771-width650height488-xahoi.com.vn-w650-h488.jpg',
      name: 'Hủ tiếu nam vang',
      chef: 'Trần Bảo Toàn',
      address:
        '1400 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh',
      ingredients:
        '500 ml    Sữa tươi  \n500 ml    Nước sôi  \n240 ml    Kem whipping  \n20 gram    Trà đen  \n1 thanh    Quế  \n1 cái    Hoa hồi  \n1 quả    Bạch đậu khấu  \n10 quả    Bạch quả  \n3 thìa canh    Đường nâu  \n2 thìa canh    Đường trắng  \n1 thìa cà phê    Vani  \n2 thìa cà phê    Nhục đậu khấu  \n1/2 thìa cà phê    Bột gừng  \n2 thìa cà phê    Bột quế',
      price: 231000,
      prepare: ' Chuẩn bị: 10 phút',
      perform: ' Thực hiện: 30 phút',
      numOrder: '12',
    },
    {
      id: 8,
      image:
        'https://image.xahoi.com.vn/news/2017/11/09/bun-rieu-cua-suon-sun-cach-lam-bun-rieu-suon-sun-12-1509075771-width650height488-xahoi.com.vn-w650-h488.jpg',
      name: 'Hủ tiếu nam vang',
      chef: 'Trần Bảo Toàn',
      address:
        '1400 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh',
      ingredients:
        '500 ml    Sữa tươi  \n500 ml    Nước sôi  \n240 ml    Kem whipping  \n20 gram    Trà đen  \n1 thanh    Quế  \n1 cái    Hoa hồi  \n1 quả    Bạch đậu khấu  \n10 quả    Bạch quả  \n3 thìa canh    Đường nâu  \n2 thìa canh    Đường trắng  \n1 thìa cà phê    Vani  \n2 thìa cà phê    Nhục đậu khấu  \n1/2 thìa cà phê    Bột gừng  \n2 thìa cà phê    Bột quế',
      price: 231000,
      prepare: ' Chuẩn bị: 10 phút',
      perform: ' Thực hiện: 30 phút',
      numOrder: '2',
    },
  ];

  const dataChef = [
    {
      id: 1,
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      email: 'ha.ntthuy@example.com',
      cover:
        'https://images.unsplash.com/photo-1612392062126-5cc76074df9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      star: 5,
      name: 'Nguyễn Thị Thúy Hà',
      address: '299/11 Lý Thường Kiệt, F15, Q11',
      phone: '0986375176',
    },
    {
      id: 2,
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      email: 'ha.ntthuy@example.com',
      cover:
        'https://images.unsplash.com/photo-1612392062126-5cc76074df9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      star: 4,
      name: 'Nguyễn Thị Thúy Hà',
      address: '299/11 Lý Thường Kiệt, F15, Q11',
      phone: '0986375176',
    },
    {
      id: 3,
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      email: 'ha.ntthuy@example.com',
      cover:
        'https://images.unsplash.com/photo-1612392062126-5cc76074df9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      star: 3,
      name: 'Nguyễn Thị Thúy Hà',
      address: '299/11 Lý Thường Kiệt, F15, Q11',
      phone: '0986375176',
    },
    {
      id: 4,
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      email: 'ha.ntthuy@example.com',
      cover:
        'https://images.unsplash.com/photo-1612392062126-5cc76074df9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      star: 5,
      name: 'Nguyễn Thị Thúy Hà',
      address: '299/11 Lý Thường Kiệt, F15, Q11',
      phone: '0986375176',
    },
    {
      id: 5,
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      email: 'ha.ntthuy@example.com',
      cover:
        'https://images.unsplash.com/photo-1612392062126-5cc76074df9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      star: 5,
      name: 'Nguyễn Thị Thúy Hà',
      address: '299/11 Lý Thường Kiệt, F15, Q11',
      phone: '0986375176',
    },
    {
      id: 6,
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      email: 'ha.ntthuy@example.com',
      cover:
        'https://images.unsplash.com/photo-1612392062126-5cc76074df9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      star: 1,
      name: 'Nguyễn Thị Thúy Hà',
      address: '299/11 Lý Thường Kiệt, F15, Q11',
      phone: '0986375176',
    },
    {
      id: 7,
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      email: 'ha.ntthuy@example.com',
      cover:
        'https://images.unsplash.com/photo-1612392062126-5cc76074df9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      star: 2,
      name: 'Nguyễn Thị Thúy Hà',
      address: '299/11 Lý Thường Kiệt, F15, Q11',
      phone: '0986375176',
    },
    {
      id: 8,
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      email: 'ha.ntthuy@example.com',
      cover:
        'https://images.unsplash.com/photo-1612392062126-5cc76074df9c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      star: 4,
      name: 'Nguyễn Thị Thúy Hà',
      address: '299/11 Lý Thường Kiệt, F15, Q11',
      phone: '0986375176',
    },
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

  const flatListItemSeparator = () => {
    return <View style={styles.line} />;
  };

  const categoryHandle = (id) => {
    switch (id) {
      case 0:
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
      default:
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

        <View style={styles.cardView}>
          <Text style={styles.cardViewTitle}>Gợi ý các món ăn hôm nay</Text>
          <FlatList
            style={styles.cardViewList}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dataDish}
            renderItem={({item, index}) => {
              if (index === 0) {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DISH', {dish: item})}
                    style={{marginLeft: 15, marginRight: 10}}>
                    <DishViewHorizontal dish={item} />
                  </TouchableOpacity>
                );
              } else if (index === dataDish.length - 1) {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DISH', {dish: item})}
                    style={{marginRight: 15}}>
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
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.cardView}>
          <Text style={styles.cardViewTitle}>Món ăn mới nhất</Text>
          <FlatList
            style={styles.cardViewList}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dataDish}
            renderItem={({item, index}) => {
              if (index === 0) {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DISH', {dish: item})}
                    style={{marginLeft: 15, marginRight: 10}}>
                    <DishViewHorizontal dish={item} flag />
                  </TouchableOpacity>
                );
              } else if (index === dataDish.length - 1) {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DISH', {dish: item})}
                    style={{marginRight: 15}}>
                    <DishViewHorizontal dish={item} flag />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DISH', {dish: item})}
                    style={{marginRight: 10}}>
                    <DishViewHorizontal dish={item} flag />
                  </TouchableOpacity>
                );
              }
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.cardView}>
          <Text style={styles.cardViewTitle}>Món ăn đã xem</Text>
          <FlatList
            style={styles.cardViewList}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dataDish}
            renderItem={({item, index}) => {
              if (index === 0) {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DISH', {dish: item})}
                    style={{marginLeft: 15, marginRight: 10}}>
                    <DishViewHorizontal dish={item} />
                  </TouchableOpacity>
                );
              } else if (index === dataDish.length - 1) {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DISH', {dish: item})}
                    style={{marginRight: 15}}>
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
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

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

          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataDish}
            ItemSeparatorComponent={flatListItemSeparator}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('DISH', {dish: item})}>
                  <DishViewVertical dish={item} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.cardViewLast}>
          <Text style={styles.cardViewTitle}>Đầu bếp nổi bật</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataChef}
            ItemSeparatorComponent={flatListItemSeparator}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('CHEF', {chef: item})}>
                  <ChefView chef={item} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const {width, fontFamily, backgroundColor} = Global;
const styles = StyleSheet.create({
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0.25,
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
    fontFamily,
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
    shadowColor: 'rgba(0,0,0,0.1)',
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
    fontFamily,
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
