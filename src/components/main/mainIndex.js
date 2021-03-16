/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
// import {useSelector, useDispatch} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import Global from '../Global';

import home from '../../icons/home.png';
import homeS from '../../icons/homeS.png';
import order from '../../icons/order.png';
import orderS from '../../icons/orderS.png';
import chat from '../../icons/chat.png';
import chatS from '../../icons/chatS.png';
import notification from '../../icons/notification.png';
import notificationS from '../../icons/notificationS.png';
import user from '../../icons/user.png';
import userS from '../../icons/userS.png';

// import {updateCart} from '../actions';

import Home from './home/Home';
import Order from './order/Order';
import Chat from './chat/Chat';
import Notification from './notification/Notification';
import User from './user/User';
import Cart from './home/Cart';
import Search from './home/Search';
import Dish from './home/Dish';
import Chef from './home/Chef';
import ChangeAddress from './user/address/ChangeAddress';
import OrderDetail from './order/OrderDetail';
import ChangeInformation from './user/changeInfomation/ChangeInformation';
import SavedDish from './user/SavedDish';
import SavedChef from './user/SavedChef';
import Setting from './user/Setting';
import ChangeInfoDetail from './user/changeInfomation/ChangeInfoDetail';
import Province from './user/address/Province';
import District from './user/address/District';
import Ward from './user/address/Ward';
import ChangePassword from './user/changeInfomation/ChangePassword';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

function Tabs({navigation}) {
  // const cartLength = useSelector((state) => state.cart.length);
  return (
    <Tab.Navigator
      initialRouteName={'Trang chủ'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Trang chủ') {
            return focused ? (
              <Image style={styles.iconTabbar} source={homeS} />
            ) : (
              <Image style={styles.iconTabbar} source={home} />
            );
          } else if (route.name === 'Đơn hàng') {
            return focused ? (
              <Image style={styles.iconTabbar} source={orderS} />
            ) : (
              <Image style={styles.iconTabbar} source={order} />
            );
          } else if (route.name === 'Chat') {
            return focused ? (
              <Image style={styles.iconTabbar} source={chatS} />
            ) : (
              <Image style={styles.iconTabbar} source={chat} />
            );
          } else if (route.name === 'Thông báo') {
            return focused ? (
              <Image style={styles.iconTabbar} source={notificationS} />
            ) : (
              <Image style={styles.iconTabbar} source={notification} />
            );
          } else if (route.name === 'Tài khoản') {
            return focused ? (
              <Image style={styles.iconTabbar} source={userS} />
            ) : (
              <Image style={styles.iconTabbar} source={user} />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Global.mainColor,
        inactiveTintColor: '#333333',
      }}>
      <Tab.Screen name="Trang chủ" component={Home} />
      <Tab.Screen name="Đơn hàng" component={Order} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Thông báo" component={Notification} />
      <Tab.Screen name="Tài khoản" component={User} />
    </Tab.Navigator>
  );
}

// var flag = false;
// var preUser = 0;

export default function MainIndex({route}) {
  // const dispatch = useDispatch();
  // const userid = useSelector((state) => state.user);
  // const getData = async () => {
  //   var key = '@cart' + '_' + userid.id.toString();
  //   try {
  //     const jsonValue = await AsyncStorage.getItem(key);
  //     dispatch(updateCart(jsonValue !== null ? JSON.parse(jsonValue) : []));
  //     return jsonValue !== null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.log('Error: ' + e);
  //   }
  // };

  // if (preUser !== userid.id) {
  //   flag = false;
  // }
  // if (flag === false && userid !== null) {
  //   getData();
  //   flag = true;
  //   preUser = userid.id;
  // }

  useEffect(() => {
    if (route.params.asyncStorage) {
      SplashScreen.hide();
    }
  }, []);

  return (
    <MainStack.Navigator initialRouteName="TABS" style={styles.wrapper}>
      <MainStack.Screen
        name="TABS"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Tabs}
      />
      <MainStack.Screen
        name="CART"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Cart}
      />
      <MainStack.Screen
        name="SEARCH"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Search}
      />
      <MainStack.Screen
        name="CHEF"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Chef}
      />
      <MainStack.Screen
        name="DISH"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Dish}
      />
      <MainStack.Screen
        name="ORDER_DETAIL"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={OrderDetail}
      />
      <MainStack.Screen
        name="CHANGE_ADDRESS"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={ChangeAddress}
      />
      <MainStack.Screen
        name="CHANGE_INFORMATION"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={ChangeInformation}
      />
      <MainStack.Screen
        name="ORDER"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Order}
      />
      <MainStack.Screen
        name="SETTING"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Setting}
      />
      <MainStack.Screen
        name="SAVED_DISH"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={SavedDish}
      />
      <MainStack.Screen
        name="SAVED_CHEF"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={SavedChef}
      />
      <MainStack.Screen
        name="CHANGE_INFO_DETAIL"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={ChangeInfoDetail}
      />
      <MainStack.Screen
        name="PROVINCE"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Province}
      />
      <MainStack.Screen
        name="DISTRICT"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={District}
      />
      <MainStack.Screen
        name="WARD"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Ward}
      />
      <MainStack.Screen
        name="HOME"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={Home}
      />
      <MainStack.Screen
        name="CHANGE_PASSWORD"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={ChangePassword}
      />
    </MainStack.Navigator>
  );
}

const {width} = Global;
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
  },
  iconTabbar: {
    width: width / 15,
    resizeMode: 'contain',
  },
});
