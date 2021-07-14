import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import Global from '../../Global';
import arrowBack from '../../../icons/arrow_back_ios-ffffff.png';

export default function FullImage({navigation, route}) {
  return (
    <View style={styles.wrapper}>
      <ImageViewer
        saveToLocalByLongPress={false}
        renderIndicator={() => {}}
        imageUrls={[{url: route.params.image}]}
      />
      <View style={styles.topBtn}>
        <TouchableOpacity
          style={styles.topBtnCont}
          onPress={() => navigation.goBack()}>
          <Image style={styles.topBtnImg} source={arrowBack} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const {width, backgroundColor, backButton} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor,
    flex: 1,
  },
  topBtn: {
    width,
    position: 'absolute',
    justifyContent: 'space-between',
  },
  topBtnCont: {
    width: width / 12,
    height: width / 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  topBtnImg: {
    width: backButton,
    height: backButton,
  },
});
