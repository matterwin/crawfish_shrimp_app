import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import BottomSheetWrapper from '../../components/bottomsheets/BottomSheetWrapper.tsx';
import { COLORS } from "../../constants";
import FoodNav from '../../navigation/FoodNav.tsx';
import ModalLocation from '../../components/modals/ModalLocation.tsx';
import ModalNotification from '../../components/modals/ModalNotification.tsx';

const Dummy = () => {
    return(
      <BottomSheetWrapper>
        <FoodNav />  
      </BottomSheetWrapper>
    );
}

export default Dummy;

const styles = StyleSheet.create({
  locationContainer: {
    position: 'absolute', 
    bottom: '14%', 
    margin: 15,
  },
  notificationContainerContainer: {
    position: 'absolute', 
    top: '50%',
    margin: 15,
  },
});
