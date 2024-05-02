import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFooter, BottomSheetTextInput, useBottomSheetTimingConfigs } from "@gorhom/bottom-sheet";
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';
import { Easing } from 'react-native-reanimated';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const BottomSheetReviews = ({ children, selectedItem, snapIndex, setSnapIndex }: Props & { selectedItem: Item, snapIndex: number }) => {
  const textInputRef = useRef<TextInput>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [item, setItem] = useState(selectedItem);
  const [userInput, setUserInput] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  const snapPoints = useMemo(() => ['80%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 400,
  });

  const handleTouchOutside = () => {
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
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

  const renderFooter = useCallback(
    props => (
      <BottomSheetFooter {...props}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', }}>
            <View style={[styles.textInputContainer, { borderColor: inputFocused ? COLORS.white : COLORS.tealwhite }]}>
              <BottomSheetTextInput
                ref={textInputRef}
                placeholder='Comment Review'
                placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                autoCapitalize='none'
                onChangeText={(text) => setUserInput(text)}
                style={styles.textInput}
                keyboardAppearance='dark'
                maxHeight={150}
                multiline
                // maxHeight={120}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View> 
            <TouchableOpacity style={styles.searchIcon} onPress={() => console.log("pressed")}>
              <Icon name="arrow-up" size={25} color={COLORS.white}  />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetFooter>
    ),
    []
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
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Reviews</Text>
              <TouchableOpacity style={{ margin: 10, marginRight: 15 }} onPress={() => bottomSheetRef.current.close()}>
                <Icon name="close-outline" size={40} color={COLORS.brightteal}/>
              </TouchableOpacity>
            </View>
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
    // margin: 15,
    overflow: 'visible',
    marginTop: 0,
    gap: 15,
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
  titleView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: COLORS.tealDark,
    flexDirection: 'row',
  },
  titleText: {
    color: COLORS.white,
    margin: 10, 
    marginLeft: 15, 
    fontWeight: '700',
    fontSize: 18,
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
  modalView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  textInputContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    width: "80%",
    backgroundColor: COLORS.brightteal,
  },
  textInput: {
    color: COLORS.white,
    flex: 1,
    fontSize: 17,
    padding: 15,
    width: '100%'
  },
  searchIcon: {
    padding: 10,
    paddingHorizontal: 15,
    marginRight: 5,
    backgroundColor: COLORS.tealwhite,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.tealwhite
  },
  closeIcon: {
    padding: 15,
    paddingLeft: 0
  },
});



