import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { completedResults } from '../../api/places/handlePlaceAutoComplete.tsx';

const Dummy3 = () => {
    const search = async () => {
      try {
        const res = await completedResults();

        if(res.status === 200) console.log("success");
      } catch (err) {
        console.log("error in dummy3: err");
      }
    };
    return(
        <View style={styles.container}><Text> Test Screen</Text><Button title="serach" onPress={search}></Button></View>
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
