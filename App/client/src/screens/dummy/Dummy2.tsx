import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import SearchPlaces from '../../components/autocompletes/SearchPlaces.tsx';

const Dummy2 = () => {
    return(

        <View style={styles.container}><View><Text> Test Screen 1</Text></View>
        <SearchPlaces />
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
