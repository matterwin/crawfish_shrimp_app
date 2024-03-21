import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import BottomSheetWrapper from '../../components/BottomSheetWrapper.tsx';
import { COLORS } from "../../constants";
import FoodNav from '../../navigation/FoodNav.tsx';
import ModalInfo from '../../components/ModalInfo.tsx';

const Dummy = () => {
    return(
      <BottomSheetWrapper>
        <FoodNav />
        <View style={styles.modalContainer}>
          <ModalInfo />
        </View>
      </BottomSheetWrapper>
    );
}

export default Dummy;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    modalContainer: {
      position: 'absolute', 
      bottom: '14%', 
      margin: 15,
    },
});
