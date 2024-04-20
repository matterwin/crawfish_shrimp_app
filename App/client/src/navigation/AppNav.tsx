import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNav from './BottomNav.tsx';
import ProfileNav from './ProfileNav.tsx';
import VendorNav from './VendorNav.tsx';

const Stack = createStackNavigator();

const AppNav = () => {

  return (
    <Stack.Navigator initialRouteName='BottomNav'>
      <Stack.Screen name={"BottomNav"} component={BottomNav} options={{ headerShown: false }}/>
      <Stack.Screen name={"ProfileNav"} component={ProfileNav} options={{ headerShown: false }}/>
      <Stack.Screen name={"VendorNav"} component={VendorNav} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default AppNav;

const styles = StyleSheet.create({

});
