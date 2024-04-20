import React from 'react';
import { StyleSheet, View, ColorValue } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Dummy from '../screens/dummy/Dummy.tsx';

const Stack = createStackNavigator();

const BottomNav = () => {
  return (
    <Stack.Navigator initialRouteName='Dummy'>
      <Stack.Screen name={"Dummy"} component={Dummy} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default BottomNav;
