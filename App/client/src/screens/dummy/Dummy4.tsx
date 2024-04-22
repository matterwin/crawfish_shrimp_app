import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import BottomSheetVendor from '../../components/bottomsheets/BottomSheetVendor.tsx';

const Dummy4 = ({ selectedItem }) => {
  return(
    <BottomSheetVendor selectedItem={selectedItem}>
      <View style={styles.container}>
      </View>
    </BottomSheetVendor>
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
