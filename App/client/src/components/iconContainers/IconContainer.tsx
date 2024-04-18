import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const IconContainer = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/pictures/shrimp.png')}
        style={styles.image}
      />
    </View>
  );
};

export default IconContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain', 
  },
});

