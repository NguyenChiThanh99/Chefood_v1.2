import React, {useState, useEffect} from 'react';
import {View, Text, Alert, StyleSheet, Button, Image} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function Setting() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    configureGoogleSign();
  }, []);

  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId:
        '148915325976-v7n9hktfklbn49sfgf5ianikvfnuknel.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }

  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      console.log(user);
      setUserInfo(user);
      setError(null);
      setIsLoggedIn(true);
    } catch (err) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert('Process Cancelled');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert('Process in progress');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert('Play services are not available');
      } else {
        // some other error
        Alert.alert('Something else went wrong... ', err.toString());
        setError(err);
      }
    }
  }

  async function signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setIsLoggedIn(false);
    } catch (err) {
      Alert.alert('Something else went wrong... ', err.toString());
    }
  }

  async function getCurrentUserInfo() {
    try {
      const user = await GoogleSignin.signInSilently();
      setUserInfo(user);
    } catch (err) {
      if (err.code === statusCodes.SIGN_IN_REQUIRED) {
        // when user hasn't signed in yet
        Alert.alert('Please Sign in');
        setIsLoggedIn(false);
      } else {
        Alert.alert('Something else went wrong... ', err.toString());
        setIsLoggedIn(false);
      }
    }
  }

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => signIn()}
      />

      <View style={styles.status}>
        {isLoggedIn === false ? (
          <Text style={styles.loggedinMessage}>You must sign in!</Text>
        ) : (
          <Button onPress={() => signOut()} title="Sign out" color="#332211" />
        )}
      </View>

      <View style={styles.userInfoContainer}>
        {/* ADD THE FOLLOWING */}
        {isLoggedIn === true ? (
          <>
            <Text style={styles.displayTitle}>
              Welcome {userInfo.user.name}
            </Text>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: userInfo && userInfo.user && userInfo.user.photo,
                }}
              />
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    marginVertical: 20,
  },
  profileImageContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  displayTitle: {
    fontSize: 22,
    color: '#010101',
  },
  status: {
    marginVertical: 20,
  },
  loggedinMessage: {
    fontSize: 20,
    color: 'tomato',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    width: 200,
    height: 50,
  },
});
