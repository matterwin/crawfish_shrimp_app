import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const Dummy2 = () => {
    return(
        <View style={styles.container}><View><Text> Test Screen 1</Text></View>
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
