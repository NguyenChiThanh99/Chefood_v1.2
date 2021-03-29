/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-root-toast';

import Global from '../../../Global';
import {updateAddressStatus} from '../../../../../actions';
import down_ward from '../../../../apis/download_ward';

import arrowBack from '../../../../icons/arrow_back_ios-fb5a23.png';

export default function Ward({navigation}) {
  useEffect(() => {
    download_ward();
    return () => {
      setData([]);
    };
  }, []);

  const dispatch = useDispatch();
  const addressStatus = useSelector((state) => state.addressStatus);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const setWard = (item) => {
    dispatch(
      updateAddressStatus({
        ...addressStatus,
        ward: item,
      }),
    );
    navigation.navigate('CHANGE_ADDRESS');
  };

  const download_ward = () => {
    setLoading(true);
    down_ward
      .download_ward(addressStatus.district.id)
      .then((responseJson) => {
        if (responseJson.res === 'ERROR') {
          setLoading(false);
          return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
            position: -20,
            duration: 2000,
          });
        } else {
          setLoading(false);
          setData(responseJson.res);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return Toast.show('Lỗi! Vui lòng kiểm tra kết nối internet', {
          position: -20,
          duration: 2500,
        });
      });
  };

  const flatListItemSeparator = () => {
    return <View style={styles.line} />;
  };

  const Loading = (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} color="#fb5a23" size="large" />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={arrowBack} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Phường/Xã/Thị trấn</Text>
      </View>

      {loading ? (
        Loading
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          ItemSeparatorComponent={flatListItemSeparator}
          renderItem={({item, index}) => {
            if (index === 0) {
              return (
                <TouchableOpacity onPress={() => setWard(item)}>
                  <Text style={[styles.rowText, {marginTop: 10}]}>
                    {item._prefix + ' ' + item._name}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity onPress={() => setWard(item)}>
                  <Text style={styles.rowText}>
                    {item._prefix + ' ' + item._name}
                  </Text>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const {width, heightHeader, backgroundColor, backButton} = Global;
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
  rowText: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 30,
    backgroundColor: 'white',
    padding: 10,
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0.25,
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
    paddingHorizontal: 10,
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
