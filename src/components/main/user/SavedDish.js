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
import DishViewVertical from '../home/cardView/DishViewVertical';
import get_all_saved_dish from '../../../apis/get_all_saved_dish';

import arrowBack from '../../../icons/arrow_back_ios-fb5a23.png';

export default function SavedChef({navigation}) {
  const user = useSelector((state) => state.user);
  const [pageSavedDish, setPageSavedDish] = useState(0);
  const [dataSavedDish, setDataSavedDish] = useState([]);
  const [loadingSavedDish, setLoadingSavedDish] = useState(false);
  const [loadingTopSavedDish, setLoadingTopSavedDish] = useState(false);

  useEffect(() => {
    getSavedDish(pageSavedDish);
  }, []);

  const getSavedDish = (page) => {
    setLoadingSavedDish(true);
    get_all_saved_dish
      .get_all_saved_dish(user.token, page)
      .then((responseJson) => {
        if (page !== 0 && responseJson.length === 0) {
          setLoadingSavedDish(false);
          return Toast.show('Đã tải đến cuối danh sách', {
            position: -20,
            duration: 2500,
          });
        } else {
          if (page === 0) {
            setDataSavedDish(responseJson);
          } else {
            setDataSavedDish(dataSavedDish.concat(responseJson));
          }

          setPageSavedDish(page + 1);
          setLoadingSavedDish(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingSavedDish(false);
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
        <Text style={styles.headerText}>Món ăn đã lưu</Text>
      </View>

      {dataSavedDish.length === 0 && loadingSavedDish ? (
        <View
          style={{
            height: height - heightHeader,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {Loading}
        </View>
      ) : dataSavedDish.length === 0 ? (
        <View
          style={{
            height: height - heightHeader,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.noSavedDish}>Chưa có món ăn nào được lưu!</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          data={dataSavedDish}
          onRefresh={() => {
            setLoadingTopSavedDish(true);
            setPageSavedDish(0);
            getSavedDish(0);
            setLoadingTopSavedDish(false);
          }}
          refreshing={loadingTopSavedDish}
          ListFooterComponent={
            <View style={{backgroundColor: 'white', marginBottom: 10}}>
              <View style={styles.line} />
              {loadingSavedDish ? (
                <View style={{paddingVertical: 4.5}}>{Loading}</View>
              ) : (
                <TouchableOpacity
                  onPress={() => getSavedDish(pageSavedDish)}
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
                  onPress={() => navigation.navigate('DISH', {dish: item})}>
                  <DishViewVertical dish={item} />
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  style={{backgroundColor: 'white'}}
                  onPress={() => navigation.navigate('DISH', {dish: item})}>
                  <DishViewVertical dish={item} />
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(item) => item.dishofchef.iddishofchef}
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
    paddingVertical: 6,
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
