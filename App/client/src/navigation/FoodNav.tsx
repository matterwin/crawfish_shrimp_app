import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import Dummy2 from '../screens/dummy/Dummy2.tsx';
import Dummy3 from '../screens/dummy/Dummy3.tsx';
import Dummy4 from '../screens/dummy/Dummy4.tsx';
import ProfileBottomSheetModal from '../components/ProfileBottomSheetModal.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const FoodNav = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {}]}>
      <Tab.Navigator
        initialRouteName="Dummy2"
        screenOptions={() => ({
          headerTransparent: true,
          tabBarGap: 0,
          tabBarStyle: {
            width: "100%", // Full width
            backgroundColor: 'transparent',
            position: 'absolute',
            // right: '50%',
            paddingTop: 50,
            // left: '50%',
          },
          tabBarContentContainerStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            backgroundColor: 'rgba(120, 167, 176, 0.5)',
            borderWidth: 1,
            borderColor: COLORS.grey,
            marginHorizontal: '20%',
            // display:'none'
          },
          tabBarLabelStyle: { 
            fontSize: 18, 
            fontWeight: 'bold', 
            padding: 0,
            margin: 0, 
            textTransform: "none" 
          },
          tabBarItemStyle: { 
            width: 95, 
            padding: 0, 
            margin: 0, 
            paddingVertical: 0,
            marginVertical: 0, 
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.white,
            width: 25,
            left: '73%',
            marginBottom: 8,
          },        
          tabBarActiveTintColor: COLORS.white,
          tabBarInactiveTintColor: COLORS.grey,
        })}
      >
        <Tab.Screen name="Dummy2" component={Dummy2} options={{ tabBarLabel: 'Crawfish' }} />
        <Tab.Screen name="Dummy3" component={Dummy3} options={{ tabBarLabel: 'Shrimp' }} />
      </Tab.Navigator>
    </View>
  );
};

export default FoodNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green,
    // backgroundColor: 'transparent'
    height: 10,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
});
