/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';
import GetLocation from 'react-native-get-location';

import Global from '../../Global';
import SearchItem from '../home/cardView/SearchItem';
import dish_by_point from '../../../apis/dish_by_point';
import dish_by_price from '../../../apis/dish_by_price';
import dish_by_distance from '../../../apis/dish_by_distance';
import dish_by_time from '../../../apis/dish_by_time';

import backIcon from '../../../icons/arrow_back_ios-fb5a23.png';
import cancelIcon from '../../../icons/cancel.png';

export default function Search({navigation, route}) {
  const user = useSelector((state) => state.user);
  const [dataSearch, setDataSearch] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [pageSearch, setPageSearch] = useState(0);
  const [coordinates, setCoordinates] = useState({lat: 0, long: 0});
  const [search, setSearch] = useState(route.params.search);
  const [menu, setMenu] = useState({
    score: true,
    address: false,
    time: false,
    price: false,
  });
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  useEffect(() => {
    setLoadingSearch(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setCoordinates({lat: location.latitude, long: location.longitude});
        dishByPoint(0, location.latitude, location.longitude);
      })
      .catch((error) => {
        const {code, message} = error;
        console.log(code, message);
      });
    return () => {
      setDataSearch([]);
      setLoadingSearch(false);
      setPageSearch(0);
      setSearch('');
      setMenu({
        score: true,
        address: false,
        time: false,
        price: false,
      });
      setCoordinates({lat: 0, long: 0});
      setOnEndReachedCalledDuringMomentum(true);
    };
  }, []);

  const dishByPoint = (page, lat, long) => {
    if (page === 0) {
      setDataSearch([]);
    }
    setLoadingSearch(true);
    dish_by_point
      .dish_by_point(user.token, page, search, lat, long)
      .then((responseJson) => {
        setLoadingSearch(false);
        if (responseJson.length === 0 && page !== 0) {
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataSearch(responseJson);
            setPageSearch(1);
          } else {
            setDataSearch(dataSearch.concat(responseJson));
            setPageSearch(page + 1);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingSearch(false);
      });
  };

  const dishByPrice = (page) => {
    if (page === 0) {
      setDataSearch([]);
    }
    setLoadingSearch(true);
    dish_by_price
      .dish_by_price(
        user.token,
        page,
        search,
        coordinates.lat,
        coordinates.long,
      )
      .then((responseJson) => {
        setLoadingSearch(false);
        if (responseJson.length === 0 && page !== 0) {
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataSearch(responseJson);
            setPageSearch(1);
          } else {
            setDataSearch(dataSearch.concat(responseJson));
            setPageSearch(page + 1);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingSearch(false);
      });
  };

  const dishByDistance = (page) => {
    setLoadingSearch(true);
    if (page === 0) {
      setDataSearch([]);
    }
    dish_by_distance
      .dish_by_distance(
        user.token,
        page,
        search,
        coordinates.lat,
        coordinates.long,
      )
      .then((responseJson) => {
        setLoadingSearch(false);
        if (responseJson.length === 0 && page !== 0) {
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataSearch(responseJson);
            setPageSearch(1);
          } else {
            setDataSearch(dataSearch.concat(responseJson));
            setPageSearch(page + 1);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingSearch(false);
      });
  };

  const dishByTime = (page) => {
    setLoadingSearch(true);
    if (page === 0) {
      setDataSearch([]);
    }
    dish_by_time
      .dish_by_time(user.token, page, search, coordinates.lat, coordinates.long)
      .then((responseJson) => {
        setLoadingSearch(false);
        if (responseJson.length === 0 && page !== 0) {
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataSearch(responseJson);
            setPageSearch(1);
          } else {
            setDataSearch(dataSearch.concat(responseJson));
            setPageSearch(page + 1);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingSearch(false);
      });
  };

  const searchHandle = () => {
    if (search !== '') {
      setOnEndReachedCalledDuringMomentum(true);
      if (menu.score) {
        dishByPoint(0, coordinates.lat, coordinates.long);
      } else if (menu.address) {
        dishByDistance(0);
      } else {
        dishByPrice(0);
      }
    }
  };

  const loadmoreHandle = () => {
    if (search !== '') {
      if (menu.score) {
        dishByPoint(pageSearch, coordinates.lat, coordinates.long);
      } else if (menu.address) {
        dishByDistance(pageSearch);
      } else if (menu.time) {
        dishByTime(pageSearch);
      } else {
        dishByPrice(pageSearch);
      }
    }
  };

  const menuHandle = (loai) => {
    switch (loai) {
      case 0:
        dishByPoint(0, coordinates.lat, coordinates.long);
        setMenu({score: true, address: false, time: false, price: false});
        break;
      case 1:
        dishByDistance(0);
        setMenu({score: false, address: true, time: false, price: false});
        break;
      case 2:
        dishByTime(0);
        setMenu({score: false, address: false, time: true, price: false});
        break;
      default:
        dishByPrice(0);
        setMenu({score: false, address: false, time: false, price: true});
        break;
    }
  };

  const flatListItemSeparator = () => {
    return <View style={styles.line} />;
  };
  const menuJSX = () => {
    return (
      <View style={styles.cardView}>
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => (loadingSearch ? null : menuHandle(0))}>
            <Text style={menu.score ? styles.menuTextS : styles.menuText}>
              Điểm
            </Text>
            <View style={menu.score ? styles.menuLine : styles.menuNoLine} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => (loadingSearch ? null : menuHandle(1))}>
            <Text style={menu.address ? styles.menuTextS : styles.menuText}>
              Gần nhất
            </Text>
            <View style={menu.address ? styles.menuLine : styles.menuNoLine} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => (loadingSearch ? null : menuHandle(2))}>
            <Text style={menu.time ? styles.menuTextS : styles.menuText}>
              Thời gian
            </Text>
            <View style={menu.time ? styles.menuLine : styles.menuNoLine} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => (loadingSearch ? null : menuHandle(3))}>
            <Text style={menu.price ? styles.menuTextS : styles.menuText}>
              Giá
            </Text>
            <View style={menu.price ? styles.menuLine : styles.menuNoLine} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Loading = (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} color="#fb5a23" size="small" />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInputStyle}
          underlineColorAndroid="transparent"
          placeholder="Tìm kiếm món ăn"
          placeholderTextColor="#bdbdbd"
          autoCapitalize="none"
          onChangeText={(text) => setSearch(text)}
          value={search}
          onSubmitEditing={(event) => {
            searchHandle();
          }}
        />
        <TouchableOpacity onPress={() => setSearch('')}>
          <Image source={cancelIcon} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      {menuJSX()}
      {dataSearch.length === 0 && loadingSearch ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          {Loading}
        </View>
      ) : dataSearch.length === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={styles.noData}>Không tìm thấy món ăn nào!</Text>
          <Text style={styles.noData}>
            Vui lòng thử tìm kiếm với từ khoá khác
          </Text>
        </View>
      ) : (
        <FlatList
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            !loadingSearch && !onEndReachedCalledDuringMomentum
              ? loadmoreHandle()
              : null;
          }}
          onMomentumScrollBegin={() => {
            if (onEndReachedCalledDuringMomentum) {
              loadmoreHandle();
            }
            setOnEndReachedCalledDuringMomentum(false);
          }}
          showsVerticalScrollIndicator={false}
          data={dataSearch}
          ItemSeparatorComponent={flatListItemSeparator}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{backgroundColor: 'white'}}
                onPress={() => navigation.navigate('DISH', {dish: item})}>
                <SearchItem
                  dish={item}
                  search={menu.score ? 0 : menu.address ? 1 : menu.time ? 2 : 3}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.dishofchef.iddishofchef}
        />
      )}
    </View>
  );
}

const {width, backgroundColor, mainColor, heightHeader, backButton} = Global;
const styles = StyleSheet.create({
  noData: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 30,
  },
  wrapper: {
    flex: 1,
    backgroundColor,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0,
    borderTopWidth: 0.5,
  },
  cardView: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 1,
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
  backIcon: {
    width: backButton,
    height: backButton,
  },
  textInputStyle: {
    color: '#333333',
    fontSize: width / 28,
    fontFamily: 'Roboto-Regular',
    width: width / 1.35,
    borderBottomColor: mainColor,
    borderBottomWidth: 1,
    height: width / 14,
    padding: 0,
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: heightHeader,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
