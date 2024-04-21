import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Stars from '../ratings/Stars.tsx';
import { Rating, AirbnbRating } from 'react-native-ratings';
import BottomSheetReviews from './BottomSheetReviews.tsx';
import BottomSheetPrices from './BottomSheetPrices.tsx';
import CircleIconContainer from '../iconContainers/CircleIconContainer.tsx';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const BottomSheetVendor = ({ children, selectedItem }: Props & { selectedItem: Item }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [snapIndex, setSnapIndex] = useState(0);
  const [snapIndexForReviews, setSnapIndexForReviews] = useState(-1);
  const [snapIndexForPrices, setSnapIndexForPrices] = useState(-1);
  const [item, setItem] = useState(selectedItem);

  const snapPoints = useMemo(() => ['13%', '70%', '85%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index-1);
  }, []);

  const handleSetSnapIndexForReviews = () => {
    setSnapIndexForReviews(snapIndex);
  };

  const handleSetSnapIndexForPrices = () => {
    setSnapIndexForPrices(snapIndex);
  };
  
  const PriceBox = ({ item, food, type, handleSetSnapIndexForPrices }) => {
    // need to display 'N/A' for price and 'Empty' for the latest price update if the price is not there

    return (
      <TouchableOpacity onPress={handleSetSnapIndexForPrices} style={styles.touchableOpacity}>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.labelText}>
              <Text style={styles.underline}>{type}</Text> {food} price
            </Text>
            <Text style={styles.priceText}>${item.boilPrice} / lb</Text>
          </View>
          <View>
            <CircleIconContainer food={food} />
          </View>
        </View>
        <View style={[styles.rowContainer, styles.secondRowContainer]}>
          <View style={styles.rowContent}>
            <Icon name="chevron-forward-outline" size={15} color="white" />
            <Text style={styles.labelText}>Latest price update</Text>
          </View>
          <View style={styles.columnContent}>
            <Text style={styles.secondaryPriceText}>${item.boilPrice}</Text>
            <Text style={styles.secondaryText}>m3ttwin</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetPrices selectedItem={selectedItem} snapIndex={snapIndexForPrices} setSnapIndex={setSnapIndexForPrices}>
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
            handleIndicatorStyle={{ backgroundColor: COLORS.brightteal, width: 60, height: 4 }} 
          >
          <BottomSheetScrollView style={{flex:1}}>
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
              <View style={{ margin:-15, alignItems: 'center' }}>
                <Text style={{ color: COLORS.white }}>{item.address}</Text>
                <Text style={{ color: COLORS.green }}>{item.dist} mi</Text>
              </View>
              <TouchableOpacity style={styles.reviewsView} onPress={handleSetSnapIndexForReviews}>
                <Text style={styles.reviewsText}>Reviews  (1)</Text>
              </TouchableOpacity>
              <View style={{ margin: 15, marginBottom: 0, alignItems: 'center' }}>
                <Text style={{ color: COLORS.grey }}>Click on the type of price you want to update or visit</Text>
              </View>
              <PriceBox item={item} food={"crawfish"} type={"Boiled"} handleSetSnapIndexForPrices={handleSetSnapIndexForPrices} />
              <PriceBox item={item} food={"crawfish"} type={"Live"} handleSetSnapIndexForPrices={handleSetSnapIndexForPrices} />
              <PriceBox item={item} food={"shrimp"} type={"Boiled"} handleSetSnapIndexForPrices={handleSetSnapIndexForPrices} />
              <PriceBox item={item} food={"shrimp"} type={"Live"} handleSetSnapIndexForPrices={handleSetSnapIndexForPrices} />
            </View>
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </BottomSheetReviews>
    </BottomSheetPrices>
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
    gap: 15,
    marginBottom: 150,
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
  touchableOpacity: {
    marginBottom: -15,
    width: '100%',
    borderTopWidth: 1,
    borderColor: COLORS.tealwhite,  
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
  },
  secondRowContainer: {
    marginTop: 0,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  columnContent: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  labelText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
    fontSize: 15,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 27,
    color: COLORS.white
  },
  secondaryPriceText: {
    color: COLORS.white, 
    fontSize: 16
  },
  secondaryText: {
    color: COLORS.green, 
    fontSize: 16
  },
  underline: {
    color: COLORS.brightteal
  },
});


