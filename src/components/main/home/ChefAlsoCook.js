/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';
import GetLocation from 'react-native-get-location';

import Global from '../../Global';
import ChefAlsoCookItem from '../home/cardView/ChefAlsoCookItem';
import other_chef_by_distance from '../../../apis/other_chef_by_distance';
import other_chef_by_price from '../../../apis/other_chef_by_price';
import other_chef_by_score from '../../../apis/other_chef_by_score';
import other_chef_by_time from '../../../apis/other_chef_by_time';
import other_chef_by_level from '../../../apis/other_chef_by_level';

import backIcon from '../../../icons/arrow_back_ios-fb5a23.png';

export default function ChefAlsoCook({navigation, route}) {
  const user = useSelector((state) => state.user);
  const [dataChef, setDataChef] = useState([]);
  const [loadingChef, setLoadingChef] = useState(false);
  const [pageChef, setPageChef] = useState(0);
  const [coordinates, setCoordinates] = useState({lat: 0, long: 0});
  const [menu, setMenu] = useState({
    score: true,
    address: false,
    time: false,
    price: false,
    level: false,
  });
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  useEffect(() => {
    setLoadingChef(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setCoordinates({lat: location.latitude, long: location.longitude});
        chefByPoint(0, location.latitude, location.longitude);
      })
      .catch((error) => {
        const {code, message} = error;
        console.log(code, message);
      });
    return () => {
      setDataChef([]);
      setLoadingChef(false);
      setPageChef(0);
      setMenu({
        score: true,
        address: false,
        time: false,
        price: false,
        level: false,
      });
      setCoordinates({lat: 0, long: 0});
      setOnEndReachedCalledDuringMomentum(true);
    };
  }, []);

  const chefByPoint = (page, lat, long) => {
    if (page === 0) {
      setDataChef([]);
    }
    setLoadingChef(true);
    other_chef_by_score
      .other_chef_by_score(user.token, page, route.params.numberDish, lat, long)
      .then((responseJson) => {
        setLoadingChef(false);
        if (responseJson.length === 0 && page !== 0) {
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataChef(responseJson);
            setPageChef(1);
          } else {
            setDataChef(dataChef.concat(responseJson));
            setPageChef(page + 1);
          }
          setLoadingChef(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingChef(false);
      });
  };

  const chefByPrice = (page) => {
    if (page === 0) {
      setDataChef([]);
    }
    setLoadingChef(true);
    other_chef_by_price
      .other_chef_by_price(
        user.token,
        page,
        route.params.numberDish,
        coordinates.lat,
        coordinates.long,
      )
      .then((responseJson) => {
        setLoadingChef(false);
        if (responseJson.length === 0 && page !== 0) {
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataChef(responseJson);
            setPageChef(1);
          } else {
            setDataChef(dataChef.concat(responseJson));
            setPageChef(page + 1);
          }
          setLoadingChef(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingChef(false);
      });
  };

  const chefByLevel = (page) => {
    if (page === 0) {
      setDataChef([]);
    }
    setLoadingChef(true);
    other_chef_by_level
      .other_chef_by_level(
        user.token,
        page,
        route.params.numberDish,
        coordinates.lat,
        coordinates.long,
      )
      .then((responseJson) => {
        setLoadingChef(false);
        if (responseJson.length === 0 && page !== 0) {
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataChef(responseJson);
            setPageChef(1);
          } else {
            setDataChef(dataChef.concat(responseJson));
            setPageChef(page + 1);
          }
          setLoadingChef(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingChef(false);
      });
  };

  const chefByDistance = (page) => {
    setLoadingChef(true);
    if (page === 0) {
      setDataChef([]);
    }
    other_chef_by_distance
      .other_chef_by_distance(
        user.token,
        page,
        route.params.numberDish,
        coordinates.lat,
        coordinates.long,
      )
      .then((responseJson) => {
        setLoadingChef(false);
        if (responseJson.length === 0 && page !== 0) {
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataChef(responseJson);
            setPageChef(1);
          } else {
            setDataChef(dataChef.concat(responseJson));
            setPageChef(page + 1);
          }
          setLoadingChef(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingChef(false);
      });
  };

  const chefByTime = (page) => {
    setLoadingChef(true);
    if (page === 0) {
      setDataChef([]);
    }
    other_chef_by_time
      .other_chef_by_time(
        user.token,
        page,
        route.params.numberDish,
        coordinates.lat,
        coordinates.long,
      )
      .then((responseJson) => {
        setLoadingChef(false);
        if (responseJson.length === 0 && page !== 0) {
          return Toast.show('Đã tải đến cuối danh sách', {
            position: 0,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataChef(responseJson);
            setPageChef(1);
          } else {
            setDataChef(dataChef.concat(responseJson));
            setPageChef(page + 1);
          }
          setLoadingChef(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingChef(false);
      });
  };

  const loadmoreHandle = () => {
    if (menu.score) {
      chefByPoint(pageChef, coordinates.lat, coordinates.long);
    } else if (menu.address) {
      chefByDistance(pageChef);
    } else if (menu.time) {
      chefByTime(pageChef);
    } else if (menu.price) {
      chefByPrice(pageChef);
    } else {
      chefByLevel(pageChef);
    }
  };

  const menuHandle = (loai) => {
    switch (loai) {
      case 0:
        chefByPoint(0, coordinates.lat, coordinates.long);
        setMenu({
          score: true,
          address: false,
          time: false,
          price: false,
          level: false,
        });
        break;
      case 1:
        chefByDistance(0);
        setMenu({
          score: false,
          address: true,
          time: false,
          price: false,
          level: false,
        });
        break;
      case 2:
        chefByTime(0);
        setMenu({
          score: false,
          address: false,
          time: true,
          price: false,
          level: false,
        });
        break;
      case 3:
        chefByPrice(0);
        setMenu({
          score: false,
          address: false,
          time: false,
          price: true,
          level: false,
        });
        break;
      default:
        chefByLevel(0);
        setMenu({
          score: false,
          address: false,
          time: false,
          price: false,
          level: true,
        });
        break;
    }
  };

  const flatListItemSeparator = () => {
    return <View style={styles.line} />;
  };
  const menuJSX = () => {
    return (
      <View style={styles.cardView}>
        <ScrollView
          style={styles.menu}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => (loadingChef ? null : menuHandle(0))}>
            <Text style={menu.score ? styles.menuTextS : styles.menuText}>
              Điểm
            </Text>
            <View style={menu.score ? styles.menuLine : styles.menuNoLine} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => (loadingChef ? null : menuHandle(1))}>
            <Text style={menu.address ? styles.menuTextS : styles.menuText}>
              Gần nhất
            </Text>
            <View style={menu.address ? styles.menuLine : styles.menuNoLine} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => (loadingChef ? null : menuHandle(2))}>
            <Text style={menu.time ? styles.menuTextS : styles.menuText}>
              Thời gian
            </Text>
            <View style={menu.time ? styles.menuLine : styles.menuNoLine} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => (loadingChef ? null : menuHandle(3))}>
            <Text style={menu.price ? styles.menuTextS : styles.menuText}>
              Giá
            </Text>
            <View style={menu.price ? styles.menuLine : styles.menuNoLine} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => (loadingChef ? null : menuHandle(4))}>
            <Text style={menu.level ? styles.menuTextS : styles.menuText}>
              Hạng đầu bếp
            </Text>
            <View style={menu.level ? styles.menuLine : styles.menuNoLine} />
          </TouchableOpacity>
        </ScrollView>
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
        <Text style={styles.headerText} numberOfLines={1}>
          {route.params.name}
        </Text>
      </View>

      {menuJSX()}
      {dataChef.length === 0 && loadingChef ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          {Loading}
        </View>
      ) : dataChef.length === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={styles.noData}>
            Không tìm thấy đầu bếp nào khác nấu món ăn này!
          </Text>
        </View>
      ) : (
        <FlatList
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            !loadingChef && !onEndReachedCalledDuringMomentum
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
          data={dataChef}
          ItemSeparatorComponent={flatListItemSeparator}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{backgroundColor: 'white'}}
                onPress={() =>
                  navigation.navigate('DISH', {
                    dish: item,
                    id: item.dishofchef.iddishofchef,
                  })
                }>
                <ChefAlsoCookItem
                  dish={item}
                  type={menu.score ? 0 : menu.address ? 1 : menu.time ? 2 : 3}
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

const {width, backgroundColor, heightHeader, backButton} = Global;
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
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: heightHeader,
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
  headerText: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 24,
    marginLeft: 10,
    width: width - width / 16 - 30,
  },
});
