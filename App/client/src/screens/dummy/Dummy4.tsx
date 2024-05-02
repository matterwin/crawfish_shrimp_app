import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, Image } from "react-native";
import { COLORS } from "../../constants";
import BottomSheetVendor from '../../components/bottomsheets/BottomSheetVendor.tsx';
import { LinearGradient } from 'expo-linear-gradient';

const Dummy4 = ({ selectedItem }) => {
  const path = require('../../../assets/pictures/crawfish_background.jpg');

  return(
    <BottomSheetVendor selectedItem={selectedItem}>
      <View
        style={styles.container}
      >
        <View style={{ top: 0 }}>
          <Image
            source={path}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </BottomSheetVendor>
  );
}

export default Dummy4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.deepgreen,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
