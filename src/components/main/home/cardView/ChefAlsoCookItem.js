import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import Global from '../../../Global';
import RatingStar from './RatingStar';

import timeIcon from '../../../../icons/access_time.png';
import timeIconS from '../../../../icons/access_time-2f80ed.png';
import deliveryIcon from '../../../../icons/delivery_dining.png';
import deliveryIconS from '../../../../icons/delivery_dining-2f80ed.png';
import chartIcon from '../../../../icons/show_chart.png';
import chartIconS from '../../../../icons/show_chart-2f80ed.png';

export default function ChefAlsoCookItem(props) {
  const {price, orders, score, distance, time} = props.dish.dishofchef;
  const {avatar, name, level} = props.dish.chef;

  const formatTime = (timeCook) => {
    var h, m;
    m = Math.round(timeCook);
    if (m >= 60) {
      h = Math.floor(m / 60);
      m = m % 60;
      return h + 'h ' + m + ' phút';
    } else {
      return m + ' phút';
    }
  };

  const criteriaJSX = () => {
    switch (props.type) {
      case 0:
        return scoreJSX;
      case 1:
        return addressJSX;
      case 2:
        return timeJSX;
      default:
        return priceJSX;
    }
  };

  const scoreJSX = (
    <View style={styles.searchCriteria}>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={chartIconS} />
        <Text style={styles.searchCriteriaTextS}>
          {Math.round(score * 1000) / 10} điểm
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={deliveryIcon} />
        <Text style={styles.searchCriteriaText}>{distance} km</Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={timeIcon} />
        <Text style={styles.searchCriteriaText}>{formatTime(time)}</Text>
      </View>
    </View>
  );
  const addressJSX = (
    <View style={styles.searchCriteria}>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={chartIcon} />
        <Text style={styles.searchCriteriaText}>
          {Math.round(score * 1000) / 10} điểm
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={deliveryIconS} />
        <Text style={styles.searchCriteriaTextS}>{distance} km</Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={timeIcon} />
        <Text style={styles.searchCriteriaText}>{formatTime(time)}</Text>
      </View>
    </View>
  );
  const priceJSX = (
    <View style={styles.searchCriteria}>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={chartIcon} />
        <Text style={styles.searchCriteriaText}>
          {Math.round(score * 1000) / 10} điểm
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={deliveryIcon} />
        <Text style={styles.searchCriteriaText}>{distance} km</Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={timeIcon} />
        <Text style={styles.searchCriteriaText}>{formatTime(time)}</Text>
      </View>
    </View>
  );
  const timeJSX = (
    <View style={styles.searchCriteria}>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={chartIcon} />
        <Text style={styles.searchCriteriaText}>
          {Math.round(score * 1000) / 10} điểm
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={deliveryIcon} />
        <Text style={styles.searchCriteriaText}>{distance} km</Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={timeIconS} />
        <Text style={styles.searchCriteriaTextS}>{formatTime(time)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.avatarCont}>
        <Image
          style={styles.avatar}
          source={
            avatar === 'Thiết lập ngay'
              ? {
                  uri:
                    'https://res.cloudinary.com/chefood/image/upload/v1614660200/avatar/avt_h3mm3z.png',
                }
              : {uri: avatar}
          }
        />
        <RatingStar star={Math.round(level * 10) / 10} />
      </View>
      <View style={styles.infoCont}>
        <Text style={styles.name}>{name}</Text>
        {criteriaJSX()}
        <Text style={styles.price}>{Global.currencyFormat(price)}đ</Text>
        <Text style={styles.orders}>{orders} lần đặt nấu</Text>
      </View>
    </View>
  );
}

const {width, mainColor} = Global;
const styles = StyleSheet.create({
  price: {
    fontFamily: 'Roboto-Regular',
    color: mainColor,
    fontSize: width / 27,
  },
  orders: {
    fontFamily: 'Roboto-Light',
    color: '#4f4f4f',
    fontSize: width / 36,
    marginTop: 1,
  },
  searchCriteria: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchCriteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3.5,
    width: (width - width / 6.5 - 45) / 3,
  },
  searchCriteriaImg: {
    width: width / 32,
    height: width / 32,
  },
  searchCriteriaText: {
    fontFamily: 'Roboto-Light',
    color: '#4f4f4f',
    fontSize: width / 35,
    marginLeft: 3,
  },
  searchCriteriaTextS: {
    fontFamily: 'Roboto-Bold',
    color: '#2f80ed',
    fontSize: width / 35,
    marginLeft: 3,
  },
  wrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  avatarCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: width / 6.5,
    height: width / 6.5,
    borderRadius: width / 13,
  },
  infoCont: {
    width: width - width / 6.5 - 45,
    marginLeft: 15,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 27,
    marginBottom: 2,
  },
});
