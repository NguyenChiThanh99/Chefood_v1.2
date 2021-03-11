/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';

import store from './store/store';

import main from './src/components/main/mainIndex';
import signIn from './src/components/userFunction/SignIn';
import signUp from './src/components/userFunction/SignUp';
import enterEmail from './src/components/userFunction/forgotPassword/EnterEmail';
import enterSecretCode from './src/components/userFunction/forgotPassword/EnterSecretCode';
import changePassword from './src/components/userFunction/forgotPassword/ChangePassword';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor="rgba(130,130,130,1)" />
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
              <RootStack.Screen
                name="CHANGE_PASSWORD"
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
                component={changePassword}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </View>
      </RootSiblingParent>
    </Provider>
  );
}
