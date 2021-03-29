import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from '../../Global';
import RatingStar from './cardView/RatingStar';
import DishViewVertical from './cardView/DishViewVertical';
import CommentDish from './cardView/CommentDish';

import arrowBack from '../../../icons/arrow_back_ios-fb5a23.png';
import locationIcon from '../../../icons/place-gradient.png';
import billIcon from '../../../icons/description-gradient.png';
import emailIcon from '../../../icons/mail-gradient.png';
import phoneIcon from '../../../icons/phone-gradient.png';

export default function Chef({navigation, route}) {
  const {image, email, cover, star, name, address, phone} = route.params.chef;

  const [follow, setFollow] = useState(false);
  const [follower, setFollower] = useState(45);
  const [order, setOrder] = useState(98);
  const [menu, setMenu] = useState({
    dishes: true,
    comments: false,
    informations: false,
  });

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

  const dataHotDish = [
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
  ];

  const dataComment = [
    {
      id: 1,
      name: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      comment: [
        {
          id: 1,
          name: 'Lê Huỳnh Minh Hiệp',
          image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
          star: 4,
          time: '18:22 23/11/2020',
          imageCmt:
            'https://image.thanhnien.vn/768/uploaded/minhnguyet/2019_12_01/nhanquan_wqmf.jpg',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
          id: 2,
          name: 'Lê Huỳnh Minh Hiệp',
          image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
          star: 5,
          time: '18:22 23/11/2020',
          imageCmt: '',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      ],
    },
    {
      id: 2,
      name: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      comment: [
        {
          id: 1,
          name: 'Lê Huỳnh Minh Hiệp',
          image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
          star: 4,
          time: '18:22 23/11/2020',
          imageCmt:
            'https://image.thanhnien.vn/768/uploaded/minhnguyet/2019_12_01/nhanquan_wqmf.jpg',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
          id: 2,
          name: 'Lê Huỳnh Minh Hiệp',
          image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
          star: 5,
          time: '18:22 23/11/2020',
          imageCmt: '',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      ],
    },
    {
      id: 3,
      name: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      comment: [
        {
          id: 1,
          name: 'Lê Huỳnh Minh Hiệp',
          image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
          star: 4,
          time: '18:22 23/11/2020',
          imageCmt:
            'https://image.thanhnien.vn/768/uploaded/minhnguyet/2019_12_01/nhanquan_wqmf.jpg',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
          id: 2,
          name: 'Lê Huỳnh Minh Hiệp',
          image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
          star: 5,
          time: '18:22 23/11/2020',
          imageCmt: '',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      ],
    },
    {
      id: 4,
      name: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      comment: [
        {
          id: 1,
          name: 'Lê Huỳnh Minh Hiệp',
          image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
          star: 4,
          time: '18:22 23/11/2020',
          imageCmt:
            'https://image.thanhnien.vn/768/uploaded/minhnguyet/2019_12_01/nhanquan_wqmf.jpg',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
          id: 2,
          name: 'Lê Huỳnh Minh Hiệp',
          image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
          star: 5,
          time: '18:22 23/11/2020',
          imageCmt: '',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      ],
    },
    {
      id: 5,
      name: 'Thịt heo ba rọi kho dưa cải chua tỏi ớt',
      comment: [
        {
          id: 1,
          name: 'Lê Huỳnh Minh Hiệp',
          image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
          star: 4,
          time: '18:22 23/11/2020',
          imageCmt:
            'https://image.thanhnien.vn/768/uploaded/minhnguyet/2019_12_01/nhanquan_wqmf.jpg',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
        {
          id: 2,
          name: 'Lê Huỳnh Minh Hiệp',
          image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
          star: 5,
          time: '18:22 23/11/2020',
          imageCmt: '',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      ],
    },
  ];

  const flatListItemSeparatorDish = () => {
    return <View style={styles.line} />;
  };

  const followHandle = () => {
    setFollow(!follow);
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
          keyExtractor={(item) => item.id.toString()}
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
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
  const commentsJSX = (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={dataComment}
      ItemSeparatorComponent={flatListItemSeparatorComment}
      renderItem={({item, index}) => {
        return (
          <View>
            <CommentDish commentDish={item} />
          </View>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
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

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={arrowBack} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đầu bếp</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground style={styles.cover} source={{uri: cover}}>
          <Image style={styles.avatar} source={{uri: image}} />
          <View style={styles.rating}>
            <View style={styles.star}>
              <RatingStar star={star} />
            </View>
            <Text style={styles.ratingText}>{star}</Text>
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
            ? commentsJSX
            : informationsJSX}
        </View>
      </ScrollView>
    </View>
  );
}

const {width, heightHeader, backButton, height, backgroundColor} = Global;
const styles = StyleSheet.create({
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
