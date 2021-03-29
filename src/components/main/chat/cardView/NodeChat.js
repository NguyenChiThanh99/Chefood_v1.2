/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Global from '../../../Global';

export default function NodeChat(props) {
  const {messages, created_on, username} = props.item;
  if (username === props.username) {
    return (
      <View style={{width, alignItems: 'flex-end'}}>
        <View style={[styles.chatLineView, {alignItems: 'flex-end'}]}>
          <Text style={styles.time}>{created_on}</Text>
          <LinearGradient
            style={styles.contentUserCont}
            colors={['#fb5a23', '#ffb038']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.contentUser}>{messages}</Text>
          </LinearGradient>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{width, alignItems: 'flex-start'}}>
        <View style={styles.chatLineView}>
          <Text style={styles.time}>{created_on}</Text>
          <Text style={styles.content}>{messages}</Text>
        </View>
      </View>
    );
  }
}

const {width} = Global;
const styles = StyleSheet.create({
  chatLineView: {
    marginHorizontal: 15,
    marginBottom: 10,
    maxWidth: width / 1.3,
  },
  time: {
    fontFamily: 'Roboto-Regular',
    fontSize: width / 35,
    color: '#828282',
    marginBottom: 5,
  },
  content: {
    fontFamily: 'Roboto-Regular',
    color: '#333333',
    fontSize: width / 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  contentUserCont: {
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  contentUser: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: width / 30,
  },
});
