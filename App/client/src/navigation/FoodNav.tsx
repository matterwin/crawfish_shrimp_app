import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import Dummy2 from '../screens/dummy/Dummy2.tsx';
import Dummy3 from '../screens/dummy/Dummy3.tsx';
import ProfileBottomSheetModal from '../components/ProfileBottomSheetModal.tsx';

const Tab = createMaterialTopTabNavigator();

const FoodNav = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        initialRouteName="Dummy2"
        screenOptions={() => ({
          tabBarGap: 0,
          tabBarStyle: {
            width: 200, 
            backgroundColor: 'transparent',
            marginLeft: 'auto'
          },
          tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold', padding: 0, margin: 0, },
          tabBarItemStyle: { width: 95, padding: 0, margin: 0, paddingVertical: 0, marginVertical: 0 },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.white,
            width: 25,
            left: '20%',
            marginBottom: 5
          },        
          tabBarActiveTintColor: COLORS.white,
          tabBarInactiveTintColor: COLORS.grey,
        })}
      >
        <Tab.Screen name="Dummy2" component={Dummy2} options={{ tabBarLabel: 'Crawfish' }} />
        <Tab.Screen name="Dummy3" component={Dummy3} options={{ tabBarLabel: 'Shrimp' }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default FoodNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.deepgreen,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
});
