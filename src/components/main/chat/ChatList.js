/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Keyboard,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
// import Toast from 'react-native-root-toast';

import Global from '../../Global';
import NodeChat from './cardView/NodeChat';

import arrowBack from '../../../icons/arrow_back_ios-fb5a23.png';
import sendIcon from '../../../icons/Send.png';

export default function ChatList({navigation, route}) {
  useEffect(() => {
    var interval = setInterval(() => {
      _getMessages();
    }, 3000);
    return () => {
      setChatData([]);
      setChatInputContent('');
      clearInterval(interval);
    };
  }, []);

  const {name, avatar} = route.params.item;
  const [chatData, setChatData] = useState([]);
  const [username, setUsername] = useState('Chí Tâm');
  const [chatInputContent, setChatInputContent] = useState('');

  const _getMessages = () => {
    fetch(Global.chatLink + 'messages')
      .then((response) => response.json())
      .then((json) => {
        setChatData(json.reverse());
      })
      .catch((error) => console.error(error));
  };

  const _sendMessage = () => {
    if (chatInputContent !== '') {
      fetch(Global.chatLink + 'message/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: '123',
          messages: chatInputContent,
          status: 1,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          setChatInputContent('');
          Keyboard.dismiss();
        })
        .catch((error) => console.error(error));
    }
  };

  const _renderChatLine = (item, index) => {
    if (index === chatData.length - 1) {
      return (
        <View style={{marginTop: 10}}>
          <NodeChat item={item} username={username} />
        </View>
      );
    }
    return <NodeChat item={item} username={username} />;
  };

  const _onChangeChatInput = (text) => {
    setChatInputContent(text);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={arrowBack} />
        </TouchableOpacity>
        <Image style={styles.avatar} source={{uri: avatar}} />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.listChat}>
        <FlatList
          inverted
          data={chatData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => _renderChatLine(item, index)}
        />
      </View>

      <View style={styles.chatInputCont}>
        <TextInput
          placeholder="Gửi tin nhắn..."
          value={chatInputContent}
          onChangeText={(text) => _onChangeChatInput(text)}
          style={styles.chatInput}
          underlineColorAndroid="transparent"
          placeholderTextColor="#828282"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => _sendMessage()}>
          <Image style={styles.sendIcon} source={sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const {
  width,
  height,
  fontFamily,
  backgroundColor,
  heightHeader,
  backButton,
} = Global;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor,
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: heightHeader,
    alignItems: 'center',
    paddingLeft: 10,
  },
  backIcon: {
    width: backButton,
    height: backButton,
  },
  avatar: {
    width: width / 13,
    height: width / 13,
    borderRadius: width / 26,
    marginLeft: 11,
  },
  name: {
    fontFamily,
    color: '#333333',
    fontSize: width / 24,
    marginLeft: 12,
  },
  listChat: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  chatInputCont: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  chatInput: {
    color: '#333333',
    fontSize: width / 30,
    padding: 0,
    backgroundColor: '#f2f2f2',
    borderRadius: 65,
    width: width - 45 - width / 14,
    height: height / 17,
    paddingHorizontal: 20,
  },
  sendIcon: {
    width: width / 14,
    height: width / 14,
  },
});
