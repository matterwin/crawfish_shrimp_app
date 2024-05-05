import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFooter, BottomSheetTextInput, useBottomSheetTimingConfigs } from "@gorhom/bottom-sheet";
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';
import FlatListReviews from '../flatlists/FlatListReviews.tsx';
import CircleUserContainer from '../iconContainers/CircleUserContainer.tsx';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const BottomSheetReviews = ({ children, selectedItem, snapIndex, setSnapIndex }: Props & { selectedItem: Item, snapIndex: number }) => {
  const inputRef = useRef(null);
  const inputTextRef = useRef('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [item, setItem] = useState(selectedItem);
  const [inputFocused, setInputFocused] = useState(false);

  const snapPoints = useMemo(() => ['80%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 500,
  });

  const handleTouchOutside = () => {
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
    Keyboard.dismiss();
  };

  const clearContent = () => {
    inputRef?.current?.clear();
    inputTextRef.current = '';
  };

  const handleClose = () => {
    clearContent();
    handleBlur();
    bottomSheetRef.current.close();
  };

  const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
        closeOnPress={true}
        enableTouchThrough={true}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
			/>
		),
		[]
	);

  const handleRating = (rating) => {
    // Handle the user's rating, e.g., send it to a server or store it locally
    console.log('User rated the item:', rating);
  };

  const renderFooter = useCallback((props) => (
      <BottomSheetFooter {...props}>
        <View style={styles.modalView}>
          <View style={{ width: '100%', alignItems: 'flex-start' }}>
            <Rating
              type='custom'
              defaultRating={4}
              ratingCount={5}
              tintColor={COLORS.teal} 
              startingValue={0}
              imageSize={30}
              ratingColor={COLORS.orange}
              ratingBackgroundColor={COLORS.grey}
              fractions={1}
              onFinishRating={handleRating}
              jumpValue={0.5}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', }}>
            <View style={styles.textInputContainer}>
              <View style={styles.textInputContainerOld}> 
              <ScrollView>
                <BottomSheetTextInput
                  ref={inputRef}
                  placeholder='Add Review'
                  placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                  autoCapitalize='none'
                  onChangeText={(text) => { inputTextRef.current = text; }}
                  style={styles.textInput}
                  keyboardAppearance='dark'
                  onFocus={handleFocus}
                  multiline
                  minHeight={50}
                  maxHeight={100}
                />
                { false && 
                  <TouchableOpacity onPress={clearContent}>
                    <Icon name="close" size={25} color={COLORS.tealwhite} style={styles.closeIcon} />
                  </TouchableOpacity>
                }
                </ScrollView>
              </View>
            </View> 
            <TouchableOpacity style={styles.searchIcon} onPress={() => console.log("pressed")}>
              <Icon name="arrow-up" size={25} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetFooter>
    ),
    [inputTextRef]
  );

  return (
    <Pressable onPressIn={handleTouchOutside} style={{ flex: 1 }}>
      <View style={styles.container}>
        {children} 
        <BottomSheet
          ref={bottomSheetRef}
          index={snapIndex}
          snapPoints={snapPoints}
          enablePanDownToClose
          onChange={handleSheetChanges}
          handleStyle={{ backgroundColor: 'transparent' }}
          handleIndicatorStyle={{ backgroundColor: COLORS.whiteDark, width: 50, height: 5 }}
          backgroundStyle={{  backgroundColor: 'transparent' }} 
          backdropComponent={renderBackdrop}
          footerComponent={renderFooter}
          animationConfigs={animationConfigs} 
          keyboardBehavior="extend"
          keyboardBlurBehavior="none"
        >
          <View style={styles.sheetContainer}> 
            <View style={styles.titleLocationView}>
              <View>
                <View style={{ padding: 3, borderRadius: 10, backgroundColor: COLORS.orange}}>
                  <Icon 
                    name={'location-sharp'} 
                    size={25} 
                    color={COLORS.white} 
                  />
                </View>
              </View>
              <View style={styles.locationAndAddressView}>
                <Text 
                  style={[styles.titleLocationText, { fontSize: 14 }]} 
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >
                  {item.title}
                </Text>
                <Text 
                  style={[styles.titleLocationText, { color: COLORS.brightteal, fontWeight: 500 }]} 
                  numberOfLines={1} 
                  ellipsizeMode="tail"
                >
                  {item.address}
                </Text>
              </View>
            </View>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Reviews</Text>
              <TouchableOpacity style={{ margin: 10, marginRight: 10, marginTop: 5, }} onPress={handleClose}>
                <Icon name="close-outline" size={40} color={COLORS.brightteal}/>
              </TouchableOpacity>
            </View>
            <FlatListReviews  />
          </View>
        </BottomSheet>
      </View>
    </Pressable>
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
    overflow: 'visible',
    marginTop: 0,
    backgroundColor: COLORS.teal,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
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
  modalView: {
    flex: 1,
    padding: 15,
    paddingBottom: 20,
    alignItems: 'flex-start',
    backgroundColor: COLORS.teal,
    justifyContent: 'flex-start',
    gap: 5
  },
  textInputContainer: {
    alignItems: 'center',
    borderRadius: 15,
    width: "80%",
    backgroundColor: COLORS.brightteal,
  },
  textInputContainerOld: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    color: COLORS.white,
    flex: 1,
    fontSize: 17,
    padding: 25,
    width: '100%',
    borderRadius: 15,
  },
  searchIcon: {
    marginRight: 5,
    padding: 13,
    // paddingHorizontal: 15,
    marginRight: 5,
    backgroundColor: COLORS.tealwhite,
    borderRadius: 15,
  },
  closeIcon: {
    padding: 10,
    paddingLeft: 0
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: COLORS.tealwhite,
    borderColor: COLORS.tealDark,
    flexDirection: 'row',
  },
  titleLocationView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: COLORS.tealwhite,
    borderColor: COLORS.tealDark,
    flexDirection: 'row',
    margin: 10, 
    marginLeft: 15,
    marginBottom: 0,
    gap: 15,
    width: '100%',
    marginRight: 150,
  },
  titleText: {
    color: COLORS.white,
    margin: 10, 
    marginLeft: 15, 
    marginTop: 5,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center'
  },
  titleLocationText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
    maxWidth: '80%'
  },
  locationAndAddressView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '90%',
  },
});



