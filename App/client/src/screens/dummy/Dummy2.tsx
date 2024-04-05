import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { FIREBASE_AUTH } from '../../../FirebaseConfig';

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
        <View>
          <Text> Test Screen 1</Text>
          <Button onPress={handleLogout} title="Logout" />
        </View>
      </View>
    );
}

export default Dummy2;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0b2226',
    },
});
