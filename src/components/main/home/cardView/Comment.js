import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import Global from '../../../Global';
import RatingStar from './RatingStar';

import avt from '../../../../images/avt.png';

export default function Comment(props) {
  const {user_name, user_avatar} = props.comment.user;
  const {comment, star, date, image} = props.comment.comment;

  return (
    <View style={styles.wrapper}>
      <View style={styles.topInfo}>
        <View style={styles.infoUser}>
          <Image
            style={styles.image}
            source={user_avatar === null ? avt : {uri: user_avatar}}
          />
          <View style={styles.nameCont}>
            <Text style={styles.name}>
              {user_name === null ? 'Người dùng Chefood' : user_name}
            </Text>
            <View style={styles.starSuperCont}>
              <RatingStar star={star} />
              <Text style={styles.rate}>
                {star}
                {star === 1
                  ? ' Tệ'
                  : star === 2
                  ? ' Không ngon'
                  : star === 3
                  ? ' Bình thường'
                  : star === 4
                  ? ' Tốt'
                  : star === 5
                  ? ' Tuyệt vời'
                  : 'Chưa có đánh giá'}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.time}>
          {date === null ? null : Global.longTimeFormat(date)}
        </Text>
      </View>
      <Text style={styles.content}>{comment}</Text>
      {image !== null ? (
        <Image source={{uri: image}} style={styles.imageCmt} />
      ) : null}
    </View>
  );
}

const {width} = Global;
const styles = StyleSheet.create({
  content: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 32,
    marginLeft: width / 12 + 10,
    textAlign: 'justify',
    marginTop: 10,
  },
  time: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 33,
  },
  rate: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 38,
    marginLeft: 5,
  },
  starSuperCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    fontSize: width / 32,
  },
  nameCont: {
    marginLeft: 10,
  },
  image: {
    width: width / 12,
    height: width / 12,
    borderRadius: width / 24,
  },
  imageCmt: {
    width: width / 6,
    height: width / 6,
    marginLeft: width / 12 + 10,
    marginTop: 10,
    borderRadius: 5,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoUser: {
    flexDirection: 'row',
  },
  wrapper: {
    backgroundColor: 'white',
    margin: 15,
  },
  starCont: {
    flexDirection: 'row',
    marginTop: 4,
  },
  star: {
    width: width / 34,
    height: width / 34,
  },
});
