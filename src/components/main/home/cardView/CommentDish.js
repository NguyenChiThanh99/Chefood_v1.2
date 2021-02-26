import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

import Global from '../../../Global';

import Comment from './Comment';

export default function CommentDish(props) {
  const {name, comment} = props.commentDish;

  const flatListItemSeparator = () => {
    return <View style={styles.line} />;
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}>{name}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={comment}
        ItemSeparatorComponent={flatListItemSeparator}
        renderItem={({item, index}) => {
          return <Comment comment={item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const {width, fontFamily} = Global;
const styles = StyleSheet.create({
  name: {
    fontFamily,
    color: '#333333',
    fontWeight: 'bold',
    fontSize: width / 26,
    marginLeft: 15,
  },
  wrapper: {
    backgroundColor: 'white',
    paddingVertical: 15,
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0.25,
    marginHorizontal: 15,
  },
});
