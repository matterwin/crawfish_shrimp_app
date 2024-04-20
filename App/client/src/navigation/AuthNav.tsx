import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register } from '../screens';
import AppNav from './AppNav';

const Stack = createStackNavigator();

const AuthNav = () => {
  return(
    <Stack.Navigator initialRouteName={"Login"}>
      <Stack.Screen name={"Login"} component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name={"Register"} component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name={"AppNav"} component={AppNav} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default AuthNav;
