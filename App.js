/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
// import {Provider} from 'react-redux';

// import store from './store/store';
// import global from './src/components/global';

import main from './src/components/main/mainIndex';
import signIn from './src/components/userFunction/signIn';
import signUp from './src/components/userFunction/signUp';
import enterEmail from './src/components/userFunction/forgotPassword/enterEmail';
import enterSecretCode from './src/components/userFunction/forgotPassword/enterSecretCode';

const RootStack = createStackNavigator();

export default function App() {
  return (
    // <Provider store={store}>
    <View style={{flex: 1}}>
      {/* <LinearGradient
          style={{height: Global.height / 48}}
          colors={['rgba(248, 161, 112, 1)', 'rgba(255, 205, 97, 1)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
        </LinearGradient> */}

      <NavigationContainer>
        <RootStack.Navigator initialRouteName={'SIGN_IN'}>
          <RootStack.Screen
            name="MAIN"
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
            component={main}
          />
          <RootStack.Screen
            name="SIGN_IN"
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
            component={signIn}
          />
          <RootStack.Screen
            name="SIGN_UP"
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
            component={signUp}
          />
          <RootStack.Screen
            name="ENTER_EMAIL"
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
            component={enterEmail}
          />
          <RootStack.Screen
            name="ENTER_SECRET_CODE"
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
            component={enterSecretCode}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
    // </Provider>
  );
}
