/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {useSelector} from 'react-redux';

import Global from '../../Global';
import ChefView from '../home/cardView/ChefView';
import get_all_following_chef from '../../../apis/get_all_following_chef';

import arrowBack from '../../../icons/arrow_back_ios-fb5a23.png';

export default function SavedChef({navigation}) {
  const user = useSelector((state) => state.user);
  const [pageFollowingChef, setPageFollowingChef] = useState(0);
  const [dataFollowingChef, setDataFollowingChef] = useState([]);
  const [loadingFollowingChef, setLoadingFollowingChef] = useState(false);
  const [loadingTopFollowingChef, setLoadingTopFollowingChef] = useState(false);

  useEffect(() => {
    getFollowingChef(pageFollowingChef);
  }, []);

  const getFollowingChef = (page) => {
    setLoadingFollowingChef(true);
    get_all_following_chef
      .get_all_following_chef(user.token, page)
      .then((responseJson) => {
        if (page !== 0 && responseJson.length === 0) {
          setLoadingFollowingChef(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: -20,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataFollowingChef(responseJson);
          } else {
            setDataFollowingChef(dataFollowingChef.concat(responseJson));
          }

          setPageFollowingChef(page + 1);
          setLoadingFollowingChef(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingFollowingChef(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: 0,
          duration: 2500,
        });
      });
  };

  const flatListItemSeparator = () => {
    return <View style={styles.line} />;
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
          <Image style={styles.backIcon} source={arrowBack} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đầu bếp đã theo dõi</Text>
      </View>

      {dataFollowingChef.length === 0 && loadingFollowingChef ? (
        <View
          style={{
            height: height - heightHeader,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {Loading}
        </View>
      ) : dataFollowingChef.length === 0 ? (
        <View
          style={{
            height: height - heightHeader,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.noSavedDish}>Bạn chưa theo dõi đầu bếp nào!</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          data={dataFollowingChef}
          onRefresh={() => {
            setLoadingTopFollowingChef(true);
            setPageFollowingChef(0);
            getFollowingChef(0);
            setLoadingTopFollowingChef(false);
          }}
          refreshing={loadingTopFollowingChef}
          ListFooterComponent={
            <View style={{backgroundColor: 'white', marginBottom: 10}}>
              <View style={styles.line} />
              {loadingFollowingChef ? (
                <View style={{paddingVertical: 4.5}}>{Loading}</View>
              ) : (
                <TouchableOpacity
                  onPress={() => getFollowingChef(pageFollowingChef)}
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
            if (index === 0) {
              return (
                <TouchableOpacity
                  style={{marginTop: 10, backgroundColor: 'white'}}
                  onPress={() => navigation.navigate('CHEF', {chef: item})}>
                  <ChefView chef={item} />
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  style={{backgroundColor: 'white'}}
                  onPress={() => navigation.navigate('CHEF', {chef: item})}>
                  <ChefView chef={item} />
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
}

const {width, height, backgroundColor, backButton, heightHeader} = Global;
const styles = StyleSheet.create({
  noSavedDish: {
    fontFamily: 'Roboto-Regular',
    fontSize: width / 30,
    color: '#828282',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMoreTextVertical: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 35,
    paddingVertical: 8,
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0,
    borderTopWidth: 0.5,
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

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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
