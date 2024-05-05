import React, { useState } from 'react';
import { StyleSheet, View, ColorValue, Text, TouchableOpacity, Linking, Platform, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Dummy4 from '../screens/dummy/Dummy4.tsx';
import { COLORS } from '../constants/index.tsx';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const VendorNav = ({ navigation, route }) => {
  const [isPressedIn, setIsPressedIn] = useState(false);

  const openMapsByAddress = (address) => {
    let url = '';

    if (Platform.OS === 'ios') {
      url = `http://maps.apple.com/?q=${address}`;
    } else if (Platform.OS === 'android') {
      url = `http://maps.google.com/maps?q=${address}`;
    }

    Linking.openURL(url);
  };

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
            // height: 100,
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
              <Pressable 
                style={[styles.header, { width: '100%' }, isPressedIn && { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]} 
                onPress={() => openMapsByAddress(route.params?.selectedItem?.address)}
                onPressIn={() => setIsPressedIn(true)}
                onPressOut={() => setIsPressedIn(false)}
              >
                <View style={styles.headerRight}>
                  <Text style={styles.dirText}>Directions</Text>
                  <Icon name="car" style={{ margin: 0, padding: 0 }} size={26} color={COLORS.white} />
                </View>
              </Pressable>
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
    backgroundColor: 'rgba(10, 10, 10, 0.35)',
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
