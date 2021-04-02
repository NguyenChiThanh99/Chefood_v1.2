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
  const {namedish, iddishofchef, comment} = props.commentDish;

  const flatListItemSeparator = () => {
    return <View style={styles.line} />;
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.name}>{namedish}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={comment}
        ItemSeparatorComponent={flatListItemSeparator}
        renderItem={({item, index}) => {
          return <Comment comment={item} />;
        }}
        keyExtractor={(item) => item.comment.comment}
      />
      <TouchableOpacity
        style={styles.viewMore}
        onPress={() =>
          props.navigation.navigate('DISH', {id: iddishofchef, fromChef: true})
        }>
        <Text style={styles.viewMoreText}>Xem thêm</Text>
        <Image style={styles.viewMoreImg} source={arrowRight} />
      </TouchableOpacity>
    </View>
  );
}

const {width} = Global;
const styles = StyleSheet.create({
  viewMore: {
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMoreText: {
    fontFamily: 'Roboto-Regular',
    color: '#828282',
    fontSize: width / 34,
  },
  viewMoreImg: {
    width: width / 26,
    height: width / 26,
  },
  name: {
    fontFamily: 'Roboto-Bold',
    color: '#333333',
    fontSize: width / 26,
    marginLeft: 15,
  },
  wrapper: {
    backgroundColor: 'white',
    paddingVertical: 15,
  },
  line: {
    borderColor: '#bdbdbd',
    borderWidth: 0,
    borderTopWidth: 0.5,
    marginHorizontal: 15,
  },
});
