import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { completedResults } from '../../api/places/handlePlaceAutoComplete.tsx';
import FlatListMainFeed from '../../components/flatlists/FlatListMainFeed.tsx';

const Dummy3 = () => {
  return(
    <View style={styles.container} >
      <FlatListMainFeed />
    </View>
  );
}

export default Dummy3;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.deepgreen
    },
});
