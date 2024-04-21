import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Platform, } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFooter, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const BottomSheetPrices = ({ children, selectedItem, snapIndex, setSnapIndex }: Props & { selectedItem: Item, snapIndex: number }) => {
  const textInputRef = useRef<TextInput>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [item, setItem] = useState(selectedItem);
  const [userInput, setUserInput] = useState('');

  const snapPoints = useMemo(() => ['70%', '85%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

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
          <View style={styles.textInputContainer}>
              <BottomSheetTextInput
                  ref={textInputRef}
                  placeholder='Comment Review' 
                  placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                  autoCapitalize='none' 
                  onChangeText={(text) => setUserInput(text)} 
                  color={COLORS.royalblue}
                  style={styles.textInput}
                  keyboardAppearance='dark'
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  keyboardBehavior="extend"
                  keyboardBlurBehavior="restore"
                />
            <TouchableOpacity style={styles.searchIcon}onPress={() => console.log("pressed")}>
              <Icon name="arrow-up" size={25} color={COLORS.white}  />
            </TouchableOpacity>
          </View> 
        </View>
      </BottomSheetFooter>
    ),
    []
  );

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
        handleIndicatorStyle={{ backgroundColor: COLORS.brightteal, width: 60, height: 4 }} 
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode='adjustResize'
      >
        <View style={styles.sheetContainer}> 
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Boil Prices</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetPrices;

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
    justifyContent: 'center',
    flexWarp: 'wrap',
    borderBottomWidth: 1,
    borderColor: COLORS.tealwhite
  },
  titleText: {
    color: COLORS.white,
    margin: 15,
    marginTop: 5,
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
  modalView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.tealwhite,
    borderRadius: 50,
    marginTop: 5,
    width: "100%",
    backgroundColor: COLORS.brightteal,
  },
  textInput: {
    color: COLORS.white,
    flex: 1,
    fontSize: 17,
    marginLeft: 5,
    padding: 15,
    borderRadius: 50,
    width: '100%'
  },
  searchIcon: {
    padding: 10,
    paddingHorizontal: 15,
    // paddingLeft: 0,
    marginRight: 5,
    backgroundColor: COLORS.tealwhite,
    borderRadius: 50
  },
  closeIcon: {
    padding: 15,
    paddingLeft: 0
  },
});




