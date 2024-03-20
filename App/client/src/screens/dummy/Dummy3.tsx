import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const Dummy3 = () => {
    return(
        <View style={styles.container}><Text> Test Screen</Text></View>
    );
}

export default Dummy3;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0b2226',
      padding: 15,
    },
});
