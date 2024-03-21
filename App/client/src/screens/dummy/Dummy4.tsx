import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const Dummy4 = () => {
    return(
        <View style={styles.container}><Text> Profile Screen</Text></View>
    );
}

export default Dummy4;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0b2226',
      padding: 15,
    },
});
