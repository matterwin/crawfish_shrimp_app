import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, Image } from "react-native";
import { COLORS } from "../../constants";
import { completedResults } from '../../api/places/handlePlaceAutoComplete.tsx';
import FlatListMainFeed from '../../components/flatlists/FlatListMainFeed.tsx';
import { LinearGradient } from 'expo-linear-gradient';

const Dummy2 = () => {
  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const path = require('../../../assets/pictures/crawfish.png');

  return(
    <View
      style={styles.container}
    >
      <View style={styles.overlay}>
        <LinearGradient 
          colors={['rgba(0,0,0,0.75)', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.15)', 'transparent']}
          style={{ flex:1 }}
        />
      </View>
      <View style={styles.centered}>
        <Image
          source={path}
          style={styles.image}
        />
      </View>
      <View style={{ zIndex: 1, flex: 1 }}>
        <FlatListMainFeed />
      </View>
    </View>
  );
}

export default Dummy2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.teal
  },
  overlay: {
    position: "absolute",
    top: 0,
    height: 60,
    width: "100%",
    flex: 1,
    zIndex: 2
  },
  centered: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    position: 'absolute',
    width: '100%',
    height: '100%'
  }, 
  image: {
    width: 200,
    height: 200,
    opacity: 0.2
  },
});
