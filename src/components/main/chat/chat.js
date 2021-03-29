import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  BackHandler,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Toast from 'react-native-root-toast';

import Global from '../../Global';
import MainHeader from '../home/cardView/MainHeader';
import ChatItem from './cardView/ChatItem';

import searchIcon from '../../../icons/search-bd.png';

var countExit = 0;

export default function Chat({navigation}) {
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

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const [search, setSearch] = useState('');
  const [menu, setMenu] = useState({all: true, save: false});

  const data = [
    {
      id: 1,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: true,
    },
    {
      id: 2,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: true,
    },
    {
      id: 3,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: false,
    },
    {
      id: 4,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: false,
    },
    {
      id: 5,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: false,
    },
    {
      id: 6,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: true,
    },
    {
      id: 7,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: false,
    },
    {
      id: 8,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: true,
    },
    {
      id: 9,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: false,
    },
    {
      id: 10,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: false,
    },
  ];
  const data2 = [
    {
      id: 1,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: true,
    },
    {
      id: 2,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: true,
    },
    {
      id: 3,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: false,
    },
    {
      id: 4,
      avatar: 'https://www2.lina.review/storage/avatars/1608883853.jpg',
      name: 'Trần Thanh Đức',
      time: '1Th12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: false,
    },
  ];

  const menuHandle = (type) => {
    if (type === 'all') {
      setMenu({all: true, save: false});
    } else {
      setMenu({all: false, save: true});
    }
  };

  const renderHeaderList = (
    <View>
      <View style={styles.searchSuperCont}>
        <View style={styles.searchCont}>
          <Image style={styles.searchImg} source={searchIcon} />
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setSearch(text)}
            value={search}
            placeholder="Tìm kiếm"
            underlineColorAndroid="transparent"
            placeholderTextColor="#bdbdbd"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.menuCont}>
        <TouchableOpacity onPress={() => menuHandle('all')}>
          <Text style={menu.all ? styles.itemS : styles.item}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => menuHandle('save')}>
          <Text style={menu.save ? styles.itemS : styles.item}>
            Đầu bếp đã lưu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const allJSX = (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={renderHeaderList}
      data={data.sort(function (a, b) {
        if (a.status) {
          return -1;
        } else {
          return 1;
        }
      })}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('CHAT_LIST', {item: item})}>
            <ChatItem item={item} />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
  const saveJSX = (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={renderHeaderList}
      data={data2.sort(function (a, b) {
        if (a.status) {
          return -1;
        } else {
          return 1;
        }
      })}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('CHAT_LIST', {item: item})}>
            <ChatItem item={item} />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );

  return (
    <View style={styles.wrapper}>
      <MainHeader navigation={navigation} />

      {menu.all ? allJSX : saveJSX}
    </View>
  );
}

const {width, mainColor, backgroundColor} = Global;
const styles = StyleSheet.create({
  itemS: {
    fontFamily: 'Roboto-Bold',
    color: mainColor,
    fontSize: width / 28,
    width: width / 2,
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 5,
    borderBottomColor: mainColor,
    borderBottomWidth: 1,
  },
  item: {
    fontFamily: 'Roboto-Regular',
    color: '#bdbdbd',
    fontSize: width / 30,
    width: width / 2,
    textAlign: 'center',
    paddingBottom: 12,
    paddingTop: 5,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
  },
  menuCont: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  searchCont: {
    backgroundColor: '#f2f2f2',
    width: width - 30,
    paddingVertical: 5,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
  },
  searchSuperCont: {
    backgroundColor: 'white',
    width,
    padding: 15,
  },
  searchImg: {
    width: width / 19,
    height: width / 19,
  },
  searchInput: {
    padding: 0,
    fontSize: width / 30,
    fontFamily: 'Roboto-Regular',
    marginLeft: 12,
  },
  wrapper: {
    backgroundColor,
    flex: 1,
  },
});
