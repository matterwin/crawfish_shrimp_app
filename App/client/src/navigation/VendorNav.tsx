import React from 'react';
import { StyleSheet, View, ColorValue, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Dummy4 from '../screens/dummy/Dummy4.tsx';
import { COLORS } from '../constants/index.tsx';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const VendorNav = ({ navigation, route }) => {
  return (
    <Stack.Navigator 
      initialRouteName='Dummy4' 
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Dummy4"
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0, 
            height: 100,
          },
          title: null,
          headerLeft: () => (
            <View style={{ marginLeft: 15 }}>
              <View style={styles.header} onTouchEnd={() => navigation.pop()}>
                <Icon name="arrow-back" style={{ margin: 0, padding: 0 }} size={26} color={COLORS.white} />
              </View>
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 15, width: '100%' }}>
              <TouchableOpacity style={[styles.header, { width: '100%' }]} onTouchEnd={() => console.log("touched")}>
                <View style={styles.headerRight}>
                  <Text style={styles.dirText}>Directions</Text>
                  <Icon name="car" style={{ margin: 0, padding: 0 }} size={26} color={COLORS.white} />
                </View>
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        {props => <Dummy4 {...props} selectedItem={route.params?.selectedItem} />} 
      </Stack.Screen>    
    </Stack.Navigator>
  );
}

export default VendorNav;

const styles = StyleSheet.create({
    headerTitle: {
      fontSize: 19
    },
    header: {
      backgroundColor: 'rgba(10, 10, 10, 0.15)',
      // backgroundColor: 'rgba(50, 168, 82, 0.15)',
      borderRadius: 50,
      width: 50,
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '80%'
    },
    dirText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: '500'
    },
});
