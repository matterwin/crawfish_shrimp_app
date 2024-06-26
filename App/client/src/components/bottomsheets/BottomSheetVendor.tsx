import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, Pressable, Dimensions, Image } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Stars from '../ratings/Stars.tsx';
import { Rating } from 'react-native-ratings';
import BottomSheetReviews from './BottomSheetReviews.tsx';
import BottomSheetPrices from './BottomSheetPrices.tsx';
import CircleIconContainer from '../iconContainers/CircleIconContainer.tsx';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import FilterBar from '../filters/FilterBar.tsx';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const BottomSheetVendor = ({ children, selectedItem }: Props & { selectedItem: Item }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [snapIndex, setSnapIndex] = useState(0);
  const [snapIndexForReviews, setSnapIndexForReviews] = useState(-1);
  const [snapIndexForPrices, setSnapIndexForPrices] = useState(-1);
  const [item, setItem] = useState(selectedItem);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressedIn, setIsPressedIn] = useState(false);

  const aspectRatioWidth = (9 / 16) * SCREEN_WIDTH;

  const [isPressedPrices, setIsPressedPrices] = useState(false);
  const [pressedPriceId, setPressedPriceId] = useState(-1);

  const translateY = useSharedValue<number>(0);
  const animatedPOIListPosition = useSharedValue<number>(SCREEN_HEIGHT);
  const animatedPOIListIndex = useSharedValue<number>(0);

  const path = require('../../../assets/pictures/crawfish_background.jpg');

  const snapPoints = useMemo(() => ['20%', '80%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []); 

  const handleSetSnapIndexForReviews = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSnapIndexForReviews(snapIndex);
    handlePress();
  } 

  const handlePress = () => {
    setIsPressed(true);
    setIsPressedIn(false);
    setTimeout(() => {
      setIsPressed(false);
    }, 30);
  };

  const handlePressPrices = () => {
    setIsPressedPrices(true);
    setTimeout(() => {
      setIsPressedPrices(false);
    }, 30);
  };

  const handleSetSnapIndexForPrices = (id: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPressedPriceId(id);
    setSnapIndexForPrices(snapIndex);
    handlePressPrices();
  };

  const animatedStyles = useAnimatedStyle(() => {
    if(animatedPOIListPosition) {

    }
    return {
      transform: [{ translateY: animatedPOIListPosition.value - 270 }]
    };
  }, []);  

  useEffect(() => {
    console.log(animatedPOIListPosition.value);
    console.log(SCREEN_HEIGHT)
  },[animatedPOIListPosition.value])

  const PriceBox = ({ id, item, food, type, handleSetSnapIndexForPrices }) => {
    const foodTypeStyle = food === "crawfish" ? styles.underlineC : styles.underlineS;

    return (
      <Pressable 
        style={styles.touchableOpacity}
        onPress={() => handleSetSnapIndexForPrices(id)}
      >
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.labelText}>
              <Text style={foodTypeStyle}>{type}</Text> {food}
            </Text>
            <Text style={styles.priceText}>${item.boilPrice} / lb</Text>
          </View>
          <View>
            <CircleIconContainer food={food} />
          </View>
        </View>
        <View
          style={[
            styles.rowContainer, 
            styles.secondRowContainer, 
            pressedPriceId === id && isPressedPrices && { borderColor: COLORS.white, backgroundColor: 'rgba(255, 255, 255, 0.35)' },
          ]}
        >
          <View>
            <View style={styles.rowContent}>
              <Icon name="chevron-forward-outline" size={15} color="white" />
              <View>
                <Text style={styles.labelText}>Latest price update</Text>
                <Text style={styles.timeUpdateText}>39 mins ago</Text>
              </View>
            </View>
          </View>
          <View style={styles.columnContent}>
            <Text style={styles.secondaryPriceText}>${item.boilPrice}</Text>
            <Text style={styles.secondaryText}>m3ttwin</Text>
          </View>
        </View>
      </Pressable>
    );
  };


  const calcHeight = () => {
    return SCREEN_HEIGHT * 0.3
  };

  return (
    <BottomSheetPrices selectedItem={selectedItem} snapIndex={snapIndexForPrices} setSnapIndex={setSnapIndexForPrices}>
      <BottomSheetReviews selectedItem={selectedItem} snapIndex={snapIndexForReviews} setSnapIndex={setSnapIndexForReviews}>
        <View style={styles.container}>
          {children} 
          <Animated.View style={[styles.box, animatedStyles, { height: {calcHeight} }]}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={path}
              style={[styles.image, { aspectRatio: 16 / 9 }]}
              resizeMode="cover"
            />
            </View>
          </Animated.View>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            handleStyle={{ backgroundColor: 'transparent', borderRadius: 15 }}
            handleIndicatorStyle={{ backgroundColor: COLORS.whiteDark, width: 50, height: 5 }}
            backgroundStyle={{  backgroundColor: 'transparent', borderRadius: 15 }}
            animatedPosition={animatedPOIListPosition}
            animatedIndex={animatedPOIListIndex}
          >
            <View style={styles.sheetContainer}>
              <BottomSheetScrollView style={{flex:1}}>
                <View style={{ flex:1, display: 'flex', gap: 15, marginBottom: 150 }}>
                  <Rating
                    type='custom'
                    ratingCount={5}
                    readonly
                    tintColor={COLORS.teal} 
                    startingValue={3}
                    imageSize={30}
                    ratingColor={COLORS.green}
                    style={{ paddingTop: 20 }}
                    ratingBackgroundColor={COLORS.tealwhite}
                  />
                  <View style={styles.titleView}>
                    <Text style={styles.titleText}>{item.title}</Text>
                  </View>
                  <View style={{ margin:-15, alignItems: 'center' }}>
                    <Text style={{ color: COLORS.white }}>{item.address}</Text>
                    <Text style={{ color: COLORS.green }}>{item.dist} mi</Text>
                  </View>
                  <Pressable
                    style={[styles.reviewsView, isPressed && styles.pressed, isPressedIn && { backgroundColor: 'rgba(255, 255, 255, 0.35)' }]}
                    onPress={handleSetSnapIndexForReviews}
                    onPressIn={() => setIsPressedIn(true)}
                    onPressOut={() => setIsPressedIn(false)}
                  >
                    <Text style={styles.reviewsText}>Reviews <Text style={styles.reviewsNumberCountText}>14</Text></Text>
                  </Pressable>
                  <View style={{ margin: 15, marginBottom: 0, alignItems: 'center' }}>
                    <Text style={{ color: COLORS.grey }}>Click on the type of price you want to update or visit</Text>
                  </View>
                  <PriceBox id={1} item={item} food={"crawfish"} type={"Boiled"} handleSetSnapIndexForPrices={handleSetSnapIndexForPrices} />
                  <PriceBox id={2} item={item} food={"crawfish"} type={"Live"} handleSetSnapIndexForPrices={handleSetSnapIndexForPrices} />
                  <PriceBox id={3} item={item} food={"shrimp"} type={"Boiled"} handleSetSnapIndexForPrices={handleSetSnapIndexForPrices} />
                  <PriceBox id={4} item={item} food={"shrimp"} type={"Live"} handleSetSnapIndexForPrices={handleSetSnapIndexForPrices} />
                </View>
              </BottomSheetScrollView>
            </View>
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
    backgroundColor: COLORS.teal,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
    backgroundColor: COLORS.tealwhite,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  pressed: {
    borderColor: '#ccc',
    // backgroundColor: 'rgba(255, 255, 255, 0.25)'
  },
  reviewsText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  box: {
    // height: SCREEN_HEIGHT,
    // backgroundColor: '#b58df1', 
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  touchableOpacity: {
    marginBottom: -15,
    width: '100%',
    borderTopWidth: 1,
    borderColor: COLORS.tealwhite,  
    borderColor: COLORS.tealDark,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
  },
  secondRowContainer: {
    marginTop: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  timeUpdateText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '400',
    fontSize: 14,
  },
  reviewsNumberCountText: {
    fontSize: 15, 
    fontWeight: '500', 
    color: COLORS.brightteal
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 25,
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
  underlineC: {
    color: COLORS.orange
  },
  underlineS: {
    color: COLORS.orange
  },
});


