import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import FlatListMainFeed from '../../components/flatlists/FlatListMainFeed.tsx';

const Dummy2 = () => {
  const handleLogout = async () => {
    try {
        await FIREBASE_AUTH.signOut();
    } catch (error) {
        console.error("Logout error:", error);
    }
  };

  return(
    <View style={styles.container}>
      <FlatListMainFeed />
    </View>
  );
}

export default Dummy2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.tealwhite,
  },
});
