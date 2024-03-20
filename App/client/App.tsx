import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './src/navigation/AuthNav';
import { User, onAuthStateChanged } from 'firebase/auth';
import AppNav from './src/navigation/AppNav.tsx';
import { FIREBASE_AUTH } from './FirebaseConfig';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(false);
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
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

const AppWrapper = () => {
  return (
    // <Provider store={store}>
      <App />
    // </Provider>
  );
}

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
