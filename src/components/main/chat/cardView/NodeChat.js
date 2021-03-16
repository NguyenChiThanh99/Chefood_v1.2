import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function NodeChat(props) {
  return (
    <View style={styles.chatLineView}>
      <Text style={styles.itemUserName}>{props.sender}</Text>
      <Text style={styles.itemText}>{props.chatContent}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chatLineView: {
    flex: 1,
    width: '50%',
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  itemUserName: {
    color: '#3399ff',
    padding: 5,
    fontSize: 14,
  },
  itemText: {
    color: '#000000',
    padding: 5,
    fontSize: 14,
  },
});
