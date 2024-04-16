import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './src/navigation/AuthNav';
import { User, onAuthStateChanged } from 'firebase/auth';
import AppNav from './src/navigation/AppNav';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { COLORS } from './src/constants';
import store from './src/redux/store';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // also check if user has set allowed location in localstorage

  useEffect(() => {
    setLoading(false);
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      // console.log('user', user);
      setUser(user);
    });
  },[])

return (
    <NavigationContainer>
      {user ? <AppNav /> : <AuthNav />}
      <StatusBar style="light" translucent={true}/>
    </NavigationContainer>
  );
}

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.deepgreen,
  },
});
