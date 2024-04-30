import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/index.tsx';

const CircleUserContainer = ({ food }) => {
  path = require('../../../assets/pictures/user.png'); 
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Image
          source={path}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default CircleUserContainer;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 75,
    backgroundColor: COLORS.tealwhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

