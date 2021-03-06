import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import Global from '../../../Global';
import Comment from './Comment';

import arrowRight from '../../../../icons/arrow_right-82.png';

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
      <TouchableOpacity style={styles.viewMore}>
        <Text style={styles.viewMoreText}>Xem thêm</Text>
        <Image style={styles.viewMoreImg} source={arrowRight} />
      </TouchableOpacity>
    </View>
  );
}

const {width, fontFamily} = Global;
const styles = StyleSheet.create({
  viewMore: {
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMoreText: {
    fontFamily,
    color: '#828282',
    fontSize: width / 34,
  },
  viewMoreImg: {
    width: width / 26,
    height: width / 26,
  },
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
