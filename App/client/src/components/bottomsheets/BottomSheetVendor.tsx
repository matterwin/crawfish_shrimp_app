import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Stars from '../ratings/Stars.tsx';
import { Rating, AirbnbRating } from 'react-native-ratings';
import BottomSheetReviews from './BottomSheetReviews.tsx';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const BottomSheetVendor = ({ children, selectedItem }: Props & { selectedItem: Item }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [snapIndex, setSnapIndex] = useState(0);
  const [snapIndexForReviews, setSnapIndexForReviews] = useState(-1);
  const [item, setItem] = useState(selectedItem);

  const snapPoints = useMemo(() => ['13%', '70%', '85%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index-1);
  }, []);

  const handleSetSnapIndexForReviews = () => {
    setSnapIndexForReviews(snapIndex);
  };

  return (
    <BottomSheetReviews selectedItem={selectedItem} snapIndex={snapIndexForReviews} setSnapIndex={setSnapIndexForReviews}>
      <View style={styles.container}>
        {children} 
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleStyle={{ marginBottom: -3, borderRadius: 15, }}
          backgroundStyle={{ backgroundColor: COLORS.teal, borderRadius: 15, borderWidth: 1, borderColor: COLORS.tealwhite }}
          handleIndicatorStyle={{ backgroundColor: COLORS.brightteal, width: 60, height: 5 }} 
        >
          <View style={styles.sheetContainer}>
            <Rating
              type='custom'
              ratingCount={5}
              readonly
              tintColor={COLORS.teal} 
              startingValue={3}
              imageSize={30}
              ratingColor={COLORS.green}
              style={{ marginTop: -3 }}
              ratingBackgroundColor={COLORS.tealwhite}
            />
            <View style={styles.titleView}>
              <Text style={styles.titleText}>{item.title}</Text>
            </View>
            <TouchableOpacity style={styles.reviewsView} onPress={handleSetSnapIndexForReviews}>
              <Text style={styles.reviewsText}>Reviews  (1)</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </View>
    </BottomSheetReviews>
  );
};

export default BottomSheetVendor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  sheetContainer: {
    flex: 1,
    overflow: 'visible',
    marginTop: 0,
    gap: 15
  },
  titleView: {
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexWarp: 'wrap',
    marginTop: -15,
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
    margin: 15,
    backgroundColor: COLORS.grey,
    borderRadius: 15,
    padding: 20,
  },
  reviewsText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});


