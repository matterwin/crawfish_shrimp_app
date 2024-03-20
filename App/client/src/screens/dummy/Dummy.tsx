import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import BottomSheetWrapper from '../../components/BottomSheetWrapper.tsx';
import { COLORS } from "../../constants";
import FoodNav from '../../navigation/FoodNav.tsx';

const Dummy = () => {
    return(
      <BottomSheetWrapper>
        <FoodNav />
      </BottomSheetWrapper>
    );
}

export default Dummy;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});
