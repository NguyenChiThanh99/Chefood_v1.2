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
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from '../../Global';
import Comment from './cardView/Comment';
import DishViewHorizontal from './cardView/DishViewHorizontal';
import DishViewRelated from './cardView/DishViewRelated';

import arrowBack from '../../../icons/arrow_back_ios-ffffff.png';
import cartIcon from '../../../icons/Buy-ffffff.png';
import saveIcon from '../../../icons/bookmark_border-82.png';
import saveIconS from '../../../icons/bookmark-fb5a23.png';
import minusDisable from '../../../icons/remove_circle_outline-e0.png';
import minus from '../../../icons/remove_circle_outline-fb5a23.png';
import plus from '../../../icons/add_circle_outline-fb5a23.png';
import prepareIcon from '../../../icons/TimeSquare.png';
import performIcon from '../../../icons/TimeCircle.png';

var soluong = 1;

export default function Dish({navigation, route}) {
  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const {
    image,
    name,
    chef,
    address,
    ingredients,
    prepare,
    perform,
    price,
    numOrder,
  } = route.params.dish;

  const scrollRef = useRef();

  const [saveStatus, setSaveStatus] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [menu, setMenu] = useState({
    ingredients: true,
    comments: false,
    images: false,
  });

  const dataComment = [
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
    {
      id: 3,
      name: 'Lê Huỳnh Minh Hiệp',
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      star: 2,
      time: '18:22 23/11/2020',
      imageCmt:
        'https://image.thanhnien.vn/768/uploaded/minhnguyet/2019_12_01/nhanquan_wqmf.jpg',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 4,
      name: 'Lê Huỳnh Minh Hiệp',
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      star: 3,
      time: '18:22 23/11/2020',
      imageCmt: '',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 5,
      name: 'Lê Huỳnh Minh Hiệp',
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      star: 4,
      time: '18:22 23/11/2020',
      imageCmt: '',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 6,
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
      id: 7,
      name: 'Lê Huỳnh Minh Hiệp',
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      star: 5,
      time: '18:22 23/11/2020',
      imageCmt: '',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 8,
      name: 'Lê Huỳnh Minh Hiệp',
      image: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      star: 1,
      time: '18:22 23/11/2020',
      imageCmt:
        'https://image.thanhnien.vn/768/uploaded/minhnguyet/2019_12_01/nhanquan_wqmf.jpg',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
  ];

  const dataImgDish = [
    {
      id: 1,
      image:
        'https://image.thanhnien.vn/768/uploaded/minhnguyet/2019_12_01/nhanquan_wqmf.jpg',
    },
    {
      id: 2,
      image:
        'https://lh3.googleusercontent.com/proxy/Lq27ycnNFvzoQ_padTPU8xckfjnifRT1c4vPgqxNRoCAGTmyzN2YEOAwlPCkDyl86fNb2jEkMXpQcRiYoFtxIEn4UKFwh18Vek1TlvSxPgBslprxayA',
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
      image:
        'https://lh3.googleusercontent.com/proxy/MCgfzPmsXQyywMbBdNkNfbal7jFAj6XbaAbhE_FcEKCl30M-cZWjj6d3hs9UBY8cOIzbQyI4WJO8Ec2zpfVnFLUQv7gqv3oTYtiGMq1BdAtk0ne9g2HOz3dB1rFgJtKwTYH8t6XcKJWQjgaiqoflHg',
    },
    {
      id: 8,
      image:
        'https://cdn.tgdd.vn/Files/2018/06/12/1094925/cach-nau-mon-hu-tieu-nam-vang-ngon-dung-dieu-nhu-ngo%C3%A0i-hang-da-an-l%C3%A0-ghien-8-760x367.jpg',
    },
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

  const saveHandle = () => {
    setSaveStatus(!saveStatus);
  };

  const addToCart = () => {};

  const goToDish = (dish) => {
    soluong = 1;
    setSaveStatus(false);
    setQuantity(1);
    setMenu({
      ingredients: true,
      comments: false,
      images: false,
    });
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    navigation.navigate('DISH', {dish: dish});
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

  const menuHandle = (type) => {
    switch (type) {
      case 0:
        setMenu({ingredients: true, comments: false, images: false});
        break;
      case 1:
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

  const ingredientsJSX = <Text style={styles.ingredient}>{ingredients}</Text>;
  const commentsJSX = (
    <View>
      <FlatList
        key={'#'}
        showsVerticalScrollIndicator={false}
        data={dataComment}
        ItemSeparatorComponent={flatListItemSeparator}
        renderItem={({item, index}) => {
          return (
            <View>
              <Comment comment={item} />
            </View>
          );
        }}
        keyExtractor={(item) => '#' + item.id.toString()}
      />
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
          <Image style={styles.image} source={{uri: image}} />

          <View style={styles.generalInfo}>
            <Text style={styles.name} numberOfLines={2}>
              {name}
            </Text>
            <Text style={styles.chef}>{chef}</Text>
            <Text style={styles.address} numberOfLines={1}>
              {address}
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
              <Text style={styles.prepareText}>{prepare}</Text>
            </View>
            <Text style={styles.numOrder}>{numOrder} lần đặt nấu</Text>
          </View>
          <View style={styles.prepareCont}>
            <Image style={styles.prepareImg} source={performIcon} />
            <Text style={styles.prepareText}>{perform}</Text>
          </View>

          <View style={styles.priceCont}>
            <Text style={styles.price}>{Global.currencyFormat(price)}đ</Text>
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

        <View style={styles.cardView}>
          <Text style={styles.cardViewTitle}>Các món ăn khác của đầu bếp</Text>
          <FlatList
            key={'*'}
            style={styles.cardViewList}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dataDish}
            renderItem={({item, index}) => {
              if (index === 0) {
                return (
                  <TouchableOpacity
                    onPress={() => goToDish(item)}
                    style={{marginLeft: 15, marginRight: 10}}>
                    <DishViewHorizontal dish={item} chef />
                  </TouchableOpacity>
                );
              } else if (index === dataDish.length - 1) {
                return (
                  <TouchableOpacity
                    onPress={() => goToDish(item)}
                    style={{marginRight: 15}}>
                    <DishViewHorizontal dish={item} chef />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => goToDish(item)}
                    style={{marginRight: 10}}>
                    <DishViewHorizontal dish={item} chef />
                  </TouchableOpacity>
                );
              }
            }}
            keyExtractor={(item) => '*' + item.id.toString()}
          />
        </View>

        <View style={styles.cardViewLast}>
          <Text style={styles.cardViewTitle}>Các món ăn liên quan</Text>
          <FlatList
            key={'/'}
            style={styles.cardViewList2Col}
            showsVerticalScrollIndicator={false}
            data={dataDish}
            numColumns={2}
            renderItem={({item, index}) => {
              if (index % 2 === 0) {
                return (
                  <TouchableOpacity
                    onPress={() => goToDish(item)}
                    style={{marginRight: 15}}>
                    <DishViewRelated dish={item} />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity onPress={() => goToDish(item)}>
                    <DishViewRelated dish={item} />
                  </TouchableOpacity>
                );
              }
            }}
            keyExtractor={(item) => '/' + item.id.toString()}
          />
        </View>
      </ScrollView>

      <View style={styles.topBtn}>
        <TouchableOpacity
          style={styles.topBtnCont}
          onPress={() => navigation.goBack()}>
          <Image style={styles.topBtnImg} source={arrowBack} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topBtnCont}
          onPress={() => navigation.navigate('CART')}>
          <Image style={styles.topBtnImg} source={cartIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const {width, height, fontFamily} = Global;
const styles = StyleSheet.create({
  cardViewList2Col: {
    marginHorizontal: 15,
    marginBottom: -5,
  },
  cardViewList: {
    marginBottom: 15,
    marginTop: 5,
  },
  cardViewTitle: {
    fontFamily,
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
    borderWidth: 0.25,
    marginHorizontal: 15,
  },
  ingredient: {
    fontFamily,
    color: '#4f4f4f',
    fontSize: width / 30,
    marginLeft: width / 12,
    marginVertical: 10,
  },
  menu: {
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'rgba(0,0,0,0.1)',
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
    fontFamily,
    color: '#333333',
    fontSize: width / 28,
    fontWeight: 'bold',
  },
  menuText: {
    fontFamily,
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
    fontFamily,
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
    fontFamily,
    fontSize: width / 19,
    color: '#fb5a23',
    fontWeight: 'bold',
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
    fontFamily,
    fontWeight: 'bold',
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
    fontFamily,
    color: '#333333',
    fontSize: width / 32,
  },
  numOrder: {
    fontFamily,
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
    shadowColor: 'rgba(0,0,0,0.15)',
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
    fontFamily,
    fontSize: width / 22,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chef: {
    fontFamily,
    fontSize: width / 30,
    color: '#828282',
    textAlign: 'center',
    marginTop: 2,
  },
  address: {
    fontFamily,
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
    fontFamily,
    fontSize: width / 28,
    color: '#fb5a23',
    fontWeight: 'bold',
  },
  saveText: {
    fontFamily,
    fontSize: width / 28,
    color: '#828282',
    fontWeight: 'bold',
  },
  wrapper: {
    backgroundColor: '#f2f2f2',
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
    width: width / 16,
    height: width / 16,
  },
});
