import React from 'react';
import { StyleSheet, View, ColorValue } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Dummy4 from '../screens/dummy/Dummy4.tsx';

const Stack = createStackNavigator();

function ProfileNav() {
  return (
    <Stack.Navigator initialRouteName='Dummy4'>
      <Stack.Screen name={"Dummy4"} component={Dummy4} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default ProfileNav;
