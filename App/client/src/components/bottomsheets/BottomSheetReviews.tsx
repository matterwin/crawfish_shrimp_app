import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Stars from '../ratings/Stars.tsx';
import { Rating, AirbnbRating } from 'react-native-ratings';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const BottomSheetReviews = ({ children, selectedItem, snapIndex, setSnapIndex }: Props & { selectedItem: Item, snapIndex: number }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [item, setItem] = useState(selectedItem);

  const snapPoints = useMemo(() => ['1%', '100%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      {children} 
      <BottomSheet
        ref={bottomSheetRef}
        index={snapIndex}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        handleStyle={{ marginBottom: -3, borderRadius: 15, }}
        backgroundStyle={{ backgroundColor: COLORS.teal, borderRadius: 15, borderWidth: 1, borderColor: COLORS.tealwhite }}
        handleIndicatorStyle={{ backgroundColor: COLORS.brightteal, width: 60, height: 6  }} 
      >
        <View style={styles.sheetContainer}> 
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Reviews</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },
  sheetContainer: {
    flex: 1,
    // margin: 15,
    overflow: 'visible',
    marginTop: 0,
    gap: 15
  },
  titleView: {
    margin: 15,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexWarp: 'wrap',
  },
  titleText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 18,
    width: '80%',
    textAlign: 'center'
  },
  reviewsView: {
    marginTop: 30,
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    padding: 20,
  },
  reviewsText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});



