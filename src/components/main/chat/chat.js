/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  BackHandler,
  Keyboard,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Toast from 'react-native-root-toast';

import Global from '../../Global';
import NodeChat from './cardView/NodeChat';

import background from '../../../images/background.png';

var countExit = 0;

export default function Chat({navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (countExit === 0) {
          countExit += 1;
          Toast.show('Chạm lần nữa để thoát', {
            position: 0,
            duration: 2000,
          });
        } else {
          BackHandler.exitApp();
        }

        const timer = setTimeout(() => {
          countExit = 0;
        }, 2000);
        return () => clearTimeout(timer);
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      const interval = setInterval(() => {
        _getMessages();
      }, 3000);

      return () => {
        clearInterval(interval);
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const [chatData, setChatData] = useState([]);
  const [username, setUsername] = useState('bienthaikieusa');
  const [chatInputContent, setChatInputContent] = useState('');

  const _getMessages = () => {
    fetch(Global.chatLink + 'messages')
      .then((response) => response.json())
      .then((json) => {
        setChatData(json);
        console.log(json);
      })
      .catch((error) => console.error(error));
  };

  const _sendMessage = () => {
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
        console.log(json);
        setChatInputContent('');
        Keyboard.dismiss();
      })
      .catch((error) => console.error(error));
  };

  const _renderChatLine = (item) => {
    if (item.username === username) {
      return (
        <View style={{alignItems: 'flex-end'}}>
          <NodeChat sender="You" chatContent={item.messages} />
        </View>
      );
    }
    return <NodeChat sender={item.username} chatContent={item.messages} />;
  };

  const _onChangeChatInput = (text) => {
    setChatInputContent(text);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        imageStyle={{opacity: 0.4}}
        source={background}
        style={styles.imgBackground}>
        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}, index) => _renderChatLine(item)}
        />
      </ImageBackground>

      <View style={{flex: 1 / 10}}>
        <View style={styles.chatTextboxView}>
          <View style={{flex: 8 / 10}}>
            <TextInput
              placeholder="Typing..."
              value={chatInputContent}
              onChangeText={(text) => _onChangeChatInput(text)}
              style={{height: 100, fontSize: 18}}
            />
          </View>
          <View style={{flex: 2 / 10}}>
            <TouchableOpacity onPress={() => _sendMessage()}>
              <View style={styles.button}>
                <Text style={styles.touchText}>Send</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imgBackground: {
    flex: 9 / 10,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
  chatTextboxView: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 2,
  },
  touchText: {
    color: '#0099ff',
    fontSize: 14,
  },
  button: {
    height: 46,
    width: 50,
    borderRadius: 10,
    marginRight: 20,
    backgroundColor: '#0082c8',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
