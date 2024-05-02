import React from 'react';
import { StyleSheet, View, ColorValue } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Dummy from '../screens/dummy/Dummy.tsx';

const Stack = createStackNavigator();

const BottomNav = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Dummy' 
      screenOptions={{
         headerTransparent: false,
         headerBlurEffect: false,
         headerShown: false
      }}
    >
      <Stack.Screen name={"Dummy"} component={Dummy} 
        options={{
          headerStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            elevation: 0,
            shadowOpacity: 0, 
            height: 20,
          },
          title: null,
       }}/>
    </Stack.Navigator>
  );
}

export default BottomNav;
