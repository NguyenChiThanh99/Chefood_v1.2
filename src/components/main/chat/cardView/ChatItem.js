/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import Global from '../../../Global';

export default function ChatItem(props) {
  const {avatar, name, time, status, content} = props.item;
  return (
    <View style={styles.wrapper}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={styles.avatar} source={{uri: avatar}} />
        <View>
          <Text style={status ? styles.nameActive : styles.name}>{name}</Text>
          <Text
            style={status ? styles.contentActive : styles.content}
            numberOfLines={1}>
            {content}
          </Text>
        </View>
      </View>
      <Text style={status ? styles.timeActive : styles.time}>{time}</Text>
    </View>
  );
}

const {width, fontFamily} = Global;
const styles = StyleSheet.create({
  avatar: {
    width: width / 8.2,
    height: width / 8.2,
    borderRadius: width / 16.4,
    marginRight: 10,
  },
  name: {
    fontFamily,
    fontSize: width / 29,
    color: '#828282',
    marginBottom: 3,
  },
  nameActive: {
    fontFamily,
    fontSize: width / 29,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 3,
  },
  contentActive: {
    fontFamily,
    fontSize: width / 31,
    color: '#000',
    fontWeight: 'bold',
    width: width / 1.55,
  },
  content: {
    fontFamily,
    fontSize: width / 31,
    color: '#828282',
    width: width / 1.55,
  },
  timeActive: {
    fontFamily,
    fontSize: width / 31,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 3,
  },
  time: {
    fontFamily,
    fontSize: width / 31,
    color: '#828282',
    marginTop: 3,
  },
  wrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
});
