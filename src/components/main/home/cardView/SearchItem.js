import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Image as ImageLazy} from 'react-native-elements';

import Global from '../../../Global';

import timeIcon from '../../../../icons/access_time.png';
import timeIconS from '../../../../icons/access_time-2f80ed.png';
import deliveryIcon from '../../../../icons/delivery_dining.png';
import deliveryIconS from '../../../../icons/delivery_dining-2f80ed.png';
import chartIcon from '../../../../icons/show_chart.png';
import chartIconS from '../../../../icons/show_chart-2f80ed.png';
import imageHolder from '../../../../icons/imageHolder.png';

export default function SearchItem(props) {
  const {picture, name} = props.dish.dish;

  const formatTime = (time) => {
    var h, m;
    m = Math.round(time);
    if (m >= 60) {
      h = Math.floor(m / 60);
      m = m % 60;
      return h + 'h ' + m + ' phút';
    } else {
      return m + ' phút';
    }
  };

  const scoreJSX = (
    <View style={styles.searchCriteria}>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={chartIconS} />
        <Text style={styles.searchCriteriaTextS}>
          {Math.round(props.dish.dishofchef.score * 1000) / 10} điểm
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={deliveryIcon} />
        <Text style={styles.searchCriteriaText}>
          {props.dish.dishofchef.distance} km
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={timeIcon} />
        <Text style={styles.searchCriteriaText}>
          {formatTime(props.dish.dishofchef.time)}
        </Text>
      </View>
    </View>
  );
  const addressJSX = (
    <View style={styles.searchCriteria}>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={chartIcon} />
        <Text style={styles.searchCriteriaText}>
          {Math.round(props.dish.dishofchef.score * 1000) / 10} điểm
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={deliveryIconS} />
        <Text style={styles.searchCriteriaTextS}>
          {props.dish.dishofchef.distance} km
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={timeIcon} />
        <Text style={styles.searchCriteriaText}>
          {formatTime(props.dish.dishofchef.time)}
        </Text>
      </View>
    </View>
  );
  const priceJSX = (
    <View style={styles.searchCriteria}>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={chartIcon} />
        <Text style={styles.searchCriteriaText}>
          {Math.round(props.dish.dishofchef.score * 1000) / 10} điểm
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={deliveryIcon} />
        <Text style={styles.searchCriteriaText}>
          {props.dish.dishofchef.distance} km
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={timeIcon} />
        <Text style={styles.searchCriteriaText}>
          {formatTime(props.dish.dishofchef.time)}
        </Text>
      </View>
    </View>
  );
  const timeJSX = (
    <View style={styles.searchCriteria}>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={chartIcon} />
        <Text style={styles.searchCriteriaText}>
          {Math.round(props.dish.dishofchef.score * 1000) / 10} điểm
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={deliveryIcon} />
        <Text style={styles.searchCriteriaText}>
          {props.dish.dishofchef.distance} km
        </Text>
      </View>
      <View style={styles.searchCriteriaItem}>
        <Image style={styles.searchCriteriaImg} source={timeIconS} />
        <Text style={styles.searchCriteriaTextS}>
          {formatTime(props.dish.dishofchef.time)}
        </Text>
      </View>
    </View>
  );

  const criteriaJSX = () => {
    switch (props.search) {
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

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperInfo}>
        <ImageLazy
          PlaceholderContent={
            <Image style={styles.imageHolder} source={imageHolder} />
          }
          style={styles.image}
          source={{uri: picture}}
        />
        <View>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          {criteriaJSX()}
          <Text style={styles.chef}>{props.dish.chef.name}</Text>
          <Text style={styles.price}>
            {Global.currencyFormat(props.dish.dishofchef.price)}đ
          </Text>
        </View>
      </View>
    </View>
  );
}

const {width, mainColor} = Global;
const styles = StyleSheet.create({
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
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapperInfo: {
    flexDirection: 'row',
  },
  image: {
    width: width / 5,
    height: width / 5,
    borderRadius: 2,
    marginRight: 12,
  },
  imageHolder: {
    width: width / 5,
    height: width / 5,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 30,
    marginBottom: 3,
    width: width - width / 5 - 32,
  },
  chef: {
    fontFamily: 'Roboto-Light',
    color: '#4f4f4f',
    fontSize: width / 34,
  },
  price: {
    fontFamily: 'Montserrat-SemiBold',
    color: mainColor,
    fontSize: width / 31,
  },
});
